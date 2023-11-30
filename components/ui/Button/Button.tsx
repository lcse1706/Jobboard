import { ComponentProps, ReactNode } from "react";

interface ButtonProps {
  label: ReactNode | string;
  type: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BASE_BUTTON_CLASSES =
  "bg-pink-500 hover:bg-pink-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-full m-1";

export const Button = ({
  label,
  type,
  className,
  disabled,
  ...rest
}: ComponentProps<"button"> & ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${BASE_BUTTON_CLASSES} ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};

Button.displayName = "Button";
