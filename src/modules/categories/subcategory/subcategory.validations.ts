import { z } from "zod";

export const subcategorySchema = z.object({
  category_id: z.number().min(1, "Category is required"),
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  label: z
    .string()
    .min(2, "Enter a friendly label for this subcategory")
    .max(100, "Label is too long"),
  image: z.url("Invalid image URL").optional().nullable(),
  status: z.number().int().min(0).max(1).optional(),
});

// accept both single and array
export const subcategoryFlexibleSchema = z.union([
  subcategorySchema,
  z.array(subcategorySchema),
]);

// For update (partial allowed but must have at least 1 valid field)
export const subcategoryUpdateSchema = subcategorySchema
  .partial()
  .superRefine((data, ctx) => {
    const hasAtLeastOneField = Object.values(data).some(
      (val) => val !== undefined
    );

    if (!hasAtLeastOneField) {
      ctx.addIssue({
        code: "custom",
        message: "At least one field must be provided for update",
      });
    }
  });

export const idParamSchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "ID must be a positive number",
  }),
});

// Just adding Types
export type SubcategoryInput = z.infer<typeof subcategorySchema>;
export type SubcategoryFlexibleInput = z.infer<
  typeof subcategoryFlexibleSchema
>;
export type SubcategoryUpdateInput = z.infer<typeof subcategoryUpdateSchema>;
