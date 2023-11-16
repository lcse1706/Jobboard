import { useLayoutEffect } from "react";

import { useSession } from "next-auth/react";

import { fetchOffers } from "@/services";
import { getUsers } from "@/services/users";

const Offers = async () => {
  const offers = await fetchOffers();
  const users = await getUsers();
  const { data: session } = useSession();

  const sessionUser = session?.user?.email;

  // Find logged user
  let userData;
  for (const user in users) {
    if (sessionUser === users[user].email) userData = users[user];
  }

  // Find published offers
  let userOffers = [];
  for (const offer in offers) {
    for (const published in userData.offersPublished)
      if (published === offer) userOffers.push(offer);
  }

  console.log(userOffers);

  return (
    <ul>
      {userOffers.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Offers;
