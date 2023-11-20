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
//FIXME link doesnt work from env

export const updateOffer = (recordKey: string, newData: OfferFirebaseType) => {
  // fetch(`${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_URL}/${recordKey}.json`, {
  fetch(
    `https://jobboard-335d5-default-rtdb.europe-west1.firebasedatabase.app/Offers/${recordKey}.json`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(newData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Record updated:", data);
    })
    .catch((error) => {
      console.error("Error updating record:", error);
    });
};

//FIXME link doesnt work from env
export const deleteDashboardOffer = (recordKey: string) => {
  // fetch(`${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_URL}/${recordKey}.json`, {
  fetch(
    `https://jobboard-335d5-default-rtdb.europe-west1.firebasedatabase.app/Offers/${recordKey}.json`,
    {
      method: "DELETE",
      headers,
      body: JSON.stringify(null),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Record deleted:", recordKey);
    })
    .catch((error) => {
      console.error("Error deleting record:", error);
    });
};
