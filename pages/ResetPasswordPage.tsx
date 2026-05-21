"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useAuthResetStore } from "@/features/auth/model/store";
import { ResetPassForm } from "@/widgets/auth/ui/ResetPassForm";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { email, otp } = useAuthResetStore();

  // useEffect(() => {
  //   if (!email || !otp) {
  //     router.replace("/forget-password");
  //   }
  // }, [email, otp, router]);

  return (
    <main className="min-h-screen text-foreground flex items-center justify-center px-4">
      {/* Subtle white background accents */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-border p-8 shadow-lg">
          {/* Back link */}
          <Link
            href="/otp"
            className="mb-8 flex items-center gap-1.5 text-sm text-grayBlack2 transition-colors hover:text-textPrimary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to verification
          </Link>

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border">
            <KeyRound className="h-5 w-5 text-textPrimary" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-textPrimary">
            Set new password
          </h1>
          <p className="mb-6 text-sm text-textSecondary">
            Choose a strong password for your account
          </p>

          {/* Form */}
          <ResetPassForm />
        </div>
      </div>
    </main>
  );
}
