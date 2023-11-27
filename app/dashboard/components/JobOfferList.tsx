"use client";

import { useEffect } from "react";

import { OfferListForm } from "@/app/dashboard/components/OfferListForm";
import { useDataContext } from "@/context/DataContext";
import { OffersType, fetchOffersType } from "@/lib/types";
import { fetchOffers } from "@/services/offers";

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

  return (
    <section>
      <SearchBar />
      <ul className="m-5">
        {filteredData.map((offer) => (
          <OfferListForm key={offer.id} offer={offer} />
        ))}
      </ul>
    </section>
  );
};
