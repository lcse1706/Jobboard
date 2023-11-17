import { ProfileNav } from "./ProfileNav";

// Import your ProfileOffers component here

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <ProfileNav />
      <section className="ml-8">
        <p>Profile Info</p>
      </section>
    </div>
  );
};

export default ProfilePage;
