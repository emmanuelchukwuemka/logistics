"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsSchema = void 0;
const zod_1 = require("zod");
// Am creating validation schema for Settings here
exports.settingsSchema = zod_1.z.object({
// Example
//name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});
