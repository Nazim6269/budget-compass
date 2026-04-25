"use client";

import { GenericSearch } from "@/shared/ui/GenericSearch";
import Notification from "@/shared/ui/icons/Notification";
import Image from "next/image";

export const Topbar = () => {
  return (
    <header className="w-full border-b border-lineBorder flex items-center justify-between gap-4 p-6">
      {/* Left - Search */}
      <div className="flex-1">
        <GenericSearch
          onSelect={() => {}}
          onSearch={() => []}
          className="max-w-md"
          placeholder="Quick Search..."
          size="lg"
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
