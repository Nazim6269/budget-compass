import { useResetPassword } from "@/features/auth/model/authHooks";
import { useAuthResetStore } from "@/features/auth/model/store";
import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import { PasswordStrength } from "./PasswordStrength";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z
  .object({
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof schema>;

export function ResetPassForm() {
  const router = useRouter();
  const { email, otp, clear } = useAuthResetStore();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const passwordValue = watch("new_password") ?? "";

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword({
        email,
        token: otp,
        password: data.new_password,
      });

      toast.success("Password reset successfully!");
      clear();
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* New Password */}
      <div>
        <GenericInput
          type="password"
          label="New password"
          placeholder="At least 8 characters"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          {...register("new_password")}
        />
        {errors.new_password && (
          <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <GenericInput
          type="password"
          label="Confirm password"
          placeholder="Repeat password"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
        )}
      </div>

      {/* Password Strength Indicator */}
      <PasswordStrength password={passwordValue} />

      {/* Submit */}
      <GenericButton
        title={isPending ? "Resetting..." : "Reset password"}
        onClick={handleSubmit(onSubmit)}
        size="mlarge"
        className="w-full flex items-center justify-center gap-2"
        disabled={isPending}
        icon={
          isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : undefined
        }
      />
    </form>
  );
}
