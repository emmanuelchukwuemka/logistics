"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const continent_routes_1 = __importDefault(require("./continent.routes"));
const continent_middlewares_1 = require("./continent.middlewares");
const router = (0, express_1.Router)();
router.use("/", continent_middlewares_1.continentSecure, continent_routes_1.default);
exports.default = router;
