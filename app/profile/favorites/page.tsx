import { getServerSession } from "next-auth";

import { authConfig } from "@/app/login/lib/auth";
import { pickOffers } from "@/components/utils";

import { FavoritesOffers } from "./components/FavoritesOffers";

export default async function Offers() {
  const session = await getServerSession(authConfig);
  let userOffers = [];
  if (session) {
    userOffers = await pickOffers("favorites");
  }
  return (
    <ul className="flex flex-col items-center justify-start dh-screen">
      {userOffers.length > 0 ? (
        userOffers.map((item) => <FavoritesOffers key={item.id} data={item} />)
      ) : (
        <div className="bg-white p-8 rounded-lg border shadow-lg max-w-6xl mx-auto mt-8">
          You have not add any offer to favorites yet !
        </div>
      )}
    </ul>
  );
}
