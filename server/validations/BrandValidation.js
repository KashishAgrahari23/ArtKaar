import { z } from "zod";

const logoSchema = z.object({
  url: z.string().min(1, "Logo URL is required"),
  publicId: z.string().min(1, "Logo publicId is required"),
});

export const createBrandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(100, "Brand name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .trim()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),

  logo: logoSchema.optional(),

  isActive: z.boolean().optional(),
});

export const updateBrandSchema =
  createBrandSchema.partial();