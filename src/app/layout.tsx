import './globals.css';
import type { Metadata } from 'next';
import { Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Fiserv POS EMI Platform',
  description: 'A modern POS system for EMI transactions'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ff5722'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
