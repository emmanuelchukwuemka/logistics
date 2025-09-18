"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    first_name: zod_1.z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long"),
    last_name: zod_1.z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name is too long"),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    phone: zod_1.z
        .string()
        .min(6, "Phone number is too short")
        .max(15, "Phone number is too long"),
    city_id: zod_1.z.number(),
    password: zod_1.z.string().min(2, "Password must be at least 2 characters"),
});
