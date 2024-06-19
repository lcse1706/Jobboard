"use client";

import { useEffect } from "react";

import { useDataContext } from "@/context";
import { OffersType, fetchOffersType } from "@/lib/types";
import { fetchOffers } from "@/services";

import { OfferListForm } from "./OfferListForm";
import { SearchBar } from "./SearchBar";

export const JobOfferList = () => {
  const { setRecords, filteredData } = useDataContext();

  const getData = async () => {
    try {
      const data = await fetchOffers();
      const jobOffers: OffersType[] = [];
      const fetchedData = (data: fetchOffersType) => {
        for (const item in data) {
          const { id, coordinates, ...rest } = data[item];
          jobOffers.push({
            id: item,
            coordinates,
            ...rest,
          });
        }
        setRecords(jobOffers.reverse());
      };
      fetchedData(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <SearchBar />
      <ul className="my-5 mx-7">
        {filteredData.map((offer) => (
          <OfferListForm key={offer.id} data={offer} />
        ))}
      </ul>
    </section>
  );
};
