import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "./notificationKeys";
import { container } from "@/shared/config/container";
import { toast } from "sonner";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: () => container.notificationService.getAll(),
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => container.notificationService.deleteAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toast.success("All notifications deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete notifications");
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => container.notificationService.deleteOne(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toast.success("Notification deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete notification");
    },
  });
};
