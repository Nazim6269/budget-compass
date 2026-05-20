import { useEffect, useState } from "react";

export function useResendCountdown(seconds = 60) {
  const [count, setCount] = useState(seconds);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    if (count <= 0) {
      setActive(false);
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [count, active]);

  const reset = () => {
    setCount(seconds);
    setActive(true);
  };
  return { count, canResend: !active, reset };
}
