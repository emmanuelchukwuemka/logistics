"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.cityBulkOrSingleSchema = exports.cityFlexibleSchema = exports.citySchema = void 0;
const zod_1 = require("zod");
const city_helpers_1 = require("./city.helpers");
exports.citySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "City name is too short"),
    state_id: zod_1.z.number().int("State ID must be a number"),
    status: zod_1.z.number().min(0).max(1).int().optional().default(1),
});
// Partial for updates
exports.cityFlexibleSchema = exports.citySchema.partial();
exports.cityBulkOrSingleSchema = (0, city_helpers_1.singleOrArray)(exports.citySchema);
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, "ID must be a positive number"),
});
