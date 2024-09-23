"use client";

import { useEffect, useState } from "react";

import { useDataContext } from "@/context";
import { getCachedOffers, getCachedUsers } from "@/lib";

import { OfferListForm } from "./OfferListForm";
import { SearchBar } from "./SearchBar";

export const JobOfferList = () => {
  const { setRecords, filteredData } = useDataContext();
  const [users, setUsers] = useState([]);

  const getDataAndUsers = async () => {
    try {
      const [offers, users] = await Promise.all([
        getCachedOffers(),
        getCachedUsers(),
      ]);

      setRecords(offers.reverse());
      setUsers(users);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getDataAndUsers();
  }, []);

  return (
    <section>
      <SearchBar />
      <ul className="my-5 mx-7 bg-gray-200 text-black dark:bg-gray-700 dark:text-black">
        {filteredData.map((offer) => (
          <OfferListForm key={offer.id} data={offer} users={users} />
        ))}
      </ul>
    </section>
  );
};
