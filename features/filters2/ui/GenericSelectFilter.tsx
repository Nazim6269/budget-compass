"use client";

import React from "react";
import GenericDropDown from "@/shared/ui/GenericDropdown";
import { useFilterContext } from "../model/FilterContext";
import type { SelectFilterConfig } from "../types";

interface GenericSelectFilterProps {
  filterKey: string;
  className?: string;
}

export function GenericSelectFilter({ filterKey, className = "" }: GenericSelectFilterProps) {
  const { filters, setFilter, resetFilter, configs } = useFilterContext();
  const config = configs.find((c) => c.key === filterKey) as SelectFilterConfig | undefined;
  const currentValue = (filters[filterKey] as string) ?? "";

  const handleChange = (value: string | number) => {
    const stringValue = String(value);
    setFilter(filterKey, stringValue === "" ? null : stringValue);
  };

  const options = React.useMemo(() => {
    const baseOptions = config?.options || [];
    if (config?.placeholder && !currentValue) {
      return [
        { label: config.placeholder, value: "" },
        ...baseOptions,
      ];
    }
    return baseOptions;
  }, [config?.options, config?.placeholder, currentValue]);

  return (
    <div className={className}>
      <GenericDropDown
        options={options}
        value={currentValue}
        onValueChange={handleChange}
        placeholder={config?.placeholder || "Select..."}
        size="lg"
        className="w-full sm:w-35.5"
      />
    </div>
  );
}
