"use client";

import React from "react";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useFilterContext } from "../model/FilterContext";
import type { NumberRangeFilterConfig } from "../types";

interface GenericNumberRangeFilterProps {
  filterKey: string;
  className?: string;
}

export function GenericNumberRangeFilter({ filterKey, className = "" }: GenericNumberRangeFilterProps) {
  const { filters, setFilter, resetFilter, configs } = useFilterContext();
  const config = configs.find((c) => c.key === filterKey) as NumberRangeFilterConfig | undefined;
  const currentValue = (filters[filterKey] as { min?: number | null; max?: number | null }) ?? {};

  const handleMinChange = (value: string) => {
    const numValue = value ? parseFloat(value) : null;
    const newRange = { 
      min: numValue, 
      max: currentValue.max || null 
    };
    setFilter(filterKey, (newRange.min !== null || newRange.max !== null) ? newRange : null);
  };

  const handleMaxChange = (value: string) => {
    const numValue = value ? parseFloat(value) : null;
    const newRange = { 
      min: currentValue.min || null, 
      max: numValue 
    };
    setFilter(filterKey, (newRange.min !== null || newRange.max !== null) ? newRange : null);
  };

  const handleClear = () => {
    resetFilter(filterKey);
  };

  const hasValue = currentValue.min !== null || currentValue.max !== null;

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 flex-1">
          {config?.unit && <span className="text-sm text-gray-500">{config.unit}</span>}
          <GenericInput
            type="number"
            value={currentValue.min !== null ? String(currentValue.min) : ""}
            onChange={(e) => handleMinChange(e.target.value)}
            placeholder={config?.placeholder?.min || "0"}
            size="sm"
            className="flex-1"
            min={config?.min}
          />
        </div>
        <span className="text-sm text-gray-500">to</span>
        <div className="flex items-center gap-1 flex-1">
          {config?.unit && <span className="text-sm text-gray-500">{config.unit}</span>}
          <GenericInput
            type="number"
            value={currentValue.max !== null ? String(currentValue.max) : ""}
            onChange={(e) => handleMaxChange(e.target.value)}
            placeholder={config?.placeholder?.max || "Max"}
            size="sm"
            className="flex-1"
            min={config?.min}
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
