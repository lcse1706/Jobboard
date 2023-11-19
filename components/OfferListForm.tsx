import { useState } from "react";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useDataContext } from "@/context";
import { useHelpersContext } from "@/context/HelpersContext";
import { OffersProps } from "@/lib/types";
import { getUsers } from "@/services";

import defaultLogo from "../app/favicon.ico";
import { Button } from "./ui";
import { checkIfUserInDb } from "./utils/checkIfUserInDb";
import { toggleFavorite } from "./utils/toggleFavorite";

export const OfferListForm = (props: any) => {
  const { hoveredMarkerId } = useHelpersContext();
  const { setOfferId } = useDataContext();
  const { data: session } = useSession();
  const router = useRouter();
  const offer = props.offer;

  const [favorite, setFavorite] = useState(false);

  const checkIfFavorite = async () => {
    const users = await getUsers();
    console.log(users);

    const sessionUser = session?.user?.email;

    for (const user in users) {
      if (sessionUser === users[user].email) {
        // Use some() instead of filter() to check if the offer.id is in favorites
        if (users[user].favorites.some((item) => item === offer.id)) {
          setFavorite(true);
          console.log(offer.id);
        }
      }
    }
  };

  checkIfFavorite();

  const handleFavorite = async (offerId: string) => {
    if (session) {
      //Check if exist in db
      await checkIfUserInDb(session);
      await toggleFavorite(offerId, session);

      //1. Wyszukac odpowiedniego uztkownika
    } else {
      console.log("No logged user.");
      router.push("/login");
    }
  };

  return (
    <ul className="m-5">
      <li
        key={offer.id}
        className={`p-4 mb-4 border rounded-lg shadow-lg hover:scale-105 hover:ring-1 ${
          hoveredMarkerId === offer.id ? "scale-105 ring-1" : ""
        }`}
      >
        <Link
          href={`/${offer.id}`}
          key={offer.id}
          onClick={() => setOfferId(offer.id)}
        >
          <div className="flex items-center mb-2">
            <Image
              src={offer.logoURL === "" ? defaultLogo : offer.logoURL}
              alt="tech img"
              width={25}
              height={25}
              className="mr-2"
            />
            <p className="text-xl font-semibold">{offer.title}</p>
          </div>
          <p className="text-gray-600">{offer.salary}</p>
          {/* <p className="text-blue-500">{offer.technologies.join(', ')}</p> */}
          <p className="text-blue-500">{offer.technologies}</p>
          <p className="text-gray-600">{offer.location}</p>
          <p className="mt-2">{offer.description}</p>
        </Link>
        <Button
          type="button"
          label={<FontAwesomeIcon icon={faStar} />}
          className={`${favorite ? "text-[#000000]" : "text-white"}`}
          onClick={() => handleFavorite(offer.id)}
        />
      </li>
    </ul>
  );
};
