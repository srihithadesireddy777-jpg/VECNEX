import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/common/whatsapp-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://capstonia.qd.je'),
  title: 'VECNEX — Ideas Deserve to be Engineered',
  description:
    'VECNEX is the premier engineering project marketplace. Verified production-grade source code, IEEE-compliant reports, viva presentations, and direct technical mentoring for CSE, IT, AI&DS, AIML, and Data Science.',
  keywords: [
    'engineering projects',
    'capstone projects',
    'final year projects',
    'IEEE project reports',
    'computer science projects',
    'AI ML projects',
    'VECNEX',
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'PF-zrsKVlBaRpYMTe1qeDXI9UxWVvVLPxhddVd-xG0E',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        className={`${inter.className} bg-[#F7F5EF] text-[#111111] antialiased min-h-screen flex flex-col selection:bg-[#E8D2D6] selection:text-[#111111]`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
