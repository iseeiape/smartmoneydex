// Hook for fetching wallet data from Cielo API

'use client';

import { useState, useEffect, useCallback } from 'react';
import { CieloWalletStats, CieloTransaction, CieloWalletPnL } from './types';

interface UseCieloWalletOptions {
  refreshInterval?: number; // milliseconds
  autoFetch?: boolean;
}

export function useCieloWallet(
  walletAddress: string | null,
  options: UseCieloWalletOptions = {}
) {
  const { refreshInterval, autoFetch = true } = options;
  
  const [stats, setStats] = useState<CieloWalletStats | null>(null);
  const [pnl, setPnl] = useState<CieloWalletPnL | null>(null);
  const [transactions, setTransactions] = useState<CieloTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!walletAddress) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch stats and PnL in parallel
      const [statsRes, pnlRes, txRes] = await Promise.all([
        fetch(`/api/cielo/wallet/${walletAddress}/stats`).then(r => r.ok ? r.json() : null),
        fetch(`/api/cielo/wallet/${walletAddress}/pnl`).then(r => r.ok ? r.json() : null),
        fetch(`/api/cielo/wallet/${walletAddress}/transactions?limit=10`).then(r => r.ok ? r.json() : { data: [] }),
      ]);

      if (statsRes) setStats(statsRes);
      if (pnlRes) setPnl(pnlRes);
      if (txRes?.data) setTransactions(txRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet data');
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (autoFetch && walletAddress) {
      fetchData();
    }
  }, [walletAddress, autoFetch, fetchData]);

  useEffect(() => {
    if (refreshInterval && walletAddress) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, walletAddress, fetchData]);

  return {
    stats,
    pnl,
    transactions,
    loading,
    error,
    refetch: fetchData,
  };
}

export function useCieloTrendingWallets(
  timeframe: '1d' | '7d' | '30d' = '7d',
  chain: string = 'solana',
  limit: number = 25
) {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/cielo/wallets/trending?timeframe=${timeframe}&chain=${chain}&limit=${limit}`
        );
        if (res.ok) {
          const data = await res.json();
          setWallets(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending wallets');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeframe, chain, limit]);

  return { wallets, loading, error };
}
