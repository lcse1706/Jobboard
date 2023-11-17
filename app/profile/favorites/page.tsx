import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

import { pickOffers } from "@/components/utils/pickOffers";
import { authConfig } from "@/lib/auth";
import { fetchOffers } from "@/services";
import { getUsers } from "@/services/users";

import { FavoritesOffers } from "./FavoritesOffers";

export default async function Offers() {
  const offers = await fetchOffers();
  const users = await getUsers();
  revalidateTag("users");
  revalidateTag("offers");
  // console.log(users);
  const session = await getServerSession(authConfig);
  const sessionUser = session?.user?.email;

  const userOffers = pickOffers(offers, users, sessionUser, "favorites");
  console.log("offers: " + userOffers);

  return (
    <ul className="flex flex-col items-center justify-start h-screen">
      {userOffers.map((item) => (
        <li key={item}>
          <FavoritesOffers data={item} />
        </li>
      ))}
    </ul>
  );
}
