"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_routes_1 = __importDefault(require("./settings.routes"));
const settings_middlewares_1 = require("./settings.middlewares");
const router = (0, express_1.Router)();
router.use("/", settings_middlewares_1.settingsSecure, settings_routes_1.default);
exports.default = router;
