import { useSession } from "next-auth/react";

import { getUsers, registerUser } from "@/services/users";

export const checkIfUserInDb = async (session: any) => {
  const users = await getUsers();
  const loggedEmail = session?.user?.email;
  let userExist = false;

  //TODO tworzenie uzytkownika powinno nastapic natychmiast po zalogowaniu, a nie po kliknieciu na favorite. Jesli nowy uzytkownik zalogowany przez gooogle bedzie tworzyl nowe ogloszenie, to funkcja go nie znajdzie i nie przyporzadkuje ogloszenia do wlasciciela.
  //check if user exist
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
