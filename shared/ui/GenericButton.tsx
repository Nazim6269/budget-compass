import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out flex items-center gap-1.5 cursor-pointer whitespace-nowrap w-fit",
  {
    variants: {
      variant: {
        brown: "bg-[#4A3A2F] text-white leading-[124%]",
        cream: "bg-[#FBF8F2] text-headingColor border border-[#DFE1E7]",
        red: "bg-red-600 text-white hover:bg-red-700",
        transparent: "bg-transparent text-headingColor border border-[#DFE1E7]",
      },
      size: {
        default: "px-4 py-2",
        mlarge: "px-4 py-3",
        large: "h-12 p-4",
        small: "h-9 p-3",
      },
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
    },
    defaultVariants: {
      variant: "brown",
      size: "default",
      align: "center",
    },
  },
);

interface GenericButtonProps extends VariantProps<typeof buttonVariants> {
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  title: string;
  className?: string;
  size?: "default" | "large" | "small" | "mlarge";
  width?: "full" | "fit";
  disabled?: boolean;
}

const GenericButton = ({
  title,
  variant,
  onClick,
  icon,
  iconPosition = "left",
  className,
  size,
  align,
  disabled,
}: GenericButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className, align })}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {iconPosition === "left" && icon}
      <span>{title}</span>
      {iconPosition === "right" && icon}
    </button>
  );
};

export default GenericButton;
