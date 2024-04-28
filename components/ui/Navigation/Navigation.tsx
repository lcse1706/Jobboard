"use client";

import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../Button";

interface NavProps {
  nav: Array<{ label: string; link: string }>;
  style?: React.CSSProperties;
}

export const Navigation = (props: NavProps) => {
  console.log(isMobile);
  const router = useRouter();
  const session = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const logInHandler = () => {
    router.push("/login");
  };

  const desktopView = (
    <ul className={"flex space-x-2"}>
      {props.nav.map((item, index) => (
        <li key={index} className="grow text-center py-2 px-4 m-1">
          <Link href={item.link}>{item.label}</Link>
        </li>
      ))}
      {session.status !== "authenticated" ? (
        <p></p>
      ) : (
        <p className="border-l-2  border-gray-600 py-2 px-4 m-1">
          You are logged as {session.data.user?.name} !
        </p>
      )}
      {session.status !== "authenticated" ? (
        <Button type="submit" label="Login" onClick={logInHandler} />
      ) : (
        <Button
          type="submit"
          label="My profile"
          onClick={() => router.push("/profile")}
        />
      )}
    </ul>
  );

  const mobileView = (
    <div className="">
      {isOpen ? (
        <ul
          onClick={handleHamburger}
          className={
            "flex flex-col justify-center items-center fixed top-0 right-0 left-0 bottom-0 space-x-2 bg-black bg-opacity-80 text-white z-10"
          }
        >
          {/* <div className="bg-gray-200"> */}
          {props.nav.map((item, index) => (
            <li key={index} className="py-2 px-4 m-1">
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
          {session.status !== "authenticated" ? (
            <p></p>
          ) : (
            <p className="border-l-2  border-gray-600 py-2 px-4 m-1">
              You are logged as {session.data.user?.name} !
            </p>
          )}
          <div className="py-2 px-4 m-1 ">
            {session.status !== "authenticated" ? (
              <Button type="submit" label="Login" onClick={logInHandler} />
            ) : (
              <Button
                type="submit"
                label="My profile"
                onClick={() => router.push("/profile")}
              />
            )}
          </div>
          {/* </div> */}
        </ul>
      ) : (
        <span onClick={handleHamburger} className="text-xl">
          <FontAwesomeIcon icon={faBars} />
        </span>
      )}
    </div>
  );

  return (
    // <nav className="flex justify-end items-end" style={props.style}>
    <nav className="" style={props.style}>
      {isMobile ? mobileView : desktopView}
    </nav>
  );
};
