import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useDataContext } from "@/context";
import { useHelpersContext } from "@/context/HelpersContext";
import { authConfig } from "@/lib/auth";
import { OffersProps } from "@/lib/types";
import { getUsers, updateUser } from "@/services/users";

import defaultLogo from "../app/favicon.ico";
import { Button } from "./ui";

export const OfferListForm = (props: OffersProps) => {
  const { hoveredMarkerId } = useHelpersContext();
  const { setOfferId } = useDataContext();
  const { data: session } = useSession();

  const handleFavorite = async (offerId: string) => {
    const users = await getUsers();
    const loggedEmail = session?.user?.email;
    //1. Wyszukac odpowiedniego uztkownika

    for (const user in users) {
      //TODO logowanie przez google stwarzalo uzytkownika w bazie danych

      // console.log("Logged User :" + loggedEmail);
      // console.log("User from DB :" + users[user].email);
      // Looking for logged user in database
      if (loggedEmail === users[user].email) {
        let favoriteExists = false;

        for (let i = 0; i < users[user].favorites.length; i++) {
          const favorite = users[user].favorites[i];
          console.log(favorite);

          if (favorite === offerId) {
            console.log("Already exists in favorites. Deleting ...");
            favoriteExists = true;

            // Remove offerId from favorites array
            const updatedFavorites = [...users[user].favorites];
            updatedFavorites.splice(i, 1);

            const updatedUser = {
              ...users[user],
              favorites: updatedFavorites,
            };

            console.log(updatedUser);
            updateUser(user, updatedUser);

            break; // No need to continue checking, exit the loop
          }
        }

        if (!favoriteExists) {
          console.log("Not found in favorites. Adding ...");

          const updatedUser = {
            ...users[user],
            favorites: [...users[user].favorites, offerId],
          };

          // console.log(updatedUser);
          updateUser(user, updatedUser);
        }
      }
    }
    // 2. sprawdzic czy record jest jest w favorite

    // jesli nie  - DODAC

    // jesli tak - USUNAC

    // console.log(users);
    // const session = await getServerSession(authConfig);
    // console.log(session?.user?.email);
    // console.log(session?.user?.email);
    // console.log(offerId);
  };

  return (
    <ul className="m-5">
      {props.offers.map((offer) => (
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
            label="Add to Favorite"
            onClick={() => handleFavorite(offer.id)}
          />
        </li>
      ))}
    </ul>
  );
};
