"use client";

import { useTabState } from "@/shared";
import { StyledTabs } from "./StyledTabs";
import { Tabs } from "./Tabs";
import BillingHistoryPanel from "./BillingHistoryPanel";
import UpdatePanel from "./UpdatePanel";
import SubiscriptionPanel from "./SubiscriptionPanel";


const TABS = ["subscription plans", "update plans", "billing history"] as const;
type SettingsTab = (typeof TABS)[number];
const DEFAULT_TAB: SettingsTab = "subscription plans";

const TAB_CONFIG = [
  { value: "subscription plans",       label: "Subscription Plans",       icon: "" },
  { value: "update plans",      label: "Update Plans",      icon: "" },
  { value: "billing history", label: "Billing History", icon: "", badge: 3 },
 
] satisfies Array<{ value: SettingsTab; label: string; icon?: string; badge?: number }>;



export function SubscriptionTabs() {
  const { activeTab, setActiveTab } = useTabState({
    defaultTab: DEFAULT_TAB,
    validTabs: TABS,
    paramKey: "tab",
    replace: true,
  });

  return (
    <StyledTabs
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TAB_CONFIG}
      variant="underline"
    >
      {/* "lazy" strategy (default): unmounts inactive panels */}
      <Tabs.Panel value="subscription plans">
        <SubiscriptionPanel />
      </Tabs.Panel>

      <Tabs.Panel value="update plans">
        <UpdatePanel />
      </Tabs.Panel>

      {/*
        "eager" strategy: keeps panel mounted but hidden via aria-hidden.
        Use for panels with expensive initialisation (charts, editors)
        that you want to keep alive.
      */}
      <Tabs.Panel value="billing history" strategy="eager">
        <BillingHistoryPanel />
      </Tabs.Panel>

    </StyledTabs>
  );
}
