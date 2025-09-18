"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.stateBulkOrSingleSchema = exports.stateFlexibleSchema = exports.stateSchema = void 0;
const zod_1 = require("zod");
const state_helpers_1 = require("./state.helpers");
exports.stateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "State name is too short"),
    code: zod_1.z.string().min(1, "State code is required"),
    country_id: zod_1.z.number().int("Country ID must be a number"),
    status: zod_1.z.number().min(0).max(1).int().optional().default(1),
});
exports.stateFlexibleSchema = exports.stateSchema.partial();
exports.stateBulkOrSingleSchema = (0, state_helpers_1.singleOrArray)(exports.stateSchema);
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().int().min(1, "ID must be a positive number"),
});
