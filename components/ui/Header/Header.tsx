"use client";

import { useEffect, useState } from "react";
import { isMobile as checkMobile } from "react-device-detect";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import logo from "./suitsilver.png";

interface HeaderProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMobile(checkMobile);
  }, []);

  return (
    <header
      className={`flex flex-row h-40 items-center justify-between p-4  ${
        isMobile ? "bg-gray-500" : "bg-gray-300 dark:bg-gray-800"
      }`}
      style={props.style}
    >
      <Link href="/dashboard">
        <Image
          alt="Jobboard Logo"
          src={logo}
          height={isMobile ? 50 : 110}
          className={`${
            isMobile ? "ml-4 max-w-[150px]" : "ml-[400px] max-w-[200px]"
          }`}
        />
      </Link>

      <div className={`${isMobile ? "text-right" : "text-left"} `}>
        {props.children}
      </div>
    </header>
  );
};
