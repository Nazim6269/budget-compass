export type {
  FilterConfig, FilterState, FilterValue, FilterType,
  SelectOption, DateRange, NumberRange,
  SearchFilterConfig, SelectFilterConfig, MultiSelectFilterConfig,
  DateRangeFilterConfig, NumberRangeFilterConfig,
  ActiveFilters, UseFiltersOptions, UseFiltersReturn,
} from "./types";

export { useFilters, useFilterValue } from "./model/useFilters";
export { FilterProvider, useFilterContext, useFilterSelector } from "./model/FilterContext";
// New generic filter components using your GenericInput, GenericDropdown, and GenericSearch
export { GenericSearchFilter } from "./ui/GenericSearchFilter";
export { GenericSelectFilter } from "./ui/GenericSelectFilter";
export { GenericMultiSelectFilter } from "./ui/GenericMultiSelectFilter";
export { GenericDateRangeFilter } from "./ui/GenericDateRangeFilter";
export { GenericNumberRangeFilter } from "./ui/GenericNumberRangeFilter";

export { FilterBar, ActiveFilterTags } from "./ui/FilterBar";
export { buildApiParams, buildApiQueryString, buildPrismaWhere, buildClientPredicate } from "./utils/queryBuilder";
export { buildInitialState, stateToSearchParams, getActiveFilters, serializeFilterValue, deserializeFilterValue } from "./utils/serialization";