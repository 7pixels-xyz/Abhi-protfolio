import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, Cinzel, Cormorant_Garamond, Bodoni_Moda } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import LightbulbToggle from '@/components/LightbulbToggle';
import CallSheet from '@/components/CallSheet';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '800', '900'], variable: '--font-inter' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-instrument' });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600', '700'], style: ['normal', 'italic'], variable: '--font-cormorant' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni', style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'Abhi - Jack of all trades',
  description: 'Premium Luxury Portfolio',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument.variable} ${cinzel.variable} ${cormorant.variable} ${bodoni.variable} font-sans antialiased overflow-x-hidden theme-transition bg-sky`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <LightbulbToggle />
            {children}
            <CallSheet />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
