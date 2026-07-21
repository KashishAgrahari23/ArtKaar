import CategoryRepository from "../repositories/CategoryRepo.js";
import ApiError from "../utils/ApiError.js";
import slugify from "../utils/slugify.js";

class CategoryService {
  async create(categoryData) {
    const {
      name,
      description,
      parentCategory = null,
      sortOrder = 0,
    } = categoryData;

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
      parentCategory,
      sortOrder,
    });
  }

  async getAll(query = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      isActive,
      sort = "-createdAt",
    } = query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const result =
      await CategoryRepository.getAll(filter, {
        page: Number(page),
        limit: Number(limit),
        sort,
      });

    return {
      ...result,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(
        result.total / Number(limit)
      ),
    };
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

    // Prevent self-parenting
    if (
      updateData.parentCategory &&
      updateData.parentCategory === id
    ) {
      throw new ApiError(
        400,
        "A category cannot be its own parent."
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

      if (
        existingCategory &&
        existingCategory._id.toString() !== id
      ) {
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

    return await CategoryRepository.updateById(
      id,
      {
        isActive: false,
        deletedAt: new Date(),
      }
    );
  }

  async restore(id) {
    const category =
      await CategoryRepository.findById(id);

    if (!category) {
      throw new ApiError(
        404,
        "Category not found."
      );
    }

    return await CategoryRepository.updateById(
      id,
      {
        isActive: true,
        deletedAt: null,
      }
    );
  }
}

export default new CategoryService();