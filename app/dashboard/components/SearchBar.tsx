"use client";

import { useEffect, useState } from "react";

import { useDataContext } from "@/context";

export const SearchBar = () => {
  const { records, setFilteredData } = useDataContext();
  const [searchField, setSearchField] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    const filteredData = records.filter((data) => {
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
    <div className="mx-7">
      <input
        type="search"
        placeholder="Search Job"
        onChange={changeHandler}
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 "
      />
    </div>
  );
};
