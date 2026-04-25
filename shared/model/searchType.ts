export interface SearchResult {
  id: string | number;
  label: string;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";

export interface GenericSearchHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
}

export interface GenericSearchProps<T> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => (Promise<T[]> | T[]) | undefined;
  onSelect?: (item: T) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  debounceMs?: number;
  minChars?: number;
  maxResults?: number;
  placeholder?: string;
  showIcon?: boolean;
  showClear?: boolean;
  showRecentSearches?: boolean;
  recentSearches?: T[];
  disabled?: boolean;
  autoFocus?: boolean;
  renderResult?: (item: T, query: string) => React.ReactNode;
  renderEmpty?: (query: string) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
  groupBy?: (item: T) => string;
  filterResults?: (items: T[], query: string) => T[];
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  id?: string;
}

export interface DropdownProps<T> {
  id: string;
  items: T[];
  activeIndex: number;
  status: SearchStatus;
  error: Error | null;
  query: string;
  groupBy?: (item: T) => string;
  renderResult?: (item: T, query: string) => React.ReactNode;
  renderEmpty?: (query: string) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
  onSelect: (item: T) => void;
  className?: string;
}

export interface UseSearchOptions<T> {
  query: string;
  enabled: boolean;
  onSearch: (query: string) => Promise<T[]> | T[];
  maxResults: number;
  filterResults?: (items: T[], query: string) => T[];
}

export interface UseSearchReturn<T> {
  results: T[];
  status: SearchStatus;
  error: Error | null;
}

export interface UseKeyboardNavOptions {
  isOpen: boolean;
  itemCount: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export interface UseKeyboardNavReturn {
  activeIndex: number;
  resetIndex: () => void;
}
