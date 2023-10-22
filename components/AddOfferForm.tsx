"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import type { NextPage } from "next";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import { Button, Input } from "@/components/ui";
import { useDataContext, useHelpersContext } from "@/context";
import { TOfferDTO, offerDTO, PlaceInfo } from "@/lib/types";
import { fetchOffers, updateOffer, sendOffer } from "@/services/offers";

import { PlacesAutocomplete } from "./PlacesAutocomplete";
import UploadLogo from "./UploadLogo";

const inputStyles = "w-full mb-2 p-2 border rounded";
const errorStyles = "text-red-500 mb-3";

export const AddOfferForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TOfferDTO>({
    resolver: zodResolver(offerDTO),
  });

  const { checkLastFirebaseKey, setCheckLastFirebaseKey } = useHelpersContext();
  const { logoURL } = useDataContext();

  const [placeInfo, setPlaceInfo] = useState<PlaceInfo>({
    placeName: "",
    lat: 0,
    lng: 0,
  });

  const submitRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateLastRecord = async () => {
    const data = await fetchOffers();
    console.log(data);
    if (data) {
      const keys = Object.keys(data);

      const lastKey = keys[keys.length - 1];
      console.log("Check if keys are the same");
      //Prevent rewrite last record, while component rendering.
      if (checkLastFirebaseKey == lastKey) {
        console.log("Stop: Same Keys");
        return;
      } else {
        console.log("Keys are different. Continuing ....");
      }

      setCheckLastFirebaseKey(lastKey);
      const lastObject = data[lastKey];
      const newRecord = {
        ...lastObject,
        logoURL: logoURL,
      };
      updateOffer(lastKey, newRecord);
      console.log("offer with id:", lastKey, " updated");
    }
  };

  //Update record with stored logoUrl in context. Cant do it with submiting two forms, when one of then setlogoURL in context, second one read logoURL from context. It was accesible with next render/submit
  // Timeout - fixing problems with data fetching from Firebase - without it sometimes records was not updated with the last one
  useEffect(() => {
    console.log("useEffect render");
    setTimeout(() => {
      updateLastRecord();
    }, 2000);
  }, [logoURL]);

  //Autocomplete

  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOGGLE_API as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const submitHandler = async (data: TOfferDTO) => {
    setIsSubmitted(false);

    if (submitRef.current) {
      submitRef.current.click();
    }

    try {
      await sendOffer(data, placeInfo, logoURL);
    } catch (error) {
      console.log(error);
    }

    reset();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-row justify-center items-start mt-48 w-screen">
      <UploadLogo submitRef={submitRef} />
      <form onSubmit={handleSubmit(submitHandler)} className="w-1/2">
        <Input
          register={register("title")}
          type="text"
          placeholder="Title"
          className={inputStyles}
        />
        {errors.title && (
          <p className={errorStyles}>{`${errors.title.message}`}</p>
        )}
        <Input
          register={register("salary")}
          type="text"
          placeholder="Salary"
          className={inputStyles}
        />
        {errors.salary && (
          <p className={errorStyles}>{`${errors.salary.message}`}</p>
        )}
        <Input
          register={register("technologies")}
          type="text"
          placeholder="Technologies"
          className={inputStyles}
        />
        {errors.technologies && (
          <p className={errorStyles}>{`${errors.technologies.message}`}</p>
        )}

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
  );
};
