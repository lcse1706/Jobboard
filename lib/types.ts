import { z } from 'zod';

export const offerDTO = z.object({
  // logo: z.string(),
  title: z.string(),
  salary: z.string(),
  technologies: z.string(),
  // location: z.string(),
  // coordnates: z.object({
  //   lat: z.number(),
  //   lng: z.number(),
  // }),
  description: z.string(),
});

export type TOfferDTO = z.infer<typeof offerDTO>;

export type PlaceInfo = {
  placeName: string;
  lat: number;
  lng: number;
};
