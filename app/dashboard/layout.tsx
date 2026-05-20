import type { Metadata } from "next";
import { Topbar } from "@/widgets/topbar/ui/TopBar";
import { AppSidebar } from "@/widgets/sidebar/ui/AppSidebar";
import { DashboardGuard } from "@/shared/DashboardGuard";
import { Providers } from "@/shared/Providers";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning={true}>
        <DashboardGuard>
          <Providers>
            <div className="min-h-full flex w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-auto p-3 sm:p-5 bg-secondaryBg">
                  {children}
                  <Toaster richColors position="top-right" />
                </main>
              </div>
            </div>
          </Providers>
        </DashboardGuard>
      </body>
    </html>
  );
}
