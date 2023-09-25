import { JobOfferList } from './JobOfferList';
import { JobOfferMap } from './JobOfferMap';

const Home = () => {
  return (
    <section className="flex flex-row w-full min-h-screen p-2">
      <JobOfferList />
      <JobOfferMap />
    </section>
  );
};

export default Home;
