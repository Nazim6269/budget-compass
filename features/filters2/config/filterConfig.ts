import type { FilterConfig } from "@/features/filters2";

async function fetchTagOptions() {
  await new Promise((r) => setTimeout(r, 600));
  return [
    { label: "VIP", value: "vip" },
    { label: "Beta Tester", value: "beta" },
    { label: "Early Adopter", value: "early_adopter" },
    { label: "Support Priority", value: "support_priority" },
  ];
}

export const USER_FILTER_CONFIGS: FilterConfig[] = [
  {
    key: "search",
    type: "search",
    label: "Search",
    placeholder: "Search by name, email…",
    debounceMs: 350,
  },
  {
    key: "status",
    type: "select",
    label: "Status",
    placeholder: "All statuses",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Suspended", value: "suspended" },
      { label: "Pending", value: "pending" },
    ],
  },
  {
    key: "plan",
    type: "multi-select",
    label: "Plan",
    placeholder: "All plans",
    maxSelected: 3,
    options: [
      { label: "Free", value: "free" },
      { label: "Starter", value: "starter" },
      { label: "Pro", value: "pro" },
      { label: "Enterprise", value: "enterprise" },
    ],
  },
  {
    key: "tags",
    type: "multi-select",
    label: "Tags",
    placeholder: "Any tag",
    options: fetchTagOptions, // async
  },
  {
    key: "createdAt",
    type: "date-range",
    label: "Joined",
    placeholder: { from: "From", to: "To" },
    maxDate: new Date().toISOString().split("T")[0],
  },
  {
    key: "revenue",
    type: "number-range",
    label: "Revenue",
    unit: "$",
    min: 0,
    placeholder: { min: "0", max: "Max" },
  },
];

export const USER_MANAGEMENT_FILTER_CONFIGS: FilterConfig[] = [
  
  {
    key: "status",
    type: "select",
    label: "Status",
    placeholder: "All statuses",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
      { label: "Pending", value: "Pending" },
    ],
  },
  {
    key: "plan",
    type: "multi-select",
    label: "Plan",
    placeholder: "All plans",
    maxSelected: 3,
    options: [
      { label: "Monthly", value: "Monthly" },
      { label: "Yearly", value: "Yearly" },
      { label: "Enterprise", value: "Enterprise" },
    ],
  },
  {
    key: "billingCycle",
    type: "select",
    label: "Billing Cycle",
    placeholder: "All cycles",
    options:[
      {label:"Yearly", value:"Yearly"},
      {label:"Monthly", value:"Monthly"},
    ]
  },
  {
    key: "subscribedAt",
    type: "date-range",
    label: "Joined",
    placeholder: { from: "From", to: "To" },
    maxDate: new Date().toISOString().split("T")[0],
  }
];

export const USER_API_KEY_MAP: Record<string, string> = {
  search: "q",
  createdAt: "created_at",
};