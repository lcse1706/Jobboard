'use client';

import { useContext, createContext, useState } from 'react';
import { OffersType } from '@/lib/types';

interface DataContextType {
  records: OffersType[];
  setRecords: React.Dispatch<React.SetStateAction<OffersType[]>>;
  filteredData: OffersType[];
  setFilteredData: React.Dispatch<React.SetStateAction<OffersType[]>>;
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
  const [filteredData, setFilteredData] = useState(records);

  return (
    <DataContext.Provider
      value={{ records, setRecords, filteredData, setFilteredData }}
    >
      {children}
    </DataContext.Provider>
  );
};
