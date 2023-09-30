import { ComponentProps } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BASE_BUTTON_CLASSES = 'text-white font-bold py-2 px-4 rounded-full m-1';

const ENABLED_BUTTON = 'bg-pink-500 hover:bg-pink-700';
const DISABLED_BUTTON = 'bg-gray-500';

export const Button = ({
  label,
  className,
  disabled,
  ...rest
}: ComponentProps<'button'> & ButtonProps) => {
  console.log({ disabled });
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${className} ${BASE_BUTTON_CLASSES} ${
        disabled ? DISABLED_BUTTON : ENABLED_BUTTON
      }`}
      {...rest}
    >
      {label}
    </button>
  );
};
