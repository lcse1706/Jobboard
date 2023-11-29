import { pickOffers } from "@/components/utils";

import { FavoritesOffers } from "./components/FavoritesOffers";

export default async function Offers() {
  const userOffers = await pickOffers("favorites");
  return (
    <ul className="flex flex-col items-center justify-start dh-screen">
      {userOffers.length > 0 ? (
        userOffers.map((item) => (
          <li key={item}>
            <FavoritesOffers data={item} />
          </li>
        ))
      ) : (
        <div className="bg-white p-8 rounded-lg border shadow-lg max-w-6xl mx-auto mt-8">
          You have not add any offer to favorites yet !
        </div>
      )}
    </ul>
  );
}
