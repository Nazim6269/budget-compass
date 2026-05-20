import type { Metadata } from "next";
import { Topbar } from "@/widgets/topbar/ui/TopBar";
import { AppSidebar } from "@/widgets/sidebar/ui/AppSidebar";
import { DashboardGuard } from "@/shared/DashboardGuard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard for Bendrummond",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardGuard>
      <div className="min-h-full flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-auto p-3 sm:p-5 bg-secondaryBg">
            {children}
          </main>
        </div>
      </div>
    </DashboardGuard>
  );
}
