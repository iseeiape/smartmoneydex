// API Route: /api/cielo/wallet/[address]/trading-stats
import { NextRequest, NextResponse } from 'next/server';
import { getCieloClient } from '@/lib/cielo/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    if (!process.env.CIELO_API_KEY) {
      return NextResponse.json({
        wallet: address,
        pnl: 0,
        winrate: 0,
        swapsCount: 0,
        isMock: true,
      });
    }

    const client = getCieloClient();
    const data = await client.getWalletTradingStats(address);

    // Cielo returns { status, message, data: { pnl, winrate, swaps_count, ... } }
    const stats = data?.data ?? {};
    const roi = stats.roi_distribution ?? {};

    return NextResponse.json({
      wallet: address,
      pnl: stats.pnl || 0,
      winrate: stats.winrate || 0,
      swapsCount: stats.swaps_count || 0,
      buyCount: stats.buy_count || 0,
      sellCount: stats.sell_count || 0,
      totalBuyAmount: stats.total_buy_amount_usd || stats.total_buy_amount || 0,
      totalSellAmount: stats.total_sell_amount_usd || stats.total_sell_amount || 0,
      roiDistribution: roi,
      source: 'cielo',
    });
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trading stats' },
      { status: 500 }
    );
  }
}
