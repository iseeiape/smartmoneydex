import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SmartMoneyDEX | Track Top Solana Wallets & Smart Money',
  description: 'Discover and track the top smart money wallets on Solana. Real-time leaderboards, P&L tracking, and on-chain analytics for crypto traders.',
  keywords: ['smartmoneydex', 'solana', 'smart money', 'wallet tracker', 'crypto', 'whales', 'on-chain analysis', 'dex'],
  openGraph: {
    title: 'SmartMoneyDEX | Track Top Solana Wallets',
    description: 'Discover and track the top smart money wallets on Solana. Real-time leaderboards and analytics.',
    type: 'website',
    siteName: 'SmartMoneyDEX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartMoneyDEX | Track Top Solana Wallets',
    description: 'Discover and track the top smart money wallets on Solana.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
