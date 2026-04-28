import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out flex items-center gap-1.5 cursor-pointer whitespace-nowrap w-fit",
  {
    variants: {
      variant: {
        brown: "bg-[#4A3A2F] text-white leading-[124%]",
        cream: "bg-[#F0EDD8] text-[#5C473B]",
      },
      size: {
        default: "px-4 py-2",
        large: "px-6 py-3",
        small: "p-3",
      },
      
    },
    defaultVariants: {
      variant: "brown",
      size: "default",

    },
  },
);

interface GenericButtonProps extends VariantProps<typeof buttonVariants> {
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  title: string;
  className?: string;
  size?: "default" | "large" | "small";
  width?: "full" | "fit";
}

const GenericButton = ({
  title,
  variant,
  onClick,
  icon,
  iconPosition = "left",
  className,
  size,
}: GenericButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      onClick={onClick}
      type="button"
    >
      {iconPosition === "left" && icon}
      <span >{title}</span>
      {iconPosition === "right" && icon}
    </button>
  );
};

export default GenericButton;
