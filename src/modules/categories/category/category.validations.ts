import { z } from "zod";

export const categorySchema = z.object({
  maincategory_id: z.number().min(1, "Maincategory is required"),
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  label: z
    .string()
    .min(2, "Enter a friendly label for this category")
    .max(100, "Label is too long"),
  image: z.url("Invalid image URL").optional().nullable(),
  status: z.number().int().min(0).max(1).optional(),
});

// Here am allowing both single object or array of objects
export const categoryFlexibleSchema = z.union([
  categorySchema,
  z.array(categorySchema),
]);

export const idParamSchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "ID must be a positive number",
  }),
});

// the Types
export type CategoryInput = z.infer<typeof categorySchema>;
export type CategoryFlexibleInput = z.infer<
  typeof categoryFlexibleSchema
>;
