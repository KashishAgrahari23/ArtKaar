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

  async findByIdIncludingDeleted(id) {
    return await Product.findById(id)
      .populate("category", "name")
      .populate("brand", "name");
  }

  async findBySlug(slug) {
    return await Product.findOne({ slug });
  }

  async findBySKU(sku) {
    return await Product.findOne({ sku });
  }

  async getAll(queryParams = {}) {
    const filter = {
      deletedAt: null,
    };

    if (queryParams.search) {
      filter.$or = [
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

    const features = new ApiFeatures(
      Product.find(filter)
        .populate("category", "name")
        .populate("brand", "name"),
      queryParams
    )
      .filter()
      .sort()
      .paginate();

    const products = await features.query;

    const total = await Product.countDocuments(filter);

    return {
      products,
      total,
    };
  }

  async updateById(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

export default new ProductRepository();