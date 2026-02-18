'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/data';

interface CieloTransaction {
  id: string;
  wallet: string;
  type: 'swap' | 'transfer' | 'mint' | 'burn';
  tokenIn?: string;
  tokenOut?: string;
  tokenInSymbol?: string;
  tokenOutSymbol?: string;
  amountIn?: number;
  amountOut?: number;
  valueUsd: number;
  pnl?: number;
  timestamp: string;
  chain: string;
  txHash: string;
  protocol?: string;
}

interface CieloTransactionFeedProps {
  walletAddress: string;
}

export function CieloTransactionFeed({ walletAddress }: CieloTransactionFeedProps) {
  const [transactions, setTransactions] = useState<CieloTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/cielo/wallet/${walletAddress}/transactions?limit=10`);
        if (res.ok) {
          const data = await res.json();
          setTransactions(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-32"></div>
                  <div className="h-3 bg-white/10 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-center py-8">No recent transactions found</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <span className="text-xs text-gray-500">Powered by Cielo</span>
      </div>
      
      <div className="space-y-3">
        {transactions.map((tx) => {
          const isBuy = tx.type === 'swap' && tx.tokenIn === 'SOL' || tx.type === 'swap' && tx.tokenInSymbol === 'SOL';
          const isPositive = (tx.pnl || 0) >= 0;
          
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {/* Buy/Sell Icon */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    isBuy ? 'bg-green-500/20' : 'bg-red-500/20'
                  )}
                >
                  {isBuy ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
                
                {/* Transaction Details */}
                <div>
                  <p className="font-medium text-white">
                    {isBuy ? 'Bought' : 'Sold'} {tx.tokenOutSymbol || tx.tokenOut || 'Token'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tx.protocol && <span className="text-solana">{tx.protocol}</span>}
                    <span className="mx-2">•</span>
                    {new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              {/* Value & PnL */}
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <p className="font-medium text-white">${tx.valueUsd.toLocaleString()}</p>
                  <a
                    href={`https://solscan.io/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </a>
                </div>
                {tx.pnl !== undefined && (
                  <p className={cn('text-sm', isPositive ? 'text-green-400' : 'text-red-400')}>
                    {isPositive ? '+' : ''}{formatCurrency(tx.pnl)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
