"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-si-error">Something went wrong</h1>

        <p className="mt-4 text-textSecondary">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 px-6 py-3 rounded-xl bg-textPrimary text-background hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}