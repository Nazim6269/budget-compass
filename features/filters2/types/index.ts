export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | DateRange
  | NumberRange
  | null
  | undefined;

export interface DateRange {
  from: string | null;
  to: string | null;
}

export interface NumberRange {
  min: number | null;
  max: number | null;
}

export type FilterType =
  | "search"
  | "select"
  | "multi-select"
  | "date-range"
  | "number-range";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type FilterConfig =
  | SearchFilterConfig
  | SelectFilterConfig
  | MultiSelectFilterConfig
  | DateRangeFilterConfig
  | NumberRangeFilterConfig;

interface BaseFilterConfig {
  key: string;
  label: string;
  defaultValue?: FilterValue;
  deserialize?: (raw: string) => FilterValue;
  serialize?: (value: FilterValue) => string;
}

export interface SearchFilterConfig extends BaseFilterConfig {
  type: "search";
  placeholder?: string;
  debounceMs?: number;
}

export interface SelectFilterConfig extends BaseFilterConfig {
  type: "select";
  options: SelectOption[];
  placeholder?: string;
}

export interface MultiSelectFilterConfig extends BaseFilterConfig {
  type: "multi-select";
  options: SelectOption[] | (() => Promise<SelectOption[]>);
  placeholder?: string;
  maxSelected?: number;
}

export interface DateRangeFilterConfig extends BaseFilterConfig {
  type: "date-range";
  minDate?: string;
  maxDate?: string;
  placeholder?: { from?: string; to?: string };
}

export interface NumberRangeFilterConfig extends BaseFilterConfig {
  type: "number-range";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: { min?: string; max?: string };
}

export type FilterState = Record<string, FilterValue>;
export type ActiveFilters = Record<string, NonNullable<FilterValue>>;

export interface UseFiltersOptions {
  configs: FilterConfig[];
  syncUrl?: boolean;
  onChange?: (state: FilterState) => void;
}

export interface UseFiltersReturn {
  filters: FilterState;
  activeFilters: ActiveFilters;
  activeCount: number;
  setFilter: (key: string, value: FilterValue) => void;
  resetFilter: (key: string) => void;
  resetAllFilters: () => void;
  isDefaultState: boolean;
  buildQueryString: () => string;
}