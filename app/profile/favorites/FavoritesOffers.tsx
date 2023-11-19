"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { deleteUserOffer } from "@/components/utils/deleteUserOffer";

import defaultLogo from "../../favicon.ico";

//TODO add informationn if no offers

export const FavoritesOffers = (props: any) => {
  const data = props.data;
  console.log(data);
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = () => {
    deleteUserOffer(data.id, session, "favorites");
    setTimeout(() => {
      router.refresh();
    }, 250);
  };

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={data.logoURL === "" ? defaultLogo : data.logoURL}
          alt="logo"
          width={50}
          height={50}
          className="rounded-full mr-3"
        />
        <p className="text-2xl font-bold mb-2"> {data.title}</p>
      </div>
      <p className="text-gray-600 mb-2">{data.location}</p>
      <p className="text-green-600 font-bold mb-2">{data.salary}</p>
      <p className="italic text-gray-500 mb-4">{data.technologies}</p>
      <p className="text-left">{data.description}</p>
      <div className="flex justify-center">
        <Button
          label="Delete From Favorites"
          className="bg-red-600"
          type="button"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
