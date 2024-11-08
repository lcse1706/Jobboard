import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import defaultLogo from "@/app/favicon.ico";
import { classMerge } from "@/components/ui/utils/cn";
import { checkIfUserInDb, toggleFavorite } from "@/components/utils";
import { useDataContext, useHelpersContext } from "@/context";
import { OfferListFormProps } from "@/lib/types";

export const OfferListForm = (props: OfferListFormProps) => {
  const { hoveredMarkerId } = useHelpersContext();
  const { setOfferId } = useDataContext();
  const { data: session } = useSession();
  const router = useRouter();
  const offer = props.data;
  const user = props.user;

  const [favorite, setFavorite] = useState(false);

  const checkFavorite = async () => {
    if (user && user.favorites.includes(offer.id)) {
      setFavorite(true);
    }
  };

  useEffect(() => {
    // Checking if offer is set as favorite to specific user and show it on the list.
    if (user) {
      checkFavorite();
    }
  }, [user, offer.id]);

  const handleFavorite = async (offerId: string) => {
    if (session) {
      // Checking if offer is set as favorite to specific user and show it on the list.
      await checkIfUserInDb(session);
      await toggleFavorite(offerId, session);
      setFavorite(!favorite);

      router.refresh();
    } else {
      console.log("No logged user.");
      router.push("/login");
    }
  };

  return (
    <li
      className={classMerge(`bg-white p-4 my-4 border rounded-lg shadow-lg relative
      ${!isMobile && "hover:scale-[103%] hover:ring-1"}
      ${hoveredMarkerId === offer.id && "scale-[103%] ring-1"}
      `)}
    >
      <button
        type="button"
        className={`bg-gray-500 disabled:bg-gray-500  font-bold py-1 px-2 rounded-full m-1 absolute top-1 right-5 ${
          favorite ? "text-yellow-400" : "text-white"
        } `}
        onClick={() => handleFavorite(offer.id)}
      >
        <FontAwesomeIcon icon={faStar} />
      </button>

      <Link
        href={`/dashboard/${offer.id}`}
        key={offer.id}
        onClick={() => setOfferId(offer.id)}
      >
        <div className="flex items-center mb-2 mr-16">
          <Image
            src={offer.logoURL === "" ? defaultLogo : offer.logoURL}
            alt="tech img"
            width={75}
            height={75}
            className="mr-4"
          />

          <p className="text-xl font-semibold">{offer.title}</p>
        </div>
        <p className="text-gray-600">{offer.salary}</p>
        <p className="text-blue-500">{offer.technologies}</p>
        <p className="text-gray-600">{offer.location}</p>
        <p className="mt-2">{offer.description}</p>
      </Link>
    </li>
  );
};
