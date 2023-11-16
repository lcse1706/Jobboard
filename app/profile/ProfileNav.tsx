"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";

export const ProfileNav = () => {
  const router = useRouter();

  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <nav>
      <Button type="button" label="LogOut" onClick={logOutHandler} />
    </nav>
  );
};
