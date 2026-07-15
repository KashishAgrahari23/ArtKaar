import api from "@/lib/axios";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");

  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");

  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post(
    "/auth/forgot-password/send-otp",
    {
      email,
    }
  );

  return res.data;
};

export const verifyForgotOtp = async (
  email,
  otp
) => {
  const res = await api.post(
    "/auth/forgot-password/verify-otp",
    {
      email,
      otp,
    }
  );

  return res.data;
};

export const resetPassword = async (
  email,
  password
) => {
  const res = await api.post(
    "/auth/reset-password",
    {
      email,
      password,
    }
  );

  return res.data;
};