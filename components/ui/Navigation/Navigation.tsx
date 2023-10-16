"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../Button";

interface NavProps {
  nav: Array<{ label: string; link: string }>;
  style?: React.CSSProperties;
}

export const Navigation = (props: NavProps) => {
  const router = useRouter();
  const session = useSession();

  const logInHandler = () => {
    router.push("/login");
  };
  const logOutHandler = () => {
    signOut();
  };
  return (
    <nav className="flex w-2/5 justify-end items-end" style={props.style}>
      <ul className="flex flex-row space-x-2">
        {props.nav.map((item, index) => (
          <li key={index} className="grow text-center py-2 px-4 m-1">
            <Link href={item.link}>{item.label}</Link>
          </li>
        ))}
        {session.status !== "authenticated" ? (
          <Button type="submit" label="Login" onClick={logInHandler}></Button>
        ) : (
          <Button type="submit" label="Logout" onClick={logOutHandler}></Button>
        )}
      </ul>
    </nav>
  );
};
