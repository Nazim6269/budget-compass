import type {
  FilterConfig,
  FilterState,
  FilterValue,
  DateRange,
  NumberRange,
} from "../types";

export function serializeFilterValue(
  config: FilterConfig,
  value: FilterValue
): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (config.serialize) return config.serialize(value);

  if (Array.isArray(value)) {
    return value.length === 0 ? null : value.join(",");
  }

  if (typeof value === "object") {
    if ("from" in value || "to" in value) {
      const dr = value as DateRange;
      if (!dr.from && !dr.to) return null;
      return `${dr.from ?? ""},${dr.to ?? ""}`;
    }
    if ("min" in value || "max" in value) {
      const nr = value as NumberRange;
      if (nr.min === null && nr.max === null) return null;
      return `${nr.min ?? ""},${nr.max ?? ""}`;
    }
  }

  return String(value);
}

export function deserializeFilterValue(
  config: FilterConfig,
  raw: string
): FilterValue {
  if (!raw) return config.defaultValue ?? null;
  if (config.deserialize) {
    try {
      return config.deserialize(raw);
    } catch {
      return config.defaultValue ?? null;
    }
  }

  switch (config.type) {
    case "search":
      return raw;

    case "select": {
      const valid = config.options.find((o) => o.value === raw);
      return valid ? raw : (config.defaultValue ?? null);
    }

    case "multi-select": {
      const parts = raw.split(",").filter(Boolean);
      if (typeof config.options === "function") return parts;
      const validValues = config.options.map((o) => o.value);
      const filtered = parts.filter((p) => validValues.includes(p));
      return filtered.length ? filtered : (config.defaultValue ?? []);
    }

    case "date-range": {
      const [from, to] = raw.split(",");
      return { from: from || null, to: to || null } satisfies DateRange;
    }

    case "number-range": {
      const [minRaw, maxRaw] = raw.split(",");
      const min = minRaw !== "" ? Number(minRaw) : null;
      const max = maxRaw !== "" ? Number(maxRaw) : null;
      if ((min !== null && isNaN(min)) || (max !== null && isNaN(max))) {
        return config.defaultValue ?? { min: null, max: null };
      }
      return { min, max } satisfies NumberRange;
    }

    default:
      return raw;
  }
}

export function buildInitialState(
  configs: FilterConfig[],
  params: URLSearchParams
): FilterState {
  return Object.fromEntries(
    configs.map((config) => {
      const raw = params.get(config.key);
      if (raw !== null) return [config.key, deserializeFilterValue(config, raw)];
      return [config.key, config.defaultValue ?? null];
    })
  );
}

export function stateToSearchParams(
  configs: FilterConfig[],
  state: FilterState
): URLSearchParams {
  const params = new URLSearchParams();
  for (const config of configs) {
    const serialized = serializeFilterValue(config, state[config.key]);
    if (serialized !== null) params.set(config.key, serialized);
  }
  return params;
}

export function getActiveFilters(
  configs: FilterConfig[],
  state: FilterState
): Record<string, NonNullable<FilterValue>> {
  const active: Record<string, NonNullable<FilterValue>> = {};
  for (const config of configs) {
    const value = state[config.key];
    if (isEmptyValue(value)) continue;
    if (isEqualToDefault(value, config.defaultValue)) continue;
    active[config.key] = value as NonNullable<FilterValue>;
  }
  return active;
}

function isEmptyValue(value: FilterValue): boolean {
  if (value === null || value === undefined || value === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && "from" in value && !value.from && !(value as DateRange).to) return true;
  if (typeof value === "object" && "min" in value && (value as NumberRange).min === null && (value as NumberRange).max === null) return true;
  return false;
}

function isEqualToDefault(value: FilterValue, defaultValue: FilterValue): boolean {
  if (defaultValue === undefined) return false;
  return JSON.stringify(value) === JSON.stringify(defaultValue);
}