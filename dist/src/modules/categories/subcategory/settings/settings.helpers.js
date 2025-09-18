"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdAndUpdate = void 0;
const settings_middlewares_1 = require("./settings.middlewares");
exports.validateIdAndUpdate = [settings_middlewares_1.validateIdParam, settings_middlewares_1.validateSubcategoryUpdate];
