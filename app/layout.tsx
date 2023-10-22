import { Header } from "@/components/ui/";
import { Navigation } from "@/components/ui/";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

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
    { label: "Offers", link: "/" },
    { label: "Add Offer", link: "/add" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
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
