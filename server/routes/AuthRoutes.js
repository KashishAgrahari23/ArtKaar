import express from "express";
import { sendRegisterOtp } from "../controllers/AuthController.js";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/AuthController.js";
import {
  sendRegisterOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../validations/AuthValidation.js";
import validate from "../middleware/validate.js";
import verifyToken from "../middleware/verifyToken.js";
import { registerSchema, loginSchema } from "../validations/AuthValidation.js";

import {
  verifyRegisterOtp,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/me", verifyToken, getMe);

router.post("/logout", verifyToken, logout);

router.post(
  "/register/send-otp",
  validate(sendRegisterOtpSchema),
  sendRegisterOtp,
);

router.post(
  "/register/verify-otp",
  validate(verifyOtpSchema),
  verifyRegisterOtp,
);

router.post(
  "/forgot-password/send-otp",
  validate(forgotPasswordSchema),
  sendForgotPasswordOtp,
);

router.post(
  "/forgot-password/verify-otp",
  validate(verifyOtpSchema),
  verifyForgotPasswordOtp,
);

router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

export default router;
