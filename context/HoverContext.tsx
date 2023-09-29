'use client';

import { createContext, useContext, useState } from 'react';

interface HoverContextType {
  hoveredMarkerId: string;
  setHoveredMarkerId: React.Dispatch<React.SetStateAction<string>>;
}

const HoverContext = createContext<HoverContextType | null>(null);

export const useHoverContext = () => {
  const context = useContext(HoverContext);

  if (!context) {
    throw new Error('Component should be placed in HoverProvider !');
  }
  return context;
};

export const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string>('');

  return (
    <HoverContext.Provider value={{ hoveredMarkerId, setHoveredMarkerId }}>
      {children}
    </HoverContext.Provider>
  );
};
