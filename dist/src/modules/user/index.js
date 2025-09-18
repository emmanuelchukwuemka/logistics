"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const user_middlewares_1 = require("./user.middlewares");
const router = (0, express_1.Router)();
router.use("/", user_middlewares_1.userSecure, user_routes_1.default);
exports.default = router;
