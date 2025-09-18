"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forex_routes_1 = __importDefault(require("./forex.routes"));
const forex_middlewares_1 = require("./forex.middlewares");
const router = (0, express_1.Router)();
router.use("/", forex_middlewares_1.forexSecure, forex_routes_1.default);
exports.default = router;
