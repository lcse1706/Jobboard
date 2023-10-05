import { z } from 'zod';

export const offerDTO = z.object({
  // avatar: z.instanceof(FileList),
  title: z.string(),
  salary: z.string(),
  technologies: z.string(),
  location: z.any(),
  coordnates: z.any(),
  description: z.string(),
});

export type TOfferDTO = z.infer<typeof offerDTO>;

export type PlaceInfo = {
  placeName: string;
  lat: number;
  lng: number;
};
