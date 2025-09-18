import { z } from "zod";

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .max(15, "Phone number is too long"),
  city_id: z.number(),
  password: z.string().min(2, "Password must be at least 2 characters"),
});

export type signupInput = z.infer<typeof signupSchema>;
