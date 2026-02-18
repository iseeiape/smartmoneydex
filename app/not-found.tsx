import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-solana to-solana-green text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>

      <Footer />
    </main>
  );
}
