"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { LogoutIcon } from "@/shared";

interface LogoutButtonProps {
  isCollapsed: boolean;
  onLogout?: () => void | Promise<void>;
}

export function LogoutButton({ isCollapsed, onLogout }: LogoutButtonProps) {
  const handleLogout = async () => {
    await onLogout?.();
    console.log("Logging out…");
  };

  const button = (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Log out"
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
        "text-base font-medium transition-all duration-200 ease-out",
        "text-red-600 hover:bg-red-50",
        isCollapsed && "justify-center px-2"
      )}
    >
      <LogoutIcon className="shrink-0"/>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap",
          "transition-[opacity,max-width] duration-200 ease-out",
          isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
        )}
        aria-hidden={isCollapsed}
      >
        Log out
      </span>
    </button>
  );

  if (isCollapsed) {
    return (
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
  }

  return button;
}