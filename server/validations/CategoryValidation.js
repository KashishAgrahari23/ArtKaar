import { z } from "zod";

const categoryNameSchema = z
  .string()
  .trim()
  .min(2, "Category name must be at least 2 characters")
  .max(100, "Category name cannot exceed 100 characters");

const descriptionSchema = z
  .string()
  .trim()
  .max(500, "Description cannot exceed 500 characters")
  .optional()
  .or(z.literal(""));

export const createCategorySchema = z.object({
  name: categoryNameSchema,
  description: descriptionSchema,
});

export const updateCategorySchema = z.object({
  name: categoryNameSchema.optional(),
  description: descriptionSchema.optional(),
  isActive: z.boolean().optional(),
});