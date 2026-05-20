import { GenericInput } from "@/shared/ui/GenericInput";
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

    focusInput(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {digits.map((digit, idx) => (
        <GenericInput
          key={idx}
          ref={(el: HTMLInputElement | null) => {
            inputs.current[idx] = el;
          }}
          value={digit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(idx, e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(idx, e)
          }
          onPaste={handlePaste}
          inputMode="numeric"
          maxLength={1}
          fullWidth={false}
          className={`h-14 w-14 text-center text-xl font-semibold rounded-xl bg-white transition focus:ring-2 focus:outline-none ${
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
