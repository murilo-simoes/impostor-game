import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@/types/game";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function getPlayerId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("impostorPlayerId");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("impostorPlayerId", id);
  }
  return id;
}

export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!socket) {
    socket = io({ path: "/api/socketio", autoConnect: true });
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
