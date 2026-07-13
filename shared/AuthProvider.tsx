"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
// import { authService } from "./config/container";
// import { tokenStore } from "@/shared/api/token-store";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isBootstrapped: boolean;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  isBootstrapped: false,
  checkAuth: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      // ── ORIGINAL ──────────────────────────────────────────────────────
      // 1. check memory token first
      // const token = tokenStore.getAccessToken();
      //
      // if (token) {
      //   setIsAuthenticated(true);
      //   return;
      // }
      //
      // 2. silent refresh
      // const refreshedToken = await authService.refreshToken();
      //
      // if (refreshedToken) {
      //   tokenStore.setAccessToken(refreshedToken);
      //   setIsAuthenticated(true);
      // } else {
      //   setIsAuthenticated(false);
      // }
      // ── END ORIGINAL ──────────────────────────────────────────────────

      // ── DUMMY: always authenticate ────────────────────────────────────
      await new Promise((r) => setTimeout(r, 200));
      setIsAuthenticated(true);
      // ── END DUMMY ─────────────────────────────────────────────────────
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
      setIsBootstrapped(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isBootstrapped,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)
