"use client";
import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginFormValues, loginSchema } from "../model/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth/model/useLogin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <GenericInput
          type="email"
          placeholder="Enter your email"
          label="Email"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <GenericInput
          type="password"
          placeholder="Enter your password"
          label="Password"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Button */}
      <GenericButton
        title={isPending ? "Logging in..." : "Login"}
        size="mlarge"
        className="w-full"
        disabled={isPending}
        onClick={() => {}}
      />
    </form>
  );
};

export default LoginForm;
