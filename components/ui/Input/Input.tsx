import { ComponentProps } from "react";

type InputType = {
  type: string;
  // placeholder?: string;
  className?: string;
} & ComponentProps<"input">;

export const Input = ({
  type,
  placeholder,
  value,
  className,
  ...rest
}: InputType) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={className}
      {...rest}
    />
  );
};

Input.displayName = "Input";
