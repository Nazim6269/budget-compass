"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";
import GenericDropDown from "@/shared/ui/GenericDropdown";

export interface RegistrationDataPoint {
  month: string;
  registrations: number;
}

export type DateRangeOption =
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months";

interface RegistrationsBarChartProps {
  data: Record<DateRangeOption, RegistrationDataPoint[]>;
  defaultRange?: DateRangeOption;
  className?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-md">
      <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-[18px] font-semibold text-stone-900">
        {payload[0].value}
      </p>
      <p className="text-[11px] text-stone-400">registrations</p>
    </div>
  );
};

export default function RegistrationsBarChart({
  data,
  defaultRange = "Last 6 months",
  className,
}: RegistrationsBarChartProps) {
  const [range, setRange] = useState<DateRangeOption>(defaultRange);

  return (
    <section
      className={cn(
        "flex flex-col gap-4 max-w-207.5 rounded-2xl border border-borderColor bg-white p-6 transition-all duration-300 ease-in-out  hover:shadow-[0_0_0_1px_#0000001a]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-headingColor leading-[130%] tracking-[0.008rem]">
          User Registrations
        </h2>
        <GenericDropDown
          options={[
            { label: "Last 3 months", value: "Last 3 months" },
            { label: "Last 6 months", value: "Last 6 months" },
            { label: "Last 12 months", value: "Last 12 months" },
          ]}
          value={range}
          onValueChange={(value) => setRange(value as DateRangeOption)}
          placeholder="Last 6 months"
          className="hidden md:block "
          variant="light"
        />
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data[range]}
          margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
          barSize={60}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e7e5e4"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#a8a29e" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#a8a29e" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f5f5f4", radius: 8 }}
          />
          <Bar
            dataKey="registrations"
            fill="#5C473B"
            radius={[16, 16, 16, 16]}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
