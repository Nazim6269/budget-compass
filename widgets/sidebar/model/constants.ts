import StackIcon from "@/shared/ui/icons/StackIcon";
import UserIcon from "@/shared/ui/icons/UserIcon";
import SubscriptionIcon from "@/shared/ui/icons/SubscriptionIcon";
import Setting from "@/shared/ui/icons/Setting";

export const sidebarItems = [
  {
    id: "overview",
    title: "Overview",
    href: "/dashboard",
    icon: StackIcon,
  },
  {
    id: "user-management",
    title: "User Management",
    href: "/dashboard/user-management",
    icon: UserIcon,
  },
  {
    id: "subscription",
    title: "Subscription",
    href: "/dashboard/subscription",
    icon: SubscriptionIcon,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/dashboard/settings",
    icon: Setting,
  },
];
