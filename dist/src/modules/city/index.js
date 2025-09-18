"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_routes_1 = __importDefault(require("./city.routes"));
const city_middlewares_1 = require("./city.middlewares");
const router = (0, express_1.Router)();
router.use("/", city_middlewares_1.citySecure, city_routes_1.default);
exports.default = router;
