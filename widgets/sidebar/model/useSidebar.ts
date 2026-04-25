"use client";

import { useBreakpoint } from "@/shared";
import { useCallback, useEffect, useRef, useState } from "react";


export interface UseSidebarOptions {
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface UseSidebarReturn {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  toggleCollapsed: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  sidebarRef: React.RefObject<HTMLElement>;
}


export function useSidebar(options: UseSidebarOptions = {}): UseSidebarReturn {
  const { defaultCollapsed = false, collapsed: controlledCollapsed, onCollapsedChange } = options;
  const isControlled = controlledCollapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = isControlled ? (controlledCollapsed as boolean) : internalCollapsed;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null!);
  const { isMobile, isTablet } = useBreakpoint();
  const prevBreakpointRef = useRef({ isMobile, isTablet });

  useEffect(() => {
    const prev = prevBreakpointRef.current;

    if (!prev.isTablet && isTablet && !isMobile) {
      applyCollapsed(true);
    }

    if (prev.isTablet && !isTablet && !isMobile) {
      applyCollapsed(false);
    }

    if (!prev.isMobile && isMobile) {
      setIsMobileOpen(false);
    }

    prevBreakpointRef.current = { isMobile, isTablet };
  }, [isMobile, isTablet]);

  useEffect(() => {
    const handleRouteChange = () => setIsMobileOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handler = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobileOpen]);
  useEffect(() => {
    if (!isMobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isMobileOpen]);


  function applyCollapsed(next: boolean) {
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  const toggleCollapsed = useCallback(() => {
    applyCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const toggleMobile = useCallback(() => setIsMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return {
    isCollapsed,
    isMobileOpen,
    isMobile,
    toggleCollapsed,
    toggleMobile,
    closeMobile,
    sidebarRef,
  };
}