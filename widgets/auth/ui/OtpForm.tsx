"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OtpInput } from "@/widgets/auth/ui/OtpInput";
import { useAuthResetStore } from "@/features/auth/model/store";
import z from "zod";
import GenericButton from "@/shared/ui/GenericButton";
import { useVerifyEmail } from "@/features/auth/model/authHooks";

const schema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

type FormValues = z.infer<typeof schema>;

const OtpForm = () => {
  const router = useRouter();
  const { email, setOtp } = useAuthResetStore();
  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();

  // Guard: if no email in store, send back
  useEffect(() => {
    if (!email) {
      router.push("/forget-password");
    }
  }, [email, router]);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  const onSubmit = async ({ otp }: FormValues) => {
    try {
      await verifyEmail({ email, token: otp });
      setOtp(otp);
      toast.success("OTP verified!");
      router.push("/reset-password");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Invalid or expired OTP.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* OTP boxes */}
      <div className="space-y-2">
        <OtpInput
          value={otpValue}
          onChange={(val) => setValue("otp", val, { shouldValidate: true })}
          hasError={!!errors.otp}
          length={6}
        />

        {errors.otp && (
          <p className="text-center text-xs text-red-500">
            {errors.otp.message}
          </p>
        )}
      </div>

      {/* Verify button */}
      <GenericButton
        onClick={handleSubmit(onSubmit)}
        type="submit"
        title={isSubmitting ? "Verifying…" : "Verify code"}
        size="mlarge"
        className="w-full flex items-center justify-center gap-2"
        disabled={isSubmitting || isPending || otpValue.length < 6}
        icon={
          isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : undefined
        }
      />
    </form>
  );
};

export default OtpForm;
