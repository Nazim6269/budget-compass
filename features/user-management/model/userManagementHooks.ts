import { useQuery } from "@tanstack/react-query";
import { userManagementKeys } from "./userManagementKeys";
import { container } from "@/shared/config/container";

export const useGetUsers = () => {
  return useQuery({
    queryKey: userManagementKeys.all,
    queryFn: () => container.userManagementService.getAllUsers()
  });
};
