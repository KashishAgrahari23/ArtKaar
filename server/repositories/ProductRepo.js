import Product from "../models/Product.js";
import ApiFeatures from "../utils/ApiFeatures.js";

class ProductRepository {
  async create(data) {
    return await Product.create(data);
  }

  async findById(id) {
    return await Product.findOne({
        _id: id,
        deletedAt: null,
    })
        .populate("category", "name")
        .populate("brand", "name");
  }

  async findBySlug(slug) {
    return await Product.findOne({ slug });
  }

  async findBySKU(sku) {
    return await Product.findOne({ sku });
  }

  async getAll(queryParams) {
    const features = new ApiFeatures(
      Product.find({
        deletedAt: null,
      })
        .populate("category", "name")
        .populate("brand", "name"),
      queryParams
    )
      .search(["productName", "sku"])
      .filter()
      .sort()
      .paginate();

    const products = await features.query;

    const total = await Product.countDocuments({
      deletedAt: null,
    });

    return {
      products,
      total,
    };
  }

  async updateById(id, data) {
    return await Product.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }
}

export default new ProductRepository();