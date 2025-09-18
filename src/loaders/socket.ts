// socket.ts
import { Server, Socket } from "socket.io";
import { Pool } from "mysql2/promise";

export const connectedUsers = new Map<number, Set<string>>();

export const initSocket = (io: Server, pool: Pool) => {

  
};
