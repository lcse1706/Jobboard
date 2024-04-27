import { TOfferDTO, OfferFirebaseType, PlaceInfo } from "@/lib/types";

const headers = {
  "Content-Type": "application/json",
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
    `${process.env.NEXT_PUBLIC_FIREBASE_OFFERS_URL}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Offer),
    }
  );

  if (sendResponse.ok) {
    const responseData = await sendResponse.json();
    console.log("Data send successful !");
    //Returning offer id
    return responseData.name;
  } else {
    throw new Error("Sending failed.");
  }
};

export const fetchOffers = async () => {
  const fetchResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_OFFERS_URL}`,
    {
      method: "GET",
      headers: headers,
      body: null,
      next: { tags: ["offers"] },
    }
  );

  if (fetchResponse.ok) {
    console.log("Data load successful !");
  } else {
    throw new Error("Loading failed.");
  }

  const data = await fetchResponse.json();
  return data;
};

export const updateOffer = async (
  recordKey: string,
  newData: OfferFirebaseType
) => {
  const updatedResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_OFFERS_URL}/${recordKey}.json`,
    // `https://jobboard-335d5-default-rtdb.europe-west1.firebasedatabase.app/Offers/${recordKey}.json`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(newData),
    }
  );

  if (updatedResponse.ok) {
    const data = await updatedResponse.json();
    console.log("Record updated:", data);
  } else {
    throw new Error("Update failed.");
  }
};

export const deleteDashboardOffer = async (recordKey: string) => {
  const deleteResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_OFFERS_URL}/${recordKey}.json`,
    {
      method: "DELETE",
      headers,
      body: JSON.stringify(null),
    }
  );

  if (deleteResponse.ok) {
    console.log("Record " + recordKey + " deleted !");
  } else {
    throw new Error("Something went wrong ! Deleting failed !");
  }
};
