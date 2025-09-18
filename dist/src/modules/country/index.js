"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_routes_1 = __importDefault(require("./country.routes"));
const country_middlewares_1 = require("./country.middlewares");
const router = (0, express_1.Router)();
router.use("/", country_middlewares_1.countrySecure, country_routes_1.default);
exports.default = router;
