import { fetchDetails } from "@/services";

import { Details } from "./components/Details";

type Props = {
  params: {
    id: string;
  };
};

const DetailsPage = async ({ params }: Props) => {
  const offerId = params.id;
  const offer = await fetchDetails(offerId);

  return (
    <div className="flex justify-center items-center">
      <Details details={offer} />;
    </div>
  );
};

export default DetailsPage;
