import type { Metadata } from "next";
import Navbar from "@/widgets/marketing/ui/Navbar";
import Footer from "@/widgets/marketing/ui/Footer";

export const metadata: Metadata = {
  title: "BudgetCompass - Know Your Safe to Spend",
  description: "Smart personal finance and budgeting. Track bills, goals, and debt. Know exactly what you can safely spend.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
