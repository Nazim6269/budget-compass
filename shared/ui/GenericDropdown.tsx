"use client";

import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import useSelect from "../model/useSelect";
import { useClickOutside } from "../model/useClickOutside";
import { selectTokens } from "../config/theme/token";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface SelectSlots {
  trigger?: string;
  dropdown?: string;
  item?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface GenericDropDownProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  searchable?: boolean;
  slots?: SelectSlots;
  className?: string;
}

const GenericDropDown = ({
  options,
  value,
  onValueChange,
  variant = "dark",
  size = "md",
  radius = "md",
  searchable,
  slots,
  placeholder,
  leftIcon,
  className,
}: GenericDropDownProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(value);
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery, filteredOptions } = useSelect(options);

  const handleToggle = () => setOpen((prev) => !prev);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const v = selectTokens.variants[variant];

  useClickOutside(dropdownRef, () => {
    setOpen(false);
  });
  const currentValue = value !== undefined ? value : internalValue;
  const selectedLabel = options.find((o) => o.value === currentValue)?.label;

  return (
    <div className={cn("relative text-left", className)} ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          selectTokens.base,
          v.trigger,
          selectTokens.sizes[size],
          selectTokens.radius[radius],
          "flex items-center justify-between gap-2 overflow-hidden ",
          selectedLabel ? "text-text-base" : "text-text-placeholder",
          slots?.trigger,
          "w-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 min-w-0 w-full">
          {leftIcon && (
            <span className="shrink-0 text-text-muted">{leftIcon}</span>
          )}
          <span className="truncate text-textSecondary">
            {selectedLabel || placeholder}
          </span>
          <span className="shrink-0 text-textSecondary">
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-300 ease-in-out",
                open ? "rotate-180" : "",
              )}
            />
          </span>{" "}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 shadow-2xl rounded-xl min-w-full lg:min-w-[200px] border border-border-base overflow-hidden bg-white/50 backdrop-blur-sm bg-surface-overlay",
            v.dropdown,
            slots?.dropdown,
          )}
        >
          {/* Search */}
          {searchable && (
            <div className="p-2 border-b border-border-muted bg-surface-muted">
              <input
                className="w-full bg-surface-base text-text-base px-3 py-2 text-sm rounded-lg outline-none border border-border-base focus:border-border-active transition-colors"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Options */}
          <div className="max-h-64 overflow-y-auto py-1.5 px-1.5 custom-scrollbar bg-surface-overlay">
            {filteredOptions.length === 0 && (
              <div className="p-3 text-sm text-text-placeholder text-center italic">
                No results found
              </div>
            )}

            {filteredOptions.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  if (value === undefined) {
                    setInternalValue(opt.value);
                  }
                  onValueChange?.(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "cursor-pointer px-3 py-2.5 text-sm transition-all duration-200 rounded-lg mb-0.5 last:mb-0 flex items-center justify-between group",
                  v.item,
                  v.itemHover,
                  currentValue === opt.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-text-muted hover:text-text-base",
                  slots?.item,
                )}
              >
                <span className="truncate text-[#4A3A2F]">{opt.label}</span>
                {currentValue === opt.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

GenericDropDown.displayName = "GenericDropDown";

export default GenericDropDown;
