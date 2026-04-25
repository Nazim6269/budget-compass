"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItem as NavItemConfig } from "../config/navigation";
import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Portal as TooltipPortal,
  Content as TooltipContent,
  Arrow as TooltipArrow,
} from "@radix-ui/react-tooltip";
import { useActiveNav } from "@/shared";

interface NavItemProps {
  item: NavItemConfig;
  isCollapsed: boolean;
  onClick?: () => void;
}

export function NavItem({ item, isCollapsed, onClick }: NavItemProps) {
  const { isActive: ActiveNav } = useActiveNav();
  const Icon = item.icon;

  const linkContent = (
    <Link
      href={item.href}
      onClick={onClick}
      aria-label={isCollapsed ? item.label : undefined}
      aria-current={ActiveNav(item.href, true) ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-normal",
        "outline-none ring-offset-2 ring-offset-slate-900",
        "transition-all duration-200 ease-out",
        "focus-visible:ring-2 focus-visible:ring-indigo-400",
        "text-grayBlack hover:bg-gray-100",
        ActiveNav(item.href, true) && "bg-si-text text-white hover:bg-si-text",
        isCollapsed && "justify-center px-2 gap-0",
      )}
    >
      {ActiveNav(item.href, true) && isCollapsed && (
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white" />
      )}

      <Icon
        size={20}
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-colors duration-200",
          ActiveNav(item.href, true) ? "text-white" : "text-grayBlack",
        )}
      />

      <span
        className={cn(
          "flex flex-1 items-center gap-2 overflow-hidden",
          "transition-[opacity,max-width] duration-200 ease-out",
          isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100",
        )}
        aria-hidden={isCollapsed}
      >
        <span className="truncate">{item.label}</span>
        {item.badge?.()}
      </span>
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <TooltipRoot>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side="right"
              sideOffset={12}
              className={cn(
                "z-50 rounded-md bg-slate-700 px-3 py-1.5",
                "text-xs font-medium text-slate-100 shadow-lg",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
              )}
            >
              {item.label}
              <TooltipArrow className="fill-slate-700" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    );
  }

  return linkContent;
}
