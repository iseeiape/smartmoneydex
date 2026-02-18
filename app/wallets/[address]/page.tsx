import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CopyButton } from '@/components/copy-button';
import { CieloStats } from '@/components/cielo-stats';
import { CieloTransactionFeed } from '@/components/cielo-transaction-feed';
import { RelatedWallets } from '@/components/related-wallets';
import { getWalletByAddress, wallets, formatAddress } from '@/lib/data';
import { getCieloWalletUrl, getReferralCode } from '@/lib/cielo/referral';
import { ArrowLeft, Shield, Twitter, MessageCircle, ExternalLink, Bell, TrendingUp } from 'lucide-react';

interface WalletPageProps {
  params: Promise<{ address: string }>;
}

export async function generateStaticParams() {
  return wallets.map((wallet) => ({
    address: wallet.address,
  }));
}

export async function generateMetadata({ params }: WalletPageProps) {
  const { address } = await params;
  const wallet = getWalletByAddress(address);
  
  if (!wallet) {
    return { title: 'Wallet Not Found' };
  }

  return {
    title: `${wallet.label} | SmartMoneyDEX`,
    description: `Track ${wallet.label}'s on-chain activity, P&L, and trades. Real-time smart money analytics.`,
  };
}

export default async function WalletDetailPage({ params }: WalletPageProps) {
  const { address } = await params;
  const wallet = getWalletByAddress(address);

  if (!wallet) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/wallets"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>

        {/* Wallet Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{wallet.label}</h1>
                {wallet.verified && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-lg">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-blue-400 font-medium">Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-lg">
                  {formatAddress(wallet.address)}
                </code>
                <CopyButton text={wallet.address} />
              </div>
            </div>

            <div className="flex gap-2">
              {/* Track on Cielo Button */}
              <a
                href={getCieloWalletUrl(wallet.address, getReferralCode())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">Track on Cielo</span>
              </a>
              
              {wallet.socials?.twitter && (
                <a
                  href={`https://twitter.com/${wallet.socials.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-400" />
                </a>
              )}
              {wallet.socials?.telegram && (
                <a
                  href={`https://${wallet.socials.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                </a>
              )}
              <a
                href={`https://solscan.io/account/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                title="View on Solscan"
              >
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {wallet.description && (
            <p className="mt-6 text-gray-400 max-w-3xl">{wallet.description}</p>
          )}
        </div>

        {/* Cielo Stats - Real-time Data */}
        <CieloStats walletAddress={wallet.address} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Feed - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CieloTransactionFeed walletAddress={wallet.address} />
          </div>

          {/* Sidebar - Favorite Tokens & Info */}
          <div className="space-y-6">
            {/* Favorite Tokens */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Favorite Tokens</h3>
              <div className="flex flex-wrap gap-2">
                {wallet.favoriteTokens.map((token) => (
                  <div
                    key={token}
                    className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10"
                  >
                    <span className="text-sm font-medium text-white">{token}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Category</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-solana-green" />
                <span className="text-white capitalize">{wallet.category}</span>
              </div>
            </div>

            {/* Related Wallets - Cielo Feature */}
            <RelatedWallets walletAddress={wallet.address} />

            {/* Cielo Promo */}
            <div className="glass rounded-xl p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-2">Get Real-Time Alerts</h3>
              <p className="text-sm text-gray-400 mb-4">
                Track this wallet on Cielo and get instant notifications when they trade.
              </p>
              <a
                href={getCieloWalletUrl(wallet.address, getReferralCode())}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-center rounded-lg transition-colors"
              >
                Track on Cielo
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
