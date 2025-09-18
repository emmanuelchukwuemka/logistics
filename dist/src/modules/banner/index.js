"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const banner_routes_1 = __importDefault(require("./banner.routes"));
const banner_middlewares_1 = require("./banner.middlewares");
const router = (0, express_1.Router)();
router.use("/", banner_middlewares_1.bannerSecure, banner_routes_1.default);
exports.default = router;
