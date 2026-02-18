'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Target, BarChart3, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercentage } from '@/lib/data';

interface CieloWalletData {
  wallet: string;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  profitableTrades: number;
  unprofitableTrades: number;
  pnl7d?: number;
  pnl30d?: number;
  realizedPnl?: number;
  unrealizedPnl?: number;
  favoriteTokens: string[];
  lastActivity: string;
}

interface CieloStatsProps {
  walletAddress: string;
}

export function CieloStats({ walletAddress }: CieloStatsProps) {
  const [data, setData] = useState<CieloWalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/cielo/wallet/${walletAddress}/stats`);
        if (res.ok) {
          const stats = await res.json();
          setData(stats);
        }
      } catch (err) {
        setError('Failed to load Cielo data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
            <div className="h-8 bg-white/10 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const isPositive = data.totalPnl >= 0;
  const is7dPositive = (data.pnl7d || 0) >= 0;
  const is30dPositive = (data.pnl30d || 0) >= 0;

  return (
    <>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total P&L */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-500">Total P&L (All Time)</p>
          </div>
          <div className={cn('flex items-center gap-2', isPositive ? 'text-green-400' : 'text-red-400')}>
            {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
            <span className="text-3xl font-bold">{formatCurrency(data.totalPnl)}</span>
          </div>
        </div>

        {/* Win Rate */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-500">Win Rate</p>
          </div>
          <p className="text-3xl font-bold text-white">{formatPercentage(data.winRate)}</p>
          <p className="text-xs text-gray-500 mt-1">
            {data.profitableTrades}W / {data.unprofitableTrades}L
          </p>
        </div>

        {/* Total Trades */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-500">Total Trades</p>
          </div>
          <p className="text-3xl font-bold text-white">{data.totalTrades.toLocaleString()}</p>
        </div>

        {/* Last Activity */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-500">Last Activity</p>
          </div>
          <p className="text-xl font-bold text-white">
            {new Date(data.lastActivity).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* P&L Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 7D P&L */}
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">7D P&L</p>
          <div className={cn('flex items-center gap-2', is7dPositive ? 'text-green-400' : 'text-red-400')}>
            {is7dPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span className="text-2xl font-bold">{formatCurrency(data.pnl7d || 0)}</span>
          </div>
        </div>

        {/* 30D P&L */}
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">30D P&L</p>
          <div className={cn('flex items-center gap-2', is30dPositive ? 'text-green-400' : 'text-red-400')}>
            {is30dPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span className="text-2xl font-bold">{formatCurrency(data.pnl30d || 0)}</span>
          </div>
        </div>

        {/* Realized vs Unrealized */}
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">Realized / Unrealized</p>
          <div className="space-y-1">
            <p className="text-lg font-bold text-green-400">
              {formatCurrency(data.realizedPnl || 0)}
            </p>
            <p className="text-sm text-gray-400">
              Unrealized: {formatCurrency(data.unrealizedPnl || 0)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
