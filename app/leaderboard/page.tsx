import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WalletTable } from '@/components/wallet-table';
import { wallets, formatCurrency } from '@/lib/data';
import { Trophy, TrendingUp, Medal } from 'lucide-react';

export const metadata = {
  title: 'Leaderboard | Top Smart Money Wallets',
  description: 'Rankings of the top performing smart money wallets on Solana by P&L, win rate, and trading activity.',
};

export default function LeaderboardPage() {
  const sortedWallets = [...wallets].sort((a, b) => b.totalPnl - a.totalPnl);
  const top3 = sortedWallets.slice(0, 3);
  const rest = sortedWallets.slice(3);

  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Smart Money Leaderboard
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            The top performing wallets ranked by total profit and loss. Track the best traders on Solana.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 2nd Place */}
          {top3[1] && (
            <div className="glass rounded-2xl p-6 flex flex-col items-center order-2 md:order-1">
              <div className="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mb-4">
                <Medal className="w-8 h-8 text-gray-300" />
              </div>
              <div className="text-4xl font-bold text-gray-300 mb-2">2</div>
              <h3 className="text-xl font-bold text-white mb-1">{top3[1].label}</h3>
              <p className="text-sm text-gray-500 font-mono mb-4">{top3[1].address}</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(top3[1].totalPnl)}</p>
              <p className="text-sm text-gray-500">{top3[1].winRate.toFixed(1)}% win rate</p>
            </div>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <div className="glass rounded-2xl p-8 flex flex-col items-center order-1 md:order-2 border-2 border-yellow-500/30">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">1</div>
              <h3 className="text-2xl font-bold text-white mb-1">{top3[0].label}</h3>
              <p className="text-sm text-gray-500 font-mono mb-4">{top3[0].address}</p>
              <p className="text-3xl font-bold text-green-400">{formatCurrency(top3[0].totalPnl)}</p>
              <p className="text-sm text-gray-500">{top3[0].winRate.toFixed(1)}% win rate</p>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="glass rounded-2xl p-6 flex flex-col items-center order-3">
              <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mb-4">
                <Medal className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-4xl font-bold text-amber-500 mb-2">3</div>
              <h3 className="text-xl font-bold text-white mb-1">{top3[2].label}</h3>
              <p className="text-sm text-gray-500 font-mono mb-4">{top3[2].address}</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(top3[2].totalPnl)}</p>
              <p className="text-sm text-gray-500">{top3[2].winRate.toFixed(1)}% win rate</p>
            </div>
          )}
        </div>

        {/* Full Leaderboard */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-solana-green" />
              Full Rankings
            </h2>
            <p className="text-sm text-gray-500">
              Showing {rest.length} wallets
            </p>
          </div>
          <WalletTable wallets={rest} showRank />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to track these wallets in real-time?
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-solana to-solana-green text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Alerts
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
