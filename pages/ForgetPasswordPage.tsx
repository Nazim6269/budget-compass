"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"; // swap for your toast lib if different
import { Mail, ArrowLeft } from "lucide-react";
import { useAuthResetStore } from "@/features/auth/model/store";
import ForgetPassForm from "@/widgets/auth/ui/ForgetPassForm";
import GenericButton from "@/shared/ui/GenericButton";
import Link from "next/link";

// ── Validation ────────────────────────────────────────────────────────────────

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ForgotPasswordPage() {
  const router = useRouter();
  const setEmail = useAuthResetStore((s) => s.setEmail);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

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
