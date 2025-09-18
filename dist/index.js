"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./src/loaders/socket");
const db_1 = __importDefault(require("./src/config/database/db"));
const App_1 = __importDefault(require("./src/App"));
const port = process.env.APP_PORT_NUMBER || 3000;
// Creating HTTP server from Express app here
const server = http_1.default.createServer(App_1.default);
// And here am initializing Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Abeg this is for development only
        methods: ["GET", "POST"],
    },
});
// Heartbeat
App_1.default.get("/server/heartbeat", (req, res) => {
    res.status(200).send("Server is active and running..");
});
// Here am attach io instance to app so it can be accessed in routes/controllers
App_1.default.set("io", io);
// So here am initializing sockets with DB pool in raw config
(0, socket_1.initSocket)(io, db_1.default);
// And finally am starting the server here
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
