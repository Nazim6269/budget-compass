import type { FilterConfig, FilterState, ActiveFilters, DateRange, NumberRange } from "../types";
import { getActiveFilters } from "./serialization";

export type ApiParams = Record<string, string | string[] | number | number[] | boolean | null>;

export function buildApiParams(
  configs: FilterConfig[],
  state: FilterState,
  keyMap: Record<string, string> = {}
): ApiParams {
  const active: ActiveFilters = getActiveFilters(configs, state);
  const result: ApiParams = {};

  for (const [key, value] of Object.entries(active)) {
    const config = configs.find((c) => c.key === key);
    if (!config) continue;
    const apiKey = keyMap[key] ?? key;

    if (config.type === "date-range") {
      const { from, to } = value as DateRange;
      if (from) result[`${apiKey}_from`] = from;
      if (to) result[`${apiKey}_to`] = to;
    } else if (config.type === "number-range") {
      const { min, max } = value as NumberRange;
      if (min !== null) result[`${apiKey}_min`] = min;
      if (max !== null) result[`${apiKey}_max`] = max;
    } else if (config.type === "multi-select") {
      result[apiKey] = value as string[];
    } else {
      result[apiKey] = value as string | number | boolean;
    }
  }

  return result;
}

export function buildApiQueryString(
  configs: FilterConfig[],
  state: FilterState,
  keyMap: Record<string, string> = {}
): string {
  const params = buildApiParams(configs, state, keyMap);
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => qs.append(key, String(v)));
    } else {
      qs.set(key, String(value));
    }
  }
  return qs.toString();
}

export function buildPrismaWhere(
  configs: FilterConfig[],
  state: FilterState
): Record<string, unknown> {
  const active = getActiveFilters(configs, state);
  const where: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(active)) {
    const config = configs.find((c) => c.key === key);
    if (!config) continue;

    switch (config.type) {
      case "search":
        where[key] = { contains: value as string, mode: "insensitive" };
        break;
      case "select":
        where[key] = { equals: value };
        break;
      case "multi-select":
        where[key] = { in: value as string[] };
        break;
      case "date-range": {
        const { from, to } = value as DateRange;
        where[key] = {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to ? { lte: new Date(to) } : {}),
        };
        break;
      }
      case "number-range": {
        const { min, max } = value as NumberRange;
        where[key] = {
          ...(min !== null ? { gte: min } : {}),
          ...(max !== null ? { lte: max } : {}),
        };
        break;
      }
    }
  }

  return where;
}

export function buildClientPredicate<T extends Record<string, unknown>>(
  configs: FilterConfig[],
  state: FilterState
): (row: T) => boolean {
  const active = getActiveFilters(configs, state);
  const checks: Array<(row: T) => boolean> = [];

  for (const [key, value] of Object.entries(active)) {
    const config = configs.find((c) => c.key === key);
    if (!config) continue;

    switch (config.type) {
      case "search": {
        const term = (value as string).toLowerCase();
        checks.push((row) => String(row[key] ?? "").toLowerCase().includes(term));
        break;
      }
      case "select":
        checks.push((row) => row[key] === value);
        break;
      case "multi-select":
        checks.push((row) => (value as string[]).includes(String(row[key])));
        break;
      case "date-range": {
        const { from, to } = value as DateRange;
        checks.push((row) => {
          const d = new Date(String(row[key]));
          if (from && d < new Date(from)) return false;
          if (to && d > new Date(to)) return false;
          return true;
        });
        break;
      }
      case "number-range": {
        const { min, max } = value as NumberRange;
        checks.push((row) => {
          const n = Number(row[key]);
          if (min !== null && n < min) return false;
          if (max !== null && n > max) return false;
          return true;
        });
        break;
      }
    }
  }

  return (row) => checks.every((check) => check(row));
}