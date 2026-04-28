import React from "react";
import { GenericModal } from "@/shared/ui/GenericModal";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
  plan: string;
  subscribedAt: string;
  safeToSpend: string;
}

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const ViewUserModal: React.FC<ViewUserModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!user) return null;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      size="md"
    >
      <div className="space-y-6">
        {/* User Info */}
      
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-textPrimary">User Name</label>
              <h3 className="text-base font-medium text-grayBlack2">{user.name}</h3>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-textPrimary">Email</label>
              <p className="text-base font-medium text-grayBlack2">{user.email}</p>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-textPrimary">Plan</label>
              <p className="text-base font-medium text-grayBlack2">{user.plan}</p>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-textPrimary">Subscribed</label>
              <p className="text-base font-medium text-grayBlack2">{user.subscribedAt}</p>
            </div>
             <div>
              <label htmlFor="email" className="text-sm font-medium text-textPrimary">Safe to Spend</label>
              <p className="text-base font-medium text-grayBlack2">{user.safeToSpend}</p>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-textPrimary">Status</label>
              <p className="text-base font-medium text-grayBlack2">{user.status}</p>
            </div>
          </div>
      </div>
    </GenericModal>
  );
};
