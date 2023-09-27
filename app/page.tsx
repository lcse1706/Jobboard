import { JobOfferList } from './JobOfferList';
import { JobOfferMap } from './JobOfferMap';
import { Providers } from './providers';

const Home = () => {
  return (
    <Providers>
      <section className="flex flex-row w-full min-h-1/2 p-5">
        <JobOfferList />
        <JobOfferMap />
      </section>
    </Providers>
  );
};

export default Home;
