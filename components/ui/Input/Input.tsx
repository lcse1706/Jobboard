import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

import { classMerge } from "../utils/cn";

type InputType = {
  label: string;
  error?: FieldError;
} & ComponentPropsWithRef<"input">;

export const Input = forwardRef(
  (
    { type, className, placeholder, label, error, ...rest }: InputType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const id = Date.now().toString(20);

    return (
      <div>
        <label className="hidden" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={classMerge(className)}
          placeholder={placeholder}
          {...rest}
        />
        {error && <p className="text-red-500 mb-3">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
