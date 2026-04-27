import React, { forwardRef, memo, useCallback } from "react";
import { InputWrapper } from "./InputWrapper";
import { useInputId } from "../model/useInputId";
import { usePasswordToggle } from "../model/usePasswordToggle";
import { buildInputClass, cn, sizeConfig } from "../config/theme/inputTokens";
import { TextInputProps } from "../config/type/InputWrapperProps";
import { Spinner } from "./icons/Spinner";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";

export const GenericInput = forwardRef<HTMLInputElement, TextInputProps>(
  function GenericInput(
    {
      // Identity
      id: providedId,
      name,
      type = "text",
      // Layout
      size = "md",
      variant = "outlined",
      fullWidth = false,
      // Wrapper/label
      label,
      wrapperClassName,
      labelClassName,
      errorClassName,
      helperClassName,
      // Feedback
      error,
      helperText,
      successText,
      required,
      // Slots
      prefix,
      suffix,
      prefixClassName,
      suffixClassName,
      // Features
      loading = false,
      clearable = false,
      passwordToggle: passwordToggleProp,
      // State
      disabled = false,
      readOnly = false,
      // Input props
      value,
      defaultValue,
      onChange,
      inputClassName,
      className,
      placeholder,
      ...rest
    },
    ref,
  ) {
    const id = useInputId(providedId);
    const isPassword = type === "password";
    const showPasswordToggle = passwordToggleProp ?? isPassword;
    const { visible, toggle, inputType } = usePasswordToggle();

    const resolvedType = isPassword ? inputType : type;
    const hasError =
      !!error && (Array.isArray(error) ? error.length > 0 : true);
    const hasSuccess = !hasError && !!successText;

    const s = sizeConfig[size];

    // Whether there's a value (for clearable button)
    const hasValue =
      value !== undefined
        ? String(value).length > 0
        : defaultValue !== undefined
          ? String(defaultValue).length > 0
          : false;

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        // Fire a synthetic change event with empty value
        const nativeInput = (ref as React.RefObject<HTMLInputElement>)?.current;
        if (nativeInput) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;
          nativeInputValueSetter?.call(nativeInput, "");
          nativeInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
      },
      [ref],
    );

    // Build suffix: loading → password toggle → clear → user suffix
    const resolvedSuffix = loading ? (
      <Spinner className={cn(s.icon, "text-slate-400")} />
    ) : showPasswordToggle && isPassword ? (
      <button
        type="button"
        tabIndex={-1}
        onClick={toggle}
        aria-label={visible ? "Hide password" : "Show password"}
        className={cn(
          "flex items-center justify-center  hover:text-slate-600 transition-colors",
          s.icon,
        )}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    ) : clearable && hasValue ? (
      <button
        type="button"
        tabIndex={-1}
        onClick={handleClear}
        aria-label="Clear input"
        className={cn(
          "flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full",
          s.icon,
        )}
      >
        <XIcon />
      </button>
    ) : (
      suffix
    );

    const hasSuffix = !!resolvedSuffix;
    const hasPrefix = !!prefix;

    const inputClass = buildInputClass({
      size,
      variant,
      hasError,
      hasSuccess,
      disabled,
      hasPrefix,
      hasSuffix,
      fullWidth,
      extra: inputClassName ?? className,
    });

    return (
      <InputWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        successText={successText}
        required={required}
        fullWidth={fullWidth}
        wrapperClassName={wrapperClassName}
        labelClassName={labelClassName}
        errorClassName={errorClassName}
        helperClassName={helperClassName}
        size={size}
        disabled={disabled}
      >
        {/* Input + icon layer */}
        <div className="relative flex items-center">
          {/* Prefix */}
          {hasPrefix && (
            <span
              className={cn(
                "absolute left-0 flex items-center justify-center pointer-events-none",
                s.icon,
                "ml-3",
                prefixClassName,
              )}
            >
              {prefix}
            </span>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={id}
            name={name}
            type={resolvedType}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={
              hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={inputClass}
            {...rest}
          />

          {/* Suffix */}
          {hasSuffix && (
            <span
              className={cn(
                "absolute right-0 flex items-center justify-center text-black dark:text-white",
                s.icon,
                "mr-3",
                suffixClassName,
              )}
            >
              {resolvedSuffix}
            </span>
          )}
        </div>
      </InputWrapper>
    );
  },
);
