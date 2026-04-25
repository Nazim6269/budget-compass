import React, {
  useRef,
  useId,
  useCallback,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";

import {
  useDebounce,
  useKeyboardNav,
  useClickOutside,
  useSearch,
  SearchResult,
  GenericSearchProps,
  GenericSearchHandle,
} from "../index";
import { SearchDropdown } from "./SearchDropdown";
import { cn } from "@/lib/utils";
import ClearIcon from "./icons/ClearIcon";
import SearchIcon from "./icons/SearchIcon";
import { LoadingSpinner } from "./icons/LoadingSpinner";

const iconSizeVariant = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-4.5 h-4.5",
};

function GenericSearchInner<T extends SearchResult>(
  props: GenericSearchProps<T>,
  ref: React.ForwardedRef<GenericSearchHandle>,
) {
  const {
    value: controlledValue,
    defaultValue = "",
    onSearch,
    onSelect,
    onFocus,
    onBlur,
    onClear,
    onChange,
    placeholder = "Search…",
    debounceMs = 300,
    minChars = 1,
    maxResults = 50,
    size = "md",
    showIcon = true,
    showClear = true,
    showRecentSearches = true,
    recentSearches = [],
    renderResult,
    renderEmpty,
    renderLoading,
    renderError,
    groupBy,
    filterResults,
    className,
    inputClassName,
    dropdownClassName,
    disabled = false,
    autoFocus = false,
    ariaLabel = "Search",
    id: externalId,
  } = props;

  const internalId = useId();
  const id = externalId ?? internalId;
  const listboxId = `${id}-listbox`;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = isControlled ? controlledValue : internalValue;

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(inputValue, debounceMs);

  const shouldSearch = debouncedQuery.trim().length >= minChars && isFocused;

  const { results, status, error } = useSearch({
    query: debouncedQuery,
    enabled: shouldSearch,
    onSearch,
    maxResults,
    filterResults,
  });

  const isOpen =
    isFocused &&
    (shouldSearch ||
      (showRecentSearches && recentSearches.length > 0 && !inputValue));

  const displayItems = useMemo(() => {
    if (!shouldSearch && showRecentSearches && !inputValue) {
      return recentSearches.map((r) => ({ ...r, _isRecent: true }));
    }
    return results;
  }, [shouldSearch, showRecentSearches, inputValue, recentSearches, results]);

  const handleSelect = useCallback(
    (item: T) => {
      const displayLabel = item.label || String(item.id);

      if (!isControlled) setInternalValue(displayLabel);
      onChange?.(displayLabel);
      onSelect?.(item);
      setIsFocused(false);
      inputRef.current?.blur();
    },
    [isControlled, onChange, onSelect],
  );

  const { activeIndex, resetIndex } = useKeyboardNav({
    isOpen,
    itemCount: displayItems.length,
    onSelect: (idx) => handleSelect(displayItems[idx] as T),
    onClose: () => {
      setIsFocused(false);
      inputRef.current?.blur();
    },
    inputRef,
  });

  useClickOutside(containerRef, () => {
    setIsFocused(false);
    resetIndex();
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      resetIndex();
    },
    [isControlled, onChange, resetIndex],
  );

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onClear?.();
    resetIndex();
    inputRef.current?.focus();
  }, [isControlled, onChange, onClear, resetIndex]);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    },
    [onBlur],
  );

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: handleClear,
    getValue: () => inputValue,
  }));

  const showLoadingIcon = status === "loading" && shouldSearch;
  const showClearButton = showClear && inputValue.length > 0 && !disabled;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-owns={listboxId}
    >
      <div
        className={cn(
          "search-input-wrapper",
          "flex items-center gap-1.5 p-4",
          "w-full",
          "rounded-lg border",
          "transition-all duration-150 ease-out",
          isFocused ? "border-si-ring shadow-[0_0_0_3px_var(--si-ring-spread)] bg-si-bg" : "border-si-border bg-si-bg",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        {showIcon && (
          <span className="shrink-0 text-[--si-icon] transition-colors duration-150">
            {showLoadingIcon ? (
              <LoadingSpinner />
            ) : (
              <SearchIcon className={iconSizeVariant[size]} />
            )}
          </span>
        )}

        <input
          ref={inputRef}
          id={id}
          type="search"
          role="searchbox"
          autoComplete="off"
          autoFocus={autoFocus}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none",
            "text-si-text placeholder:text-si-placeholder",
            "text-lg font-normal",
            "[&::-webkit-search-cancel-button]:hidden",
            inputClassName,
          )}
        />

        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
            className={cn(
              "shrink-0 flex items-center justify-center",
              "w-5 h-5 rounded-full",
              "text-si-icon hover:text-si-text",
              "hover:bg-si-clear-hover",
              "transition-colors duration-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-si-ring",
            )}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {isOpen && (
        <SearchDropdown
          id={listboxId}
          items={displayItems as T[]}
          activeIndex={activeIndex}
          status={status}
          error={error}
          query={debouncedQuery}
          groupBy={groupBy}
          renderResult={renderResult}
          renderEmpty={renderEmpty}
          renderLoading={renderLoading}
          renderError={renderError}
          onSelect={handleSelect}
          className={dropdownClassName}
        />
      )}
    </div>
  );
}

export const GenericSearch = forwardRef(GenericSearchInner) as (<T>(
  props: GenericSearchProps<T> & {
    ref?: React.ForwardedRef<GenericSearchHandle>;
  },
) => React.ReactElement) & { displayName?: string };

GenericSearch.displayName = "GenericSearch";
