"use client";

import { CalendarIcon } from "@/shared";
import GenericButton from "@/shared/ui/GenericButton";
import GenericDropDown from "@/shared/ui/GenericDropdown";
import { GenericInput } from "@/shared/ui/GenericInput";
import { Download } from "lucide-react";

const UserManagementHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Title */}
      <h2 className="text-headingColor text-lg sm:text-xl md:text-2xl font-semibold leading-[140%] tracking-[0.008rem]">
        User Management
      </h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <GenericInput
          type="date"
          suffix={<CalendarIcon />}
          size="lg"
         
        />

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

export default UserManagementHeader;
