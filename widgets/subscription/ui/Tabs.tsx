"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  type ReactNode,
  type KeyboardEvent,
} from "react";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`<${componentName}> must be used inside <Tabs.Root>`);
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

interface RootProps {
  /** The currently active tab value (controlled) */
  value: string;
  /** Called when the user selects a different tab */
  onChange: (tab: string) => void;
  children: ReactNode;
  className?: string;
}

function Root({ value, onChange, children, className }: RootProps) {
  const ctx = useMemo<TabsContextValue>(
    () => ({ activeTab: value, setActiveTab: onChange }),
    [value, onChange]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// List  (the tab bar)
// ---------------------------------------------------------------------------

interface ListProps {
  children: ReactNode;
  className?: string;
  /** aria-label for the tablist. Defaults to "Tabs" */
  label?: string;
}

function List({ children, className, label = "Tabs" }: ListProps) {
  return (
    <div role="tablist" aria-label={label} className={className}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Trigger  (a single tab button)
// ---------------------------------------------------------------------------

interface TriggerProps {
  /** Must match the value prop on the corresponding <Tabs.Panel> */
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  /**
   * Render prop pattern — gives full control over styling.
   * Receives { isActive, isDisabled } so callers can apply conditional classes.
   */
  render?: (props: {
    isActive: boolean;
    isDisabled: boolean;
    onClick: () => void;
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
    role: string;
    "aria-selected": boolean;
    "aria-controls": string;
    id: string;
    tabIndex: number;
    disabled: boolean;
    children: ReactNode;
  }) => ReactNode;
}

function Trigger({ value, children, className, disabled = false, render }: TriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext("Tabs.Trigger");
  const isActive = activeTab === value;

  const handleClick = useCallback(() => {
    if (!disabled) setActiveTab(value);
  }, [disabled, setActiveTab, value]);

  // Keyboard: Enter / Space activate; Arrow keys can be handled at List level
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled) setActiveTab(value);
      }
    },
    [disabled, setActiveTab, value]
  );

  const sharedProps = {
    role: "tab",
    "aria-selected": isActive,
    "aria-controls": `tabpanel-${value}`,
    id: `tab-${value}`,
    tabIndex: isActive ? 0 : -1,
    disabled,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    children,
  };

  if (render) {
    return <>{render({ ...sharedProps, isActive, isDisabled: disabled })}</>;
  }

  return (
    <button {...sharedProps} className={className}>
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Panel  (the content area)
// ---------------------------------------------------------------------------

interface PanelProps {
  /** Must match the value prop on the corresponding <Tabs.Trigger> */
  value: string;
  children: ReactNode;
  className?: string;
  /**
   * "lazy"  — unmount inactive panels (default, better for performance)
   * "eager" — keep all panels in the DOM (hidden via aria-hidden + CSS)
   */
  strategy?: "lazy" | "eager";
}

function Panel({ value, children, className, strategy = "lazy" }: PanelProps) {
  const { activeTab } = useTabsContext("Tabs.Panel");
  const isActive = activeTab === value;

  if (strategy === "lazy" && !isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={strategy === "eager" ? !isActive : undefined}
      className={className}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public API — compound component namespace
// ---------------------------------------------------------------------------

export const Tabs = { Root, List, Trigger, Panel };

// Re-export the context hook for advanced use cases (e.g. custom triggers)
export { useTabsContext };