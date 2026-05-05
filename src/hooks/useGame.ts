"use client";

import { useEffect, useRef, useReducer, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import type { PublicRoom, PlayerPrivateInfo, VoteResults } from "@/types/game";

interface GameClientState {
  connected: boolean;
  room: PublicRoom | null;
  myId: string | null;
  privateInfo: PlayerPrivateInfo | null;
  voteResults: VoteResults | null;
  error: string | null;
  castVotes: Record<string, string>;
}

type Action =
  | { type: "CONNECTED" }
  | { type: "DISCONNECTED" }
  | { type: "JOINED"; myId: string }
  | { type: "ROOM_UPDATED"; room: PublicRoom }
  | { type: "PRIVATE_INFO"; info: PlayerPrivateInfo }
  | { type: "VOTE_CAST"; voterId: string; targetId: string }
  | { type: "VOTE_RESULTS"; results: VoteResults }
  | { type: "ERROR"; message: string }
  | { type: "CLEAR_ERROR" }
  | { type: "RESET" };

function reducer(state: GameClientState, action: Action): GameClientState {
  switch (action.type) {
    case "CONNECTED": return { ...state, connected: true };
    case "DISCONNECTED": return { ...state, connected: false };
    case "JOINED": return { ...state, myId: action.myId };
    case "ROOM_UPDATED": return { ...state, room: action.room, error: null };
    case "PRIVATE_INFO": return { ...state, privateInfo: action.info };
    case "VOTE_CAST": return { ...state, castVotes: { ...state.castVotes, [action.voterId]: action.targetId } };
    case "VOTE_RESULTS": return { ...state, voteResults: action.results };
    case "ERROR": return { ...state, error: action.message };
    case "CLEAR_ERROR": return { ...state, error: null };
    case "RESET": return { ...state, privateInfo: null, voteResults: null, castVotes: {} };
    default: return state;
  }
}

const initial: GameClientState = {
  connected: false,
  room: null,
  myId: null,
  privateInfo: null,
  voteResults: null,
  error: null,
  castVotes: {},
};

export function useGame() {
  const [state, dispatch] = useReducer(reducer, initial);
  const socketRef = useRef(getSocket());

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("connect", () => dispatch({ type: "CONNECTED" }));
    socket.on("disconnect", () => dispatch({ type: "DISCONNECTED" }));
    socket.on("room:updated", (room) => dispatch({ type: "ROOM_UPDATED", room }));
    socket.on("game:private-info", (info) => dispatch({ type: "PRIVATE_INFO", info }));
    socket.on("vote:cast", (voterId, targetId) => dispatch({ type: "VOTE_CAST", voterId, targetId }));
    socket.on("vote:results", (results) => {
      dispatch({ type: "VOTE_RESULTS", results });
    });
    socket.on("error", (msg) => dispatch({ type: "ERROR", message: msg }));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room:updated");
      socket.off("game:private-info");
      socket.off("vote:cast");
      socket.off("vote:results");
      socket.off("error");
    };
  }, []);

  const createRoom = useCallback((playerName: string) => {
    socketRef.current.emit("room:create", playerName, (code, playerId) => {
      dispatch({ type: "JOINED", myId: playerId });
      // room:updated will follow
    });
  }, []);

  const joinRoom = useCallback((code: string, playerName: string, onError?: (msg: string) => void) => {
    socketRef.current.emit("room:join", code, playerName, (success, error, playerId) => {
      if (!success || !playerId) {
        onError?.(error ?? "Erro ao entrar na sala");
        return;
      }
      dispatch({ type: "JOINED", myId: playerId });
    });
  }, []);

  const leaveRoom = useCallback(() => {
    socketRef.current.emit("room:leave");
    dispatch({ type: "RESET" });
  }, []);

  const startGame = useCallback((settings: import("@/types/game").GameSettings) => {
    socketRef.current.emit("game:start", settings);
    dispatch({ type: "RESET" });
  }, []);

  const nextTurn = useCallback(() => {
    socketRef.current.emit("game:next-turn");
  }, []);

  const castVote = useCallback((targetId: string) => {
    socketRef.current.emit("vote:cast", targetId);
  }, []);

  const restartGame = useCallback(() => {
    socketRef.current.emit("game:restart");
    dispatch({ type: "RESET" });
  }, []);

  const clearError = useCallback(() => dispatch({ type: "CLEAR_ERROR" }), []);

  return {
    ...state,
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    nextTurn,
    castVote,
    restartGame,
    clearError,
  };
}
