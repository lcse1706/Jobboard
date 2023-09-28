'use client';

import { useDataContext } from '@/context/Data.Context';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo } from 'react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export const GoogleMaps: NextPage = () => {
  // const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: 51.8689731, lng: 19.2029511 }), []);
  const { filteredData } = useDataContext();

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
    // libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={6}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={mapStyles}
      onLoad={() => console.log('Map Component Loaded...')}
    >
      {filteredData.map((pos, index) => (
        <MarkerF
          key={index}
          position={pos.coordinates}
          onClick={() => console.log('Marker Added')}
        />
      ))}
    </GoogleMap>
  );
};
