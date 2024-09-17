import Image from "next/image";

import logo from "./logo.jpg";

interface HeaderProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  return (
    <header
      className="flex flex-row h-20 bg-gray-300 items-center justify-between p-4"
      style={props.style}
    >
      <Image
        alt="Jobboard Logo"
        src={logo}
        height={70}
        className="ml-[400px]"
      />
      {props.children}
    </header>
  );
};
