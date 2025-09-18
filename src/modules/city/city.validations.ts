import { z } from "zod";
import { singleOrArray } from "./city.helpers";

export const citySchema = z.object({
  name: z.string().min(2, "City name is too short"),
  state_id: z.number().int("State ID must be a number"),
  status: z.number().min(0).max(1).int().optional().default(1),
});

// Partial for updates
export const cityFlexibleSchema = citySchema.partial();
export const cityBulkOrSingleSchema = singleOrArray(citySchema);

export const idSchema = z.object({
  id: z.number().min(1, "ID must be a positive number"),
});

export type CityInput = z.infer<typeof citySchema>;
export type CityUpdateInput = z.infer<typeof cityFlexibleSchema>;
