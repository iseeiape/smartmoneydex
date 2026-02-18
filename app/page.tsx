import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { CategoryGrid } from '@/components/category-grid';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-crypto-dark">
      <Header />
      <Hero />
      <CategoryGrid />
      <Footer />
    </main>
  );
}
