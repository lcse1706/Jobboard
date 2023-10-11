import { TOfferDTO, OfferFirebaseType, PlaceInfo } from '@/lib/types';

const headers = {
  'Content-Type': 'application/json',
};

export const sendOffer = async (
  offer: TOfferDTO,
  placeInfo: PlaceInfo,
  logoURL: string
) => {
  const Offer: OfferFirebaseType = {
    logoURL: logoURL,
    title: offer.title,
    salary: offer.salary,
    technologies: offer.technologies,
    location: placeInfo.placeName,
    coordinates: { lat: placeInfo.lat, lng: placeInfo.lng },
    description: offer.description,
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

export const updateOffer = (recordKey: string, newData: OfferFirebaseType) => {
  fetch(`${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_URL}/${recordKey}.json`, {
    method: 'PUT',
    body: JSON.stringify(newData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Record updated:', data);
    })
    .catch(error => {
      console.error('Error updating record:', error);
    });
};
