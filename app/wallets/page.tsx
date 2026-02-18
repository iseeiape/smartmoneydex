'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WalletTable } from '@/components/wallet-table';
import { WalletCard } from '@/components/wallet-card';
import { wallets, categories, getWalletsByCategory, formatCurrency } from '@/lib/data';
import { Search, Grid3X3, List, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function WalletsContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'pnl' | 'winRate' | 'trades'>('pnl');

  // Update search when URL changes
  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  const filteredWallets = useMemo(() => {
    let result = wallets;

    if (selectedCategory) {
      result = getWalletsByCategory(selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.label.toLowerCase().includes(query) ||
          w.address.toLowerCase().includes(query) ||
          w.favoriteTokens.some((t) => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const totalPnl = filteredWallets.reduce((acc, w) => acc + w.totalPnl, 0);
    const avgWinRate =
      filteredWallets.length > 0
        ? filteredWallets.reduce((acc, w) => acc + w.winRate, 0) / filteredWallets.length
        : 0;
    const profitable = filteredWallets.filter((w) => w.totalPnl > 0).length;

    return { totalPnl, avgWinRate, profitable };
  }, [filteredWallets]);

  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wallet Directory</h1>
          <p className="text-gray-400">
            Browse and filter through {wallets.length} tracked smart money wallets
          </p>
        </div>

        {/* Stats Bar */}
        <div className="glass rounded-xl p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Showing</p>
            <p className="text-xl font-bold text-white">{filteredWallets.length} wallets</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Combined P&L</p>
            <p
              className={cn(
                'text-xl font-bold',
                stats.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'
              )}
            >
              {formatCurrency(stats.totalPnl)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Avg Win Rate</p>
            <p className="text-xl font-bold text-white">{stats.avgWinRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Profitable</p>
            <p className="text-xl font-bold text-green-400">{stats.profitable}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, address, or token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-solana transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
                selectedCategory === null
                  ? 'bg-solana text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2',
                  selectedCategory === cat.id
                    ? 'bg-solana text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                )}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-3 rounded-xl transition-colors',
                viewMode === 'list' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-3 rounded-xl transition-colors',
                viewMode === 'grid' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'list' ? (
          <WalletTable wallets={filteredWallets} showRank={false} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallets.map((wallet) => (
              <WalletCard key={wallet.id} wallet={wallet} showDetails />
            ))}
          </div>
        )}

        {filteredWallets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No wallets found matching your criteria</p>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-solana hover:text-solana-green transition-colors"
              >
                Clear filters
              </button>
              <span className="text-gray-600">|</span>
              <Link href="/submit" className="text-solana hover:text-solana-green transition-colors">
                Submit a wallet
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function WalletsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-crypto-dark">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-solana animate-spin" />
        </div>
        <Footer />
      </main>
    }>
      <WalletsContent />
    </Suspense>
  );
}
