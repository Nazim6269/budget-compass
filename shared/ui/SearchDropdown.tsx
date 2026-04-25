import { useMemo } from "react";
import { DropdownProps, SearchResult } from "../model/searchType";
import { cn } from "@/lib/utils";
import { ResultItem } from "./ResultItem";

export function SearchDropdown<T extends SearchResult>({
  items,
  id,
  error,
  status,
  renderError,
  renderLoading,
  activeIndex,
  onSelect,
  renderEmpty,
  renderResult,
  query,
  className,
  groupBy,
}: DropdownProps<T>) {
  const grouped = useMemo(() => {
    if (!groupBy) return null;
    const map = new Map<string, T[]>();
    for (const item of items) {
      const key = groupBy(item);
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, item]);
    }
    return map;
  }, [items, groupBy]);

  const content = useMemo(() => {
    if (status === "loading") {
      return renderLoading ? (
        renderLoading()
      ) : (
        <div className="px-4 py-6 flex items-center justify-center gap-2 text-si-placeholder text-sm">
          <span
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden
          />
          Searching…
        </div>
      );
    }

    if (status === "error" && error) {
      return renderError ? (
        renderError(error)
      ) : (
        <div className="px-4 py-5 text-si-error text-sm flex items-start gap-2">
          <span aria-hidden className="mt-0.5 text-base leading-none">
            ⚠
          </span>
          <span>
            {error.message || "Something went wrong. Please try again."}
          </span>
        </div>
      );
    }

    if (items.length === 0 && query.length > 0) {
      return renderEmpty ? (
        renderEmpty(query)
      ) : (
        <div className="px-4 py-6 text-center text-gray-500 text-sm">
          No results for{" "}
          <span className="text-gray-900 font-medium">"{query}"</span>
        </div>
      );
    }

    if (grouped) {
      let flatIndex = 0;
      return Array.from(grouped.entries()).map(([group, groupItems]) => (
        <div key={group} role="group" aria-label={group}>
          <div className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-si-placeholder">
            {group}
          </div>
          {groupItems.map((item) => {
            const idx = flatIndex++;
            return (
              <ResultItem
                key={item.id}
                id={`${id}-option-${idx}`}
                item={item}
                index={idx}
                isActive={activeIndex === idx}
                query={query}
                renderResult={renderResult}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      ));
    }

    return items.map((item, idx) => (
      <ResultItem
        key={item.id}
        id={`${id}-option-${idx}`}
        item={item}
        index={idx}
        isActive={activeIndex === idx}
        query={query}
        renderResult={renderResult}
        onSelect={onSelect}
      />
    ));
  }, [
    status,
    error,
    renderError,
    renderLoading,
    activeIndex,
    onSelect,
    renderEmpty,
    items,
    query,
    renderResult,
  ]);

  return (
    <div
      id={id}
      role="listbox"
      aria-label="Search results"
      className={cn(
        "absolute top-full left-0 right-0 z-50 mt-1.5",
        "bg-si-bg border border-si-border",
        "rounded-xl shadow-lg overflow-hidden",
        "max-h-80 overflow-y-auto",
        "animate-in fade-in-0 slide-in-from-top-1 duration-100",
        className,
      )}
    >
      {content}
    </div>
  );
}
