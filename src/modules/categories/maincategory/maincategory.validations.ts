import { z } from "zod";

export const maincategorySchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  label: z
    .string()
    .min(2, "Enter a friendly label for this maincategory")
    .max(100, "Label is too long"),
  image: z.url("Invalid image URL"),
  status: z.number().int().min(0).max(1).optional(),
});

// Allow either single object or array of objects
export const maincategoryFlexibleSchema = z.union([
  maincategorySchema,
  z.array(maincategorySchema),
]);

// Types
export type MaincategoryInput = z.infer<typeof maincategorySchema>;
export type MaincategoryFlexibleInput = z.infer<
  typeof maincategoryFlexibleSchema
>;
