import { z } from "zod";

// Am creating validation schema for Auth here
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),

  password: z.string().min(2, "password is required"),
});

// Inferred TypeScript type from schema
export type AuthInput = z.infer<typeof loginSchema>;
