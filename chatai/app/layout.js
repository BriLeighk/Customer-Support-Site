import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ['400', '700'],
});

export const metadata = {
  title: "AI Customer Support Application",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        
        
        {children}
      </body>
    </html>
  );
}