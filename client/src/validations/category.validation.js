import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(2, "Category name is required"),
  description: z.string().optional().or(z.literal("")),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(2, "Category name is required"),
  description: z.string().optional().or(z.literal("")),
  isActive: z.boolean(),
});