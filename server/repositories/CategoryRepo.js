import Category from "../models/Category.js";

class CategoryRepository {
  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async findById(id) {
    return await Category.findById(id);
  }

  async findByName(name) {
    return await Category.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    });
  }

  async findBySlug(slug) {
    return await Category.findOne({ slug });
  }

  async findAll(filter = {}) {
    return await Category.find(filter).sort({
      createdAt: -1,
    });
  }

  async updateById(id, data) {
    return await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await Category.findByIdAndDelete(id);
  }
}

export default new CategoryRepository();