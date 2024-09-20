"use client";

import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { montserrat } from "@/app/fonts";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

interface NavProps {
  nav: { label: string; link: string }[];
  style?: React.CSSProperties;
}

export const Navigation = (props: NavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const bodyClass = document.querySelector("body")?.classList;
    if (isOpen) {
      bodyClass?.add("overflow-hidden");
    } else {
      bodyClass?.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <nav className={montserrat.className} style={props.style}>
      {isMobile ? (
        <MobileNavigation
          nav={props.nav}
          isOpen={isOpen}
          handleHamburger={handleHamburger}
        />
      ) : (
        <DesktopNavigation nav={props.nav} />
      )}
    </nav>
  );
};
