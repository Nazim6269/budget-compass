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
import { recentUsers, registrationData } from "./data";



const planDistribution: PlanSegment[] = [
  { name: "Monthly Users", value: 60, color: "#5C473B" },
  { name: "Yearly Users", value: 40, color: "#D6C7B2" },
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
      <section className="mb-6 grid grid-cols-1 gap-5  xl:grid-cols-3 ">
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
      <section className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_310px]">
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
