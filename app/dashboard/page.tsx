import { isMobileDevice } from "@/lib/isMobileDevice";

import { GoogleMaps } from "./components/GoogleMaps";
import { JobOfferList } from "./components/JobOfferList";

export default async function Page() {
  const isMobile = isMobileDevice();
  console.log(isMobile);
  return (
    <section
      className={isMobile ? "flex flex-col-reverse" : "flex flex-row p-5"}
    >
      <section className={isMobile ? "" : "w-2/3"}>
        <JobOfferList />
      </section>
      <section
        className={
          isMobile
            ? "w-full rounded-md border border-gray-300 h-[50vh] p-5"
            : "w-1/3 rounded-md border border-gray-300 ml-5 h-[50vh]"
        }
      >
        <GoogleMaps />
      </section>
    </section>
  );
}
