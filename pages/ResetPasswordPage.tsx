"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

import { useAuthResetStore } from "@/features/auth/model/store";
import { ResetPassForm } from "@/widgets/auth/ui/ResetPassForm";
import { PasswordStrength } from "@/widgets/auth/ui/PasswordStrength";

const schema = z
  .object({
    new_password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
    confirm_password: z.string().min(1),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { email, otp, clear } = useAuthResetStore();

  //   useEffect(() => {
  //     if (!email || !otp) router.replace("/forget-password");
  //   }, [email, otp, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch("new_password") ?? "";

  const onSubmit = async (data: FormValues) => {
    try {
      //   await resetPasswordService({
      //     email,
      //     otp,
      //     new_password: data.new_password,
      //   });

      toast.success("Password reset successfully");
      clear();
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {/* background glow */}

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-border  p-8 shadow-lg">
          {/* header */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-500/20">
            <KeyRound className="h-5 w-5 text-violet-400" />
          </div>

          <h1 className="text-2xl font-semibold text-textPrimary">
            Set new password
          </h1>
          <p className="mb-6 text-sm text-textSecondary">
            Choose a strong password for your account
          </p>

          {/* modular form */}
          <ResetPassForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            passwordValue={passwordValue}
            onSubmit={handleSubmit(onSubmit)}
          />

          {/* strength separated but reusable */}
          <div className="mt-4">
            <PasswordStrength password={passwordValue} />
          </div>
        </div>
      </div>
    </main>
  );
}
