import CategoryRepository from "../repositories/CategoryRepo.js";
import ApiError from "../utils/ApiError.js";
import slugify from "../utils/slugify.js";

class CategoryService {
  async create(categoryData) {
    const { name, description } = categoryData;

    const existingCategory =
      await CategoryRepository.findByName(name);

    if (existingCategory) {
      throw new ApiError(
        409,
        "Category already exists."
      );
    }

    const slug = slugify(name);

    return await CategoryRepository.create({
      name,
      slug,
      description,
    });
  }

  async getAll() {
    return await CategoryRepository.findAll();
  }

  async getById(id) {
    const category =
      await CategoryRepository.findById(id);

    if (!category) {
      throw new ApiError(
        404,
        "Category not found."
      );
    }

    return category;
  }

  async update(id, updateData) {
    const category =
      await CategoryRepository.findById(id);

    if (!category) {
      throw new ApiError(
        404,
        "Category not found."
      );
    }

    if (
      updateData.name &&
      updateData.name !== category.name
    ) {
      const existingCategory =
        await CategoryRepository.findByName(
          updateData.name
        );

      if (existingCategory) {
        throw new ApiError(
          409,
          "Category already exists."
        );
      }

      updateData.slug = slugify(updateData.name);
    }

    return await CategoryRepository.updateById(
      id,
      updateData
    );
  }

  async delete(id) {
    const category =
      await CategoryRepository.findById(id);

    if (!category) {
      throw new ApiError(
        404,
        "Category not found."
      );
    }

    await CategoryRepository.deleteById(id);

    return true;
  }
}

export default new CategoryService();