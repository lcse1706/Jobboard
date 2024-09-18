"use client";

import { useContext, createContext, useState } from "react";

import { HelpersContextType } from "./types";

const HelpersContext = createContext<HelpersContextType | null>(null);

export const useHelpersContext = () => {
  const context = useContext(HelpersContext);
  if (!context) {
    throw new Error("Component should be placed in HelpersProvider !");
  }
  return context;
};

export const HelpersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkLastFirebaseKey, setCheckLastFirebaseKey] = useState<string>("");
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string>("");

  return (
    <HelpersContext.Provider
      value={{
        checkLastFirebaseKey,
        setCheckLastFirebaseKey,
        hoveredMarkerId,
        setHoveredMarkerId,
      }}
    >
      {children}
    </HelpersContext.Provider>
  );
};
