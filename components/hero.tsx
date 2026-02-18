'use client';

import Link from 'next/link';
import { Wallet, TrendingUp, Users, Award } from 'lucide-react';
import { wallets, getTopWallets, formatCurrency } from '@/lib/data';
import { WalletCard } from './wallet-card';

export function Hero() {
  const topWallets = getTopWallets(3);
  const totalPnl = wallets.reduce((acc, w) => acc + w.totalPnl, 0);
  const avgWinRate = wallets.reduce((acc, w) => acc + w.winRate, 0) / wallets.length;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-solana/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Track <span className="text-transparent bg-clip-text bg-gradient-to-r from-solana to-solana-green">Smart Money</span> on Solana
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Discover the top 100 performing wallets. Real-time leaderboards, P&L tracking, and on-chain analytics for crypto degens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/wallets"
              className="px-8 py-4 bg-gradient-to-r from-solana to-solana-green text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Explore Directory
            </Link>
            <Link
              href="/leaderboard"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              View Leaderboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-solana/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-solana" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{wallets.length}</p>
            <p className="text-sm text-gray-500">Tracked Wallets</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{formatCurrency(totalPnl)}</p>
            <p className="text-sm text-gray-500">Combined P&L</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{avgWinRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-500">Avg Win Rate</p>
          </div>
        </div>

        {/* Top 3 Wallets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-solana-green" />
              Top Performers
            </h2>
            <Link
              href="/leaderboard"
              className="text-sm text-solana hover:text-solana-green transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topWallets.map((wallet, index) => (
              <WalletCard key={wallet.id} wallet={wallet} rank={index + 1} showDetails />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
