import { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

const colors = {
  turquise: "#1abc9c",
  emerald: "#2ecc71",
  "peter-river": "#3498db",
  amethyst: "#9b59b6",
  "wet-asphalt": "#34495e",
  "green-sea": "#16a085",
  nephritis: "#16a085",
  "belize-hol": "#2980b9",
  wisteria: "#8e44ad",
  midnight: "#2c3e50",
  "sun-flower": "#f1c40f",
  carrot: "#e67e22",
  alizarin: "#e74c3c",
  clouds: "#ecf0f1",
  concrete: "#95a5a6",
  orange: "#f39c12",
  pumpkin: "#d35400",
  pomegranate: "#c0392b",
  silver: "#bdc3c7",
  asbestos: "#7f8c8d",
};

type ColorType = keyof typeof colors;

interface ButtonProps {
  label: ReactNode | string;
  type?: string;
  onClick?: () => void;
  className?: string;
  bgColor?: ColorType;
  disabled?: boolean;
}

export const Button = ({
  label,
  type,
  className,
  bgColor,
  color,
  disabled,
  ...rest
}: ComponentProps<"button"> & ButtonProps) => {
  const _color = color ? colors[color] : "";
  const _bgColor = bgColor ? colors[bgColor] : "";

  const classes = clsx(
    "bg-blue-600",
    "hover:bg-blue-800",
    "disabled:bg-gray-500",
    "text-white",
    "font-bold",
    "px-4",
    "py-2",
    "rounded-full",
    "m-1",
    "tracking-wide",
    className
  );

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      style={{
        color: _color,
        backgroundColor: _bgColor,
      }}
      {...rest}
    >
      {label}
    </button>
  );
};

Button.displayName = "Button";
