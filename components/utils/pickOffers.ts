import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

import { authConfig } from "@/app/login/lib/auth";
import { OffersType } from "@/lib/types";
import { fetchOffers, getUsers } from "@/services";

export const pickOffers = async (pickOffers: string) => {
  const offers = await fetchOffers();
  const users = await getUsers();
  revalidateTag("users");
  revalidateTag("offers");

  const session = await getServerSession(authConfig);
  const sessionUser = session?.user?.email;

  let userData;
  for (const user in users) {
    if (sessionUser === users[user].email) userData = users[user];
  }

  let userOffers: OffersType[] = [];

  for (const offer in offers) {
    for (const item of userData[pickOffers]) {
      if (item === offer) {
        const offerWithId = {
          id: item,
          ...offers[offer],
        };

        userOffers.push(offerWithId);
      }
    }
  }

  return userOffers;
};
