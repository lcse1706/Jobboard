"use client";

import { useContext, createContext, useState } from "react";

import { OffersType } from "@/lib/types";

import { DataContextType } from "./types";

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Component should be placed in DataProvider !");
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<OffersType[]>([]);
  const [filteredData, setFilteredData] = useState<OffersType[]>(records);
  const [offerId, setOfferId] = useState<string>("");
  const [logoURL, setLogoURL] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        records,
        setRecords,
        filteredData,
        setFilteredData,
        offerId,
        setOfferId,
        logoURL,
        setLogoURL,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
