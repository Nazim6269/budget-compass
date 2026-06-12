"use client";

import { useId } from "react";
import { PanelLeftClose, PanelLeftOpen, Menu, X } from "lucide-react";
import { useSidebar, type UseSidebarOptions } from "../model/useSidebar";
import { cn } from "@/lib/utils";
import { NavGroup as NavConfig} from "../config/navigation";
import { NavGroup } from "./Navgroup";
import Image from "next/image";

export interface SidebarProps extends UseSidebarOptions {
  navConfig: NavConfig[];
  footer?: (args: {
    isCollapsed: boolean;
    isMobile: boolean;
  }) => React.ReactNode;
  brand?: (args: { isCollapsed: boolean }) => React.ReactNode;
  className?: string;
}

export function Sidebar({
  navConfig,
  footer,
  brand,
  className,
  ...sidebarOptions
}: SidebarProps) {
  const {
    isCollapsed,
    isMobileOpen,
    isMobile,
    toggleCollapsed,
    toggleMobile,
    closeMobile,
    sidebarRef,
  } = useSidebar(sidebarOptions);

  const navId = useId();
  const handleItemClick = isMobile ? closeMobile : undefined;
  const sidebarPanel = (
    <aside
      ref={sidebarRef as React.RefObject<HTMLElement>}
      id="sidebar"
      aria-label="Main navigation"
      className={cn(
       
        "flex h-screen sticky top-0 flex-col bg-white border-r border-lineBorder",

        // width behavior (unchanged)
        !isMobile && [
          "relative transition-[width] duration-300 ease-in-out",
          isCollapsed ? "w-[68px]" : "w-[240px]",
        ],

        isMobile && "w-[240px]",
        className,
      )}
    >
      {/* ── Brand ───────────────────────────────── */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-lineBorder px-5",
          isCollapsed && !isMobile ? "justify-center" : "gap-3",
        )}
      >
        {brand ? (
          brand({ isCollapsed: isCollapsed && !isMobile })
        ) : (
          <DefaultBrand isCollapsed={isCollapsed && !isMobile} />
        )}
      </div>

      {/* ── Navigation ─────────────────────────── */}
      <nav
        id={navId}
        aria-label="Sidebar navigation"
        className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3"
      >
        <ul role="list" className="space-y-1">
          {navConfig.map((group) => (
            <NavGroup
              key={group.id}
              group={group}
              isCollapsed={isCollapsed && !isMobile}
              onItemClick={handleItemClick}
            />
          ))}
        </ul>
      </nav>

      {/* ── Footer ─────────────────────────────── */}
      {footer && (
        <div className="shrink-0 border-t border-lineBorder p-4">
          {footer({
            isCollapsed: isCollapsed && !isMobile,
            isMobile,
          })}
        </div>
      )}

      {/* ── Collapse Toggle ───────────────────── */}
      {!isMobile && (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-expanded={!isCollapsed}
          aria-controls={navId}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "absolute -right-3 top-20 z-10",
            "flex h-6 w-6 items-center justify-center rounded-full",
            "border border-lineBorder bg-white text-[#7E7872]",
            "shadow-sm transition-all duration-200",
            "hover:bg-[#4a3a2f]/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a3a2f]",
          )}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={13} />
          ) : (
            <PanelLeftClose size={13} />
          )}
        </button>
      )}
    </aside>
  );

  // ── Mobile Mode ─────────────────────────────
  if (isMobile) {
    return (
      <>
        <MobileTrigger isOpen={isMobileOpen} onClick={toggleMobile} />

        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={closeMobile}
          className={cn(
            "fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]",
            "transition-opacity duration-300",
            isMobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        />

        {/* Drawer */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50",
            "transition-transform duration-300 ease-in-out",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {sidebarPanel}
        </div>
      </>
    );
  }

  return sidebarPanel;
}

// ─── Default Brand ─────────────────────────────

function DefaultBrand({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      {isCollapsed ? (
        <span className="text-xl font-bold text-si-text">SB</span>
      ) : (
        <Image
          src="/site_logo.png"
          alt="Logo"
          width={150}
          height={48}
          loading="eager"
          style={{ width: "auto", height: 48 }}
        />
      )}
    </div>
  );
}

// ─── Mobile Trigger ───────────────────────────

export function MobileTrigger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      aria-controls="sidebar"
      className={cn(
        "fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg",
        "border border-lineBorder bg-white text-[#7E7872] shadow-md",
        "transition-colors duration-150 hover:bg-[#4a3a2f]/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a3a2f]",
        "md:hidden",
      )}
    >
      {isOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
}
