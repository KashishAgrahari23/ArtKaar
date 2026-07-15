import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password cannot exceed 30 characters"),
});