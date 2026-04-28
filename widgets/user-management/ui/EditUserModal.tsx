import React, { useState } from "react";
import { GenericModal } from "@/shared/ui/GenericModal";
import { GenericInput } from "@/shared/ui/GenericInput";
import GenericButton from "@/shared/ui/GenericButton";
import GenericDropDown from "@/shared/ui/GenericDropdown";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdate: (userData: Partial<User>) => void;
  isLoading?: boolean;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdate,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    status: user?.status || "",
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onUpdate({
        id: user.id,
        ...formData,
      });
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: String(value),
    }));
  };

  if (!user) return null;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <GenericInput
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter user name"
            fullWidth
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <GenericInput
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email address"
            fullWidth
            required
          />
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <GenericDropDown
            options={[
              { label: "Admin", value: "Admin" },
              { label: "User", value: "User" },
              { label: "Manager", value: "Manager" },
            ]}
            placeholder="Select role"
            value={formData.role}
            onValueChange={(value) => handleChange("role", value)}
            className="w-full"
            size="lg"
          />
        </div>

        {/* Status Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <GenericDropDown
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            placeholder="Select status"
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
            className="w-full"
            size="lg"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <GenericButton
            title="Cancel"
            onClick={onClose}
            variant="cream"
            size="large"
          />
          <button
            type="submit"
            className="bg-[#4A3A2F] text-white h-12 p-4 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out flex items-center gap-1.5 cursor-pointer whitespace-nowrap w-fit justify-center"
          >
            Update User
          </button>
        </div>
      </form>
    </GenericModal>
  );
};
