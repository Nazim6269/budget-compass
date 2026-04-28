"use client";



import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Tabs } from "./Tabs";


export interface TabItem {
    value: string;
    label: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    badge?: ReactNode;
}

interface StyledTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    tabs: TabItem[];
    children: ReactNode;
    variant?: "underline" | "pill" | "boxed";
    className?: string;
}


const listVariants: Record<string, string> = {
    underline: "flex border-b border-[#CACACA] gap-0 overflow-x-auto sm:overflow-x-visible",
    pill: "flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit overflow-x-auto sm:overflow-x-visible",
    boxed: "flex border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden divide-x divide-neutral-200 dark:divide-neutral-700 overflow-x-auto sm:overflow-x-visible",
};

const triggerVariants: Record<
    string,
    { base: string; active: string; inactive: string }
> = {
    underline: {
        base: "cursor-pointer relative inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-base whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-t-md -mb-px border-b-2",
        active:
            "border-textPrimary text-textPrimary font-semibold",
        inactive:
            "border-transparent text-[#727272] ",
    },
    pill: {
        base: "inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        active:
            "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 shadow-sm",
        inactive:
            "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100",
    },
    boxed: {
        base: "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
        active: "bg-blue-600 text-white",
        inactive:
            "bg-white dark:bg-neutral-900 text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800",
    },
};



export function StyledTabs({
    activeTab,
    onTabChange,
    tabs,
    children,
    variant = "underline",
    className,
}: StyledTabsProps) {
    const tv = triggerVariants[variant];

    return (
        <Tabs.Root value={activeTab} onChange={onTabChange} className={className}>
            <Tabs.List
                className={listVariants[variant]}
                label="Page sections"
            >
                {tabs.map((tab) => (
                    <Tabs.Trigger
                        key={tab.value}
                        value={tab.value}
                        disabled={tab.disabled}
                        children=""
                        render={({ isActive, isDisabled, children: _, ...rest }) => (
                            <button
                                {...rest}
                                className={cn(
                                    tv.base,
                                    isActive ? tv.active : tv.inactive,
                                    isDisabled && "pointer-events-none opacity-40"
                                )}
                            >
                                
                                {tab.label}
                               
                            </button>
                        )}
                    />
                ))}
            </Tabs.List>

            <div className="mt-4">{children}</div>
        </Tabs.Root>
    );
}