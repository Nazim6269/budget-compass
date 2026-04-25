"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS = {
  md: 768,
  lg: 1024,
} as const;

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

function getBreakpointState(width: number): BreakpointState {
  return {
    width,
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
  };
}

const getInitialWidth = () =>
  typeof window !== "undefined"
    ? document.documentElement.clientWidth
    : BREAKPOINTS.lg;

export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(() =>
    getBreakpointState(getInitialWidth()),
  );

  useEffect(() => {
    const el = document.documentElement;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      setState((prev) => {
        const next = getBreakpointState(width);
        if (
          prev.isMobile === next.isMobile &&
          prev.isTablet === next.isTablet &&
          prev.isDesktop === next.isDesktop
        )
          return prev;
        return next;
      });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return state;
}
