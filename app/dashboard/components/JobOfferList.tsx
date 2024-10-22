"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { LoadingIndicator } from "@/components/ui";
import { useDataContext } from "@/context";
import { getCachedOffers, getCachedUsers } from "@/lib";
import { User } from "@/lib/types";

import { OfferListForm } from "./OfferListForm";
import { SearchBar } from "./SearchBar";
import { TechFilter } from "./TechFilter";

export const JobOfferList = () => {
  const { setRecords, filteredData } = useDataContext();
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  const getDataAndUsers = async () => {
    try {
      const [offers, users] = await Promise.all([
        getCachedOffers(),
        getCachedUsers(),
      ]);

      setRecords(offers.reverse());
      setLoading(false);
      const usersArray: User[] = Object.values(users);

      if (session?.user?.email) {
        const loggedUser = usersArray.find(
          (user) => user.email === session.user.email
        );
        setSessionUser(loggedUser);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getDataAndUsers();
  }, [session]);

  return (
    <section>
      <SearchBar />
      <TechFilter />
      {loading ? (
        <div className="flex justify-center items-start mt-20 h-screen ">
          <LoadingIndicator />
        </div>
      ) : (
        <ul className="my-5 mx-7 bg-gray-200 text-black dark:bg-gray-700 dark:text-black">
          {filteredData.map((offer) => (
            <OfferListForm key={offer.id} data={offer} user={sessionUser} />
          ))}
        </ul>
      )}
    </section>
  );
};
