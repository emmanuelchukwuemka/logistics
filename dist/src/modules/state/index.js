"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const state_routes_1 = __importDefault(require("./state.routes"));
const state_middlewares_1 = require("./state.middlewares");
const router = (0, express_1.Router)();
router.use("/", state_middlewares_1.stateSecure, state_routes_1.default);
exports.default = router;
