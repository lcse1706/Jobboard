import { JobOfferList } from './JobOfferList';
import { JobOfferMap } from './JobOfferMap';

const Home = () => {
  return (
    <section className="flex flex-row w-full ">
      <JobOfferList />
      <JobOfferMap />
    </section>
  );
};

export default Home;
