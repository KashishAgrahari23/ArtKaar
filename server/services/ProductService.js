import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepo.js";
import BrandRepository from "../repositories/BrandRepository.js";

import ApiError from "../utils/ApiError.js";
import slugify from "../utils/slugify.js";

class ProductService {
  async create(data) {
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

    const brand = await BrandRepository.findById(
      data.brand
    );

    if (!brand) {
      throw new ApiError(
        404,
        "Brand not found."
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
      await ProductRepository.findBySKU(
        data.sku
      );

    if (skuExists) {
      throw new ApiError(
        409,
        "SKU already exists."
      );
    }

    if (data.quantity <= 0) {
      data.stockStatus = "out_of_stock";
    } else {
      data.stockStatus = "in_stock";
    }

    return await ProductRepository.create({
      ...data,
      slug,
    });
  }

  async getAll(queryParams) {

    const baseFilter = {
        deletedAt: null,
    };

    if (queryParams.search) {

        baseFilter.$or = [
            {
                productName: {
                    $regex: queryParams.search,
                    $options: "i",
                },
            },
            {
                sku: {
                    $regex: queryParams.search,
                    $options: "i",
                },
            },
        ];
    }

    const query = Product.find(baseFilter)
        .populate("category", "name")
        .populate("brand", "name");

    const features = new ApiFeatures(query, queryParams)
        .filter()
        .sort()
        .paginate();

    const products = await features.query;

    const total = await Product.countDocuments(baseFilter);

    return {
        products,
        total,
    };
}

  async getById(id) {
    const product =
      await ProductRepository.findById(id);

    if (!product || product.deletedAt) {
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

    if (!product || product.deletedAt) {
      throw new ApiError(
        404,
        "Product not found."
      );
    }

    if (
      data.productName &&
      data.productName !== product.productName
    ) {
      const slug = slugify(data.productName);

      const exists =
        await ProductRepository.findBySlug(slug);

      if (
        exists &&
        exists._id.toString() !== id
      ) {
        throw new ApiError(
          409,
          "Product already exists."
        );
      }

      data.slug = slug;
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