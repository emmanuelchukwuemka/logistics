import { z } from "zod";

export const currencySchema = z.object({
  code: z.string().length(3, "Currency code must be 3 characters"),
  name: z.string().min(2, "Currency name is too short"),
  symbol: z.string().min(1, "Currency symbol is required"),
  decimal_places: z.number().int().optional().default(2),
  status: z.number().min(0).max(1).int().default(1),
});

// For updates (partial, allows missing fields)
export const currencyFlexibleSchema = z.union([
  currencySchema,
  z.array(currencySchema),
]);

export const currencyUpdateSchema = currencySchema.partial();

export const idSchema = z.object({
  id: z.number().min(1, "ID must be a positive number"),
});

export type CurrencyInput = z.infer<typeof currencySchema>;
export type CurrencyUpdateInput = z.infer<typeof currencyUpdateSchema>;
export type CurrencyFlexibleInput = z.infer<typeof currencyFlexibleSchema>;
