import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "./notificationKeys";
// import { container } from "@/shared/config/container";
import { toast } from "sonner";
import { NotificationDto } from "./notificationType";

// ── Dummy Data ───────────────────────────────────────────────────────────────

const dummyNotifications: NotificationDto[] = [
  {
    id: 1,
    title: "Welcome to BudgetCompass",
    message: "Your account has been created successfully.",
    type: "info",
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Subscription Active",
    message: "Your monthly plan is now active.",
    type: "success",
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Payment of $3.99 received for monthly plan.",
    type: "info",
    is_read: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

// ── Hooks (Dummy) ────────────────────────────────────────────────────────────

export const useGetNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.all,
    // ── ORIGINAL: queryFn: () => container.notificationService.getAll(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return { data: dummyNotifications };
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // ── ORIGINAL: mutationFn: () => container.notificationService.deleteAll(),
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
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
    // ── ORIGINAL: mutationFn: (id: number) => container.notificationService.deleteOne(id),
    mutationFn: async (id: number) => {
      await new Promise((r) => setTimeout(r, 300));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toast.success("Notification deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete notification");
    },
  });
};
