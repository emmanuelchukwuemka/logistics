"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = __importDefault(require("./loaders"));
const app = (0, express_1.default)();
(async () => {
    await (0, loaders_1.default)(app);
})();
exports.default = app;
