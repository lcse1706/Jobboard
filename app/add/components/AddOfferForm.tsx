"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import { Button, Input, LoadingIndicator } from "@/components/ui";
import { checkIfUserInDb } from "@/components/utils/checkIfUserInDb";
import { getCachedUsers, invalidateOfferCache } from "@/lib";
import { TOfferDTO, offerDTO, PlaceInfo } from "@/lib/types";
import { sendOffer, updateUser } from "@/services";

import { PlacesAutocomplete } from "./PlacesAutocomplete";
import { UploadLogo } from "./UploadLogo";

export const AddOfferForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TOfferDTO>({
    resolver: zodResolver(offerDTO),
  });

  const inputStyles = "w-full mb-2 p-2 border rounded";
  const errorStyles = "text-red-500 mb-3";

  const addNotify = () => toast.success("Offer add successful !");
  const errorNotify = () => toast.error("En error occurred !");

  const [placeInfo, setPlaceInfo] = useState<PlaceInfo>({
    placeName: "",
    lat: 0,
    lng: 0,
  });

  const submitRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const logoURLRef = useRef<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    // Trigger this effect when logoURL changes to check if it's set
    if (logoURL) {
      console.log("Logo URL updated:", logoURL);
      logoURLRef.current = logoURL;
    }
  }, [logoURL]);

  // Autocomplete

  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOGGLE_API as string,
    libraries: libraries as any,
  });

  console.log("Google API Key:" + process.env.NEXT_PUBLIC_GOGGLE_API);

  if (!isLoaded) {
    return (
      <div className="flex justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  // Searching for a user in the database by matching with data from session and add offer to user's published offers.
  const addOfferToUser = async (id: string) => {
    // Checking if offer is set as favorite to specific user and show it on the list.
    await checkIfUserInDb(session);

    const users = await getCachedUsers();
    const loggedEmail = session?.user?.email;
    for (const user in users) {
      if (users[user].email === loggedEmail) {
        const updatedUser = {
          ...users[user],
          offersPublished: [...users[user].offersPublished, id],
        };
        updateUser(user, updatedUser);
      }
    }
  };

  //Waiting for logo URL

  const onUploadSuccess = async (url: string) => {
    setLogoURL(url);
  };

  const waitForLogoURL = () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (logoURLRef.current) {
          clearInterval(interval);
          resolve();
        }
      }, 500);
    });
  };

  const submitHandler = async (data: TOfferDTO) => {
    setIsSubmitted(false);
    invalidateOfferCache();

    // Sending submit to UploadLogo component
    if (submitRef.current) {
      submitRef.current.click();
    }

    await waitForLogoURL();

    try {
      const idOfJustAddedOffer = await sendOffer(
        data,
        placeInfo,
        logoURLRef.current
      );
      console.log("Just added offer id: " + idOfJustAddedOffer);
      addOfferToUser(idOfJustAddedOffer);
      addNotify();
      setLogoURL(null);
    } catch (error) {
      errorNotify();
      throw new Error(error);
    }

    reset();
    setIsSubmitted(true);
  };

  return (
    <div className="container flex justify-around m-auto ">
      <div
        className={
          "flex justify-around mt-20 bg-white p-4 border rounded-lg shadow-lg mb-10 dark:text-black" +
          (isMobile ? " flex-col items-center" : "")
        }
      >
        <UploadLogo submitRef={submitRef} onUploadSuccess={onUploadSuccess} />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={isMobile ? "flex flex-col items-center " : "w-1/2"}
        >
          <Input
            label="Title"
            {...register("title")}
            placeholder="Title"
            className={inputStyles}
            error={errors.title}
          />
          <Input
            label="Salary"
            {...register("salary")}
            placeholder="Salary"
            className={inputStyles}
            error={errors.salary}
          />
          <Input
            label="Technologies"
            {...register("technologies")}
            type="text"
            placeholder="Technologies"
            className={inputStyles}
            error={errors.technologies}
          />
          <PlacesAutocomplete
            isSubmitted={isSubmitted}
            onAddressSelect={(address: string) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);

                setPlaceInfo({ placeName: address, lat: lat, lng: lng });
              });
            }}
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className={`${inputStyles} h-44 `}
          />
          {errors.description && (
            <p className={errorStyles}>{`${errors.description.message}`}</p>
          )}

          <Button label="Add Offer" type="submit" disabled={isSubmitting} />
        </form>
      </div>
    </div>
  );
};
