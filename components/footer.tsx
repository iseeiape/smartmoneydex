import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl text-white mb-4">
              SmartMoney<span className="text-solana-green">DEX</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Track the top performing wallets on Solana. Real-time leaderboards, P&L analytics, and smart money insights for crypto traders.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/smartmoneydex" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Directory</h4>
            <ul className="space-y-2">
              <li><Link href="/wallets" className="text-sm text-gray-400 hover:text-white transition-colors">All Wallets</Link></li>
              <li><Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/leaderboard" className="text-sm text-gray-400 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Access</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/submit" className="text-sm text-gray-400 hover:text-white transition-colors">Submit Wallet</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 SmartMoneyDEX. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Not financial advice. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
