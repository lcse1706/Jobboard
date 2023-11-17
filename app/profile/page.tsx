import { ProfileNav } from "./ProfileNav";

// Import your ProfileOffers component here

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-around h-screen">
      <ProfileNav />
      <section className="ml-8">
        <p>Profile Info</p>
      </section>
    </div>
  );
};

export default ProfilePage;
