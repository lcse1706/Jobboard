import { User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { useDataContext } from "@/context";
import { useHelpersContext } from "@/context/HelpersContext";
import { authConfig } from "@/lib/auth";
import { OffersProps } from "@/lib/types";
import { getUsers, registerUser, updateUser } from "@/services/users";

import defaultLogo from "../app/favicon.ico";
import { Button } from "./ui";
import { checkIfUserInDb } from "./utils/checkIfUserInDb";

export const OfferListForm = (props: OffersProps) => {
  const { hoveredMarkerId } = useHelpersContext();
  const { setOfferId } = useDataContext();
  const { data: session } = useSession();
  const router = useRouter();

  const handleFavorite = async (offerId: string) => {
    if (session) {
      const loggedEmail = session?.user?.email;

      await checkIfUserInDb(session);

      const updatedUsers = await getUsers();

      //1. Wyszukac odpowiedniego uztkownika
      for (const user in updatedUsers) {
        if (loggedEmail === updatedUsers[user].email) {
          let favoriteExists = false;

          for (let i = 0; i < updatedUsers[user].favorites.length; i++) {
            const favorite = updatedUsers[user].favorites[i];
            console.log(favorite);

            if (favorite === offerId) {
              console.log("Already exists in favorites. Deleting ...");
              favoriteExists = true;

              // Remove offerId from favorites array
              const updatedFavorites = [...updatedUsers[user].favorites];
              updatedFavorites.splice(i, 1);

              const updatedUser = {
                ...updatedUsers[user],
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
              ...updatedUsers[user],
              favorites: [...updatedUsers[user].favorites, offerId],
            };

            // console.log(updatedUser);
            updateUser(user, updatedUser);
          }
        }
      }
    } else {
      console.log("No logged user.");
      router.push("/login");
    }
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
