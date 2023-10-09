'use client';

import { OfferListForm } from '@/components/OfferList.Form';
import { useDataContext } from '@/context/DataContext';
import { useEffect, useState } from 'react';
import { fetchOffers } from '@/services/offers';

interface OffersT {
  imgSrc: any;
  title: string;
  salary: string;
  technologies: string[];
  location: string;
  description: string;
}
//TODO Seperate Search function

export const JobOfferList = () => {
  const { records, setRecords, filteredData, setFilteredData } =
    useDataContext();
  const [searchField, setSearchField] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const getData = async () => {
    try {
      const data = await fetchOffers();
      const jobOffers: any = [];

      const fetchedData = (data: any) => {
        for (const item in data) {
          jobOffers.push({
            id: item,
            coordinates: data[item].coordinates,
            ...data[item],
          });
        }
        console.log(jobOffers);
        setRecords(jobOffers);
      };
      fetchedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(records);
    const filteredData = records.filter(data => {
      return (
        data.title.toLowerCase().includes(searchField.toLowerCase()) ||
        data.salary.toLowerCase().includes(searchField.toLowerCase()) ||
        data.technologies
          .toLowerCase()
          .includes(searchField.toLocaleLowerCase()) ||
        // data.technologies.some(tech =>
        //   tech.toLowerCase().includes(searchField.toLowerCase())
        data.location.toLowerCase().includes(searchField.toLowerCase()) ||
        data.description.toLowerCase().includes(searchField.toLowerCase())
      );
    });
    setFilteredData(filteredData);
  }, [searchField, records]);
  return (
    <section>
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
