'use client';

import { Button } from '@/components/ui/Button';
import { useDataContext } from '@/context/DataContext';
import { TOfferDTO, offerDTO } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

//TODO Reacthookform + Zod

export const AddOfferForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TOfferDTO>({
    resolver: zodResolver(offerDTO),
  });

  const { records, setRecords } = useDataContext();

  // const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  const submitHandler = async (data: TOfferDTO) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
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
          {...register('title')}
          type="text"
          placeholder="Title"
          className={inputStyles}
        />
        {errors.title && (
          <p className={errorStyles}>{`${errors.title.message}`}</p>
        )}
        <input
          {...register('salary')}
          type="text"
          placeholder="Salary"
          className={inputStyles}
        />
        {errors.salary && (
          <p className={errorStyles}>{`${errors.salary.message}`}</p>
        )}
        <input
          {...register('technologies')}
          type="text"
          placeholder="Technologies"
          className={inputStyles}
        />
        {errors.technologies && (
          <p className={errorStyles}>{`${errors.technologies.message}`}</p>
        )}
        <input
          {...register('localization')}
          type="text"
          placeholder="Localization"
          className={inputStyles}
        />
        {errors.localization && (
          <p className={errorStyles}>{`${errors.localization.message}`}</p>
        )}

        <input
          {...register('description')}
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
