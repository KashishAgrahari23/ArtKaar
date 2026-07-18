import BrandRepository from "../repositories/BrandRepo.js";
import ApiError from "../utils/ApiError.js";
import slugify from "../utils/slugify.js";

class BrandService {
  async create(data) {
    const existingBrand = await BrandRepository.findByName(
      data.name
    );

    if (existingBrand) {
      throw new ApiError(409, "Brand already exists.");
    }

    const slug = slugify(data.name);

    const slugExists = await BrandRepository.findBySlug(slug);

    if (slugExists) {
      throw new ApiError(409, "Brand slug already exists.");
    }

    return await BrandRepository.create({
      ...data,
      slug,
    });
  }

  async getAll(query) {
    return await BrandRepository.getAll(query);
  }

  async getById(id) {
    const brand = await BrandRepository.findById(id);

    if (!brand || brand.deletedAt) {
      throw new ApiError(404, "Brand not found.");
    }

    return brand;
  }

  async update(id, data) {
    const brand = await BrandRepository.findById(id);

    if (!brand || brand.deletedAt) {
      throw new ApiError(404, "Brand not found.");
    }

    if (data.name && data.name !== brand.name) {
      const existing = await BrandRepository.findByName(
        data.name
      );

      if (existing) {
        throw new ApiError(409, "Brand already exists.");
      }

      const slug = slugify(data.name);

      const slugExists = await BrandRepository.findBySlug(slug);

      if (
        slugExists &&
        slugExists._id.toString() !== id
      ) {
        throw new ApiError(
          409,
          "Brand slug already exists."
        );
      }

      data.slug = slug;
    }

    return await BrandRepository.updateById(id, data);
  }

  async delete(id) {
    const brand = await BrandRepository.findById(id);

    if (!brand || brand.deletedAt) {
      throw new ApiError(404, "Brand not found.");
    }

    return await BrandRepository.updateById(id, {
      isActive: false,
      deletedAt: new Date(),
    });
  }

  async restore(id) {
    const brand = await BrandRepository.findById(id);

    if (!brand) {
      throw new ApiError(404, "Brand not found.");
    }

    return await BrandRepository.updateById(id, {
      isActive: true,
      deletedAt: null,
    });
  }
}

export default new BrandService();