'use client';

import { useContext, createContext, useState } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

interface OffersType {
  imgSrc: any;
  title: string;
  salary: string;
  technologies: string;
  localization: string;
  coordinates: Coordinates;
  description: string;
}

const JobOffers: OffersType[] = [
  {
    imgSrc: '/favicon.ico',
    title: 'JS Developer',
    salary: '20k-30k',
    technologies: 'JS ,CSS, React , StoryBook',
    localization: 'Gdansk',
    coordinates: { lat: 54.3611593, lng: 18.607628 },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolore ad iste expedita eaque natus excepturi beatae aut, maxime dolor!',
  },

  {
    imgSrc: '/favicon.ico',
    title: 'Python Developer',
    salary: '25k-35k',
    technologies: 'Python, Django, SQL, REST API',
    localization: 'Warsaw',
    coordinates: { lat: 52.2330144, lng: 20.978795 },
    description:
      'Poszukujemy doświadczonego programisty Python, który będzie odpowiedzialny za rozwijanie aplikacji webowych w oparciu o Django oraz tworzenie i zarządzanie bazami danych SQL.',
  },
  {
    imgSrc: '/favicon.ico',
    title: 'Frontend Developer',
    salary: '22k-32k',
    technologies: 'HTML, CSS, JavaScript, Vue.js',
    localization: 'Krakow',
    coordinates: { lat: 50.0468467, lng: 19.9224739 },
    description:
      'Jesteśmy zespołem Frontend Developerów poszukującym kreatywnego i ambitnego programisty, który będzie odpowiedzialny za tworzenie atrakcyjnych i responsywnych interfejsów użytkownika.',
  },
];

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
  const [records, setRecords] = useState<OffersType[]>(JobOffers);
  const [filteredData, setFilteredData] = useState(records);

  return (
    <DataContext.Provider
      value={{ records, setRecords, filteredData, setFilteredData }}
    >
      {children}
    </DataContext.Provider>
  );
};
