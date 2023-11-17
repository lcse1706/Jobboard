"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui";

export const ProfileNav = () => {
  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="flex flex-row h-20 bg-gray-200 items-center justify-end p-4 flex w-full ">
      <ul className="flex flex-row justify-end w-1/2">
        <li>
          <Link href="/profile/" className="hover:text-gray-600 mr-5">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/profile/offers" className="hover:text-gray-600">
            My Offers
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
