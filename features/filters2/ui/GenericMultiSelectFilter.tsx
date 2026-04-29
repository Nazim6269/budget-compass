"use client";

import React from "react";
import GenericDropDown from "@/shared/ui/GenericDropdown";
import { useFilterContext } from "../model/FilterContext";
import type { MultiSelectFilterConfig } from "../types";

interface GenericMultiSelectFilterProps {
  filterKey: string;
  className?: string;
}

export function GenericMultiSelectFilter({ filterKey, className = "" }: GenericMultiSelectFilterProps) {
  const { filters, setFilter, resetFilter, configs } = useFilterContext();
  const config = configs.find((c) => c.key === filterKey) as MultiSelectFilterConfig | undefined;
  const currentValues = (filters[filterKey] as string[]) ?? [];
  const [options, setOptions] = React.useState<Array<{ label: string; value: string | number }>>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadOptions = async () => {
      if (!config?.options) return;
      
      setLoading(true);
      try {
        if (typeof config.options === 'function') {
          const asyncOptions = await config.options();
          setOptions(asyncOptions);
        } else {
          setOptions(config.options);
        }
      } catch (error) {
        console.error('Error loading options:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [config?.options]);

  const handleToggle = (value: string | number) => {
    const stringValue = String(value);
    const newValues = currentValues.includes(stringValue)
      ? currentValues.filter(v => v !== stringValue)
      : [...currentValues, stringValue];

    // Apply maxSelected limit
    if (config?.maxSelected && newValues.length > config.maxSelected) {
      return;
    }

    setFilter(filterKey, newValues.length > 0 ? newValues : null);
  };

  const handleClear = () => {
    resetFilter(filterKey);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <GenericDropDown
          options={options}
          value=""
          onValueChange={handleToggle}
          placeholder={config?.placeholder || "Select..."}
          size="sm"
          className="flex-1"
        />
        {currentValues.length > 0 && (
          <button
            onClick={handleClear}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 rounded hover:border-gray-400"
          >
            Clear
          </button>
        )}
      </div>
      
      {currentValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {currentValues.map((value) => {
            const option = options.find((opt: { label: string; value: string | number }) => String(opt.value) === value);
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {option?.label || value}
                <button
                  onClick={() => handleToggle(value)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
