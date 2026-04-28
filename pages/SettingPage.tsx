"use client";
import { AdminProfile, ChangePassword } from "@/widgets/setting";

const SettingPage = () => {
  return (
    <div>
      <div className="p-3 sm:p-6 rounded-lg bg-white border border-[#DFE&E3] space-y-6">
        <AdminProfile />
        <ChangePassword />
      </div>
    </div>
  );
};

export default SettingPage;
