"use client";

import { Sidebar } from "./Sidebar";
import { NAV_CONFIG } from "../config/navigation";
import { LogoutButton } from "@/features/auth/ui/LogoutButton";

export function AppSidebar() {
  return (
    <Sidebar
      navConfig={NAV_CONFIG}
      defaultCollapsed={false}
      footer={({ isCollapsed, isMobile }) => (
        <LogoutButton isCollapsed={isCollapsed && !isMobile} />
      )}
    />
  );
}
