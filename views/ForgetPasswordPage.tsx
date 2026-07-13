"use client";

import { Mail, ArrowLeft } from "lucide-react";
import ForgetPassForm from "@/widgets/auth/ui/ForgetPassForm";
import Link from "next/link";

// ── Component ─────────────────────────────────────────────────────────────────

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen  text-foreground flex items-center justify-center px-4">
      {/* Subtle white background accents */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full  blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full  blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-border  p-8 shadow-lg">
          {/* Back link */}

          <Link
            href="/login"
            className="mb-8 flex items-center gap-1.5 text-sm text-grayBlack2 transition-colors hover:text-textPrimary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl  border border-border">
            <Mail className="h-5 w-5 text-textPrimary" />
          </div>

          {/* Heading */}
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-textPrimary">
            Forgot your password?
          </h1>

          <p className="mb-8 text-sm leading-relaxed text-textPrimary">
            Enter your email and we&apos;ll send you a one-time code to reset
            your password.
          </p>

          {/* Form */}
          <ForgetPassForm />
        </div>
      </div>
    </main>
  );
}
