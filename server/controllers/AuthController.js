import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/AuthService.js";
import OtpService from "../services/OtpService.js";
import { OTP_PURPOSE } from "../utils/constants.js";
import User from "../models/User.js";
export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.validatedData);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Registration successful",
      user
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.login(req.validatedData, res);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      user
    )
  );
});

export const getMe = asyncHandler(async(req,res)=>{

    const user=await authService.getMe(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "User fetched successfully",
            user
        )
    )

})

export const logout = asyncHandler(async(req,res)=>{

    res.clearCookie("token");

    return res.status(200).json(

        new ApiResponse(
            200,
            "Logout successful"
        )

    )

})

export const sendRegisterOtp = asyncHandler(async (req, res) => {
  await OtpService.sendOTP(
    req.validatedData.email,
    OTP_PURPOSE.REGISTER
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "OTP sent successfully."
    )
  );
});

export const verifyRegisterOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.validatedData;

  await OtpService.verifyOTP(
    email,
    otp,
    OTP_PURPOSE.REGISTER
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "OTP verified successfully."
    )
  );
});

export const sendForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email } = req.validatedData;

  await authService.sendForgotPasswordOtp(email);

  return res.status(200).json(
    new ApiResponse(
      200,
      "OTP sent successfully."
    )
  );
});

export const verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.validatedData;

  await OtpService.verifyOTP(
    email,
    otp,
    OTP_PURPOSE.FORGOT_PASSWORD
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "OTP verified successfully."
    )
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedData;

  await authService.resetPassword(
    email,
    password
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Password reset successfully."
    )
  );
});