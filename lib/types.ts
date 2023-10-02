import { z } from 'zod';

export const offerDTO = z.object({
  title: z.string(),
  salary: z.string(),
  technologies: z.string(),
  description: z.string(),
});

export type TOfferDTO = z.infer<typeof offerDTO>;
