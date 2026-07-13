import UserManagement from "@/views/UserManagement";
import { Suspense } from "react";

const UserManagementPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-headingColor">Loading...</div>}>
      <UserManagement />
    </Suspense>
  );
};

export default UserManagementPage;
