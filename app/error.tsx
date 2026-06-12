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
    <div className="min-h-screen flex items-center justify-center bg-primaryBg px-6">
      <div className="max-w-md w-full text-center  border border-si-border rounded-2xl p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <span className="text-3xl">⚠️</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-textPrimary">
          Something went wrong
        </h1>

        <p className="mt-3 text-textSecondary leading-relaxed">
          An unexpected error occurred while processing your request.
          Please try again. If the issue persists, contact support.
        </p>

        <button
          onClick={reset}
          className="
            mt-8
            inline-flex
            items-center
            justify-center
            rounded-xl
          cursor-pointer
            bg-textPrimary
            px-6
            py-3
            text-white
            font-medium
            transition-all
            hover:opacity-90
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
          "
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
