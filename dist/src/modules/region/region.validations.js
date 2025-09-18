"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.regionFlexibleSchema = exports.regionSchema = void 0;
const zod_1 = require("zod");
exports.regionSchema = zod_1.z.object({
    continent_id: zod_1.z.number().int().min(1, "Continent ID is required"),
    name: zod_1.z
        .string()
        .min(5, "Enter a valid region name")
        .max(100, "Region name is too long"),
    status: zod_1.z.number().min(0).max(1).int().optional().default(1),
});
// Flexible: single object or array of objects
exports.regionFlexibleSchema = zod_1.z.union([
    exports.regionSchema,
    zod_1.z.array(exports.regionSchema),
]);
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, "ID must be a positive number"),
});
