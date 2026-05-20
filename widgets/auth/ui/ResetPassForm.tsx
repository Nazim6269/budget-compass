import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import { Loader2 } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isSubmitting: boolean;
  passwordValue: string;
  onSubmit: (e: React.FormEvent) => void;
};

export function ResetPassForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* New Password */}
      <GenericInput
        type="password"
        label="New password"
        placeholder="At least 8 characters"
        fullWidth
        size="xmd"
        labelClassName="text-textPrimary text-xs uppercase tracking-widest mb-2"
        {...register("new_password")}
      />

      {/* Strength */}
      {/* (import PasswordStrength separately) */}

      {/* Confirm Password */}
      <GenericInput
        type="password"
        label="Confirm password"
        placeholder="Repeat password"
        fullWidth
        size="xmd"
        labelClassName="text-textPrimary text-xs uppercase tracking-widest mb-2"
        {...register("confirm_password")}
      />

      {/* Submit */}
      <GenericButton
        title={isSubmitting ? "Resetting..." : "Reset password"}
        onClick={() => {
          onSubmit;
        }}
        size="mlarge"
        className="w-full"
        disabled={isSubmitting}
        icon={
          isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : undefined
        }
      />
    </form>
  );
}
