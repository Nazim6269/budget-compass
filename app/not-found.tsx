"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-headingColor">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-textPrimary">
          Page Not Found
        </h2>

        <p className="mt-3 text-textSecondary">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block px-6 py-3 rounded-xl bg-textPrimary text-background hover:opacity-90 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}