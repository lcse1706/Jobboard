"use client";

import { useEffect, useState } from "react";
import { isMobile as checkMobile } from "react-device-detect";

import Image from "next/image";
import Link from "next/link";

import logo from "./suitsilver.png";

interface HeaderProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);

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
        <span
          className={`text-2xl font-bold tracking-wide text-gray-800 dark:text-white ${
            isMobile ? "ml-4" : "ml-[400px]"
          }`}
        >
          jobboard.it
        </span>
      </Link>

      <div className={`${isMobile ? "text-right" : "text-left"} `}>
        {props.children}
      </div>
    </header>
  );
};
