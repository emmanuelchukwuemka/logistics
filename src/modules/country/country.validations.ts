import { z } from "zod";

// Create schema
export const countrySchema = z.object({
  name: z.string().min(2).max(100),
  iso2: z.string().length(2, "ISO2 must be 2 letters"),
  iso3: z.string().length(3, "ISO3 must be 3 letters"),
  region_id: z.number().min(1, "Region ID is required"),
  currency_id: z.number().min(1, "Currency ID is required"),
  flag: z.url("Please enter a valid flag url").optional(),
  status: z.number().min(0).max(1).int().optional().default(1),
});

// For updates (partial fields allowed)
export const countryUpdateSchema = countrySchema.partial();

// Flexible (array or single)
// export const countryFlexibleSchema = z.union([
//   countrySchema,
//   z.array(countrySchema),
// ]);
// Flexible (array or single)
export const countryFlexibleSchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val;
  return [val];
}, z.array(countrySchema));

export const countryUpdateFlexibleSchema = z.union([
  countryUpdateSchema,
  z.array(countryUpdateSchema),
]);

export const idSchema = z.object({
  id: z.number().min(1, "ID must be a positive number"),
});

export type CountryInput = z.infer<typeof countrySchema>;
export type CountryFlexibleInput = z.infer<typeof countryFlexibleSchema>;
