"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../common/Button";

import useLogin from "@/hooks/useLogin";
import { loginSchema } from "@/validations/auth.validation";

export default function LoginForm() {
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="space-y-6"
    >
      <Input
        label="Email Address"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <div className="flex justify-end">

        <Link
          href="/login/forgot-password"
          className="text-sm font-medium text-[#0D3B82] hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full py-3"
      >
        Login
      </Button>
    </form>
  );
}