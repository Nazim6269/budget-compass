// components/reusable/Pagination.tsx
import React, { useCallback } from "react";
import { type UsePaginationReturn, DOTS } from "../model/usePagination";
import GenericDropDown from "./GenericDropdown";

type PaginationProps<T> = Pick<
  UsePaginationReturn<T>,
  | "currentPage"
  | "totalPages"
  | "totalItems"
  | "pageRange"
  | "canGoNext"
  | "canGoPrev"
  | "startIndex"
  | "endIndex"
> & {
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (amount: number) => void;
  isLoading?: boolean;
  className?: string;
};

function PageButton({
  page,
  isActive,
  isDisabled,
  onClick,
}: {
  page: number | string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const baseClass =
    "inline-flex items-center justify-center min-w-[36px] h-9 px-2 text-sm rounded-xl font-medium transition-all duration-150 select-none";

  if (page === DOTS) {
    return (
      <span
        className={`${baseClass} text-slate-400 cursor-default pointer-events-none`}
      >
        ···
      </span>
    );
  }

  if (isDisabled) {
    return (
      <button
        disabled
        className={`${baseClass} text-slate-300 cursor-not-allowed`}
        aria-disabled="true"
      >
        {page}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={
        isActive
          ? `${baseClass} bg-textPrimary text-white shadow-sm shadow-textPrimary cursor-pointer`
          : `${baseClass} text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer`
      }
    >
      {page}
    </button>
  );
}

function ChevronButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 cursor-pointer border border-[#F1F2F4]
        ${
          disabled
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

export function Pagination<T>({
  currentPage,
  totalPages,
  totalItems,
  pageRange,
  canGoNext,
  canGoPrev,
  startIndex,
  endIndex,
  onPageChange,
  onNext,
  onPrev,
  itemsPerPage,
  onItemsPerPageChange,
  isLoading = false,
  className = "",
}: PaginationProps<T>) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canGoPrev) onPrev();
      if (e.key === "ArrowRight" && canGoNext) onNext();
    },
    [canGoPrev, canGoNext, onPrev, onNext],
  );

  if (totalPages <= 1 && totalItems === 0) return null;

  return (
    <div
      role="navigation"
      aria-label="Pagination"
      onKeyDown={handleKeyDown}
      className={`flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between px-4 py-3 ${className}`}
    >
      {/* Controls */}
      <div className="flex items-center gap-6 " aria-label="Page controls">
        <ChevronButton
          direction="prev"
          disabled={!canGoPrev || isLoading}
          onClick={onPrev}
        />

        {pageRange.map((page, i) => (
          <PageButton
            key={page === DOTS ? `dots-${i}` : page}
            page={page}
            isActive={page === currentPage}
            isDisabled={isLoading}
            onClick={
              typeof page === "number" ? () => onPageChange(page) : undefined
            }
          />
        ))}

        <ChevronButton
          direction="next"
          disabled={!canGoNext || isLoading}
          onClick={onNext}
        />
      </div>

      {/* Results summary */}
      <div className="flex items-center gap-3">
        <p className="text-xs text-[#687588] tabular-nums font-medium">
          {isLoading ? (
            <span className="animate-pulse">Loading…</span>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-[#687588]">
                {startIndex}–{endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#687588]">{totalItems}</span>
            </>
          )}
        </p>
        <GenericDropDown
          options={[
            { label: "Show 5", value: 5 },
            { label: "Show 10", value: 10 },
            { label: "Show 15", value: 15 },
            { label: "Show 20", value: 20 },
          ]}
          value={itemsPerPage}
          onValueChange={(val) => onItemsPerPageChange?.(Number(val))}
          placeholder="Show"
          size="sm"
          className="w-28"
        />
      </div>
    </div>
  );
}
