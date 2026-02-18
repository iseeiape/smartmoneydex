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
      // Return mock data if no API key
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
    
    return NextResponse.json(pnl);
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet PnL' },
      { status: 500 }
    );
  }
}
