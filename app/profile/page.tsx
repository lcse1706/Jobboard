// Import your ProfileOffers component here
import { getServerSession } from "next-auth";
import Image from "next/image";

import { authConfig } from "@/lib/auth";

import defaultLogo from "../favicon.ico";

const ProfilePage = async () => {
  const session = await getServerSession(authConfig);
  console.log(session?.user?.image);
  const logo = session?.user?.image;
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <section className="flex flex-row mt-10">
        {logo ? (
          typeof logo === "string" ? (
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={50}
              className="rounded-full mr-3"
            />
          ) : (
            <Image
              src={defaultLogo}
              alt="default logo"
              width={50}
              height={50}
              className="rounded-full mr-3"
            />
          )
        ) : null}
        <div>
          <p>
            <span className="font-bold">Name:</span> {session?.user?.name}
          </p>
          <p>
            <span className="font-bold"> Email:</span> {session?.user?.email}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
