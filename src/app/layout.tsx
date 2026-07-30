import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond, Bodoni_Moda } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import LightbulbToggle from '@/components/LightbulbToggle';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni', style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'Abhi - Jack of all trades',
  description: 'Premium Luxury Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${bodoni.variable} font-sans antialiased overflow-x-hidden theme-transition bg-sky`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <LightbulbToggle />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
