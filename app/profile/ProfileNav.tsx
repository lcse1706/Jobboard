"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui";

export const ProfileNav = () => {
  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <nav>
      <ul>
        <li>
          <Link href="/profile/offers">My Offers</Link>
        </li>
      </ul>
      <Button type="button" label="LogOut" onClick={logOutHandler} />
    </nav>
  );
};
