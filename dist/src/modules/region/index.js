"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const region_routes_1 = __importDefault(require("./region.routes"));
const region_middlewares_1 = require("./region.middlewares");
const router = (0, express_1.Router)();
router.use("/", region_middlewares_1.regionSecure, region_routes_1.default);
exports.default = router;
