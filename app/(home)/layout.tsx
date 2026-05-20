import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Bendrummond",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
    </div>
  );
}
