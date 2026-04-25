import LogoutIcon from "@/shared/ui/icons/LogoutIcon";
import Setting from "@/shared/ui/icons/Setting";
import StackIcon from "@/shared/ui/icons/StackIcon";
import SubscriptionIcon from "@/shared/ui/icons/SubscriptionIcon";
import UserIcon from "@/shared/ui/icons/UserIcon";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col">
      {/* Top - Brand */}
      <div className="h-16 flex items-center px-4 ">
        <div className="relative h-full w-36 flex items-center">
          <Image
            src="/site_logo.png"
            alt="Company Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Middle - Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#4a3a2f]"
        >
          <StackIcon />
          <span className="text-white ">Overview</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          <UserIcon />
          <span className="text-grayBlack">User Management</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          <SubscriptionIcon />
          <span className="text-grayBlack">Subscription</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          <Setting />
          <span className="text-grayBlack text-base font-normal leading-4">
            Setting
          </span>
        </a>
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
