"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkDatabaseConnections;
const sequelize_1 = __importDefault(require("../config/database/sequelize")); // Sequelize ORM connection
const db_1 = __importDefault(require("../config/database/db")); // MySQL2 raw connection
// Import logistics models to ensure they are registered with Sequelize
require("../modules/logistics/logistics.models");
const logistics_seed_1 = require("../modules/logistics/logistics.seed");
async function checkDatabaseConnections() {
    try {
        // Test Sequelize ORM connection
        await sequelize_1.default.authenticate();
        console.log("ORM DB connected");
        // Synchronize only logistics models with database (create tables if they don't exist)
        // Use force: false to avoid dropping existing tables
        await sequelize_1.default.sync({ force: false, alter: false });
        console.log("Database synchronized successfully");
        // Seed initial data
        await (0, logistics_seed_1.seedServiceData)();
        // Test raw MySQL2 connection
        const connection = await db_1.default.getConnection();
        try {
            console.log("Raw SQL DB connected");
        }
        finally {
            connection.release();
        }
    }
    catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1); // Here am exiting the app if DB is not reachable
    }
}
