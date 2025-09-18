"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maincategoryFlexibleSchema = exports.maincategorySchema = void 0;
const zod_1 = require("zod");
exports.maincategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name is required").max(100, "Name is too long"),
    label: zod_1.z
        .string()
        .min(2, "Enter a friendly label for this maincategory")
        .max(100, "Label is too long"),
    image: zod_1.z.url("Invalid image URL"),
    status: zod_1.z.number().int().min(0).max(1).optional(),
});
// Allow either single object or array of objects
exports.maincategoryFlexibleSchema = zod_1.z.union([
    exports.maincategorySchema,
    zod_1.z.array(exports.maincategorySchema),
]);
