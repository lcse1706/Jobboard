import { OffersType } from "@/lib/types";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export interface HelpersContextType {
  checkLastFirebaseKey: string;
  setCheckLastFirebaseKey: React.Dispatch<React.SetStateAction<string>>;
  hoveredMarkerId: string;
  setHoveredMarkerId: React.Dispatch<React.SetStateAction<string>>;
}

export interface DataContextType {
  records: OffersType[];
  setRecords: React.Dispatch<React.SetStateAction<OffersType[]>>;
  filteredData: OffersType[];
  setFilteredData: React.Dispatch<React.SetStateAction<OffersType[]>>;
  techFilteredData: OffersType[];
  setTechFilteredData: React.Dispatch<React.SetStateAction<OffersType[]>>;
  offerId: string;
  setOfferId: React.Dispatch<React.SetStateAction<string>>;
}
