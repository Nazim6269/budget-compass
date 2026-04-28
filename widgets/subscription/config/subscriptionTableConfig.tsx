import { cn } from "@/lib/utils";

export const subscriptionTableConfig = [
  {
    label: "User",
    accessor: "name",
    width: { mobile: "100px", desktop: "150px" },
    formatter: (value: string, row: any) => {
      return (
        <div className="flex flex-col">
          <span className="text-grayBlack text-sm font-semibold leading-4 tracking-[0.004rem]">
            {value}
          </span>
          <span className="text-xs text-grayBlack2 font-normal leading-4 tracking-[0.015rem]">
            {row.email}
          </span>
        </div>
      );
    },
  },
  {
    label: "Plan",
    accessor: "plan",
    width: { mobile: "100px", desktop: "150px" },
    formatter: (value: string) => {
      const statusColor: Record<string, string> = {
        Monthly: "bg-[#E3EDF4] text-[#3A5E7A]",
        Yearly: "bg-[#F0EDD8] text-[#B8A255]",
      };

      return (
        <span
          className={
            statusColor[value] + " px-2.5 py-2 rounded-full text-xs font-medium"
          }
        >
          {value}
        </span>
      );
    },
  },
  {
    label: "Card",
    accessor: "card",
    width: { mobile: "100px", desktop: "150px" },
  },
  {
    label: "Subscribed",
    accessor: "subscribedAt",
    width: { mobile: "100px", desktop: "150px" },
  },
 
  {
    label: "Status",
    accessor: "status",
    width: { mobile: "100px", desktop: "150px" },
    formatter: (value: string) => {
      const statusColor: Record<string, string> = {
        Active: "bg-[#E9FFE1] text-[#587A50] ",
        Inactive: "bg-[#FFFAE9] text-[#5C473B] ",
        Pending: "bg-[#FFFAE9] text-[#5C473B] ",
      };

      return (
        <span
          className={
            statusColor[value] +
            "  px-2.5 py-2 rounded-full text-xs font-medium flex items-center w-fit"
          }
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full mr-2 ",
              value === "Active"
                ? "bg-[#587A50] "
                : value === "Inactive"
                  ? "bg-[#5C473B] "
                  : "bg-[#5C473B] ",
            )}
          />
          {value}
        </span>
      );
    },
  },
];
