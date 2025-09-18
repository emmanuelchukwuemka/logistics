"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.categoryFlexibleSchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    maincategory_id: zod_1.z.number().min(1, "Maincategory is required"),
    name: zod_1.z.string().min(2, "Name is required").max(100, "Name is too long"),
    label: zod_1.z
        .string()
        .min(2, "Enter a friendly label for this category")
        .max(100, "Label is too long"),
    image: zod_1.z.url("Invalid image URL").optional().nullable(),
    status: zod_1.z.number().int().min(0).max(1).optional(),
});
// Here am allowing both single object or array of objects
exports.categoryFlexibleSchema = zod_1.z.union([
    exports.categorySchema,
    zod_1.z.array(exports.categorySchema),
]);
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "ID must be a positive number",
    }),
});
