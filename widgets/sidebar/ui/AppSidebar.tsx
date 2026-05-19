"use client";

import { Sidebar } from "./Sidebar";
import { NAV_CONFIG } from "../config/navigation";
import { LogoutButton } from "@/features/auth/ui/LogoutButton";
import { authService } from "@/shared/config/container";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();
  const handleLogout = async () => {
    await authService.logout();
    router.replace("/login");
  };
  return (
    <Sidebar
      navConfig={NAV_CONFIG}
      defaultCollapsed={false}
      footer={({ isCollapsed, isMobile }) => (
        <LogoutButton
          isCollapsed={isCollapsed && !isMobile}
          onLogout={handleLogout}
        />
      )}
    />
  );
}
