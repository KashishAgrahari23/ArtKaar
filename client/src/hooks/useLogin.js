"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import * as authService from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

export default function useLogin() {
  const router = useRouter();

  const { fetchUser } = useAuth();

  const login = async (data) => {
    try {
      const res = await authService.login(data);

      await fetchUser();

      if (res.data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/shop");
      }

      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return {
    login,
  };
}