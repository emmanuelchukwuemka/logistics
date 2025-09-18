"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategory_routes_1 = __importDefault(require("./subcategory.routes"));
const subcategory_middlewares_1 = require("./subcategory.middlewares");
const settings_1 = __importDefault(require("./settings"));
const router = (0, express_1.Router)();
router.use("/", subcategory_middlewares_1.subcategorySecure, subcategory_routes_1.default);
router.use("/settings", settings_1.default);
exports.default = router;
