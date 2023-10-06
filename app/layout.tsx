import { Header } from '@/components/ui/';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/ui/';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jobboard by LC',
  description: 'Fimd your new job !',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = [
    { label: 'Offers', link: '/' },
    { label: 'Add Offer', link: '/add' },
    { label: 'Contact', link: '/contact' },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header titel="Jobboard">
            <Navigation nav={nav} />
          </Header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
