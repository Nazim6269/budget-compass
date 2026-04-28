import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
  Ref,
} from "react";

// ─── Size & Variant Tokens ───────────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg" | "xmd";
export type InputVariant = "outlined" | "filled" | "ghost";
export type InputState =
  | "default"
  | "error"
  | "success"
  | "warning"
  | "disabled";
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "color"
  | "range"
  | "file"
  | "hidden"
  | "radio";

// ─── Shared Styling Config ───────────────────────────────────────────────────

export interface InputStyleConfig {
  /** Wrapper div className */
  wrapperClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Input element className */
  inputClassName?: string;
  /** Error message className */
  errorClassName?: string;
  /** Helper text className */
  helperClassName?: string;
  /** Prefix icon container className */
  prefixClassName?: string;
  /** Suffix icon container className */
  suffixClassName?: string;
}

// ─── Base Input Props ────────────────────────────────────────────────────────

export interface BaseInputProps extends InputStyleConfig {
  /** Unique id — auto-generated if omitted */
  id?: string;
  /** Input name */
  name?: string;
  /** Label text */
  label?: ReactNode;
  /** Error message(s) */
  error?: string | string[];
  /** Helper / hint text shown below input */
  helperText?: ReactNode;
  /** Success message */
  successText?: string;
  /** Size token */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** Prefix slot: icon, text, or element */
  prefix?: ReactNode;
  /** Suffix slot: icon, text, or element */
  suffix?: ReactNode;
  /** Show loading spinner */
  loading?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Dark mode override (defaults to system) */
  darkMode?: boolean;
}

// ─── TextInput / Standard Input ─────────────────────────────────────────────

export interface TextInputProps
  extends
    BaseInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix"> {
  type?: InputType;
  /** Show clear (×) button when field has value */
  clearable?: boolean;
  /** Show password-visibility toggle (auto-enabled for type="password") */
  passwordToggle?: boolean;
  /** Forward ref */
  ref?: Ref<HTMLInputElement>;
}

// ─── Textarea ────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends
    BaseInputProps,
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "prefix" | "suffix"
    > {
  /** Auto-grow with content */
  autoResize?: boolean;
  /** Number of visible rows */
  rows?: number;
  /** Show character count */
  showCount?: boolean;
  /** Max character limit */
  maxLength?: number;
  ref?: Ref<HTMLTextAreaElement>;
}

// ─── Select ──────────────────────────────────────────────────────────────────

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface SelectInputProps
  extends
    BaseInputProps,
    Omit<
      SelectHTMLAttributes<HTMLSelectElement>,
      "size" | "prefix" | "suffix"
    > {
  options: SelectOption[];
  placeholder?: string;
  ref?: Ref<HTMLSelectElement>;
}

// ─── Checkbox ────────────────────────────────────────────────────────────────

export interface CheckboxProps extends Omit<
  BaseInputProps,
  "prefix" | "suffix" | "variant"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  indeterminate?: boolean;
  ref?: Ref<HTMLInputElement>;
}

// ─── Radio ───────────────────────────────────────────────────────────────────

export interface RadioOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps extends Omit<
  BaseInputProps,
  "prefix" | "suffix" | "variant"
> {
  options: RadioOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  orientation?: "horizontal" | "vertical";
  name: string;
}

// ─── FileInput ───────────────────────────────────────────────────────────────

export interface FileInputProps extends BaseInputProps {
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  dragAndDrop?: boolean;
  maxSizeMB?: number;
  ref?: Ref<HTMLInputElement>;
}

// ─── InputWrapper ────────────────────────────────────────────────────────────

export interface InputWrapperProps {
  id: string;
  label?: ReactNode;
  error?: string | string[];
  helperText?: ReactNode;
  successText?: string;
  required?: boolean;
  fullWidth?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  size?: InputSize;
  children: ReactNode;
  disabled?: boolean;
}
