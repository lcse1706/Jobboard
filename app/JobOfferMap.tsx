import { GoogleMaps } from '@/components/GoogleMaps';

export const JobOfferMap = () => {
  return (
    <section
      className="w-1/3 rounded-md border border-gray-300"
      style={{ height: '50vh' }}
    >
      <GoogleMaps />
    </section>
  );
};
