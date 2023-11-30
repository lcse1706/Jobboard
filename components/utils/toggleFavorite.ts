import { Session } from "next-auth";

import { getUsers, updateUser } from "@/services";

export const toggleFavorite = async (
  offerId: string,
  session: Session | null | undefined
) => {
  const users = await getUsers();

  const sessionUser = session?.user?.email;

  for (const user in users) {
    if (sessionUser === users[user].email) {
      let favoriteExists = false;

      for (let i = 0; i < users[user].favorites.length; i++) {
        const favorite = users[user].favorites[i];
        console.log(favorite);

        if (favorite === offerId) {
          console.log("Already exists in favorites. Deleting ...");
          favoriteExists = true;

          // Remove offerId from favorites array
          const updatedFavorites = [...users[user].favorites];
          updatedFavorites.splice(i, 1);

          const updatedUser = {
            ...users[user],
            favorites: updatedFavorites,
          };

          updateUser(user, updatedUser);

          break;
        }
      }

      if (!favoriteExists) {
        console.log("Not found in favorites. Adding ...");

        const updatedUser = {
          ...users[user],
          favorites: [...users[user].favorites, offerId],
        };

        updateUser(user, updatedUser);
      }
    }
  }
};
