import type { Metadata } from "next";

import { ChatbotUI, Header, Navigation } from "@/components/ui/";

import { Providers } from "./Providers";
import { inter } from "./fonts";
import "./globals.css";

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
      <body
        className={`${inter.className} bg-gray-200 text-black dark:bg-gray-700 dark:text-white`}
      >
        <Providers>
          <Header>
            <Navigation nav={nav} />
          </Header>
          {children}
          <ChatbotUI />
        </Providers>
      </body>
    </html>
  );
}
