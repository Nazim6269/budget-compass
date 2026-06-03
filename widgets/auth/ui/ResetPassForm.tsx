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

const schema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters"),
  new_password: z.string().min(8, "Password must be at least 8 characters"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number"),
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
    },
  });

  const newPasswordValue = watch("new_password") ?? "";

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data, "reset");
      // await resetPassword({
      //   email,
      //   token: data.otp,
      //   password: data.new_password,
      // });

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
          placeholder="Enter your new password"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm mb-2"
          error={errors.new_password?.message}
          {...register("new_password")}
        />
      </div>

      {/* Password Strength Indicator */}
      {/* <PasswordStrength password={newPasswordValue} /> */}

      {/* Submit Button */}
      <GenericButton
        title={isPending ? "Resetting..." : "Reset password"}
        onClick={() => handleSubmit(onSubmit)}
        size="mlarge"
        className="w-full flex items-center justify-center gap-2"
        icon={
          isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined
        }
      />
    </form>
  );
}
