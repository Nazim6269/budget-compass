import GenericButton from "@/shared/ui/GenericButton";
import React from "react";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-900">
          Are you sure you want to log out?
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          You will be signed out from your account.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row  justify-end gap-3">
          <GenericButton
            title="Cancel"
            variant="transparent"
            onClick={onClose}
            size="small"
            className="w-full"
          />

          <GenericButton
            title={loading ? "Logging out..." : "Logout"}
            variant="red"
            onClick={onConfirm}
            size="small"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
