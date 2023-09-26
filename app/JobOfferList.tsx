'use client';

import { OfferListForm } from '@/components/OfferList.Form';
import { useEffect, useState } from 'react';

interface OffersT {
  imgSrc: string;
  title: string;
  salary: string;
  technologies: string[];
  localization: string;
  description: string;
}

const JobOffers: OffersT[] = [
  {
    imgSrc: '/favicon.ico',
    title: 'JS Developer',
    salary: '20k-30k',
    technologies: ['JS', 'CSS', 'React', 'StoryBook'],
    localization: 'Gdansk',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolore ad iste expedita eaque natus excepturi beatae aut, maxime dolor!',
  },
  {
    imgSrc: '/favicon.ico',
    title: 'Python Developer',
    salary: '25k-35k',
    technologies: ['Python', 'Django', 'SQL', 'REST API'],
    localization: 'Warsaw',
    description:
      'Poszukujemy doświadczonego programisty Python, który będzie odpowiedzialny za rozwijanie aplikacji webowych w oparciu o Django oraz tworzenie i zarządzanie bazami danych SQL.',
  },
  {
    imgSrc: '/favicon.ico',
    title: 'Frontend Developer',
    salary: '22k-32k',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
    localization: 'Krakow',
    description:
      'Jesteśmy zespołem Frontend Developerów poszukującym kreatywnego i ambitnego programisty, który będzie odpowiedzialny za tworzenie atrakcyjnych i responsywnych interfejsów użytkownika.',
  },
];

export const JobOfferList = () => {
  const [searchField, setSearchField] = useState('');
  const [filteredData, setFilteredData] = useState(JobOffers);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    const filteredData = JobOffers.filter(data => {
      return (
        data.title.toLowerCase().includes(searchField.toLowerCase()) ||
        data.salary.toLowerCase().includes(searchField.toLowerCase()) ||
        data.technologies.some(tech =>
          tech.toLowerCase().includes(searchField.toLowerCase())
        ) ||
        data.localization.toLowerCase().includes(searchField.toLowerCase()) ||
        data.description.toLowerCase().includes(searchField.toLowerCase())
      );
    });
    setFilteredData(filteredData);
  }, [searchField]);
  return (
    <section className="w-2/3">
      <div className="px-5">
        <input
          type="search"
          placeholder="Search Job"
          onChange={changeHandler}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 "
        />
      </div>
      <OfferListForm offers={filteredData} />
    </section>
  );
};
