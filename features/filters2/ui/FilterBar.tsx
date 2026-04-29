"use client";

import React, { type ReactNode } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useFilterContext } from "../model/FilterContext";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
  showCount?: boolean;
  resetLabel?: string;
}

export function FilterBar({ children, className = "", showCount = true, resetLabel = "Reset filters" }: FilterBarProps) {
  const { activeCount, isDefaultState, resetAllFilters } = useFilterContext();

  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 w-full sm:w-auto  ${className}`}
      role="search"
      aria-label="Table filters"
    >

      <div className="flex flex-col sm:flex-row gap-2">{children}</div>

      {!isDefaultState && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="mx-auto flex shrink-0 items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-slate-600 dark:text-slate-400 dark:hover:border-red-700 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          aria-label={resetLabel}
        >
          <RotateCcw className="h-3 w-3" />
          {resetLabel}
        </button>
      )}
    </div>
  );
}

export function ActiveFilterTags({ className = "" }: { className?: string }) {
  const { activeFilters, configs, resetFilter, isDefaultState } = useFilterContext();
  if (isDefaultState) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Active filters">
      <span className="text-xs text-slate-400">Active:</span>
      {Object.entries(activeFilters).map(([key, value]) => {
        const config = configs.find((c) => c.key === key);
        const displayValue = Array.isArray(value)
          ? value.join(", ")
          : typeof value === "object"
          ? JSON.stringify(value)
          : String(value);

        return (
          <button
            key={key}
            type="button"
            onClick={() => resetFilter(key)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            aria-label={`Remove filter: ${config?.label ?? key}`}
          >
            <span className="font-medium">{config?.label ?? key}:</span>
            <span className="max-w-[120px] truncate">{displayValue}</span>
            <span aria-hidden className="text-slate-400">×</span>
          </button>
        );
      })}
    </div>
  );
}