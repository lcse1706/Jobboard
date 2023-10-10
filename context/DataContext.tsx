'use client';

import { useContext, createContext, useState } from 'react';
import { OffersType } from '@/lib/types';

interface DataContextType {
  records: OffersType[];
  setRecords: React.Dispatch<React.SetStateAction<OffersType[]>>;
  filteredData: OffersType[];
  setFilteredData: React.Dispatch<React.SetStateAction<OffersType[]>>;
  logoId: string;
  setLogoId: React.Dispatch<React.SetStateAction<string>>;
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
  const [logoId, setLogoId] = useState<string>('');

  return (
    <DataContext.Provider
      value={{
        records,
        setRecords,
        filteredData,
        setFilteredData,
        logoId,
        setLogoId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
