import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { getUsers, registerUser } from "@/services/users";

export const checkIfUserInDb = async (session: Session | null | undefined) => {
  const users = await getUsers();
  const loggedEmail = session?.user?.email;
  let userExist = false;

  for (const user in users) {
    if (users[user].email === loggedEmail) {
      userExist = true;
    }
  }

  if (!userExist) {
    const newUser = {
      email: loggedEmail,
    };

    await registerUser(newUser);
  }
};
