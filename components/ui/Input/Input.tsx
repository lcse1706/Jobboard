import { ComponentProps } from 'react';

interface InputType {
  type: string;
  placeholder?: string;
  className?: string;
  register?: any;
}

export const Input = (props: ComponentProps<'input'> & InputType) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      {...props.register}
      className={props.className}
    />
  );
};

Input.displayName = 'Input';
