import { pickOffers } from "@/components/utils/pickOffers";

import { ProfileOffers } from "./components/ProfileOffers";

export default async function Offers() {
  // console.log(users);

  const userOffers = await pickOffers("offersPublished");

  return (
    <ul className="flex flex-col items-center justify-start dh-screen">
      {userOffers.length > 0 ? (
        userOffers.map((item) => (
          <li key={item}>
            <ProfileOffers data={item} />
          </li>
        ))
      ) : (
        <div className="bg-white p-8 rounded-lg border shadow-lg max-w-6xl mx-auto mt-8">
          You have not published any offer yet !
        </div>
      )}
    </ul>
  );
}
