import React, { useRef } from "react";

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  length?: number;
}

export function OtpInput({
  value,
  onChange,
  hasError,
  length = 4,
}: OtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusInput = (idx: number) => {
    inputs.current[idx]?.focus();
  };

  const updateValue = (newValue: string) => {
    onChange(newValue.slice(0, length));
  };

  const handleChange = (idx: number, char: string) => {
    const sanitized = char.replace(/\D/g, "").slice(-1);

    const next = [...digits];
    next[idx] = sanitized;

    updateValue(next.join(""));

    if (sanitized && idx < length - 1) {
      focusInput(idx + 1);
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      focusInput(idx - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    updateValue(pasted);

    const nextIndex =
      pasted.length >= length ? length - 1 : pasted.length;

    focusInput(nextIndex);
  };

  return (
    <div className="flex items-center flex-wrap justify-center gap-3">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el;
          }}
          type="text"
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className={`h-12 w-12 border text-textPrimary text-center text-xl font-semibold rounded-xl bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${
            hasError
              ? "border-red-500/50 focus:ring-red-500/30"
              : digit
                ? "border-textPrimary focus:ring-textPrimary/20"
                : "border-border hover:border-textSecondary/40 focus:ring-textPrimary/20"
          }`}
        />
      ))}
    </div>
  );
}