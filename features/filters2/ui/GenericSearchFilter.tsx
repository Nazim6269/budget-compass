"use client";

import React from "react";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useFilterContext } from "../model/FilterContext";
import type { SearchFilterConfig } from "../types";

interface GenericSearchFilterProps {
  filterKey: string;
  className?: string;
}

export function GenericSearchFilter({ filterKey, className = "" }: GenericSearchFilterProps) {
  const { filters, setFilter, resetFilter, configs } = useFilterContext();
  const config = configs.find((c) => c.key === filterKey) as SearchFilterConfig | undefined;
  const currentValue = (filters[filterKey] as string) ?? "";
  const debounceMs = config?.debounceMs ?? 300;

  const [localValue, setLocalValue] = React.useState(currentValue);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isFirstMount = React.useRef(true);

  React.useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setLocalValue(currentValue);
  }, [currentValue]);

  const handleChange = (value: string) => {
    setLocalValue(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setFilter(filterKey, value || null);
    }, debounceMs);
  };

  const handleClear = () => {
    setLocalValue("");
    resetFilter(filterKey);
  };

  return (
    <div className={className}>
      <GenericInput
        type="text"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={config?.placeholder || "Search..."}
        clearable={localValue.length > 0}
        size="sm"
        className="w-full"
      />
    </div>
  );
}
