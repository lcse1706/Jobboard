import { ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputType = {
  type: string;
  register?: UseFormRegisterReturn;
} & ComponentProps<"input">;

export const Input = ({ type, register, ...rest }: InputType) => {
  return <input type={type} {...register} {...rest} />;
};

Input.displayName = "Input";
