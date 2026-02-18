'use client';

import Link from 'next/link';
import { Wallet, formatCurrency, formatPercentage } from '@/lib/data';
import { useCieloWallet } from '@/lib/cielo/hooks';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Shield, ExternalLink, Copy, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface WalletCardProps {
  wallet: Wallet;
  rank?: number;
  showDetails?: boolean;
}

export function WalletCard({ wallet, rank, showDetails = false }: WalletCardProps) {
  const [copied, setCopied] = useState(false);
  
  // Fetch real data from Cielo API
  const { stats, pnl, loading } = useCieloWallet(wallet.address, {
    autoFetch: true,
  });

  // Use real data if available, fall back to mock data
  const totalPnl = pnl?.totalPnlUsd ?? wallet.totalPnl;
  const winRate = stats?.winRate ?? wallet.winRate;
  const totalTrades = stats?.totalTrades ?? wallet.totalTrades;
  const isMock = !pnl && !stats;
  
  const isPositive = totalPnl >= 0;

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group relative">
      {/* Live/Demo Indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {loading ? (
          <Loader2 className="w-3 h-3 text-gray-500 animate-spin" />
        ) : (
          <>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isMock ? "bg-amber-500" : "bg-green-500"
            )} />
            <span className={cn(
              "text-xs",
              isMock ? "text-amber-500" : "text-green-500"
            )}>
              {isMock ? "Demo" : "Live"}
            </span>
          </>
        )}
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {rank && (
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
              rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
              rank === 2 ? "bg-gray-400/20 text-gray-300" :
              rank === 3 ? "bg-amber-600/20 text-amber-500" :
              "bg-white/5 text-gray-400"
            )}>
              {rank}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white group-hover:text-solana-green transition-colors">
                {wallet.label}
              </h3>
              {wallet.verified && (
                <Shield className="w-4 h-4 text-blue-400" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-400 font-mono">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <Link
          href={`/wallets/${wallet.address}`}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Total P&L</p>
          <p className={cn(
            "font-bold text-lg flex items-center gap-1",
            isPositive ? "text-green-400" : "text-red-400"
          )}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {loading ? '...' : formatCurrency(totalPnl)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Win Rate</p>
          <p className="font-bold text-lg text-white">
            {loading ? '...' : formatPercentage(winRate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Trades</p>
          <p className="font-bold text-lg text-white">
            {loading ? '...' : totalTrades}
          </p>
        </div>
      </div>

      {showDetails && wallet.description && (
        <p className="text-sm text-gray-400 mb-3">{wallet.description}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {wallet.favoriteTokens.slice(0, 4).map((token) => (
          <span
            key={token}
            className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10"
          >
            {token}
          </span>
        ))}
        {wallet.favoriteTokens.length > 4 && (
          <span className="px-2 py-1 text-xs text-gray-500">
            +{wallet.favoriteTokens.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
