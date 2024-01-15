// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header, Navigation } from "@/components/ui/";

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
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
