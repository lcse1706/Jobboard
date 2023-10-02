import { z } from 'zod';

export const offerDTO = z.object({
  // imgSrc: z.string(),
  title: z.string(),
  salary: z.string(),
  technologies: z.string(),
  // localization: z.string(),
  // coordinates: z.object({ lat: z.number(), lng: z.number() }),
  description: z.string(),
});

export type TOfferDTO = z.infer<typeof offerDTO>;
