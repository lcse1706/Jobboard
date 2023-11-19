import { Session } from "next-auth";

import { getUsers, updateUser } from "@/services";

export const deleteOffer = async (
  offerId: string,
  session: Session | null | undefined
) => {
  const users = await getUsers();

  const sessionUser = session?.user?.email;

  for (const user in users) {
    if (sessionUser === users[user].email) {
      for (let i = 0; i < users[user].favorites.length; i++) {
        const favorite = users[user].favorites[i];

        if (favorite === offerId) {
          console.log("Delete offer with id: " + offerId);

          // Remove offerId from favorites array
          const updatedFavorites = [...users[user].favorites];
          updatedFavorites.splice(i, 1);

          const updatedUser = {
            ...users[user],
            favorites: updatedFavorites,
          };

          updateUser(user, updatedUser);
        }
      }
    }
  }
};
