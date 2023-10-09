import { OfferFirebaseType, OfferType, PlaceInfo } from '@/lib/types';

const headers = {
  'Content-Type': 'application/json',
};

export const sendOffer = async (
  offer: OfferType,
  placeInfo: PlaceInfo
  // logo: any
) => {
  const coord = { lat: placeInfo.lat, lng: placeInfo.lng };
  // const coord = 'pewnie dlatego sie krzaczy';

  const Offer: OfferFirebaseType = {
    title: offer.title,
    salary: offer.salary,
    technologies: offer.technologies,
    location: placeInfo.placeName,
    coordinates: JSON.stringify(coord),
    description: offer.description,
    // logo: logo,
  };

  const sendResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_BASE_URL}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Offer),
    }
  );

  if (sendResponse.ok) {
    console.log('Data send successful !');
  } else {
    throw new Error('Sending failed.');
  }

  return null;
};

export const fetchOffers = async () => {
  const fetchResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_BASE_URL}`,
    {
      method: 'GET',
      headers: headers,
      body: null,
    }
  );

  if (fetchResponse.ok) {
    console.log('Data load successful !');
  } else {
    throw new Error('Loading failed.');
  }

  const data = await fetchResponse.json();
  return data;
};
