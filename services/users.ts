import { TRegisterSchema } from "@/lib/types";

const headers = {
  "Content-Type": "application/json",
};

export const registerUser = async (data: TRegisterSchema) => {
  const User = {
    email: data.email,
    name: data.name,
    password: data.password,
    createdAt: new Date().toISOString().slice(0, 10),
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

export const updateUser = (recordKey: string, newData: any) => {
  fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_UPDATE_USER_URL}/${recordKey}.json`,
    {
      method: "PUT",
      body: JSON.stringify(newData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("User updated:", data);
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
};
