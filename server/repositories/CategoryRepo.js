import Category from "../models/Category.js";

class CategoryRepository {
  async create(data) {
    return await Category.create(data);
  }

  async findById(id) {
    return await Category.findById(id).populate(
      "parentCategory",
      "name slug"
    );
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

  async getAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = options;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Category.find(filter)
        .populate("parentCategory", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),

      Category.countDocuments(filter),
    ]);

    return {
      categories,
      total,
    };
  }

  async updateById(id, data) {
    return await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("parentCategory", "name slug");
  }
}

export default new CategoryRepository();