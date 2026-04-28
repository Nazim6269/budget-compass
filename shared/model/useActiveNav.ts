import { usePathname } from "next/navigation";

export function useActiveNav() {
  const pathName = usePathname();
  const isActive = (path: string, exact: boolean = true) => {
    return exact ? pathName === path : pathName?.startsWith(path);
  };
  return { isActive, pathName };
}
