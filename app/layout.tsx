import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientThemeLayout from './components/ClientThemeLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UB Reader',
  description: 'The Urantia Book Reader - A simple, responsive study tool',
};

// Root layout (Server Component)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeLayout>{children}</ClientThemeLayout>
      </body>
    </html>
  );
}
