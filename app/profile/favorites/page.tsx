import { pickOffers } from "@/components/utils/pickOffers";

import { FavoritesOffers } from "./FavoritesOffers";

export default async function Offers() {
  const userOffers = await pickOffers("favorites");

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
