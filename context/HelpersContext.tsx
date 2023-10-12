'use client';

import { useContext, createContext, useState } from 'react';

interface HelpersContextType {
  checkLastFirebaseKey: string;
  setCheckLastFirebaseKey: React.Dispatch<React.SetStateAction<string>>;
}

const HelpersContext = createContext<HelpersContextType | null>(null);

export const useHelpersContext = () => {
  const context = useContext(HelpersContext);
  if (!context) {
    throw new Error('Component should be placed in DataProvider !');
  }
  return context;
};

export const HelpersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkLastFirebaseKey, setCheckLastFirebaseKey] = useState<string>('');

  return (
    <HelpersContext.Provider
      value={{
        checkLastFirebaseKey,
        setCheckLastFirebaseKey,
      }}
    >
      {children}
    </HelpersContext.Provider>
  );
};
