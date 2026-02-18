'use client';

import Link from 'next/link';
import { categories, getWalletsByCategory } from '@/lib/data';
import { cn } from '@/lib/utils';

export function CategoryGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Filter wallets by type to find exactly what you&apos;re looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((category) => {
            const count = getWalletsByCategory(category.id).length;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="glass rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  category.color,
                  "bg-opacity-20"
                )}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-solana-green transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{category.description}</p>
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">{count}</span> wallets
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
