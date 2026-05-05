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

const rooms = new Map<string, Room>(); // code -> room
const playerRoom = new Map<string, string>(); // socketId -> room code

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
    function getMyRoom(): Room | null {
      const code = playerRoom.get(socket.id);
      if (!code) return null;
      return rooms.get(code) ?? null;
    }

    function broadcastRoom(room: Room) {
      io.to(room.code).emit("room:updated", toPublicRoom(room));
    }

    socket.on("room:create", (playerName, callback) => {
      const room = createRoom(socket.id, playerName);
      rooms.set(room.code, room);
      playerRoom.set(socket.id, room.code);
      socket.join(room.code);
      callback(room.code, socket.id);
      broadcastRoom(room);
    });

    socket.on("room:join", (code, playerName, callback) => {
      const room = rooms.get(code.toUpperCase());
      if (!room) return callback(false, "Sala não encontrada");
      if (room.state.phase !== "lobby") return callback(false, "Partida já iniciada");
      if (room.state.players.length >= 12) return callback(false, "Sala cheia");

      addPlayer(room, socket.id, playerName);
      playerRoom.set(socket.id, room.code);
      socket.join(room.code);
      callback(true, undefined, socket.id);
      broadcastRoom(room);
    });

    socket.on("room:leave", () => {
      const room = getMyRoom();
      if (!room) return;
      removePlayer(room, socket.id);
      playerRoom.delete(socket.id);
      socket.leave(room.code);
      if (room.state.players.length === 0) {
        rooms.delete(room.code);
      } else {
        broadcastRoom(room);
      }
    });

    socket.on("game:start", (settings: GameSettings) => {
      const room = getMyRoom();
      if (!room || room.hostId !== socket.id) return;
      if (room.state.players.length < 3) {
        socket.emit("error", "Mínimo de 3 jogadores necessário");
        return;
      }

      startGame(room, settings);

      // Send private info to each player
      for (const player of room.state.players) {
        const info = room.privateInfo[player.id];
        if (info) {
          io.to(player.id).emit("game:private-info", info);
        }
      }

      broadcastRoom(room);
    });

    socket.on("game:next-turn", () => {
      const room = getMyRoom();
      if (!room) return;
      // Only current turn player or host can advance
      const activePlayers = room.state.players.filter((p) => !p.isEliminated);
      const activeOrder = room.state.turnOrder.filter((id) =>
        activePlayers.some((p) => p.id === id)
      );
      const currentPlayerId = activeOrder[room.state.currentTurn];
      if (socket.id !== currentPlayerId && socket.id !== room.hostId) return;

      advanceTurn(room);
      broadcastRoom(room);
    });

    socket.on("vote:cast", (targetId: string) => {
      const room = getMyRoom();
      if (!room || room.state.phase !== "voting") return;
      const voter = room.state.players.find((p) => p.id === socket.id);
      if (!voter || voter.isEliminated) return;

      castVote(room, socket.id, targetId);
      io.to(room.code).emit("vote:cast", socket.id, targetId);
      broadcastRoom(room); // atualiza voteCount para todos em tempo real

      // Auto-resolve when all active players voted
      const activePlayers = room.state.players.filter((p) => !p.isEliminated);
      if (Object.keys(room.state.votes).length >= activePlayers.length) {
        const results = resolveVotes(room);
        io.to(room.code).emit("vote:results", results);
        broadcastRoom(room);
      }
    });

    socket.on("game:restart", () => {
      const room = getMyRoom();
      if (!room || room.hostId !== socket.id) return;
      resetGame(room);
      broadcastRoom(room);
    });

    socket.on("disconnect", () => {
      const room = getMyRoom();
      if (!room) return;
      removePlayer(room, socket.id);
      playerRoom.delete(socket.id);
      if (room.state.players.length === 0) {
        rooms.delete(room.code);
      } else {
        broadcastRoom(room);
      }
    });
  });
}
