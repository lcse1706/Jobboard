'use client';

import { FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { useDataContext } from '@/context/DataContext';
import { FieldValues, useForm } from 'react-hook-form';

//TODO Reacthookform + Zod

export const AddOfferForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const { records, setRecords } = useDataContext();

  // const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  const submitHandler = (data: FieldValues) => {
    setRecords([
      ...records,
      {
        imgSrc: '/favicon.ico',
        title: data.title,
        salary: data.salary,
        technologies: data.technologies,
        localization: data.localization,
        coordinates: { lat: 53.3611593, lng: 18.607628 },
        description: data.description,
      },
    ]);

    // console.log(data.title);
    reset();
  };

  return (
    <div className="flex justify-center items-center mt-48">
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register('title', {
            required: 'Enter job title',
          })}
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          {...register('salary', {
            required: 'Enter salary range',
          })}
          type="text"
          placeholder="Salary"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          {...register('technologies', {
            required: 'Enter required technologies',
          })}
          type="text"
          placeholder="Technologies"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          {...register('localization', {
            required: 'Enter job localization',
          })}
          type="text"
          placeholder="Localization"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          {...register('desription', {
            required: 'Desribe job position',
          })}
          type="text"
          placeholder="Description"
          className="w-full h-32 p-2 border rounded"
        ></input>
        <Button label="Add Offer" type="submit" />
      </form>
    </div>
  );
};
