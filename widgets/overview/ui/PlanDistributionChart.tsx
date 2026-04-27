"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export interface PlanSegment {
  name: string;
  value: number;
  color: string;
}

interface PlanDistributionChartProps {
  data: PlanSegment[];
  className?: string;
}

// match your UI tones
const DEFAULT_COLORS = ["#5C473B", "#D6C7B2"];

export default function PlanDistributionChart({
  data,
  className,
}: PlanDistributionChartProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-borderColor bg-white p-6 transition-all duration-300 hover:shadow-[0_0_0_1px_#0000001a]",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold text-headingColor">
        Plan Distribution
      </h2>

      {/* Chart */}
      <div className="w-full h-[220px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius="80%"
              paddingAngle={0}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell
                  key={index}
                  fill={item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend (like your image) */}
      <div className="flex flex-col gap-2 text-sm">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                }}
              />
              <span className="text-stone-500">{item.name}</span>
            </div>
            <span className="text-stone-900 font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
