"use client";

import React, { useState } from "react";
import { Download, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import GenericTable from "@/shared/ui/GenericTable";
import { recentUsersTableConfig } from "@/shared/config/tableConfig";
import GenericButton from "@/shared/ui/GenericButton";

export type PlanType = "Monthly" | "Yearly" | "Enterprise";
export type StatusType = "Active" | "Inactive" | "Pending";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  subscribedAt: string;
  safeToSpend: number;
  status: StatusType;
}

type SortKey = keyof Pick<
  UserRecord,
  "name" | "plan" | "subscribedAt" | "safeToSpend" | "status"
>;
type SortDir = "asc" | "desc";

interface RecentUsersTableProps {
  data: UserRecord[];
  className?: string;
  onExport?: (data: UserRecord[]) => void;
}

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}) {
  if (col !== sortKey)
    return <ChevronsUpDown size={13} className="text-stone-300" />;
  return sortDir === "asc" ? (
    <ChevronUp size={13} className="text-stone-700" />
  ) : (
    <ChevronDown size={13} className="text-stone-700" />
  );
}

export default function RecentUsersTable({
  data,
  className,
  onExport,
}: RecentUsersTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("subscribedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1); // Reset to first page on sort
  };

  const sorted = [...data].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp =
      typeof av === "number"
        ? av - (bv as number)
        : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleExport = () => {
    if (onExport) {
      onExport(sorted);
      return;
    }
    const csv = [
      ["Name", "Email", "Plan", "Subscribed", "Safe to Spend", "Status"].join(
        ",",
      ),
      ...sorted.map((u) =>
        [
          u.name,
          u.email,
          u.plan,
          u.subscribedAt,
          `$${u.safeToSpend}`,
          u.status,
        ].join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-green-600 bg-white px-5 py-5 ",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-headingColor whitespace-nowrap">
          Recent Users
        </h2>
        <GenericButton
          title="Export List"
          variant="brown"
          onClick={handleExport}
          icon={<Download size={13} strokeWidth={2} />}
          iconPosition="left"
          className="w-full sm:w-auto"
        />
      </div>

      <GenericTable
        columns={recentUsersTableConfig}
        data={sorted.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        totalpage={Math.ceil(sorted.length / itemsPerPage)}
      />
    </section>
  );
}
