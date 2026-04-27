import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrendDirection = "up" | "down" | "neutral";

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
    label?: string;
  };
  icon?: LucideIcon;
  className?: string;
  formatter?: (val: string | number) => string;
}

const trendConfig: Record<
  TrendDirection,
  { color: string; Icon: React.ElementType | null }
> = {
  up: { color: "text-green-600 bg-green-50", Icon: ArrowUpRight },
  down: { color: "text-rose-600 bg-rose-50", Icon: ArrowDownRight },
  neutral: { color: "text-green-600 bg-green-50", Icon: null },
};

export default function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  className,
  formatter,
}: MetricCardProps) {
  const displayValue = formatter ? formatter(value) : value;
  const trendCfg = trend ? trendConfig[trend.direction] : null;
  const TrendIcon = trendCfg?.Icon ?? null;

  return (
    <article
      className={cn(
        "relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 rounded-2xl border border-[rgba(92, 71, 59, 0.30)] bg-white px-3 sm:px-4 py-4 sm:py-5 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex gap-3 sm:gap-5 items-start sm:items-center min-w-0">
        {Icon && (
          <span className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-secondaryBg text-stone-600 shrink-0">
            <Icon
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              strokeWidth={1.75}
            />
          </span>
        )}

        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs sm:text-sm font-medium text-grayBlack2 truncate">
            {title}
          </span>
          <span className="text-lg sm:text-xl md:text-[2rem] font-semibold text-headingColor truncate">
            {displayValue}
          </span>
        </div>
      </div>

      <div className="flex items-center sm:items-end justify-start sm:justify-end gap-2 w-full sm:w-auto">
        {trend && trendCfg && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap",
              trendCfg.color,
            )}
          >
            {TrendIcon && <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
            {trend.value}
          </span>
        )}
      </div>
    </article>
  );
}
