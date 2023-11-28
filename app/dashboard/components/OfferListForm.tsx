import { useEffect, useState } from "react";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import defaultLogo from "@/app/favicon.ico";
import { Button } from "@/components/ui";
import { checkIfUserInDb, toggleFavorite } from "@/components/utils";
import { useDataContext, useHelpersContext } from "@/context";
import { OfferListFormProps } from "@/lib/types";
import { getUsers } from "@/services";

export const OfferListForm = (props: OfferListFormProps) => {
  const { hoveredMarkerId } = useHelpersContext();
  const { setOfferId } = useDataContext();
  const { data: session } = useSession();
  const router = useRouter();
  const offer = props.offer;

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // Checking if offer is set as favorite to specific user and show it on the list.
    const checkFavorite = async () => {
      const users = await getUsers();
      const sessionUser = session?.user?.email;
      for (const user in users) {
        if (sessionUser === users[user].email) {
          if (users[user].favorites.some((item) => item === offer.id)) {
            setFavorite(true);
          }
        }
      }
    };
    checkFavorite();
  }, [session, offer.id]);

  const handleFavorite = async (offerId: string) => {
    if (session) {
      //Check if exist in db
      await checkIfUserInDb(session);
      await toggleFavorite(offerId, session);
      setFavorite(!favorite);
    } else {
      console.log("No logged user.");
      router.push("/login");
    }
  };
  //FIXME Not always display color in favorite star - cn be browser problem -because class adding  is done correctly

  return (
    <li
      key={props.offer.id}
      className={`p-4 mb-4 border rounded-lg shadow-lg hover:scale-105 hover:ring-1 relative ${
        hoveredMarkerId === offer.id ? "scale-105 ring-1" : ""
      }`}
    >
      <Button
        type="button"
        label={<FontAwesomeIcon icon={faStar} />}
        className={`${
          favorite ? "text-gray-800" : "text-white"
        } absolute top-2 right-5`}
        onClick={() => handleFavorite(offer.id)}
      />
      <Link
        href={`/dashboard/${offer.id}`}
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
    </li>
  );
};
