"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maincategory_routes_1 = __importDefault(require("./maincategory.routes"));
const maincategory_middlewares_1 = require("./maincategory.middlewares");
const settings_1 = __importDefault(require("./settings"));
const router = (0, express_1.Router)();
router.use("/", maincategory_middlewares_1.maincategorySecure, maincategory_routes_1.default);
router.use("/settings", settings_1.default);
exports.default = router;
