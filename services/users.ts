import { TRegisterSchema } from "@/lib/types";

const headers = {
  "Content-Type": "application/json",
};

export const registerUser = async (data: TRegisterSchema) => {
  const User = {
    email: data.email,
    password: data.password,
    createdAt: new Date().toISOString().slice(0, 10),
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

  return null;
};

export const checkRegister = async () => {
  const checkRegister = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_USERS_URL}`,
    {
      method: "GET",
      headers,
      body: null,
    }
  );
  if (checkRegister.ok) {
    console.log("Users loaded");
  } else {
    throw new Error("Loading users failed");
  }
  const data = await checkRegister.json();
  return data;
};
