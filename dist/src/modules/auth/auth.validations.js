"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
// Am creating validation schema for Auth here
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: zod_1.z.string().min(2, "password is required"),
});
