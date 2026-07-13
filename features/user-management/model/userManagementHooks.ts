import { useQuery } from "@tanstack/react-query";
import { userManagementKeys } from "./userManagementKeys";
// import { container } from "@/shared/config/container";

// ── Dummy Data ───────────────────────────────────────────────────────────────

const dummyUsers = [
  { id: "1", name: "John Smith", email: "john.smith@example.com", plan: "Monthly", status: "Active", safeToSpend: 1200, subscriptionDate: "2025-01-15" },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@example.com", plan: "Yearly", status: "Active", safeToSpend: 850, subscriptionDate: "2024-11-20" },
  { id: "3", name: "Mike Williams", email: "mike.w@example.com", plan: "Monthly", status: "Active", safeToSpend: 320, subscriptionDate: "2025-03-01" },
  { id: "4", name: "Emily Brown", email: "emily.b@example.com", plan: "Yearly", status: "Inactive", safeToSpend: 0, subscriptionDate: "2024-08-10" },
  { id: "5", name: "David Lee", email: "david.l@example.com", plan: "Monthly", status: "Active", safeToSpend: 1540, subscriptionDate: "2025-02-14" },
  { id: "6", name: "Lisa Chen", email: "lisa.c@example.com", plan: "Monthly", status: "Pending", safeToSpend: 60, subscriptionDate: "2025-06-01" },
  { id: "7", name: "James Wilson", email: "james.w@example.com", plan: "Yearly", status: "Active", safeToSpend: 430, subscriptionDate: "2024-12-05" },
  { id: "8", name: "Anna Garcia", email: "anna.g@example.com", plan: "Monthly", status: "Active", safeToSpend: 780, subscriptionDate: "2025-04-18" },
  { id: "9", name: "Robert Martinez", email: "robert.m@example.com", plan: "Monthly", status: "Inactive", safeToSpend: 0, subscriptionDate: "2024-09-22" },
  { id: "10", name: "Jennifer Taylor", email: "jennifer.t@example.com", plan: "Yearly", status: "Active", safeToSpend: 1100, subscriptionDate: "2025-01-30" },
  { id: "11", name: "Chris Anderson", email: "chris.a@example.com", plan: "Monthly", status: "Active", safeToSpend: 250, subscriptionDate: "2025-05-12" },
  { id: "12", name: "Michelle Thomas", email: "michelle.t@example.com", plan: "Monthly", status: "Pending", safeToSpend: 60, subscriptionDate: "2025-06-28" },
];

// ── Hooks (Dummy) ────────────────────────────────────────────────────────────

export const useGetUsers = () => {
  return useQuery({
    queryKey: userManagementKeys.all,
    // ── ORIGINAL: queryFn: () => container.userManagementService.getAllUsers()
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return dummyUsers;
    },
  });
};
