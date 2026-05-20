import { Providers } from "@/shared/Providers";
import type { Metadata } from "next";
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

export default function AuthLayout({
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
      <body>
        <div className="flex-1 flex flex-col min-h-screen">
          <Providers>
            <main className="flex-1 overflow-auto p-3 sm:p-5 ">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
