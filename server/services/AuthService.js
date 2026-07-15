import ApiError from "../utils/ApiError.js";
import authRepository from "../repositories/AuthRepo.js";
import generateToken from "../utils/generateToken.js";
import OtpService from "./OtpService.js";
import { OTP_PURPOSE } from "../utils/constants.js";
import bcrypt from "bcrypt";

class AuthService {
  async register(registerData) {
  const { name, email, password } = registerData;

  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const verified = await OtpService.isVerified(
    email,
    OTP_PURPOSE.REGISTER
  );

  if (!verified) {
    throw new ApiError(
      401,
      "Please verify OTP first."
    );
  }

  const user = await authRepository.create({
    name,
    email,
    password,
    role: "customer",
  });

  await OtpService.clearOTP(
    email,
    OTP_PURPOSE.REGISTER
  );

  user.password = undefined;

  return user;
}

  async login(loginData, res) {
    const { email, password } = loginData;

    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    generateToken(res, user._id);

    user.password = undefined;

    return user;
  }

  async getMe(userId) {
    return await authRepository.findById(userId);
  }
  async sendForgotPasswordOtp(email) {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  await OtpService.sendOTP(
    email,
    OTP_PURPOSE.FORGOT_PASSWORD
  );

  return true;
}

async resetPassword(email, password) {
  const verified = await OtpService.isVerified(
    email,
    OTP_PURPOSE.FORGOT_PASSWORD
  );

  if (!verified) {
    throw new ApiError(
      401,
      "Please verify OTP first."
    );
  }

  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(
      404,
      "User not found."
    );
  }

  const isSamePassword = await bcrypt.compare(
    password,
    user.password
  );

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password cannot be same as old password."
    );
  }

  user.password = password;

  await user.save();

  await OtpService.clearOTP(
    email,
    OTP_PURPOSE.FORGOT_PASSWORD
  );

  return true;
}
}

export default new AuthService();