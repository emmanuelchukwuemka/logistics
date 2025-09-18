import { z } from "zod";
import { singleOrArray } from "./state.helpers";

export const stateSchema = z.object({
  name: z.string().min(2, "State name is too short"),
  code: z.string().min(1, "State code is required"),
  country_id: z.number().int("Country ID must be a number"),
  status: z.number().min(0).max(1).int().optional().default(1),
});

export const stateFlexibleSchema = stateSchema.partial();
export const stateBulkOrSingleSchema = singleOrArray(stateSchema);

export const idSchema = z.object({
  id: z.number().int().min(1, "ID must be a positive number"),
});

export type StateInput = z.infer<typeof stateSchema>;
export type StateUpdateInput = z.infer<typeof stateFlexibleSchema>;
