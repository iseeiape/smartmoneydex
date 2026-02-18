// API Route: /api/cielo/wallet/[address]/stats

import { NextRequest, NextResponse } from 'next/server';
import { getCieloClient } from '@/lib/cielo/client';
import { getWalletByAddress } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    
    // Get mock wallet data as fallback
    const mockWallet = getWalletByAddress(address);
    
    // Check if Cielo API key is configured
    if (!process.env.CIELO_API_KEY) {
      // Return enriched mock data
      return NextResponse.json({
        wallet: address,
        totalPnl: mockWallet?.totalPnl || Math.random() * 1000000 * (Math.random() > 0.3 ? 1 : -1),
        winRate: mockWallet?.winRate || 60 + Math.random() * 30,
        totalTrades: mockWallet?.totalTrades || Math.floor(Math.random() * 500),
        profitableTrades: Math.floor(Math.random() * 300),
        unprofitableTrades: Math.floor(Math.random() * 200),
        pnl7d: (Math.random() - 0.3) * 100000,
        pnl30d: (Math.random() - 0.3) * 500000,
        realizedPnl: Math.random() * 800000 * (Math.random() > 0.3 ? 1 : -1),
        unrealizedPnl: (Math.random() - 0.5) * 200000,
        favoriteTokens: mockWallet?.favoriteTokens || ['SOL', 'BONK', 'JUP'],
        lastActivity: new Date().toISOString(),
        chains: ['solana'],
        isMock: true,
      });
    }

    const client = getCieloClient();
    const pnlData = await client.getWalletPnL(address);
    
    // Calculate stats from PnL data
    let totalTrades = 0;
    let profitableTrades = 0;
    let totalRealizedPnl = 0;
    let totalUnrealizedPnl = 0;
    const tokens: string[] = [];
    
    if (pnlData.tokens && Array.isArray(pnlData.tokens)) {
      for (const token of pnlData.tokens) {
        totalTrades += token.trades_count || 0;
        totalRealizedPnl += token.realized_pnl || 0;
        totalUnrealizedPnl += token.unrealized_pnl || 0;
        if (token.realized_pnl && token.realized_pnl > 0) {
          profitableTrades++;
        }
        if (token.token_symbol) {
          tokens.push(token.token_symbol);
        }
      }
    }
    
    const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;
    
    return NextResponse.json({
      wallet: address,
      totalPnl: totalRealizedPnl + totalUnrealizedPnl,
      winRate: winRate,
      totalTrades: totalTrades,
      profitableTrades: profitableTrades,
      unprofitableTrades: totalTrades - profitableTrades,
      realizedPnl: totalRealizedPnl,
      unrealizedPnl: totalUnrealizedPnl,
      favoriteTokens: tokens.slice(0, 5),
      lastActivity: new Date().toISOString(),
      chains: ['solana'],
    });
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet stats' },
      { status: 500 }
    );
  }
}
