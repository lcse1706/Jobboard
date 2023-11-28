import { GoogleMaps } from "./components/GoogleMaps";
import { JobOfferList } from "./components/JobOfferList";

export default async function Page() {
  return (
    <section className="flex flex-row w-full  p-5">
      <section className="w-2/3">
        <JobOfferList />
      </section>
      <section className="w-1/3 rounded-md border border-gray-300 ml-5 h-[50vh]">
        <GoogleMaps />
      </section>
    </section>
  );
}
