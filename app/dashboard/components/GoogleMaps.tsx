"use client";

import { useMemo } from "react";

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import { useDataContext, useHelpersContext } from "@/context";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export const GoogleMaps: NextPage = () => {
  const mapCenter = useMemo(() => ({ lat: 51.8689731, lng: 19.2029511 }), []);
  const { filteredData, setOfferId } = useDataContext();
  const { setHoveredMarkerId } = useHelpersContext();
  const router = useRouter();

  const moveToOffer = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOGGLE_API as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={4}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={mapStyles}
      onLoad={() => console.log("Map Component Loaded...")}
    >
      {filteredData.map((pos) => (
        <MarkerF
          key={pos.id}
          position={pos.coordinates}
          onClick={() => moveToOffer(pos.id)}
          onMouseOver={() => {
            setHoveredMarkerId(pos.id);
          }}
          onMouseOut={() => setHoveredMarkerId("")}
        />
      ))}
    </GoogleMap>
  );
};
