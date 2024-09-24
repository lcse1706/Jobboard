import { getServerSession } from "next-auth";

import { authConfig } from "@/app/login/lib/auth";
import { pickOffers } from "@/components/utils/pickOffers";

import { ProfileOffers } from "./components/ProfileOffers";

export default async function Offers() {
  const session = await getServerSession(authConfig);

  let userOffers = [];
  if (session) {
    userOffers = await pickOffers("offersPublished");
  }

  return (
    <ul className="flex flex-col items-center justify-start dh-screen mx-2 text-black">
      {userOffers.length > 0 ? (
        userOffers.map((item) => <ProfileOffers key={item.id} data={item} />)
      ) : (
        <div className="bg-white p-8 rounded-lg border shadow-lg max-w-6xl mx-auto mt-8">
          You have not published any offer yet !
        </div>
      )}
    </ul>
  );
}
