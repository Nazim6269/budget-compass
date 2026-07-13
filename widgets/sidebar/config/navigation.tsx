import { Setting, StackIcon, SubscriptionIcon, UserIcon } from "@/shared";


export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: () => React.ReactNode;
  disableWhenCollapsed?: boolean;
  requiresAuth?: boolean;
}

export interface NavGroup {
  id: string;
  label?: string;
  items: NavItem[];
}


export const NAV_CONFIG: NavGroup[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: StackIcon,
      },
      {
        id: "user-management",
        label: "User Management",
        href: "/user-management",
        icon: UserIcon,
      },
      {
        id: "subscription",
        label: "Subscription",
        href: "/subscription",
        icon: SubscriptionIcon,
      },
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Setting,
      },
    ],
  },
  // {
  //   id: "management",
  //   label: "Management",
  //   items: [
  //     {
  //       id: "users",
  //       label: "Users",
  //       href: "/users",
  //       icon: Users,
  //       requiresAuth: true,
  //     },
  //     {
  //       id: "notifications",
  //       label: "Notifications",
  //       href: "/notifications",
  //       icon: Bell,
  //     },
  //   ],
  // },
  // {
  //   id: "system",
  //   label: "System",
  //   items: [
  //     {
  //       id: "settings",
  //       label: "Settings",
  //       href: "/settings",
  //       icon: Settings,
  //     },
  //     {
  //       id: "help",
  //       label: "Help & Support",
  //       href: "/help",
  //       icon: HelpCircle,
  //     },
  //   ],
  // },
];
