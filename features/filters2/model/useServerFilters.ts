// Server-side only — no "use client"
import type { FilterConfig, FilterState } from "../types";
import { buildInitialState, getActiveFilters } from "../utils/serialization";
import { buildPrismaWhere, buildApiParams } from "../utils/queryBuilder";

export function useServerFilters(
  configs: FilterConfig[],
  rawSearchParams: Record<string, string | string[] | undefined>,
  keyMap: Record<string, string> = {}
) {
  const urlParams = new URLSearchParams();
  for (const [key, val] of Object.entries(rawSearchParams)) {
    if (val === undefined) continue;
    if (Array.isArray(val)) val.forEach((v) => urlParams.append(key, v));
    else urlParams.set(key, val);
  }

  const filterState = buildInitialState(configs, urlParams);
  const activeFilters = getActiveFilters(configs, filterState);
  const activeCount = Object.keys(activeFilters).length;
  const prismaWhere = buildPrismaWhere(configs, filterState);
  const apiParams = buildApiParams(configs, filterState, keyMap);

  return { filterState, activeFilters, activeCount, prismaWhere, apiParams };
}