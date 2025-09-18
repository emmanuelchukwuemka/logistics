"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currency_routes_1 = __importDefault(require("./currency.routes"));
const currency_middlewares_1 = require("./currency.middlewares");
const router = (0, express_1.Router)();
router.use("/", currency_middlewares_1.currencySecure, currency_routes_1.default);
exports.default = router;
