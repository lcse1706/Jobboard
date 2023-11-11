const headers = {
  "Content-Type": "application/json",
};

export const addFavorite = async (data: any) => {
  const Favorite = {
    user: data.email,
    favoriteId: data.id,
  };

  const sendResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_FAVORITES_URL}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(Favorite),
    }
  );

  if (sendResponse.ok) {
    console.log("Offer add to favorite !");
  } else {
    throw new Error("Adding to favorite failed.");
  }
  return null;
};
