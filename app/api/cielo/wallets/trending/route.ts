// API Route: /api/cielo/wallets/trending

import { NextRequest, NextResponse } from 'next/server';
import { getCieloClient } from '@/lib/cielo/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = (searchParams.get('timeframe') || '7d') as '1d' | '7d' | '30d';
    const chain = searchParams.get('chain') || 'solana';
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    
    // Check if Cielo API key is configured
    if (!process.env.CIELO_API_KEY) {
      // Return mock data if no API key
      const mockWallets = Array.from({ length: limit }, (_, i) => ({
        wallet: `wallet_${i}`,
        label: `Trader ${i + 1}`,
        pnl24h: (Math.random() - 0.3) * 100000,
        pnl7d: (Math.random() - 0.3) * 500000,
        pnl30d: (Math.random() - 0.3) * 2000000,
        winRate: 50 + Math.random() * 40,
        totalTrades: Math.floor(Math.random() * 1000),
        followers: Math.floor(Math.random() * 10000),
        tags: ['whale', 'trader'].slice(0, Math.floor(Math.random() * 2) + 1),
        isMock: true,
      }));
      
      return NextResponse.json(mockWallets);
    }

    // Trending wallets endpoint not available in current Cielo API
    // Return empty array for now
    return NextResponse.json([]);
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending wallets' },
      { status: 500 }
    );
  }
}
