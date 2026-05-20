"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { tokenStore, isTokenExpired } from "@/shared/api/token-store";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();


  // Check tokenStore directly to bypass React state transition lag
  const hasValidToken = typeof window !== "undefined" && (() => {
    const token = tokenStore.getAccessToken();
    return token && !isTokenExpired(token);
  })();

  const isUserAuthenticated = isAuthenticated || !!hasValidToken;

  useEffect(() => {
    if (!isLoading && !isUserAuthenticated) {
      router.replace("/login");
    }
  }, [isUserAuthenticated, isLoading, router, hasValidToken]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
