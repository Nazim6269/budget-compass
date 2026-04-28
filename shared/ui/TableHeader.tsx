import React from "react";
import { GenericInput } from "./GenericInput";
import { CalendarIcon, Download } from "lucide-react";
import GenericDropDown from "./GenericDropdown";
import GenericButton from "./GenericButton";

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
        {section === "user" && (
          <GenericInput type="date" suffix={<CalendarIcon />} size="sm" />
        )}
        <GenericDropDown
          options={[
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
            { label: "All", value: "All" },
          ]}
          placeholder="Active"
          variant="light"
          className="w-full sm:w-[142px]"
          size="lg"
          onValueChange={() => {}}
        />

        <GenericDropDown
          options={[
            { label: "Yearly", value: "Yearly" },
            { label: "Monthly", value: "Monthly" },
            { label: "All", value: "All" },
          ]}
          placeholder="Yearly"
          variant="light"
          className="w-full sm:w-[142px]"
          size="lg"
        />

        <GenericButton
          title="Export List"
          variant="brown"
          onClick={() => {}}
          icon={<Download size={18} strokeWidth={2} />}
          iconPosition="left"
          className="w-full sm:w-[142px] flex justify-center items-center gap-2"
          size="small"
        />
      </div>
    </div>
  );
};

export default TableHeader;
