import { Server as SocketIOServer } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  GameSettings,
  PublicRoom,
} from "@/types/game";
import {
  createRoom,
  addPlayer,
  removePlayer,
  startGame,
  advanceTurn,
  castVote,
  resolveVotes,
  resetGame,
} from "./gameEngine";
import type { Room } from "@/types/game";

const rooms = new Map<string, Room>();
const playerRoom = new Map<string, string>();       // persistentId -> room code
const socketToPlayer = new Map<string, string>();   // socketId -> persistentId
const playerToSocket = new Map<string, string>();   // persistentId -> socketId
const disconnectTimers = new Map<string, ReturnType<typeof setTimeout>>();

function toPublicRoom(room: Room): PublicRoom {
  const { votes, ...rest } = room.state;
  return {
    id: room.id,
    code: room.code,
    hostId: room.hostId,
    state: { ...rest, voteCount: Object.keys(votes).length },
  };
}

export function initSocketServer(io: SocketIOServer<ClientToServerEvents, ServerToClientEvents>) {
  io.on("connection", (socket) => {
    function getMyPersistentId(): string | null {
      return socketToPlayer.get(socket.id) ?? null;
    }

    function getMyRoom(): Room | null {
      const persistentId = getMyPersistentId();
      if (!persistentId) return null;
      const code = playerRoom.get(persistentId);
      if (!code) return null;
      return rooms.get(code) ?? null;
    }

    function broadcastRoom(room: Room) {
      io.to(room.code).emit("room:updated", toPublicRoom(room));
    }

    socket.on("room:create", (playerName, persistentId, callback) => {
      const room = createRoom(persistentId, playerName);
      rooms.set(room.code, room);
      playerRoom.set(persistentId, room.code);
      socketToPlayer.set(socket.id, persistentId);
      playerToSocket.set(persistentId, socket.id);
      socket.join(room.code);
      callback(room.code, persistentId);
      broadcastRoom(room);
    });

    socket.on("room:join", (code, playerName, persistentId, callback) => {
      const room = rooms.get(code.toUpperCase());
      if (!room) return callback(false, "Sala não encontrada");
      if (room.state.phase !== "lobby") return callback(false, "Partida já iniciada");
      if (room.state.players.length >= 12) return callback(false, "Sala cheia");

      addPlayer(room, persistentId, playerName);
      playerRoom.set(persistentId, room.code);
      socketToPlayer.set(socket.id, persistentId);
      playerToSocket.set(persistentId, socket.id);
      socket.join(room.code);
      callback(true, undefined, persistentId);
      broadcastRoom(room);
    });

    socket.on("player:rejoin", (persistentId, roomCode, callback) => {
      const room = rooms.get(roomCode);
      if (!room) return callback(false);

      const player = room.state.players.find(p => p.id === persistentId);
      if (!player) return callback(false);

      // Cancel pending removal timer
      const timer = disconnectTimers.get(persistentId);
      if (timer) {
        clearTimeout(timer);
        disconnectTimers.delete(persistentId);
      }

      // Update socket mappings
      const oldSocketId = playerToSocket.get(persistentId);
      if (oldSocketId && oldSocketId !== socket.id) {
        socketToPlayer.delete(oldSocketId);
      }

      socketToPlayer.set(socket.id, persistentId);
      playerToSocket.set(persistentId, socket.id);
      socket.join(roomCode);

      const privateInfo = room.privateInfo[persistentId] ?? null;
      callback(true, toPublicRoom(room), privateInfo);
      broadcastRoom(room);
    });

    socket.on("room:leave", () => {
      const room = getMyRoom();
      const persistentId = getMyPersistentId();
      if (!room || !persistentId) return;

      removePlayer(room, persistentId);
      playerRoom.delete(persistentId);
      socketToPlayer.delete(socket.id);
      playerToSocket.delete(persistentId);
      socket.leave(room.code);

      if (room.state.players.length === 0) {
        rooms.delete(room.code);
      } else {
        broadcastRoom(room);
      }
    });

    socket.on("game:start", (settings: GameSettings) => {
      const room = getMyRoom();
      const persistentId = getMyPersistentId();
      if (!room || !persistentId || room.hostId !== persistentId) return;
      if (room.state.players.length < 3) {
        socket.emit("error", "Mínimo de 3 jogadores necessário");
        return;
      }

      startGame(room, settings);

      for (const player of room.state.players) {
        const info = room.privateInfo[player.id];
        if (info) {
          const playerSocketId = playerToSocket.get(player.id);
          if (playerSocketId) {
            io.to(playerSocketId).emit("game:private-info", info);
          }
        }
      }

      broadcastRoom(room);
    });

    socket.on("game:next-turn", () => {
      const room = getMyRoom();
      const persistentId = getMyPersistentId();
      if (!room || !persistentId) return;

      const activePlayers = room.state.players.filter(p => !p.isEliminated);
      const activeOrder = room.state.turnOrder.filter(id =>
        activePlayers.some(p => p.id === id)
      );
      const currentPlayerId = activeOrder[room.state.currentTurn];
      if (persistentId !== currentPlayerId) return;

      advanceTurn(room);
      broadcastRoom(room);
    });

    socket.on("vote:cast", (targetId: string) => {
      const room = getMyRoom();
      const persistentId = getMyPersistentId();
      if (!room || !persistentId || room.state.phase !== "voting") return;

      const voter = room.state.players.find(p => p.id === persistentId);
      if (!voter || voter.isEliminated) return;

      castVote(room, persistentId, targetId);
      io.to(room.code).emit("vote:cast", persistentId, targetId);
      broadcastRoom(room);

      const activePlayers = room.state.players.filter(p => !p.isEliminated);
      if (Object.keys(room.state.votes).length >= activePlayers.length) {
        const results = resolveVotes(room);
        io.to(room.code).emit("vote:results", results);
        broadcastRoom(room);
      }
    });

    socket.on("game:restart", () => {
      const room = getMyRoom();
      const persistentId = getMyPersistentId();
      if (!room || !persistentId || room.hostId !== persistentId) return;

      resetGame(room);
      broadcastRoom(room);
    });

    socket.on("disconnect", () => {
      const persistentId = getMyPersistentId();
      if (!persistentId) return;

      socketToPlayer.delete(socket.id);

      const roomCode = playerRoom.get(persistentId);
      const room = roomCode ? rooms.get(roomCode) : null;

      if (!room) {
        playerToSocket.delete(persistentId);
        playerRoom.delete(persistentId);
        return;
      }

      if (room.state.phase === "lobby") {
        removePlayer(room, persistentId);
        playerRoom.delete(persistentId);
        playerToSocket.delete(persistentId);
        if (room.state.players.length === 0) {
          rooms.delete(room.code);
        } else {
          broadcastRoom(room);
        }
      } else {
        // During game: wait 30s before removing so reconnections restore seamlessly
        const timer = setTimeout(() => {
          disconnectTimers.delete(persistentId);
          playerToSocket.delete(persistentId);
          playerRoom.delete(persistentId);
          removePlayer(room, persistentId);
          if (room.state.players.length === 0) {
            rooms.delete(room.code);
          } else {
            broadcastRoom(room);
          }
        }, 30000);
        disconnectTimers.set(persistentId, timer);
      }
    });
  });
}
