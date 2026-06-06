"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isBootstrapped } = useAuth();

  useEffect(() => {
    if (isBootstrapped && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isBootstrapped, isAuthenticated, router]);

  if (!isBootstrapped || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // prevent UI flash
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
