import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "p-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out flex items-center gap-1.5 cursor-pointer whitespace-nowrap w-fit",
  {
    variants: {
      variant: {
        brown: "bg-[#4A3A2F] text-whiteColor",
        cream: "bg-[#F0EDD8] text-[#5C473B]",
      },
    },
    defaultVariants: {
      variant: "brown",
    },
  },
);

interface GenericButtonProps extends VariantProps<typeof buttonVariants> {
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  title: string;
  className?: string;
}

const GenericButton = ({
  title,
  variant,
  onClick,
  icon,
  iconPosition = "left",
  className,
}: GenericButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, className })}
      onClick={onClick}
      type="button"
    >
      {iconPosition === "left" && icon}
      <span>{title}</span>
      {iconPosition === "right" && icon}
    </button>
  );
};

export default GenericButton;
