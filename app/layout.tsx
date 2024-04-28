import { isMobile } from "react-device-detect";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header, Navigation } from "@/components/ui/";
import Hamburger from "@/components/ui/Hamburger/Hamburger";

import { Providers } from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobboard by LC",
  description: "Find your new job !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = [
    { label: "Offers", link: "/dashboard" },
    { label: "Add Offer", link: "/add" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        <Providers>
          <Header title="Jobboard">
            <Navigation nav={nav} />
          </Header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
