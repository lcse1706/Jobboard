'use client';

import { FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { useDataContext } from '@/context/DataContext';

const AddOffer = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const technologiesRef = useRef<HTMLInputElement>(null);
  const localizationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { records, setRecords } = useDataContext();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      titleRef.current &&
      salaryRef.current &&
      technologiesRef.current &&
      localizationRef.current &&
      descriptionRef.current
    ) {
      setRecords([
        ...records,
        {
          imgSrc: '/favicon.ico',
          title: titleRef.current.value,
          salary: salaryRef.current.value,
          technologies: technologiesRef.current.value,
          localization: localizationRef.current.value,
          coordinates: { lat: 53.3611593, lng: 18.607628 },
          description: descriptionRef.current.value,
        },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center mt-48">
      <form onSubmit={submitHandler}>
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          ref={salaryRef}
          type="text"
          placeholder="Salary"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          ref={technologiesRef}
          type="text"
          placeholder="Technologies"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          ref={localizationRef}
          type="text"
          placeholder="Localization"
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          ref={descriptionRef}
          placeholder="Description"
          className="w-full h-32 p-2 border rounded"
        ></textarea>
        <Button label="Add Offer" type="submit" />
      </form>
    </div>
  );
};

export default AddOffer;
