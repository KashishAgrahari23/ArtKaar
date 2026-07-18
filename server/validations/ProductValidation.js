import { z } from "zod";

const imageSchema = z.object({
  url: z.string().min(1),
  publicId: z.string().min(1),
});

export const createProductSchema = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2)
      .max(150),

    description: z
      .string()
      .optional()
      .or(z.literal("")),

    category: z.string(),

    brand: z.string(),

    images: z
      .array(imageSchema)
      .min(1, "At least one image is required"),

    regularPrice: z.number().positive(),

    salePrice: z.number().min(0).nullable().optional(),

    sku: z.string().trim().min(1),

    quantity: z.number().int().nonnegative(),

    stockStatus: z
      .enum([
        "in_stock",
        "out_of_stock",
      ])
      .optional(),

    tags: z.array(z.string()).optional(),

    featured: z.boolean().optional(),

    status: z
      .enum([
        "draft",
        "published",
        "archived",
      ])
      .optional(),
  })
  .refine(
    (data) =>
      data.salePrice == null ||
      data.salePrice <= data.regularPrice,
    {
      message:
        "Sale price cannot be greater than regular price.",
      path: ["salePrice"],
    }
  );

export const updateProductSchema =
  createProductSchema
    .partial()
    .refine(
      (data) => {
        if (
          data.salePrice !== undefined &&
          data.regularPrice !== undefined
        ) {
          return (
            data.salePrice == null ||
            data.salePrice <=
              data.regularPrice
          );
        }

        return true;
      },
      {
        message:
          "Sale price cannot be greater than regular price.",
        path: ["salePrice"],
      }
    );