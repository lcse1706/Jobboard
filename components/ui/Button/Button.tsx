import { ComponentProps } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

// const BASE_BUTTON_CLASSES =
//   'bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full m-1';
const BASE_BUTTON_CLASSES =
  'bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full m-1';

export const Button = ({
  label,
  className,
  ...rest
}: ComponentProps<'button'> & ButtonProps) => {
  return (
    <button
      type="button"
      className={`${className} ${BASE_BUTTON_CLASSES}`}
      {...rest}
    >
      {label}
    </button>
  );
};
