import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangePasswordParams, LoginParams, UpdateProfileParams } from "./authType";
// import { authService } from "@/shared/config/container";
import { authKeys } from "./authKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ── Dummy Data ───────────────────────────────────────────────────────────────

const dummyUser = {
  email: "admin@budgetcompass.com",
  name: "Admin User",
  firstName: "Admin",
  lastName: "User",
  phone_number: "+1 (555) 123-4567",
  avatar_url: "",
  type: "admin",
};

const dummyToken = "dummy-access-token-xxxxx";

// ── Hooks (Dummy) ────────────────────────────────────────────────────────────

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // ── ORIGINAL: mutationFn: (params: LoginParams) => authService.login(params),
    mutationFn: async (params: LoginParams) => {
      await new Promise((r) => setTimeout(r, 500));
      return { access_token: dummyToken, user: { email: params.email, type: "admin" } };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (err) => {
      toast.error(err.message || "Login Failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    // ── ORIGINAL: mutationFn: () => authService.logout(),
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Logout Failed");
    },
  });
};

export const useForgetPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    // ── ORIGINAL: mutationFn: (email: string) => authService.forgetPassword(email),
    mutationFn: async (email: string) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "OTP sent to email" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/otp");
    },
    onError: (err) => {
      toast.error(err.message || "Forget Password Failed");
    },
  });
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // ── ORIGINAL: mutationFn: (params: { email: string; password: string; token: string }) =>
    // ──   authService.resetPassword(params),
    mutationFn: async (params: { email: string; password: string; token: string }) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "Password reset successfully" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (err) => {
      toast.error(err.message || "Reset Password Failed");
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    // ── ORIGINAL: mutationFn: (data: ChangePasswordParams) => authService.changePassword(data),
    mutationFn: async (data: ChangePasswordParams) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "Password changed successfully" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Change Password Failed");
    },
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    // ── ORIGINAL: mutationFn: (params: { email: string; token: string }) =>
    // ──   authService.verifyEmail(params),
    mutationFn: async (params: { email: string; token: string }) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "Email verified" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/reset-password");
    },
    onError: (err) => {
      toast.error(err.message || "Verify Email Failed");
    },
  });
};

export const useResendEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // ── ORIGINAL: mutationFn: (email: string) => authService.resendVerifyEmail(email),
    mutationFn: async (email: string) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "OTP resent" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (err) => {
      toast.error(err.message || "Resend Email Failed");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: authKeys.me(),
    // ── ORIGINAL: queryFn: () => authService.getMe(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return { data: dummyUser } as any;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // ── ORIGINAL: mutationFn: (data: UpdateProfileParams | FormData) => authService.updateProfile(data),
    mutationFn: async (data: UpdateProfileParams | FormData) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "Profile updated successfully" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      queryClient.invalidateQueries({ queryKey: authKeys.updateProfile() });
    },
    onError: (err) => {
      toast.error(err.message || "Update Profile Failed");
    },
  });
};

export const resetPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    // ── ORIGINAL: mutationFn: (data: any) => authService.resetPassword(data),
    mutationFn: async (data: any) => {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, message: "Password reset successfully" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.resetPassword() });
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Reset Password Failed");
    },
  });
};
