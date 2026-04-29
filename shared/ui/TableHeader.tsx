import { Download } from "lucide-react";
import GenericButton from "./GenericButton";
import {
  FilterBar,
  GenericDateRangeFilter,
  GenericSelectFilter,
} from "@/features/filters2";

const TableHeader = ({
  title,
  section,
}: {
  title: string;
  section?: string;
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Title */}
      <h2 className="text-headingColor text-lg sm:text-xl md:text-2xl font-semibold leading-[140%] tracking-[0.008rem]">
        {title}
      </h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full sm:w-auto">
        {(section === "user" || section === "transactions") && (
          <FilterBar>
            <GenericDateRangeFilter filterKey="subscribedAt" />
            <GenericSelectFilter filterKey="status" />
            <GenericSelectFilter filterKey="billingCycle" />
          </FilterBar>
        )}
        <GenericButton
          title="Export List"
          variant="brown"
          onClick={() => {}}
          icon={<Download size={18} strokeWidth={2} />}
          iconPosition="left"
          className="w-full sm:w-35.5 flex justify-center items-center gap-2"
          size="small"
        />
      </div>
    </div>
  );
};

export default TableHeader;
