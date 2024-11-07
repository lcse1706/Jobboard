import Image from "next/image";

import defaultLogo from "@/app/favicon.ico";
import { Button } from "@/components/ui";
import { DetailsProps } from "@/lib/types";

export const Details = (props: DetailsProps) => {
  const data = props.details;
  return (
    <div className="bg-white text-black p-8 rounded-lg shadow-md max-w-6xl mx-3 mt-8">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={data.logoURL === "" ? defaultLogo : data.logoURL}
          alt="logo"
          width={100}
          height={100}
          className="rounded-full mr-3"
        />
        <p className="text-2xl font-bold mb-2"> {data.title}</p>
      </div>
      <p className="text-gray-600 mb-2">{data.location}</p>
      <p className="text-green-600 font-bold mb-2">{data.salary}</p>
      <p className="italic text-gray-500 mb-4">{data.technologies}</p>
      <p className="text-left">{data.description}</p>
      <div className="flex justify-center">
        <Button label="Apply" type="button" />
      </div>
    </div>
  );
};
