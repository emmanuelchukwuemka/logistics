import { z } from "zod";

// Am creating validation schema for Forex here
export const forexSchema = z.object({
  // Example
  //name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});

// Inferred TypeScript type from schema
export type ForexInput = z.infer<typeof forexSchema>;
