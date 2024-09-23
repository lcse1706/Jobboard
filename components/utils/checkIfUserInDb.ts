import { Session } from "next-auth";

import { getCachedUsers } from "@/lib/cacheUsers";
import { registerUser } from "@/services";

export const checkIfUserInDb = async (session: Session | null | undefined) => {
  const users = await getCachedUsers();
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
