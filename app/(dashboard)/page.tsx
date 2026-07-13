import DashboardOverview from "@/views/DashboardOverview";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center text-headingColor">Loading...</div>}>
      <DashboardOverview />
    </Suspense>
  );
}
