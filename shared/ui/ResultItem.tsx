import { cn } from "@/lib/utils";
import { SearchResult } from "../model/searchType";
import { HighlightedText } from "./HighlitedText";

interface ResultItemProps<T extends SearchResult> {
  id: string;
  item: T;
  index: number;
  isActive: boolean;
  query: string;
  renderResult?: (item: T, query: string) => React.ReactNode;
  onSelect: (item: T) => void;
}

export function ResultItem<T extends SearchResult>({
  id,
  item,
  isActive,
  query,
  renderResult,
  onSelect,
}: ResultItemProps<T>) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent blur before select
    onSelect(item);
  };

  if (renderResult) {
    return (
      <div
        id={id}
        role="option"
        aria-selected={isActive}
        onMouseDown={handleMouseDown}
        className={cn(
          "cursor-pointer select-none",
          isActive && "bg-si-active-bg",
        )}
      >
        {renderResult(item, query)}
      </div>
    );
  }

  return (
    <div
      id={id}
      role="option"
      aria-selected={isActive}
      onMouseDown={handleMouseDown}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5",
        "cursor-pointer select-none",
        "transition-colors duration-75",
        isActive ? "bg-si-active-bg" : "hover:bg-si-hover-bg",
      )}
    >
      {/* {item.icon && (
        <span className="shrink-0 text-si-icon w-4 h-4 flex items-center justify-center">
          {item.icon}
        </span>
      )} */}
      <div className="min-w-0 flex-1">
        <div className="text-[14px] text-si-text truncate leading-snug">
          <HighlightedText text={item.label} query={query} />
        </div>
        {/* {item.description && (
          <div className="text-[12px] text-si-placeholder truncate mt-0.5">
            {item.description}
          </div>
        )} */}
      </div>
      {/* {item._isRecent && (
        <span className="shrink-0 text-[10px] text-si-placeholder uppercase tracking-wider">
          Recent
        </span>
      )} */}
    </div>
  );
}
