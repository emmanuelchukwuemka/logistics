"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
        max: Number(process.env.DB_POOL_MAX) || 5,
        min: Number(process.env.DB_POOL_MIN) || 0,
        acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
        idle: Number(process.env.DB_POOL_IDLE) || 10000,
    },
});
exports.default = sequelize;
