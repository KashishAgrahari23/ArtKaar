export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const OTP_PURPOSE = {
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
};