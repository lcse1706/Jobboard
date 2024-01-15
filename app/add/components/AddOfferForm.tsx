"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import { Button, Input } from "@/components/ui";
import { checkIfUserInDb } from "@/components/utils/checkIfUserInDb";
import { useDataContext, useHelpersContext } from "@/context";
import { TOfferDTO, offerDTO, PlaceInfo } from "@/lib/types";
import {
  fetchOffers,
  updateOffer,
  sendOffer,
  getUsers,
  updateUser,
} from "@/services";

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

  const { checkLastFirebaseKey, setCheckLastFirebaseKey } = useHelpersContext();
  const { logoURL } = useDataContext();

  const addNotify = () => toast.success("Offer add successful !");
  const errorNotify = () => toast.error("En error occurred !");

  const [placeInfo, setPlaceInfo] = useState<PlaceInfo>({
    placeName: "",
    lat: 0,
    lng: 0,
  });

  const submitRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: session } = useSession();

  //Update record with logoUrl which is returned from UploadLogo component. Sending data like title, salary, description etc is happening in the same time as logo upload thats why, added data is updated which logo Url.
  const updateLastRecord = async () => {
    try {
      const data = await fetchOffers();
      if (data) {
        const keys = Object.keys(data);

        const lastKey = keys[keys.length - 1];
        console.log("Check if id are the same");
        // Prevent rewriting the last record while component rendering.
        if (checkLastFirebaseKey == lastKey) {
          console.log("Stop: Same id's");
          return;
        } else {
          console.log("Id's are different. Continuing ....");
        }

        setCheckLastFirebaseKey(lastKey);
        const lastObject = data[lastKey];
        const newRecord = {
          ...lastObject,
          logoURL: logoURL,
        };
        updateOffer(lastKey, newRecord);
        console.log("Offer with id:", lastKey, " updated");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    console.log("useEffect render");
    setTimeout(() => {
      updateLastRecord();
    }, 2000);
  }, [logoURL]);

  // Autocomplete

  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOGGLE_API as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // Searching for a user in the database by matching with data from session and add offer to user's published offers.
  const addOfferToUser = async (id: string) => {
    // Check if user exist in db
    await checkIfUserInDb(session);

    const users = await getUsers();
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

  const submitHandler = async (data: TOfferDTO) => {
    setIsSubmitted(false);
    // Sending submit to UploadLogo component
    if (submitRef.current) {
      submitRef.current.click();
    }

    try {
      const idOfJustAddedOffer = await sendOffer(data, placeInfo, logoURL);
      console.log("Just added offer id: " + idOfJustAddedOffer);
      addOfferToUser(idOfJustAddedOffer);
      addNotify();
    } catch (error) {
      errorNotify();
      throw new Error(error);
    }

    reset();
    setIsSubmitted(true);
  };

  return (
    <div className="container flex justify-around m-auto ">
      <div className="flex justify-around mt-20 bg-white p-4 border rounded-lg shadow-lg">
        <UploadLogo submitRef={submitRef} />
        <form onSubmit={handleSubmit(submitHandler)} className="w-1/2">
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
