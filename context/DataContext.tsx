'use client';

import { useContext, createContext, useState } from 'react';
import { OffersType } from '@/lib/types';

interface DataContextType {
  records: OffersType[];
  setRecords: React.Dispatch<React.SetStateAction<OffersType[]>>;
  filteredData: OffersType[];
  setFilteredData: React.Dispatch<React.SetStateAction<OffersType[]>>;
  logoURL: string;
  setLogoURL: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('Component should be placed in DataProvider !');
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<OffersType[]>([]);
  const [filteredData, setFilteredData] = useState<OffersType[]>(records);
  const [logoURL, setLogoURL] = useState<string>('');

  return (
    <DataContext.Provider
      value={{
        records,
        setRecords,
        filteredData,
        setFilteredData,
        logoURL,
        setLogoURL,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
