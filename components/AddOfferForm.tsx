'use client';

import { Button } from '@/components/ui/Button';
import { useDataContext } from '@/context/DataContext';
import { FieldValues, useForm } from 'react-hook-form';

//TODO Reacthookform + Zod

export const AddOfferForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { records, setRecords } = useDataContext();

  // const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  const submitHandler = async (data: FieldValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
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

    reset();
  };

  const inputStyles = 'w-full mb-2 p-2 border rounded';
  const errorStyles = 'text-red-500 mb-3';

  return (
    <div className="flex justify-center items-center mt-48 w-screen">
      <form onSubmit={handleSubmit(submitHandler)} className="w-1/2">
        <input
          {...register('title', {
            required: 'Enter job title',
          })}
          type="text"
          placeholder="Title"
          className={inputStyles}
        />
        {errors.title && (
          <p className={errorStyles}>{`${errors.title.message}`}</p>
        )}
        <input
          {...register('salary', {
            required: 'Enter salary range',
          })}
          type="text"
          placeholder="Salary"
          className={inputStyles}
        />
        {errors.salary && (
          <p className={errorStyles}>{`${errors.salary.message}`}</p>
        )}
        <input
          {...register('technologies', {
            required: 'Enter required technologies',
          })}
          type="text"
          placeholder="Technologies"
          className={inputStyles}
        />
        {errors.technologies && (
          <p className={errorStyles}>{`${errors.technologies.message}`}</p>
        )}
        <input
          {...register('localization', {
            required: 'Enter job localization',
          })}
          type="text"
          placeholder="Localization"
          className={inputStyles}
        />
        {errors.localization && (
          <p className={errorStyles}>{`${errors.localization.message}`}</p>
        )}

        <input
          {...register('description', {
            required: 'Describe job position',
          })}
          type="text"
          placeholder="Description"
          // className="w-full h-32 p-2 border rounded"
          className={inputStyles}
        ></input>
        {errors.description && (
          <p className={errorStyles}>{`${errors.description.message}`}</p>
        )}

        <Button label="Add Offer" type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
