"use client";

import React from "react";
import { Users, CreditCard, DollarSign } from "lucide-react";
import RegistrationsBarChart, {
  DateRangeOption,
  RegistrationDataPoint,
} from "./RegistrationBarChart";
import PlanDistributionChart, { PlanSegment } from "./PlanDistributionChart";
import RecentUsersTable, { UserRecord } from "./RecentUsersTable";
import MetricCard from "./MetricCard";

// ─── Data ──────────────────────────────────────────────────────────────────

const registrationData: Record<DateRangeOption, RegistrationDataPoint[]> = {
  "Last 3 months": [
    { month: "Apr", registrations: 42 },
    { month: "May", registrations: 63 },
    { month: "Jun", registrations: 51 },
  ],
  "Last 6 months": [
    { month: "Jan", registrations: 22 },
    { month: "Feb", registrations: 68 },
    { month: "Mar", registrations: 41 },
    { month: "Apr", registrations: 47 },
    { month: "May", registrations: 63 },
    { month: "Jun", registrations: 51 },
  ],
  "Last 12 months": [
    { month: "Jul", registrations: 14 },
    { month: "Aug", registrations: 28 },
    { month: "Sep", registrations: 35 },
    { month: "Oct", registrations: 52 },
    { month: "Nov", registrations: 44 },
    { month: "Dec", registrations: 38 },
    { month: "Jan", registrations: 22 },
    { month: "Feb", registrations: 68 },
    { month: "Mar", registrations: 41 },
    { month: "Apr", registrations: 47 },
    { month: "May", registrations: 63 },
    { month: "Jun", registrations: 51 },
  ],
};

const planDistribution: PlanSegment[] = [
  { name: "Monthly Users", value: 60, color: "#44403c" },
  { name: "Yearly Users", value: 40, color: "#d6d3d1" },
];

const recentUsers: UserRecord[] = [
  {
    id: "1",
    name: "Cameron Williamson",
    email: "alice@example.com",
    plan: "Monthly",
    subscribedAt: "2024-01-15",
    safeToSpend: 120,
    status: "Active",
  },
  {
    id: "2",
    name: "Niloy Tata",
    email: "niloy@example.com",
    plan: "Yearly",
    subscribedAt: "2024-02-18",
    safeToSpend: 250,
    status: "Active",
  },
  {
    id: "3",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    plan: "Monthly",
    subscribedAt: "2024-03-22",
    safeToSpend: 340,
    status: "Active",
  },
  {
    id: "4",
    name: "Liam O'Connor",
    email: "liam.oconnor@example.com",
    plan: "Yearly",
    subscribedAt: "2024-04-27",
    safeToSpend: 410,
    status: "Inactive",
  },
  {
    id: "5",
    name: "Isabella Martinez",
    email: "isabella.m@example.com",
    plan: "Enterprise",
    subscribedAt: "2024-05-03",
    safeToSpend: 980,
    status: "Active",
  },
  {
    id: "6",
    name: "Wei Zhang",
    email: "wei.zhang@example.com",
    plan: "Monthly",
    subscribedAt: "2024-05-19",
    safeToSpend: 75,
    status: "Pending",
  },
];


export default function DashboardOverview() {
  return (
    <main className="min-h-screen  font-sans">
      <header className="mb-6">
        <h1 className="text-[2rem] font-semibold text-headingColor tracking-tight">
          Dashboard Overview
        </h1>
      </header>

      {/* ── Metric Cards ── */}
      <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 ">
        <MetricCard
          title="Total Users"
          value={247}
          icon={Users}
          trend={{
            value: "+12 this month",
            direction: "up",
            label: "vs last month",
          }}
        />
        <MetricCard
          title="Active Subscriptions"
          value={11}
          icon={CreditCard}
          trend={{ value: "4% of total", direction: "neutral" }}
        />
        <MetricCard
          title="Total Revenue"
          value="$4,580"
          icon={DollarSign}
          trend={{ value: "-1.2%", direction: "down", label: "vs last period" }}
        />
      </section>

      {/* ── Charts ── */}
      <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <RegistrationsBarChart
          data={registrationData}
          defaultRange="Last 6 months"
        />
        <PlanDistributionChart data={planDistribution} />
      </section>

      {/* ── Table ── */}
      <section>
        <RecentUsersTable data={recentUsers} />
      </section>
    </main>
  );
}
