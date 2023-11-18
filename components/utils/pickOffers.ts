import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

import { authConfig } from "@/lib/auth";
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

  let userOffers: any[] = [];

  for (const offer in offers) {
    for (const published of userData[pickOffers]) {
      if (published === offer) userOffers.push(offers[offer]);
    }
  }

  return userOffers;
};
