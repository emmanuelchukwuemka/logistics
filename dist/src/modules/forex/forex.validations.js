"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forexSchema = void 0;
const zod_1 = require("zod");
// Am creating validation schema for Forex here
exports.forexSchema = zod_1.z.object({
// Example
//name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});
