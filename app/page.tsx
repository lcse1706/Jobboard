import { JobOfferList } from './JobOfferList';
import { JobOfferMap } from './JobOfferMap';

const Home = () => {
  return (
    <section className="flex flex-row w-full  p-5">
      <JobOfferList />
      <JobOfferMap />
    </section>
  );
};

export default Home;
