import { z } from "zod";

export const regionSchema = z.object({
  continent_id: z.number().int().min(1, "Continent ID is required"),
  name: z
    .string()
    .min(5, "Enter a valid region name")
    .max(100, "Region name is too long"),
  status: z.number().min(0).max(1).int().optional().default(1),
});

// Flexible: single object or array of objects
export const regionFlexibleSchema = z.union([
  regionSchema,
  z.array(regionSchema),
]);

export const idSchema = z.object({
  id: z.number().min(1, "ID must be a positive number"),
});

export type RegionInput = z.infer<typeof regionSchema>;
export type RegionFlexibleInput = z.infer<typeof regionFlexibleSchema>;
