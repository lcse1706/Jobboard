"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui";

export const ProfileNav = () => {
  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-gray-800 p-4 relative top-0 left-0 h-2/3 flex flex-col justify-between">
      <ul className="flex flex-col space-y-2">
        <li>
          <Link href="/profile/" className="text-white hover:text-gray-300">
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/offers"
            className="text-white hover:text-gray-300"
          >
            My Offers
          </Link>
        </li>
      </ul>
      <Button
        type="button"
        label="LogOut"
        onClick={logOutHandler}
        className="text-white hover:text-gray-300"
      />
    </nav>
  );
};
