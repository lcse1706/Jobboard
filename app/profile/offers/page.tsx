import { pickOffers } from "@/components/utils/pickOffers";

import { ProfileOffers } from "./ProfileOffers";

export default async function Offers() {
  // console.log(users);

  const userOffers = await pickOffers("offersPublished");

  return (
    <ul className="flex flex-col items-center justify-start h-screen">
      {userOffers.map((item) => (
        <li key={item}>
          <ProfileOffers data={item} />
        </li>
      ))}
    </ul>
  );
}
