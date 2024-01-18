"use client";

import { useEffect, useState } from "react";
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

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  const openConfirmationModal = () => {
    setConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  };

  const handleDelete = async () => {
    openConfirmationModal();
    if (confirmationModal) {
      await deleteUserOffer(data.id, session, "offersPublished");
      await deleteDashboardOffer(data.id);
      setTimeout(() => {
        router.refresh();
        deleteNotify();
      }, 250);
    }
  };

  useEffect(() => {
    router.refresh();
  }, []);

  const modal = (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-80">
      <div className="modal-container bg-white p-4 rounded translate-y-[-10vh] ">
        <p className="text-gray-800 text-lg mb-4">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-end">
          <Button
            label="Cancel"
            onClick={closeConfirmationModal}
            className="mr-2 bg-gray-500"
          />
          <Button
            label="Delete"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {confirmationModal && modal}
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
    </div>
  );
};
