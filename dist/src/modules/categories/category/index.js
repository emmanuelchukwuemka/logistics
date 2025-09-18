"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = __importDefault(require("./category.routes"));
const category_middlewares_1 = require("./category.middlewares");
const settings_1 = __importDefault(require("./settings"));
const router = (0, express_1.Router)();
router.use("/", category_middlewares_1.categorySecure, category_routes_1.default);
router.use("/settings", settings_1.default);
exports.default = router;
