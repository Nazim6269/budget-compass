"use client";

import { GenericSearch } from "@/shared/ui/GenericSearch";
import Notification from "@/shared/ui/icons/Notification";
import Image from "next/image";
import { NAV_CONFIG } from "../../sidebar/config/navigation";
import { useRouter } from "next/navigation";

function searchNav(query: string) {
  const result = NAV_CONFIG.flatMap((group) => group.items).filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );
  return result;
}

export const Topbar = () => {
  const router = useRouter();
  return (
    <header className="w-full border-b border-lineBorder flex items-center justify-between gap-4 p-3 sm:p-6">
      {/* Left - Search */}
      <div className="flex-1 hidden sm:flex">
        <GenericSearch
          onSelect={(item: any) => {
            router.push(item.href);
          }}
          onSearch={(query: string) => searchNav(query)}
          className="max-w-md"
          placeholder="Quick Search..."
          size="md"
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Icon */}
        <button className="flex justify-center items-center rounded-full bg-primaryBg hover:bg-gray-100 h-12 w-12  ">
          <Notification />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-full h-12 w-12">
          <Image
            src={"/user.png"}
            alt="user"
            width={48}
            height={48}
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </header>
  );
};
