import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WalletTable } from '@/components/wallet-table';
import { categories, getWalletsByCategory, formatCurrency } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Wallet Categories</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Browse smart money wallets by category to find the traders that match your strategy
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => {
            const categoryWallets = getWalletsByCategory(category.id);
            const totalPnl = categoryWallets.reduce((acc, w) => acc + w.totalPnl, 0);
            const avgWinRate = categoryWallets.length > 0
              ? categoryWallets.reduce((acc, w) => acc + w.winRate, 0) / categoryWallets.length
              : 0;

            return (
              <div key={category.id} className="glass rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-3xl", category.color, "bg-opacity-20")}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                        <p className="text-gray-400">{category.description}</p>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{categoryWallets.length}</p>
                        <p className="text-xs text-gray-500">Wallets</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{formatCurrency(totalPnl)}</p>
                        <p className="text-xs text-gray-500">Combined P&L</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{avgWinRate.toFixed(1)}%</p>
                        <p className="text-xs text-gray-500">Avg Win Rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {categoryWallets.length > 0 ? (
                  <div className="p-6">
                    <WalletTable wallets={categoryWallets.slice(0, 5)} showRank />
                    {categoryWallets.length > 5 && (
                      <div className="mt-4 text-center">
                        <Link
                          href={`/categories/${category.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
                        >
                          View All {categoryWallets.length} Wallets
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">No wallets in this category yet</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
