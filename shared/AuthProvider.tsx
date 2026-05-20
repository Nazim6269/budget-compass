"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "./config/container";
import { tokenStore, isTokenExpired } from "@/shared/api/token-store";
import { usePathname } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  checkAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsLoading(true);
  }

  const checkAuth = async () => {
    try {
      const token = tokenStore.getAccessToken();
      if (token) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      if (pathname === "/login") {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      console.log("[AuthProvider] checkAuth: calling refreshToken API...");
      const refreshedToken = await authService.refreshToken();
      console.log(
        "[AuthProvider] checkAuth: refreshedToken response:",
        refreshedToken,
      );
      setIsAuthenticated(!!refreshedToken);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
