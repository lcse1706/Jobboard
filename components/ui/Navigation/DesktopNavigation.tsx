import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { Button } from "../Button";

interface DesktopNavigationProps {
  nav: Array<{ label: string; link: string }>;
}

export const DesktopNavigation = ({ nav }: DesktopNavigationProps) => {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const pathname = usePathname();

  const logInHandler = () => {
    router.push("/login");
  };

  return (
    <ul className="flex space-x-2">
      {nav.map((item, index) => (
        <li
          key={index}
          className={`grow text-center py-2 px-4 m-1 font-medium tracking-wider ${
            pathname === item.link
              ? "text-blue-500 border-b-2 border-blue-500"
              : ""
          }`}
        >
          <Link href={item.link}>{item.label}</Link>
        </li>
      ))}
      {isAuthenticated && (
        <p className="border-l-2 border-gray-600 py-2 px-4 m-1">
          You are logged in as {session.data?.user?.name}!
        </p>
      )}
      <Button
        type="submit"
        label={isAuthenticated ? "My profile" : "Login"}
        onClick={isAuthenticated ? () => router.push("/profile") : logInHandler}
      />
    </ul>
  );
};
