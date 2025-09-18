"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: Boolean(process.env.SHOULD_WAIT_FOR_CONNECTION),
    connectionLimit: Number(process.env.CONNECTION_LIMIT) || 10,
    maxIdle: Number(process.env.DB_MAX_IDLE) || 10,
    idleTimeout: Number(process.env.DB_IDLE_TIMEOUT) || 60000,
    queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
    enableKeepAlive: Boolean(process.env.ENABLE_KEEP_ALIVE),
    keepAliveInitialDelay: Number(process.env.KEEP_ALIVE_INITIAL_DELAY) || 0,
});
exports.default = pool;
