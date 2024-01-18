"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import defaultLogo from "@/app/favicon.ico";
import { Button } from "@/components/ui";
import { deleteUserOffer } from "@/components/utils";
import { ProfileOfferProps } from "@/lib/types";
import { deleteDashboardOffer } from "@/services";

export const ProfileOffers = (props: ProfileOfferProps) => {
  const data = props.data;
  const { data: session } = useSession();
  const router = useRouter();
  const deleteNotify = () => toast.error("Offer deleted successful !");

  const handleDelete = async () => {
    await deleteUserOffer(data.id, session, "offersPublished");
    await deleteDashboardOffer(data.id);
    setTimeout(() => {
      router.refresh();
      deleteNotify();
    }, 250);
  };

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <li className="bg-white p-8 rounded-lg border shadow-lg max-w-6xl mx-auto mt-8">
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
        <Button label="Edit (in progress)" type="button" />
        <Button
          label="Delete"
          className="bg-red-600 hover:bg-red-700"
          type="button"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};
