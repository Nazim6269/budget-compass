

"use client";

import { NavItem } from "./NavItem";
import type { NavGroup as NavGroupConfig } from "../config/navigation";
import { cn } from "@/lib/utils";

interface NavGroupProps {
  group: NavGroupConfig;
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export function NavGroup({ group, isCollapsed, onItemClick }: NavGroupProps) {
  return (
    <li role="none">
      {group.label && (
        <div
          className={cn(
            "mb-1 mt-4 flex items-center gap-2 px-3",
            "transition-[opacity,padding] duration-200 ease-out",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}
          aria-hidden={isCollapsed}
        >
          <span className="h-px flex-1 bg-slate-700/60" />
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            {group.label}
          </span>
          <span className="h-px flex-1 bg-slate-700/60" />
        </div>
      )}

      <ul role="none" className="space-y-0.5">
        {group.items.map((item) => (
          <li key={item.id} role="none">
            <NavItem item={item} isCollapsed={isCollapsed} onClick={onItemClick} />
          </li>
        ))}
      </ul>
    </li>
  );
}