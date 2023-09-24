'use client';

import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo } from 'react';

const mapStyles = {
  width: '400px',
  height: '400px',
};

export const GoogleMaps: NextPage = () => {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    googleMapsApiKey: 'AIzaSyBmPkQe0zoiHaklj9BmJK_RROdqt46o5iM' as string,

    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={mapStyles}
      onLoad={() => console.log('Map Component Loaded...')}
    />
  );
};
