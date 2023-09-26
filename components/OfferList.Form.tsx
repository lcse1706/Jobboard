import Image from 'next/image';

interface OffersProps {
  offers: Array<{
    imgSrc: string;
    title: string;
    salary: string;
    technologies: string[];
    localization: string;
    description: string;
  }>;
}

export const OfferListForm = (props: OffersProps) => {
  // console.log('New render:' + props.offers[0].title);
  return (
    <ul className="m-5">
      {props.offers.map((offer, index) => (
        <li key={index} className="p-4 mb-4 border rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <Image
              src={offer.imgSrc}
              alt="tech img"
              width={25}
              height={25}
              className="mr-2"
            />
            <p className="text-xl font-semibold">{offer.title}</p>
          </div>
          <p className="text-gray-600">{offer.salary}</p>
          <p className="text-blue-500">{offer.technologies.join(', ')}</p>
          <p className="text-gray-600">{offer.localization}</p>
          <p className="mt-2">{offer.description}</p>
        </li>
      ))}
    </ul>
  );
};
