import Image from "next/image";
import Link from "next/link";

import { useDataContext } from "@/context";
import { useHelpersContext } from "@/context/HelpersContext";
import { OffersProps } from "@/lib/types";

export const OfferListForm = (props: OffersProps) => {
  const { hoveredMarkerId } = useHelpersContext();
  const { setOfferId } = useDataContext();

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
                src={offer.logoURL}
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
      ))}
    </ul>
  );
};
