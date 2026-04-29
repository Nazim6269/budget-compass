"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { FilterConfig, FilterState, FilterValue, UseFiltersOptions, UseFiltersReturn } from "../types";
import { buildInitialState, stateToSearchParams, getActiveFilters } from "../utils/serialization";

function useDebounceCallback<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): T {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fnRef.current(...args), delay);
    },
    [delay]
  ) as T;
}

export function useFilters({
  configs,
  syncUrl = true,
  onChange,
}: UseFiltersOptions): UseFiltersReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<FilterState>(() =>
    buildInitialState(configs, searchParams || new URLSearchParams())
  );

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Sync URL → state on back/forward navigation
  const paramsString = searchParams?.toString();
  const prevParamsString = useRef(paramsString);

  useEffect(() => {
    if (prevParamsString.current !== paramsString) {
      prevParamsString.current = paramsString;
      setFilters(buildInitialState(configs, searchParams || new URLSearchParams()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString]);

  const pushToUrl = useDebounceCallback((newState: FilterState) => {
    if (!syncUrl) return;
    const params = stateToSearchParams(configs, newState);
    const qs = params.toString();
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  }, 300);

  const setFilter = useCallback(
    (key: string, value: FilterValue) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value };
        onChangeRef.current?.(next);
        pushToUrl(next);
        return next;
      });
    },
    [pushToUrl]
  );

  const resetFilter = useCallback(
    (key: string) => {
      const config = configs.find((c) => c.key === key);
      setFilter(key, config?.defaultValue ?? null);
    },
    [configs, setFilter]
  );

  const resetAllFilters = useCallback(() => {
    const defaultState = Object.fromEntries(
      configs.map((c) => [c.key, c.defaultValue ?? null])
    );
    setFilters(defaultState);
    onChangeRef.current?.(defaultState);
    if (syncUrl) {
      startTransition(() => router.push(pathname || "", { scroll: false }));
    }
  }, [configs, syncUrl, pathname, router]);

  const activeFilters = useMemo(
    () => getActiveFilters(configs, filters),
    [configs, filters]
  );

  const activeCount = useMemo(() => Object.keys(activeFilters).length, [activeFilters]);

  const buildQueryString = useCallback(
    () => stateToSearchParams(configs, filters).toString(),
    [configs, filters]
  );

  return {
    filters,
    activeFilters,
    activeCount,
    setFilter,
    resetFilter,
    resetAllFilters,
    isDefaultState: activeCount === 0,
    buildQueryString,
  };
}

export function useFilterValue<T extends FilterValue = FilterValue>(
  key: string,
  filters: FilterState,
  setFilter: (key: string, value: FilterValue) => void
) {
  const value = (filters[key] ?? null) as T;
  const set = useCallback((v: T) => setFilter(key, v), [key, setFilter]);
  return [value, set] as const;
}