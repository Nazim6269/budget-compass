import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginParams } from "./authType";
import { authService } from "@/shared/config/container";
import { authKeys } from "./authKeys";
import { toast } from "sonner";
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
