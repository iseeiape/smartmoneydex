'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Wallet, Send, Check, AlertCircle, TrendingUp, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'whale', name: 'Whale', description: 'High volume trader with $1M+ portfolio' },
  { id: 'dev', name: 'Developer', description: 'Project founder or protocol developer' },
  { id: 'influencer', name: 'Influencer', description: 'CT personality or alpha caller' },
  { id: 'institution', name: 'Institution', description: 'VC, fund, or market maker' },
  { id: 'trader', name: 'Pro Trader', description: 'Consistently profitable trader' },
];

interface SubmissionResult {
  success: boolean;
  message: string;
  stats?: {
    portfolioValue: number;
    totalTrades: number;
    winRate: number;
    winRateNote?: string;
  };
  wallet?: {
    address: string;
    label: string;
    category: string;
  };
  criteria?: {
    minPortfolio: number;
    minTrades: number;
    actualPortfolio?: number;
    actualTrades?: number;
    winRate?: number;
    winRateNote?: string;
  };
}

export default function SubmitWalletPage() {
  const [formData, setFormData] = useState({
    walletAddress: '',
    label: '',
    category: '',
    description: '',
    twitter: '',
    telegram: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [error, setError] = useState('');

  const validateSolanaAddress = (address: string) => {
    return /^[A-HJ-NP-Za-km-z1-9]{32,44}$/.test(address);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!validateSolanaAddress(formData.walletAddress)) {
      setError('Please enter a valid Solana wallet address');
      return;
    }

    if (!formData.label.trim()) {
      setError('Please enter a label/name for this wallet');
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: formData.walletAddress,
          label: formData.label,
          category: formData.category,
          description: formData.description,
          twitter: formData.twitter,
          telegram: formData.telegram,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          stats: data.stats,
          wallet: data.wallet,
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Submission failed',
          criteria: data.criteria,
        });
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show result screen
  if (result) {
    const isApproved = result.success;
    
    return (
      <main className="min-h-screen bg-crypto-dark">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={cn(
            "glass rounded-2xl p-8 text-center",
            isApproved ? "border-green-500/20" : "border-red-500/20"
          )}>
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
              isApproved ? "bg-green-500/20" : "bg-red-500/20"
            )}>
              {isApproved ? (
                <Check className="w-8 h-8 text-green-400" />
              ) : (
                <X className="w-8 h-8 text-red-400" />
              )}
            </div>
            
            <h1 className={cn(
              "text-2xl font-bold mb-4",
              isApproved ? "text-green-400" : "text-red-400"
            )}>
              {isApproved ? '✅ Wallet Auto-Approved!' : '❌ Does Not Meet Criteria'}
            </h1>
            
            <p className="text-gray-400 mb-6">{result.message}</p>

            {/* Show stats if available */}
            {(result.stats || result.criteria) && (
              <div className="glass rounded-xl p-4 mb-6 text-left">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Validation Results</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Portfolio</p>
                    <p className={cn(
                      "font-semibold",
                      (result.stats?.portfolioValue || result.criteria?.actualPortfolio || 0) >= 10000 
                        ? "text-green-400" : "text-red-400"
                    )}>
                      ${((result.stats?.portfolioValue || result.criteria?.actualPortfolio || 0) / 1000).toFixed(1)}k
                    </p>
                    <p className="text-xs text-gray-600">min: $10k</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trades</p>
                    <p className={cn(
                      "font-semibold",
                      (result.stats?.totalTrades || result.criteria?.actualTrades || 0) >= 10 
                        ? "text-green-400" : "text-red-400"
                    )}>
                      {result.stats?.totalTrades || result.criteria?.actualTrades || 0}
                    </p>
                    <p className="text-xs text-gray-600">min: 10</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Win Rate</p>
                    <p className="font-semibold text-blue-400">
                      {(result.stats?.winRate || result.criteria?.winRate || 0).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600">based on 50 tokens</p>
                  </div>
                </div>
              </div>
            )}

            {isApproved && result.wallet && (
              <div className="mb-6 p-4 bg-green-500/10 rounded-xl">
                <p className="text-sm text-green-400 mb-2">Wallet added to directory:</p>
                <p className="font-mono text-sm text-white">{result.wallet.address}</p>
                <p className="text-sm text-gray-400">as "{result.wallet.label}"</p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <a
                href="/wallets"
                className="px-6 py-3 bg-solana text-white rounded-xl font-medium hover:bg-solana/90 transition-colors"
              >
                Browse Wallets
              </a>
              <button
                onClick={() => {
                  setResult(null);
                  setFormData({
                    walletAddress: '',
                    label: '',
                    category: '',
                    description: '',
                    twitter: '',
                    telegram: '',
                  });
                }}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Submit a Wallet</h1>
          <p className="text-gray-400">
            Wallets are auto-approved based on on-chain criteria. No human review needed.
          </p>
        </div>

        {/* Criteria Box */}
        <div className="glass rounded-xl p-4 mb-6 border border-solana/20">
          <h3 className="text-sm font-medium text-solana mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Auto-Approval Criteria
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-300">Portfolio ≥ $10,000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-300">10+ trades</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Verified via Cielo API. Wallets meeting criteria are added instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wallet Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Solana wallet address..."
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-solana transition-colors font-mono text-sm"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Label / Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., SmartMoneyWhale..."
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-solana transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all',
                    formData.category === cat.id
                      ? 'border-solana bg-solana/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  )}
                >
                  <div className="font-medium text-white">{cat.name}</div>
                  <div className="text-xs text-gray-400">{cat.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              placeholder="Why is this wallet notable?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-solana transition-colors resize-none"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter (optional)
              </label>
              <input
                type="text"
                placeholder="@username"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-solana transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telegram (optional)
              </label>
              <input
                type="text"
                placeholder="@username"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-solana transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full py-4 bg-gradient-to-r from-solana to-solana-green text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2',
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Validating via Cielo...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit for Auto-Approval
              </>
            )}
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}
