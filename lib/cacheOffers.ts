import { OffersType, fetchOffersType } from "@/lib/types";
import { fetchOffers } from "@/services";

let offerCache: OffersType[] | null = null;
let isOfferCacheLoaded = false;

export const getCachedOffers = async (): Promise<OffersType[]> => {
  if (!isOfferCacheLoaded) {
    console.log("Fetching offers from API...");
    const data = await fetchOffers();
    const jobOffers: OffersType[] = [];

    for (const item in data) {
      const { id, coordinates, ...rest } = data[item];
      jobOffers.push({
        id: item,
        coordinates,
        ...rest,
      });
    }

    offerCache = jobOffers;
    isOfferCacheLoaded = true;
    console.log("Offers loaded!");
    return offerCache;
  }

  console.log("Offers already exist in cache!");
  return offerCache;
};

export const invalidateOfferCache = () => {
  offerCache = null;
  isOfferCacheLoaded = false;
};
