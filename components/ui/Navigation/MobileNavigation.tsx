import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { Button } from "../Button";

interface MobileNavigationProps {
  nav: Array<{ label: string; link: string }>;
  isOpen: boolean;
  handleHamburger: () => void;
}

export const MobileNavigation = ({
  nav,
  isOpen,
  handleHamburger,
}: MobileNavigationProps) => {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const pathname = usePathname();

  const logInHandler = () => {
    router.push("/login");
  };

  return (
    <div>
      {isOpen ? (
        <ul
          onClick={handleHamburger}
          className="flex flex-col justify-center items-center fixed inset-0 space-x-2 bg-black bg-opacity-80 text-white z-10"
        >
          {nav.map((item, index) => (
            <li
              key={index}
              className={`py-2 px-4 m-1 
            ${
              pathname === item.link
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }
            `}
            >
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
          {isAuthenticated && (
            <p className="border-l-2 border-gray-600 py-2 px-4 m-1">
              You are logged in as {session.data?.user?.name}!
            </p>
          )}
          <div className="py-2 px-4 m-1">
            <Button
              type="submit"
              label={isAuthenticated ? "My profile" : "Login"}
              onClick={
                isAuthenticated ? () => router.push("/profile") : logInHandler
              }
            />
          </div>
        </ul>
      ) : (
        <span
          onClick={handleHamburger}
          className="text-4xl"
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </span>
      )}
    </div>
  );
};
