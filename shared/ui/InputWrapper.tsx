import React, { memo } from "react";
import { InputWrapperProps } from "../config/type/InputWrapperProps";
import { buildLabelClass, cn, sizeConfig } from "../config/theme/inputTokens";

// ─── Status Icon ─────────────────────────────────────────────────────────────

const ErrorIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4.5zm0 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
  </svg>
);

const SuccessIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.28 5.28-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L6.75 8.69l3.47-3.47a.75.75 0 1 1 1.06 1.06z" />
  </svg>
);

// ─── InputWrapper ─────────────────────────────────────────────────────────────

export const InputWrapper = memo<InputWrapperProps>(function InputWrapper({
  id,
  label,
  error,
  helperText,
  successText,
  required,
  fullWidth,
  wrapperClassName,
  labelClassName,
  errorClassName,
  helperClassName,
  size = "md",
  children,
  disabled,
}) {
  const errorMessages = Array.isArray(error) ? error : error ? [error] : [];
  const hasError = errorMessages.length > 0;
  const s = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex flex-col",
        fullWidth ? "w-full" : "w-full sm:w-fit",
        wrapperClassName,
      )}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={buildLabelClass(size, !!disabled, labelClassName)}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500 select-none" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input slot */}
      {children}

      {/* Error messages */}
      {hasError && (
        <div
          role="alert"
          aria-live="polite"
          className={cn("flex flex-col gap-0.5", s.helper)}
        >
          {errorMessages.map((msg, i) => (
            <span
              key={i}
              className={cn(
                "flex items-center gap-1 text-red-500 dark:text-red-400",
                errorClassName,
              )}
            >
              <ErrorIcon />
              {msg}
            </span>
          ))}
        </div>
      )}

      {/* Success text */}
      {!hasError && successText && (
        <span
          className={cn(
            "flex items-center gap-1 text-emerald-600 dark:text-emerald-400",
            s.helper,
            helperClassName,
          )}
        >
          <SuccessIcon />
          {successText}
        </span>
      )}

      {/* Helper text */}
      {!hasError && !successText && helperText && (
        <span
          className={cn(
            "text-slate-500 dark:text-slate-400",
            s.helper,
            helperClassName,
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
});
