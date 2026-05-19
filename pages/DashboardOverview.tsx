"use client";

import React from "react";
import { Users, CreditCard, DollarSign } from "lucide-react";

import UsersPage from "@/pages/User";
import PlanDistributionChart, {
  PlanSegment,
} from "@/widgets/overview/ui/PlanDistributionChart";
import { MetricCard, RecentUsersTable } from "@/widgets/overview";
import RegistrationsBarChart from "@/widgets/overview/ui/RegistrationBarChart";
import { recentUsers, registrationData } from "@/widgets/overview/ui/data";
import { useModal } from "@/shared/model/useModal";
import { LogoutConfirmModal } from "@/features/auth/ui/LogoutConfirmModal";
import { authService } from "@/shared/config/container";
import { useRouter } from "next/navigation";

const planDistribution: PlanSegment[] = [
  { name: "Monthly Users", value: 60, color: "#5C473B" },
  { name: "Yearly Users", value: 40, color: "#D6C7B2" },
];

export default function DashboardOverview() {
  const logoutModal = useModal();
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = React.useState(false);

  React.useEffect(() => {
    (window as any).__showDashboardLogoutModal = () => {
      logoutModal.openModal();
    };
    return () => {
      delete (window as any).__showDashboardLogoutModal;
    };
  }, [logoutModal]);

  const handleConfirmLogout = async () => {
    setLogoutLoading(true);
    try {
      await authService.logout();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLogoutLoading(false);
      logoutModal.closeModal();
    }
  };

  return (
    <main className="min-h-screen  font-sans">
      <header className="mb-6">
        <h1 className="text-xl sm:text-[2rem] font-semibold text-headingColor tracking-tight">
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
      {/* <UsersPage /> */}
      {logoutModal.isOpen && (
        <LogoutConfirmModal
          isOpen={logoutModal.isOpen}
          onClose={logoutModal.closeModal}
          onConfirm={handleConfirmLogout}
          loading={logoutLoading}
        />
      )}
    </main>
  );
}
