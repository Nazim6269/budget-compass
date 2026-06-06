import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginParams, UpdateProfileParams } from "./authType";
import { authService } from "@/shared/config/container";
import { authKeys } from "./authKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LoginParams) => authService.login(params),
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
    mutationFn: () => authService.logout(),
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
    mutationFn: (email: string) => authService.forgetPassword(email),
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
    mutationFn: (params: { email: string; password: string; token: string }) =>
      authService.resetPassword(params),
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
    mutationFn: (data: any) => authService.changePassword(data),
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
    mutationFn: (params: { email: string; token: string }) =>
      authService.verifyEmail(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/reset-password");
    },
    onError: (err) => {
      toast.error(err.message || "Change Password Failed");
    },
  });
};

export const useResendEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => authService.resendVerifyEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (err) => {
      toast.error(err.message || "Resend Email Failed");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileParams) => authService.updateProfile(data),
    onSuccess: () => {
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
    mutationFn: (data: any) => authService.resetPassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.resetPassword() });
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Reset Password Failed");
    },
  });
};
