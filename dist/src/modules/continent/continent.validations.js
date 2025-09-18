"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.continentFlexibleSchema = exports.continentSchema = void 0;
const zod_1 = require("zod");
exports.continentSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Continent name is required")
        .max(100, "Continent name is too long"),
    status: zod_1.z.number().min(0).max(1).int().optional().default(1),
});
// Flexible: single object or array of objects
exports.continentFlexibleSchema = zod_1.z.union([
    exports.continentSchema,
    zod_1.z.array(exports.continentSchema),
]);
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, "ID must be a positive number"),
});
