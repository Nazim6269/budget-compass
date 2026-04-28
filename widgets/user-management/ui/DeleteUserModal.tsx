import React from "react";
import { GenericModal } from "@/shared/ui/GenericModal";
import GenericButton from "@/shared/ui/GenericButton";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm: (userId: string) => void;
  isLoading?: boolean;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  isLoading = false,
}) => {
  if (!user) return null;

  const handleConfirm = () => {
    onConfirm(user.id);
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete User"
      size="sm"
    >
      <div className="space-y-6">
        {/* Warning Message */}
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800">
              Are you sure you want to delete this user?
            </h3>
            <p className="text-sm text-red-600 mt-1">
              This action cannot be undone. All user data will be permanently removed.
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You are about to delete:
          </p>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <GenericButton
            title="Cancel"
            onClick={onClose}
            variant="cream"
            size="large"
          />
          <GenericButton
            title="Delete User"
            onClick={handleConfirm}
            variant="brown"
            size="large"
          />
        </div>
      </div>
    </GenericModal>
  );
};
