"use client";

import React, { useMemo } from "react";
import {
  FilterProvider, FilterBar, ActiveFilterTags,
  GenericSearchFilter, GenericSelectFilter, GenericMultiSelectFilter,
  GenericDateRangeFilter, GenericNumberRangeFilter,
  useFilterContext, buildClientPredicate, buildApiQueryString,
} from "@/features/filters2";
import { USER_FILTER_CONFIGS, USER_API_KEY_MAP } from "@/features/filters2/config/filterConfig";

type User = {
  id: string; name: string; email: string;
  status: string; plan: string; tags: string[];
  createdAt: string; revenue: number;
};

const USERS: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@acme.com", status: "active", plan: "pro", tags: ["vip"], createdAt: "2024-01-15", revenue: 2400 },
  { id: "2", name: "Bob Smith", email: "bob@corp.io", status: "inactive", plan: "free", tags: ["beta"], createdAt: "2024-03-22", revenue: 0 },
  { id: "3", name: "Carol White", email: "carol@example.com", status: "active", plan: "enterprise", tags: ["vip", "support_priority"], createdAt: "2023-11-08", revenue: 12000 },
  { id: "4", name: "Dave Brown", email: "dave@startup.com", status: "pending", plan: "starter", tags: ["early_adopter"], createdAt: "2024-06-01", revenue: 480 },
  { id: "5", name: "Eva Green", email: "eva@digital.co", status: "active", plan: "pro", tags: [], createdAt: "2024-02-14", revenue: 1800 },
  { id: "6", name: "Frank Ito", email: "frank@agency.net", status: "suspended", plan: "pro", tags: ["beta"], createdAt: "2023-09-30", revenue: 960 },
  { id: "7", name: "Grace Liu", email: "grace@cloudco.com", status: "active", plan: "enterprise", tags: ["vip", "beta"], createdAt: "2024-04-18", revenue: 8400 },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-slate-100 text-slate-500 border-slate-200",
  suspended: "bg-red-50 text-red-600 border-red-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
};

const PLAN_STYLES: Record<string, string> = {
  free: "bg-slate-100 text-slate-600",
  starter: "bg-sky-50 text-sky-700",
  pro: "bg-violet-50 text-violet-700",
  enterprise: "bg-amber-50 text-amber-700",
};

function UsersTable() {
  const { filters } = useFilterContext();
  const visibleUsers = useMemo(() => {
    const predicate = buildClientPredicate<User>(USER_FILTER_CONFIGS, filters);
    return USERS.filter((user) => {
      if (!predicate(user)) return false;
      const planFilter = filters["plan"] as string[] | null;
      if (planFilter?.length && !planFilter.includes(user.plan)) return false;
      const tagsFilter = filters["tags"] as string[] | null;
      if (tagsFilter?.length && !tagsFilter.some((t) => user.tags.includes(t))) return false;
      return true;
    });
  }, [filters]);

  if (visibleUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <p className="text-sm font-medium text-slate-500">No users match your filters.</p>
        <p className="mt-1 text-xs text-slate-400">Try adjusting or clearing your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-slate-700/60 dark:bg-slate-800/50">
            {["Name", "Status", "Plan", "Tags", "Joined", "Revenue"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
          {visibleUsers.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                <div className="text-xs text-slate-400">{user.email}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[user.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold capitalize ${PLAN_STYLES[user.plan] ?? "bg-slate-100 text-slate-600"}`}>
                  {user.plan}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {user.tags.length
                    ? user.tags.map((t) => (
                        <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                          {t.replace("_", " ")}
                        </span>
                      ))
                    : <span className="text-slate-300">—</span>}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </td>
              <td className="px-4 py-3 font-mono font-medium text-slate-900 dark:text-slate-100">
                ${user.revenue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-400 dark:border-slate-700/60">
        Showing {visibleUsers.length} of {USERS.length} users
      </div>
    </div>
  );
}

function ApiQueryDebug() {
  const { filters, isDefaultState } = useFilterContext();
  const qs = useMemo(
    () => buildApiQueryString(USER_FILTER_CONFIGS, filters, USER_API_KEY_MAP),
    [filters]
  );
  if (isDefaultState) return null;
  return (
    <details className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-800 dark:bg-indigo-950/20">
      <summary className="cursor-pointer text-xs font-medium text-indigo-500">🔍 Server-side query string (debug)</summary>
      <code className="mt-2 block break-all font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
        GET /api/users?{qs}
      </code>
    </details>
  );
}

export default function UsersPage() {
  return (
    <FilterProvider configs={USER_FILTER_CONFIGS} syncUrl={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 dark:from-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-6xl space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Users</h1>
            <p className="mt-1 text-sm text-slate-500">Manage and filter your user base.</p>
          </div>

          <FilterBar>
            <GenericSearchFilter filterKey="search" className="w-64" />
            <GenericSelectFilter filterKey="status" />
            <GenericMultiSelectFilter filterKey="plan" />
            <GenericMultiSelectFilter filterKey="tags" />
            <GenericDateRangeFilter filterKey="createdAt" />
            <GenericNumberRangeFilter filterKey="revenue" />
          </FilterBar>

          <ActiveFilterTags />
          <ApiQueryDebug />
          <UsersTable />
        </div>
      </div>
    </FilterProvider>
  );
}