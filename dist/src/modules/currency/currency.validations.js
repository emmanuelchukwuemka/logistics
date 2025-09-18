"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.currencyUpdateSchema = exports.currencyFlexibleSchema = exports.currencySchema = void 0;
const zod_1 = require("zod");
exports.currencySchema = zod_1.z.object({
    code: zod_1.z.string().length(3, "Currency code must be 3 characters"),
    name: zod_1.z.string().min(2, "Currency name is too short"),
    symbol: zod_1.z.string().min(1, "Currency symbol is required"),
    decimal_places: zod_1.z.number().int().optional().default(2),
    status: zod_1.z.number().min(0).max(1).int().default(1),
});
// For updates (partial, allows missing fields)
exports.currencyFlexibleSchema = zod_1.z.union([
    exports.currencySchema,
    zod_1.z.array(exports.currencySchema),
]);
exports.currencyUpdateSchema = exports.currencySchema.partial();
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, "ID must be a positive number"),
});
