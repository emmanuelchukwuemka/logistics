import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./src/loaders/socket";
import pool from "./src/config/database/db";
import app from "./src/App";
import { Request, Response } from "express";

const port = process.env.PORT || process.env.APP_PORT_NUMBER || 3000;

// Creating HTTP server from Express app here
const server = http.createServer(app);

// And here am initializing Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Abeg this is for development only
    methods: ["GET", "POST"],
  },
});

// Heartbeat
app.get("/server/heartbeat", (req: Request, res: Response) => {
  res.status(200).send("Server is active and running..");
});

// Here am attach io instance to app so it can be accessed in routes/controllers
app.set("io", io);

// So here am initializing sockets with DB pool in raw config
initSocket(io, pool);

// And finally am starting the server here
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
