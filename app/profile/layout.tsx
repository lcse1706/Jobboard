import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/ui/";
import { Navigation } from "@/components/ui/";

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
