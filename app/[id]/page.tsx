"use client";

import { useDataContext } from "@/context";

import { Details } from "./Details";

const DetailsPage = () => {
  const { records, offerId } = useDataContext();

  // console.log(records, offerId);
  // records.map((item) => console.log(item.id));

  const getData = () => {
    console.log();
    const data = records.filter((record) => record.id === offerId);
    console.log(data);
    return data;
  };

  return <Details details={getData()} />;
};

export default DetailsPage;
