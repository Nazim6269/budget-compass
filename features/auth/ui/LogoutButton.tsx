"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { LogoutIcon } from "@/shared";
import { useModal } from "@/shared/model/useModal";
import { LogoutConfirmModal } from "./LogoutConfirmModal";
import GenericButton from "@/shared/ui/GenericButton";

interface LogoutButtonProps {
  isCollapsed: boolean;
  onLogout?: () => void | Promise<void>;
}

export function LogoutButton({ isCollapsed, onLogout }: LogoutButtonProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleConfirmLogout = async () => {
    setLoading(true);
    try {
      await onLogout?.();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleLogoutClick = () => {
    if (typeof window !== "undefined" && (window as any).__showDashboardLogoutModal) {
      (window as any).__showDashboardLogoutModal();
    } else {
      openModal();
    }
  };

  const button = (
    <button
      type="button"
      onClick={handleLogoutClick}
      aria-label="Log out"
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
        "text-base font-medium transition-all duration-200 ease-out",
        "cursor-pointer text-red-600 hover:bg-red-50",
        isCollapsed && "justify-center px-2",
      )}
    >
      <LogoutIcon className="shrink-0" />

      <span
        className={cn(
          "overflow-hidden whitespace-nowrap",
          "transition-[opacity,max-width] duration-200 ease-out",
          isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100",
        )}
        aria-hidden={isCollapsed}
      >
        Log out
      </span>
    </button>
  );

  const renderTooltip = () => (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            sideOffset={12}
            className="z-50 rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-lg"
          >
            Log out
            <Tooltip.Arrow className="fill-slate-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  return (
    <>
      {isCollapsed ? renderTooltip() : button}
      <LogoutConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmLogout}
        loading={loading}
      />
    </>
  );
}
