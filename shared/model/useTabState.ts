"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export interface UseTabStateOptions {
  paramKey?: string;
  defaultTab: string;
  validTabs: readonly string[];
  replace?: boolean;
  scroll?: boolean;
}

export interface UseTabStateReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isActive: (tab: string) => boolean;
}


export function useTabState({
  paramKey = "tab",
  defaultTab,
  validTabs,
  replace = true,
  scroll = false,
}: UseTabStateOptions): UseTabStateReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = useMemo(() => {
    const param = searchParams.get(paramKey);
    return param && (validTabs as string[]).includes(param) ? param : defaultTab;
  }, [searchParams, paramKey, validTabs, defaultTab]);

  const setActiveTab = useCallback(
    (tab: string) => {
      if (!(validTabs as string[]).includes(tab)) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[useTabState] "${tab}" is not in validTabs. Ignoring.`
          );
        }
        return;
      }

      if (tab === activeTab) return;

      const params = new URLSearchParams(searchParams.toString());

      if (tab === defaultTab) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, tab);
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      replace
        ? router.replace(url, { scroll })
        : router.push(url, { scroll });
    },
    [activeTab, defaultTab, paramKey, pathname, replace, router, scroll, searchParams, validTabs]
  );

  const isActive = useCallback(
    (tab: string) => tab === activeTab,
    [activeTab]
  );

  return { activeTab, setActiveTab, isActive };
}