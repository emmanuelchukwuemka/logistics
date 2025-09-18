"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const database_1 = __importDefault(require("./database"));
// import eventsLoader from "./events";
exports.default = async (app) => {
    await (0, database_1.default)();
    (0, express_1.default)(app);
    // eventsLoader();
};
