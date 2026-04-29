"use client";

import React from "react";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useFilterContext } from "../model/FilterContext";
import type { DateRangeFilterConfig } from "../types";
import { CalendarIcon } from "lucide-react";

interface GenericDateRangeFilterProps {
  filterKey: string;
  className?: string;
}

export function GenericDateRangeFilter({ filterKey, className = "" }: GenericDateRangeFilterProps) {
  const { filters, setFilter, resetFilter, configs } = useFilterContext();
  const config = configs.find((c) => c.key === filterKey) as DateRangeFilterConfig | undefined;
  const currentValue = (filters[filterKey] as { from?: string | null; to?: string | null }) ?? {};

  const handleFromChange = (value: string) => {
    const newRange = { 
      from: value || null, 
      to: currentValue.to || null 
    };
    setFilter(filterKey, (newRange.from || newRange.to) ? newRange : null);
  };

  const handleToChange = (value: string) => {
    const newRange = { 
      from: currentValue.from || null, 
      to: value || null 
    };
    setFilter(filterKey, (newRange.from || newRange.to) ? newRange : null);
  };

  const handleClear = () => {
    resetFilter(filterKey);
  };

  const hasValue = currentValue.from || currentValue.to;

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-center gap-2">
      <div className="flex w-full justify-between items-center gap-2">
          <GenericInput
          type="date"
          value={currentValue.from || ""}
          onChange={(e) => handleFromChange(e.target.value)}
          placeholder={config?.placeholder?.from || "From"}
          size="sm"
          max={config?.maxDate}
          suffix={<CalendarIcon />}
        />
        <GenericInput
          type="date"
          value={currentValue.to || ""}
          onChange={(e) => handleToChange(e.target.value)}
          placeholder={config?.placeholder?.to || "To"}
          size="sm"
          max={config?.maxDate}
          suffix={<CalendarIcon />}
        />
      </div>
        {hasValue && (
          <button
            onClick={handleClear}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 rounded hover:border-gray-400"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
