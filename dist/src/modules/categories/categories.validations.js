"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSchema = void 0;
const zod_1 = require("zod");
// Am creating validation schema for Categories here
exports.categoriesSchema = zod_1.z.object({
// Example
//name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});
