"use client";
import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthResetStore } from "@/features/auth/model/store";
import { z } from "zod";

const ForgetPassForm = () => {
  const router = useRouter();
  const { setEmail } = useAuthResetStore();

  const forgetPasswordSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
  });

  type FormValues = z.infer<typeof forgetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  // const { mutateAsync: forgetPassword, isPending } = useForgetPassword();

  const onSubmit = async ({ email }: FormValues) => {
    try {
      setEmail(email);
      toast.success("OTP sent! Check your inbox.");
      router.push("/otp");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      toast.error(message);
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

      {/* Submit */}
      <GenericButton
        title={isSubmitting ? "Sending..." : "Send reset code"}
        size="mlarge"
        className="w-full"
        disabled={isSubmitting}
        onClick={() => handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default ForgetPassForm;
