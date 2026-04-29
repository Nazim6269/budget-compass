"use client";

import React, { createContext, useContext, useMemo, type ReactNode } from "react";
import type { FilterConfig, UseFiltersReturn } from "../types";
import { useFilters } from "./useFilters";

interface FilterContextValue extends UseFiltersReturn {
  configs: FilterConfig[];
}

const FilterContext = createContext<FilterContextValue | null>(null);

interface FilterProviderProps {
  configs: FilterConfig[];
  syncUrl?: boolean;
  onChange?: (state: Record<string, unknown>) => void;
  children: ReactNode;
}

export function FilterProvider({ configs, syncUrl = true, onChange, children }: FilterProviderProps) {
  const filtersApi = useFilters({ configs, syncUrl, onChange });
  const value = useMemo<FilterContextValue>(
    () => ({ ...filtersApi, configs }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtersApi, configs]
  );
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilterContext(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used inside <FilterProvider>");
  return ctx;
}

export function useFilterSelector<T>(selector: (ctx: FilterContextValue) => T): T {
  return selector(useFilterContext());
}