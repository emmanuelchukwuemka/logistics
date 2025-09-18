"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.countryUpdateFlexibleSchema = exports.countryFlexibleSchema = exports.countryUpdateSchema = exports.countrySchema = void 0;
const zod_1 = require("zod");
// Create schema
exports.countrySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    iso2: zod_1.z.string().length(2, "ISO2 must be 2 letters"),
    iso3: zod_1.z.string().length(3, "ISO3 must be 3 letters"),
    region_id: zod_1.z.number().min(1, "Region ID is required"),
    currency_id: zod_1.z.number().min(1, "Currency ID is required"),
    flag: zod_1.z.url("Please enter a valid flag url").optional(),
    status: zod_1.z.number().min(0).max(1).int().optional().default(1),
});
// For updates (partial fields allowed)
exports.countryUpdateSchema = exports.countrySchema.partial();
// Flexible (array or single)
// export const countryFlexibleSchema = z.union([
//   countrySchema,
//   z.array(countrySchema),
// ]);
// Flexible (array or single)
exports.countryFlexibleSchema = zod_1.z.preprocess((val) => {
    if (Array.isArray(val))
        return val;
    return [val];
}, zod_1.z.array(exports.countrySchema));
exports.countryUpdateFlexibleSchema = zod_1.z.union([
    exports.countryUpdateSchema,
    zod_1.z.array(exports.countryUpdateSchema),
]);
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, "ID must be a positive number"),
});
