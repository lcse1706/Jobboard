import { GoogleMaps } from '@/components/GoogleMaps';
import { JobOfferList } from '@/components/JobOfferList';

const Home = () => {
  return (
    <section className="flex flex-row w-full  p-5">
      <JobOfferList />
      <section
        className="w-1/3 rounded-md border border-gray-300 ml-5"
        style={{ height: '50vh' }}
      >
        <GoogleMaps />
      </section>
    </section>
  );
};

export default Home;
