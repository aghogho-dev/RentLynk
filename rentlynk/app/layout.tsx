// File: app/layout.tsx
'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { NavBar } from '../components/molecules/NavBar';
import type { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider>
            <NavBar />
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}
