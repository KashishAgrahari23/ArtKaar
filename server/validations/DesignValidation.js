import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID.");

const titleSchema = z
  .string()
  .trim()
  .min(3, "Title must be at least 3 characters.")
  .max(150, "Title cannot exceed 150 characters.");

const shortDescriptionSchema = z
  .string()
  .trim()
  .max(
    250,
    "Short description cannot exceed 250 characters."
  )
  .optional()
  .or(z.literal(""));

const descriptionSchema = z
  .string()
  .trim()
  .max(
    5000,
    "Description cannot exceed 5000 characters."
  )
  .optional()
  .or(z.literal(""));

export const createDesignSchema = z.object({
  title: titleSchema,

  shortDescription: shortDescriptionSchema,

  description: descriptionSchema,

  category: objectIdSchema,

  price: z
    .coerce
    .number()
    .min(0, "Price cannot be negative.")
    .default(0),

  featured: z
    .coerce
    .boolean()
    .optional()
    .default(false),

  tags: z
    .union([
      z.array(z.string().trim()),

      z.string(),
    ])
    .optional()
    .transform((value) => {
      if (!value) return [];

      if (Array.isArray(value)) {
        return value
          .map((tag) => tag.trim())
          .filter(Boolean);
      }

      return value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }),
});

export const updateDesignSchema =
  createDesignSchema.partial();