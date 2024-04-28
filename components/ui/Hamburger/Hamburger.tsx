"use client";

import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Hamburger({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <span onClick={handleClick}>Open</span>
      {isOpen && <div>{children}</div>}
    </div>
  );
}
