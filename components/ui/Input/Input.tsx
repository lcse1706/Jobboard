import { ComponentProps } from "react";

type InputType = {
  type: string;
  register?: any;
} & ComponentProps<"input">;

export const Input = ({ type, register, ...rest }: InputType) => {
  return <input type={type} {...register} {...rest} />;
};

Input.displayName = "Input";
