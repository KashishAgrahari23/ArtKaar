import Brand from "../models/Brand.js";
import ApiFeatures from "../utils/ApiFeatures.js";

class BrandRepository {
  async create(data) {
    return await Brand.create(data);
  }

  async findById(id) {
    return await Brand.findById(id);
  }

  async findByName(name) {
    return await Brand.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    });
  }

  async findBySlug(slug) {
    return await Brand.findOne({ slug });
  }

  async getAll(queryParams = {}) {
    const features = new ApiFeatures(
      Brand.find({
        deletedAt: null,
      }),
      queryParams
    )
      .search(["name"])
      .filter()
      .sort()
      .paginate();

    const brands = await features.query;

    const total = await Brand.countDocuments({
      deletedAt: null,
    });

    return {
      brands,
      total,
    };
  }

  async updateById(id, data) {
    return await Brand.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

export default new BrandRepository();