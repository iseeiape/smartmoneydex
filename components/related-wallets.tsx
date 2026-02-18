'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Loader2, AlertCircle, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedWallet {
  address: string;
  relationship_type?: string;
  interaction_count?: number;
  total_volume_usd?: number;
  label?: string;
}

interface RelatedWalletsProps {
  walletAddress: string;
}

export function RelatedWallets({ walletAddress }: RelatedWalletsProps) {
  const [related, setRelated] = useState<RelatedWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(`/api/cielo/wallet/${walletAddress}/related-wallets`);
        if (response.ok) {
          const data = await response.json();
          setRelated(data.relatedWallets || []);
        } else {
          setError('Failed to fetch related wallets');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-solana-green" />
          <h3 className="text-lg font-bold text-white">Related Wallets</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-solana animate-spin" />
        </div>
      </div>
    );
  }

  if (error || related.length === 0) {
    return (
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-solana-green" />
          <h3 className="text-lg font-bold text-white">Related Wallets</h3>
        </div>
        <div className="text-center py-6">
          <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            {error || 'No related wallets found'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Related wallets are addresses that frequently interact with this wallet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-solana-green" />
          <h3 className="text-lg font-bold text-white">Related Wallets</h3>
        </div>
        <span className="text-xs text-gray-500">{related.length} found</span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {related.slice(0, 10).map((wallet, index) => (
          <div
            key={wallet.address}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-solana/20 to-solana-green/20 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-solana-green" />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`https://solscan.io/account/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-solana-green transition-colors truncate block"
              >
                {wallet.label || `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {wallet.interaction_count && (
                  <span>{wallet.interaction_count} interactions</span>
                )}
                {wallet.relationship_type && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{wallet.relationship_type}</span>
                  </>
                )}
              </div>
            </div>
            {wallet.total_volume_usd && (
              <div className="text-right">
                <span className="text-sm font-medium text-white">
                  ${(wallet.total_volume_usd / 1000).toFixed(1)}k
                </span>
                <p className="text-xs text-gray-500">volume</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {related.length > 10 && (
        <p className="text-xs text-gray-500 text-center mt-3">
          +{related.length - 10} more related wallets
        </p>
      )}
    </div>
  );
}
