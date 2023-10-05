import { PlaceInfo } from '@/lib/types';

interface OfferType {
  logo: any;
  title: string;
  salary: string;
  technologies: string;
  location?: string;
  coordinates?: any;
  description: string;
}

interface AirTableFormatType {
  fields: OfferType;
}

export const sendOffer = async (
  offer: any,
  placeInfo: PlaceInfo,
  logo: any
) => {
  const coord = { lat: placeInfo.lat, lng: placeInfo.lng };
  // const coord = 'pewnie dlatego sie krzaczy';

  const AirTableFormatOffer: AirTableFormatType = {
    fields: {
      title: offer.title,
      salary: offer.salary,
      technologies: offer.technologies,
      location: placeInfo.placeName,
      coordinates: JSON.stringify(coord),
      description: offer.description,
      logo: logo,
    },
  };

  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const sendResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_BASE_URL}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(AirTableFormatOffer),
    }
  );

  if (sendResponse.ok) {
    console.log('Data send successful !');
  } else {
    throw new Error('Sending failed.');
  }

  return null;
};
