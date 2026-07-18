import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepo.js";
import BrandRepository from "../repositories/BrandRepository.js";

import ApiError from "../utils/ApiError.js";
import slugify from "../utils/slugify.js";

class ProductService {
  async create(data) {
    const category = await CategoryRepository.findById(
      data.category
    );

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }

    const brand = await BrandRepository.findById(
      data.brand
    );

    if (!brand) {
      throw new ApiError(404, "Brand not found.");
    }

    if (
      data.salePrice != null &&
      data.salePrice > data.regularPrice
    ) {
      throw new ApiError(
        400,
        "Sale price cannot be greater than regular price."
      );
    }

    const slug = slugify(data.productName);

    const slugExists =
      await ProductRepository.findBySlug(slug);

    if (slugExists) {
      throw new ApiError(
        409,
        "Product already exists."
      );
    }

    const skuExists =
      await ProductRepository.findBySKU(data.sku);

    if (skuExists) {
      throw new ApiError(
        409,
        "SKU already exists."
      );
    }

    data.stockStatus =
      data.quantity > 0
        ? "in_stock"
        : "out_of_stock";

    return await ProductRepository.create({
      ...data,
      slug,
    });
  }

  async getAll(queryParams) {
    return await ProductRepository.getAll(
      queryParams
    );
  }

  async getById(id) {
    const product =
      await ProductRepository.findById(id);

    if (!product) {
      throw new ApiError(
        404,
        "Product not found."
      );
    }

    return product;
  }

  async update(id, data) {
    const product =
      await ProductRepository.findById(id);

    if (!product) {
      throw new ApiError(
        404,
        "Product not found."
      );
    }

    if (data.category) {
      const category =
        await CategoryRepository.findById(
          data.category
        );

      if (!category) {
        throw new ApiError(
          404,
          "Category not found."
        );
      }
    }

    if (data.brand) {
      const brand =
        await BrandRepository.findById(
          data.brand
        );

      if (!brand) {
        throw new ApiError(
          404,
          "Brand not found."
        );
      }
    }

    if (
      data.regularPrice !== undefined ||
      data.salePrice !== undefined
    ) {
      const regularPrice =
        data.regularPrice ??
        product.regularPrice;

      const salePrice =
        data.salePrice ??
        product.salePrice;

      if (
        salePrice != null &&
        salePrice > regularPrice
      ) {
        throw new ApiError(
          400,
          "Sale price cannot be greater than regular price."
        );
      }
    }

    if (
      data.productName &&
      data.productName !==
        product.productName
    ) {
      const slug = slugify(data.productName);

      const slugExists =
        await ProductRepository.findBySlug(slug);

      if (
        slugExists &&
        slugExists._id.toString() !== id
      ) {
        throw new ApiError(
          409,
          "Product already exists."
        );
      }

      data.slug = slug;
    }

    if (data.sku) {
      const sku =
        await ProductRepository.findBySKU(
          data.sku
        );

      if (
        sku &&
        sku._id.toString() !== id
      ) {
        throw new ApiError(
          409,
          "SKU already exists."
        );
      }
    }

    if (data.quantity !== undefined) {
      data.stockStatus =
        data.quantity > 0
          ? "in_stock"
          : "out_of_stock";
    }

    return await ProductRepository.updateById(
      id,
      data
    );
  }

  async delete(id) {
    const product =
      await ProductRepository.findById(id);

    if (!product) {
      throw new ApiError(
        404,
        "Product not found."
      );
    }

    return await ProductRepository.updateById(
      id,
      {
        isActive: false,
        deletedAt: new Date(),
      }
    );
  }

  async restore(id) {
    const product =
      await ProductRepository.findByIdIncludingDeleted(
        id
      );

    if (!product) {
      throw new ApiError(
        404,
        "Product not found."
      );
    }

    return await ProductRepository.updateById(
      id,
      {
        isActive: true,
        deletedAt: null,
      }
    );
  }
}

export default new ProductService();