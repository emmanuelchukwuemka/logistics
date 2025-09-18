"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.subcategoryUpdateSchema = exports.subcategoryFlexibleSchema = exports.subcategorySchema = void 0;
const zod_1 = require("zod");
exports.subcategorySchema = zod_1.z.object({
    category_id: zod_1.z.number().min(1, "Category is required"),
    name: zod_1.z.string().min(2, "Name is required").max(100, "Name is too long"),
    label: zod_1.z
        .string()
        .min(2, "Enter a friendly label for this subcategory")
        .max(100, "Label is too long"),
    image: zod_1.z.url("Invalid image URL").optional().nullable(),
    status: zod_1.z.number().int().min(0).max(1).optional(),
});
// accept both single and array
exports.subcategoryFlexibleSchema = zod_1.z.union([
    exports.subcategorySchema,
    zod_1.z.array(exports.subcategorySchema),
]);
// For update (partial allowed but must have at least 1 valid field)
exports.subcategoryUpdateSchema = exports.subcategorySchema
    .partial()
    .superRefine((data, ctx) => {
    const hasAtLeastOneField = Object.values(data).some((val) => val !== undefined);
    if (!hasAtLeastOneField) {
        ctx.addIssue({
            code: "custom",
            message: "At least one field must be provided for update",
        });
    }
});
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "ID must be a positive number",
    }),
});
