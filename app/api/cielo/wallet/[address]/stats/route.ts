// API Route: /api/cielo/wallet/[address]/stats
import { NextRequest, NextResponse } from 'next/server';
import { getWalletByAddress } from '@/lib/data';

const CIELO_API_BASE = 'https://feed-api.cielo.finance/api/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    // Fallback to mock data if no API key
    const mockWallet = getWalletByAddress(address);
    if (!process.env.CIELO_API_KEY) {
      return NextResponse.json({
        wallet: address,
        totalPnl: mockWallet?.totalPnl || Math.random() * 1000000 * (Math.random() > 0.3 ? 1 : -1),
        winRate: mockWallet?.winRate || 60 + Math.random() * 30,
        totalTrades: mockWallet?.totalTrades || Math.floor(Math.random() * 500),
        profitableTrades: Math.floor(Math.random() * 300),
        unprofitableTrades: Math.floor(Math.random() * 200),
        realizedPnl: Math.random() * 800000 * (Math.random() > 0.3 ? 1 : -1),
        unrealizedPnl: (Math.random() - 0.5) * 200000,
        favoriteTokens: mockWallet?.favoriteTokens || ['SOL', 'BONK', 'JUP'],
        lastActivity: new Date().toISOString(),
        chains: ['solana'],
        isMock: true,
      });
    }

    // Fetch real PnL data from Cielo
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.CIELO_API_KEY,
      'Accept': 'application/json',
    };

    // 1. Token PnL (has trades, realized/unrealized per token)
    const pnlRes = await fetch(`${CIELO_API_BASE}/${address}/pnl/tokens`, { headers });
    const pnlData = await pnlRes.json();

    // 2. Total stats (has winrate if available)
    let totalStats: any = null;
    try {
      const statsRes = await fetch(`${CIELO_API_BASE}/${address}/pnl/total-stats`, { headers });
      totalStats = await statsRes.json();
    } catch { /* ignore */ }

    // Aggregate token PnL items
    const items: any[] = pnlData?.data?.items ?? [];
    let totalTrades = 0;
    let totalPnl = 0;
    let totalUnrealized = 0;
    let totalRealized = 0;
    const profitableTokens: string[] = [];
    const tokens: string[] = [];

    for (const token of items) {
      const swaps = token.num_swaps || 0;
      const pnl = token.total_pnl_usd || 0;
      const unrealized = token.unrealized_pnl_usd || 0;
      totalTrades += swaps;
      totalPnl += pnl;
      totalUnrealized += unrealized;
      totalRealized += pnl - unrealized; // realized = total - unrealized
      if (pnl > 0) profitableTokens.push(token.token_symbol || '');
      if (token.token_symbol) tokens.push(token.token_symbol);
    }

    // Win rate from total-stats if present, else estimate from profitable tokens
    const winRate = totalStats?.data?.winrate || (items.length > 0 ? (profitableTokens.length / items.length) * 100 : 0);

    return NextResponse.json({
      wallet: address,
      totalPnl: totalPnl,
      winRate: winRate,
      totalTrades: totalTrades,
      profitableTrades: profitableTokens.length,
      unprofitableTrades: items.length - profitableTokens.length,
      realizedPnl: totalRealized,
      unrealizedPnl: totalUnrealized,
      favoriteTokens: tokens.slice(0, 8),
      lastActivity: new Date().toISOString(),
      chains: ['solana'],
      source: 'cielo',
    });
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet stats' },
      { status: 500 }
    );
  }
}
