import { useQuery } from "@tanstack/react-query";
import { userManagementKeys } from "./userManagementKeys";
import { UserManagementService } from "./userManagementService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: userManagementKeys.all,
    queryFn: () => UserManagementService.getAllUsers()
  });
};
