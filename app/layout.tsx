import './globals.css';
import './enhanced-ui.css';
import './ui-fixes.css';
import React from 'react';
import type { Metadata } from 'next';
import ClientThemeLayout from './components/ClientThemeLayout';

export const metadata: Metadata = {
  title: 'UB Reader - Next.js Application',
  description: 'The Urantia Book Reader built with Next.js',
};

// Add script for FontAwesome icons
const fontAwesomeCDN = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';

// Root layout (Server Component)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={fontAwesomeCDN} />
      </head>
      <body>
        <ClientThemeLayout>{children}</ClientThemeLayout>
      </body>
    </html>
  );
}
