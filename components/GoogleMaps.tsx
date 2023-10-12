'use client';

import { useDataContext } from '@/context/DataContext';
import { useHelpersContext } from '@/context/HelpersContext';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo } from 'react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export const GoogleMaps: NextPage = () => {
  const mapCenter = useMemo(() => ({ lat: 51.8689731, lng: 19.2029511 }), []);
  const { filteredData } = useDataContext();
  const { setHoveredMarkerId } = useHelpersContext();

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

  //TODO change pos.title to pos.id after connecting to database
  return (
    <GoogleMap
      options={mapOptions}
      zoom={5}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={mapStyles}
      onLoad={() => console.log('Map Component Loaded...')}
    >
      {filteredData.map(pos => (
        <MarkerF
          key={pos.id}
          position={pos.coordinates}
          onClick={() => console.log('Marker Added')}
          onMouseOver={() => {
            setHoveredMarkerId(pos.id);
          }}
          onMouseOut={() => setHoveredMarkerId('')}
        />
      ))}
    </GoogleMap>
  );
};
