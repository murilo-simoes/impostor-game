import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as SocketIOServer } from "socket.io";
import { initSocketServer } from "./src/lib/socketServer";
import type { ClientToServerEvents, ServerToClientEvents } from "./src/types/game";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT ?? "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? "/", true);
    handle(req, res, parsedUrl);
  });

  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: { origin: "*" },
    path: "/api/socketio",
  });

  initSocketServer(io);

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Network: http://0.0.0.0:${port}`);
  });
});
