"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        setRecords(jobOffers);
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
      <ToastContainer position="bottom-right" />
      <SearchBar />
      <ul className="m-5">
        {filteredData.map((offer) => (
          <OfferListForm key={offer.id} data={offer} />
        ))}
      </ul>
    </section>
  );
};
