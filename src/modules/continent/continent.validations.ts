import { z } from "zod";

export const continentSchema = z.object({
  name: z
    .string()
    .min(2, "Continent name is required")
    .max(100, "Continent name is too long"),
  status: z.number().min(0).max(1).int().optional().default(1),
});

// Flexible: single object or array of objects
export const continentFlexibleSchema = z.union([
  continentSchema,
  z.array(continentSchema),
]);

export const idSchema = z.object({
  id: z.number().min(1, "ID must be a positive number"),
});

export type ContinentInput = z.infer<typeof continentSchema>;
export type ContinentFlexibleInput = z.infer<typeof continentFlexibleSchema>;
