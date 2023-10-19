import { z } from "zod";

export const offerDTO = z.object({
  // logo: z.string(),
  // title: z.string().trim().min(1),
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

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export type PlaceInfo = {
  placeName: string;
  lat: number;
  lng: number;
};

type Coordinates = Pick<PlaceInfo, "lat" | "lng">;

export interface OffersType {
  logoURL: string;
  id: string;
  title: string;
  salary: string;
  technologies: string;
  location: string;
  coordinates: Coordinates;
  description: string;
}

export type OfferFirebaseType = {
  logoURL: string;
  title: string;
  salary: string;
  technologies: string;
  location: string;
  coordinates: Coordinates;
  description: string;
};

export type fetchOffersType = {
  [key: string]: OffersType;
};

export interface OffersProps {
  offers: Array<{
    logoURL: string;
    id: string;
    title: string;
    salary: string;
    technologies: string;
    location: string;
    description: string;
  }>;
}

// export type FormDataType = Omit<OfferFirebaseType, 'location' | 'coordinates'>;
