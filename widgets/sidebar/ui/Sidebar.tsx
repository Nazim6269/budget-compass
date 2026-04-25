import LogoutIcon from "@/shared/ui/icons/LogoutIcon";
import Setting from "@/shared/ui/icons/Setting";
import StackIcon from "@/shared/ui/icons/StackIcon";
import SubscriptionIcon from "@/shared/ui/icons/SubscriptionIcon";
import UserIcon from "@/shared/ui/icons/UserIcon";
import Image from "next/image";
import Link from "next/link";
import { sidebarItems } from "../model/constants";

export const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white border-r  flex flex-col">
      {/* Top - Brand */}
      <div className="h-16 flex items-center justify-center px-5 ">
        <div className="relative h-full w-50.5 flex items-center">
          <Image
            src="/site_logo.png"
            alt="Company Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Middle - Navigation */}
      <nav className="flex-1 px-5 py-6 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#4a3a2f]"
          >
            <item.icon />
            <span className="text-white ">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom - Logout */}
      <div className="p-4 border-t">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600">
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
