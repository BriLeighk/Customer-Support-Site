"use client"; // Ensure this is a client component

import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ['400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        {children} {/* Ensure children are rendered here */}
      </body>
    </html>
  );
}