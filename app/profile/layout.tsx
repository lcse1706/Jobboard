import { ProfileNav } from "./ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProfileNav />
      {children}
    </div>
  );
}
