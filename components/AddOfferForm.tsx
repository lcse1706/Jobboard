'use client';

import { Button } from '@/components/ui/Button';
import { useDataContext } from '@/context/DataContext';
import { TOfferDTO, offerDTO, PlaceInfo } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLoadScript } from '@react-google-maps/api';
import type { NextPage } from 'next';

import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { PlacesAutocomplete } from './PlacesAutocomplete';
import UploadLogo from './UploadLogo';
import { sendOffer } from '@/services/offers';
import { Input } from '../components/ui';

//TODO Reacthookform + Zod

const inputStyles = 'w-full mb-2 p-2 border rounded';
const errorStyles = 'text-red-500 mb-3';

export const AddOfferForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TOfferDTO>({
    resolver: zodResolver(offerDTO),
  });

  const submitRef = useRef<HTMLFormElement | null>(null);

  const { logoURL } = useDataContext();
  useEffect(() => {
    console.log('Logo URL has been updated:', logoURL);
  }, [logoURL]);

  const [placeInfo, setPlaceInfo] = useState<PlaceInfo>({
    placeName: '',
    lat: 0,
    lng: 0,
  });

  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOGGLE_API as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const submitHandler = async (data: TOfferDTO) => {
    // if (submitRef.current) {
    //   submitRef.current.click();
    // }

    console.log('1');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('2');
    console.log('logoURL:', logoURL);

    try {
      await sendOffer(data, placeInfo, logoURL);
      console.log('Data ok');
      console.log('logoURL:', logoURL);
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <div className="flex flex-row justify-center items-start mt-48 w-screen">
      <UploadLogo submitRef={submitRef} />
      <form onSubmit={handleSubmit(submitHandler)} className="w-1/2">
        <Input
          register={register('title')}
          type="text"
          placeholder="Title"
          className={inputStyles}
        />
        {errors.title && (
          <p className={errorStyles}>{`${errors.title.message}`}</p>
        )}
        <Input
          register={register('salary')}
          type="text"
          placeholder="Salary"
          className={inputStyles}
        />
        {errors.salary && (
          <p className={errorStyles}>{`${errors.salary.message}`}</p>
        )}
        <Input
          register={register('technologies')}
          type="text"
          placeholder="Technologies"
          className={inputStyles}
        />
        {errors.technologies && (
          <p className={errorStyles}>{`${errors.technologies.message}`}</p>
        )}

        <PlacesAutocomplete
          onAddressSelect={address => {
            getGeocode({ address: address }).then(results => {
              const { lat, lng } = getLatLng(results[0]);

              setPlaceInfo({ placeName: address, lat: lat, lng: lng });
              // setPlaceName(address);
            });
          }}
        />

        <Input
          register={register('description')}
          type="text"
          placeholder="Description"
          // className="w-full h-32 p-2 border rounded"
          className={inputStyles}
        />
        {errors.description && (
          <p className={errorStyles}>{`${errors.description.message}`}</p>
        )}

        <Button label="Add Offer" type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
