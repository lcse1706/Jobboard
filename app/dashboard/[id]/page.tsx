"use client";

import { useDataContext } from "@/context";

import { Details } from "./components/Details";

const DetailsPage = () => {
  const { records, offerId } = useDataContext();

  const getData = () => {
    const data = records.filter((record) => record.id === offerId);
    return data[0];
  };

  return <Details details={getData()} />;
};

export default DetailsPage;
