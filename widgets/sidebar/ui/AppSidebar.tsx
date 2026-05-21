"use client";

import { Sidebar } from "./Sidebar";
import { NAV_CONFIG } from "../config/navigation";
import { LogoutButton } from "@/features/auth/ui/LogoutButton";
import { authService } from "@/shared/config/container";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/AuthProvider";
import { useLogout } from "@/features/auth/model/authHooks";

export function AppSidebar() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const { mutate: logout } = useLogout();

  return (
    <Sidebar
      navConfig={NAV_CONFIG}
      defaultCollapsed={false}
      footer={({ isCollapsed, isMobile }) => (
        <LogoutButton
          isCollapsed={isCollapsed && !isMobile}
          onLogout={logout}
        />
      )}
    />
  );
}
