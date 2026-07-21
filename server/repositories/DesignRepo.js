import Design from "../models/Design.js";

class DesignRepository {
  async create(data) {
    return await Design.create(data);
  }

  async findById(id) {
    return await Design.findById(id)
      .populate("category", "name slug")
      .lean();
  }

  async findBySlug(slug) {
    return await Design.findOne({ slug }).lean();
  }

  async findByTitle(title) {
    return await Design.findOne({
      title: {
        $regex: new RegExp(`^${title}$`, "i"),
      },
    }).lean();
  }

  async getAll(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = options;

    const skip = (page - 1) * limit;

    const [designs, total] = await Promise.all([
      Design.find(filters)
        .populate("category", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),

      Design.countDocuments(filters),
    ]);

    return {
      designs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateById(id, data) {
    return await Design.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category", "name slug")
      .lean();
  }

  async softDelete(id) {
    return await Design.findByIdAndUpdate(
      id,
      {
        isActive: false,
        deletedAt: new Date(),
      },
      { new: true }
    );
  }

  async restore(id) {
    return await Design.findByIdAndUpdate(
      id,
      {
        isActive: true,
        deletedAt: null,
      },
      { new: true }
    );
  }
}

export default new DesignRepository();