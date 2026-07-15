import User from "../models/User.js";

class AuthRepository {
  async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }

  async updateById(userId, data) {
    return await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
  }

  async findByEmail(email) {
    return await User.findOne({
      email,
    }).select("+password");
  }
}

export default new AuthRepository();
