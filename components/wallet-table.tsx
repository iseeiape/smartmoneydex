'use client';

import Link from 'next/link';
import { Wallet, formatCurrency, formatPercentage } from '@/lib/data';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Shield, ExternalLink, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

interface WalletTableProps {
  wallets: Wallet[];
  showRank?: boolean;
}

type SortField = 'pnl' | 'winRate' | 'trades';
type SortDirection = 'asc' | 'desc';

export function WalletTable({ wallets, showRank = true }: WalletTableProps) {
  const [sortField, setSortField] = useState<SortField>('pnl');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedWallets = [...wallets].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'pnl':
        comparison = a.totalPnl - b.totalPnl;
        break;
      case 'winRate':
        comparison = a.winRate - b.winRate;
        break;
      case 'trades':
        comparison = a.totalTrades - b.totalTrades;
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {showRank && <th className="px-4 py-3 text-left text-xs text-gray-500">Rank</th>}
              <th className="px-4 py-3 text-left text-xs text-gray-500">Wallet</th>
              <th className="px-4 py-3 text-left text-xs text-gray-500">Category</th>
              <th 
                className="px-4 py-3 text-left text-xs text-gray-500 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('pnl')}
              >
                <div className="flex items-center gap-1">
                  P&L
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs text-gray-500 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('winRate')}
              >
                <div className="flex items-center gap-1">
                  Win Rate
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs text-gray-500 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('trades')}
              >
                <div className="flex items-center gap-1">
                  Trades
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-500">Top Tokens</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sortedWallets.map((wallet, index) => (
              <tr 
                key={wallet.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {showRank && (
                  <td className="px-4 py-4">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      index === 0 ? "bg-yellow-500/20 text-yellow-400" :
                      index === 1 ? "bg-gray-400/20 text-gray-300" :
                      index === 2 ? "bg-amber-600/20 text-amber-500" :
                      "bg-white/5 text-gray-400"
                    )}>
                      {index + 1}
                    </div>
                  </td>
                )}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{wallet.label}</span>
                    {wallet.verified && <Shield className="w-4 h-4 text-blue-400" />}
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{wallet.address}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 capitalize">
                    {wallet.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className={cn(
                    "flex items-center gap-1 font-medium",
                    wallet.totalPnl >= 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {wallet.totalPnl >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {formatCurrency(Math.abs(wallet.totalPnl))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-white font-medium">{formatPercentage(wallet.winRate)}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-300">{wallet.totalTrades}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    {wallet.favoriteTokens.slice(0, 3).map((token) => (
                      <span
                        key={token}
                        className="px-1.5 py-0.5 bg-white/5 rounded text-xs text-gray-400"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/wallets/${wallet.address}`}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors inline-flex"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
