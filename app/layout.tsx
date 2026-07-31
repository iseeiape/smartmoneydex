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
  description: 'Discover and track the top smart money wallets on Solana. Real-time leaderboards, P&L analytics, win rates, and on-chain insights for crypto traders.',
  keywords: ['smartmoneydex', 'solana', 'smart money', 'wallet tracker', 'crypto whales', 'on-chain analysis', 'solana wallets', 'trading', 'PnL tracker', 'crypto leaderboard'],
  metadataBase: new URL('https://smartmoneydex.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SmartMoneyDEX | Track Top Solana Wallets & Smart Money',
    description: 'Discover and track the top smart money wallets on Solana. Real-time leaderboards, P&L analytics, win rates, and on-chain insights.',
    url: 'https://smartmoneydex.com',
    type: 'website',
    siteName: 'SmartMoneyDEX',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartMoneyDEX | Track Top Solana Wallets',
    description: 'Discover and track the top smart money wallets on Solana.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SmartMoneyDEX',
              url: 'https://smartmoneydex.com',
              description: 'Track top smart money wallets on Solana. Real-time leaderboards, P&L analytics, and on-chain insights.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://smartmoneydex.com/wallets?search={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
