import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import { useChangePassword } from "@/features/auth/model/authHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import React from "react";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const ChangePassword = () => {
  const { mutateAsync: changePassword, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res: any = await changePassword({
        old_password: data.currentPassword,
        new_password: data.newPassword,
      });
      toast.success(res?.message || "Password changed successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div>
      <h1 className="text-center sm:text-left text-xl text-textPrimary font-bold leading-[120%] tracking-[0.006rem]">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
      >
        <div className="sm:col-span-2">
          <GenericInput
            type="password"
            placeholder="Current Password"
            label="Current Password"
            fullWidth
            size="xmd"
            error={errors.currentPassword?.message}
            labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
            {...register("currentPassword")}
          />
        </div>

        <GenericInput
          type="password"
          placeholder="New Password"
          label="New Password"
          fullWidth
          size="xmd"
          error={errors.newPassword?.message}
          labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
          {...register("newPassword")}
        />

        <GenericInput
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          fullWidth
          size="xmd"
          error={errors.confirmPassword?.message}
          labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
          {...register("confirmPassword")}
        />

        <div className="flex justify-end mt-3 sm:mt-8 sm:col-span-2">
          <GenericButton
            title={isPending ? "Updating..." : "Update Password"}
            type="submit"
            disabled={isPending}
            size="mlarge"
            className="w-full sm:w-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
