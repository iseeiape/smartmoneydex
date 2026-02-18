import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WalletTable } from '@/components/wallet-table';
import { categories, getWalletsByCategory, formatCurrency } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Wallets | Smart Money Directory`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  const wallets = getWalletsByCategory(slug);
  const totalPnl = wallets.reduce((acc, w) => acc + w.totalPnl, 0);
  const avgWinRate = wallets.length > 0
    ? wallets.reduce((acc, w) => acc + w.winRate, 0) / wallets.length
    : 0;

  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-white">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-5xl", category.color, "bg-opacity-20")}>
              {category.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
              <p className="text-gray-400 max-w-2xl">{category.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/5">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Wallets</p>
              <p className="text-2xl font-bold text-white">{wallets.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Combined P&L</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(totalPnl)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Win Rate</p>
              <p className="text-2xl font-bold text-white">{avgWinRate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Profitable</p>
              <p className="text-2xl font-bold text-green-400">
                {wallets.filter(w => w.totalPnl > 0).length}
              </p>
            </div>
          </div>
        </div>

        {/* Wallets Table */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">All {category.name} Wallets</h2>
          {wallets.length > 0 ? (
            <WalletTable wallets={wallets} showRank />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No wallets found in this category</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
