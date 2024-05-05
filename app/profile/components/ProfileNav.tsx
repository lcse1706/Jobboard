"use client";

import { isMobile } from "react-device-detect";

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui";

export const ProfileNav = () => {
  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/dashboard" });
  };

  return (
    <nav className="flex bg-gray-200 items-center justify-end pr-4 pt-2 w-full">
      <ul
        className={
          isMobile ? "flex flex-col" : "flex flex-row justify-around w-1/5"
        }
      >
        <li className="text-center mb-1">
          <Link href="/profile/" className="hover:text-gray-600">
            Profile
          </Link>
        </li>
        <li className="text-center  mb-1">
          <Link href="/profile/offers" className="hover:text-gray-600">
            My Offers
          </Link>
        </li>
        <li className="text-center">
          <Link href="/profile/favorites" className="hover:text-gray-600">
            Favorites Offers
          </Link>
        </li>
      </ul>
      <Button
        type="button"
        label="LogOut"
        onClick={logOutHandler}
        className="text-white hover:text-gray-300 ml-5"
      />
    </nav>
  );
};
