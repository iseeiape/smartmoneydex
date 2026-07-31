// API Route: /api/cielo/wallet/[address]/pnl
import { NextRequest, NextResponse } from 'next/server';
import { getCieloClient } from '@/lib/cielo/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    // Check if Cielo API key is configured
    if (!process.env.CIELO_API_KEY) {
      return NextResponse.json({
        wallet: address,
        totalPnlUsd: Math.random() * 1000000 * (Math.random() > 0.3 ? 1 : -1),
        realizedPnl: Math.random() * 800000,
        unrealizedPnl: Math.random() * 200000,
        pnlPercentage: (Math.random() * 200 - 50),
        isMock: true,
      });
    }

    const client = getCieloClient();
    const pnl = await client.getWalletPnL(address);

    // Cielo returns { status, data: { items: [...] } }
    // Normalize to a clean shape for the frontend
    const items: any[] = pnl?.data?.items ?? [];
    const totalPnl = items.reduce((sum, t) => sum + (t.total_pnl_usd || 0), 0);
    const totalBuy = items.reduce((sum, t) => sum + (t.total_buy_usd || 0), 0);
    const totalSell = items.reduce((sum, t) => sum + (t.total_sell_usd || 0), 0);
    const totalTrades = items.reduce((sum, t) => sum + (t.num_swaps || 0), 0);

    return NextResponse.json({
      wallet: address,
      totalPnlUsd: totalPnl,
      realizedPnl: totalSell - totalBuy,
      unrealizedPnl: items.reduce((sum, t) => sum + (t.unrealized_pnl_usd || 0), 0),
      pnlPercentage: totalBuy > 0 ? ((totalSell - totalBuy) / totalBuy) * 100 : 0,
      totalTrades,
      tokens: items,
      source: 'cielo',
    });
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet PnL' },
      { status: 500 }
    );
  }
}
