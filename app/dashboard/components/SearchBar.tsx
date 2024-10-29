"use client";

import { useEffect, useState } from "react";

import { useDataContext } from "@/context";

export const SearchBar = () => {
  const { techFilteredData, setFilteredData } = useDataContext();
  const [searchField, setSearchField] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    const filteredData = techFilteredData.filter((record) => {
      return (
        record.title.toLowerCase().includes(searchField.toLowerCase()) ||
        record.salary.toLowerCase().includes(searchField.toLowerCase()) ||
        record.technologies
          .toLowerCase()
          .includes(searchField.toLocaleLowerCase()) ||
        // record.technologies.some(tech =>
        //   tech.toLowerCase().includes(searchField.toLowerCase())
        record.location.toLowerCase().includes(searchField.toLowerCase()) ||
        record.description.toLowerCase().includes(searchField.toLowerCase())
      );
    });
    setFilteredData(filteredData);
  }, [searchField, techFilteredData]);

  return (
    <div className="mx-7  bg-gray-200 text-black">
      <input
        type="search"
        placeholder="Search Job"
        onChange={changeHandler}
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 "
      />
    </div>
  );
};
