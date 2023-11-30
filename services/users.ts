import { OffersType, TRegisterSchema } from "@/lib/types";

const headers = {
  "Content-Type": "application/json",
};

export const registerUser = async (data: TRegisterSchema) => {
  const User = {
    email: data.email,
    name: data.name,
    password: data.password,
    createdAt: new Date().toISOString().slice(0, 10),
    offersPublished: [""],
    favorites: [""],
  };

  const sendResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_USERS_URL}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(User),
    }
  );

  if (sendResponse.ok) {
    console.log("Registration user data send successful !");
  } else {
    throw new Error("Registration failed.");
  }
};

export const getUsers = async () => {
  const getUsers = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_USERS_URL}`,
    {
      method: "GET",
      headers,
      body: null,
      next: { tags: ["users"] },
    }
  );
  if (getUsers.ok) {
    console.log("Users loaded");
  } else {
    throw new Error("Loading users failed");
  }
  const data = await getUsers.json();
  return data;
};

export const updateUser = async (recordKey: string, newData: OffersType) => {
  const updateUserResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_USER_URL}/${recordKey}.json`,
    {
      method: "PUT",
      body: JSON.stringify(newData),
    }
  );

  if (updateUserResponse.ok) {
    console.log("User with id: " + recordKey + " updated !");
  } else {
    throw new Error("User update failed !");
  }
};
