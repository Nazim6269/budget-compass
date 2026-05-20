"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResendCountdown } from "@/widgets/auth/model/useCountdown";
import OtpForm from "@/widgets/auth/ui/OtpForm";
import { useAuthResetStore } from "@/features/auth/model/store";
import Link from "next/link";

export default function OtpPage() {
  const router = useRouter();
  const { email } = useAuthResetStore();
  const { count, canResend, reset } = useResendCountdown(60);
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      // await resendOtpService({ email });
      toast.success("New OTP sent to your email.");
      reset();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Could not resend OTP.";
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

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
        <div className="rounded-2xl border border-border  p-8 shadow-lg">
          {/* Back link */}
          <Link
            href="/forget-password"
            className="mb-8 flex items-center gap-1.5 text-sm text-grayBlack2 transition-colors hover:text-textPrimary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to forget password
          </Link>

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border">
            <ShieldCheck className="h-5 w-5 text-textPrimary" />
          </div>

          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-textPrimary">
            Check your email
          </h1>
          <p className="mb-2 text-sm leading-relaxed text-textPrimary">
            We sent a 4-digit code to
          </p>
          <p className="mb-8 text-sm font-semibold text-textSecondary">{email || "your email"}</p>

          <OtpForm />

          {/* Resend */}
          <div className="mt-6 text-center text-sm text-grayBlack2">
            Didn&apos;t receive a code?{" "}
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={resending}
                className="font-semibold text-textPrimary hover:text-textSecondary transition-colors disabled:opacity-60 cursor-pointer"
              >
                {resending ? "Sending…" : "Resend OTP"}
              </button>
            ) : (
              <span className="text-grayBlack2">
                Resend in{" "}
                <span className="tabular-nums font-semibold text-textPrimary">{count}s</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
