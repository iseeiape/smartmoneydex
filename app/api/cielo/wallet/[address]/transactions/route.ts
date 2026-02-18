// API Route: /api/cielo/wallet/[address]/transactions

import { NextRequest, NextResponse } from 'next/server';
import { getCieloClient } from '@/lib/cielo/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const cursor = searchParams.get('cursor') || undefined;
    
    // Check if Cielo API key is configured
    if (!process.env.CIELO_API_KEY) {
      // Return mock data if no API key
      const mockTxs = Array.from({ length: limit }, (_, i) => ({
        id: `tx_${i}`,
        wallet: address,
        type: Math.random() > 0.5 ? 'swap' : 'transfer',
        tokenIn: 'SOL',
        tokenOut: ['BONK', 'JUP', 'WIF'][Math.floor(Math.random() * 3)],
        tokenInSymbol: 'SOL',
        tokenOutSymbol: ['BONK', 'JUP', 'WIF'][Math.floor(Math.random() * 3)],
        amountIn: Math.random() * 100,
        amountOut: Math.random() * 1000000,
        valueUsd: Math.random() * 10000,
        pnl: (Math.random() - 0.3) * 5000,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        chain: 'solana',
        txHash: `${Math.random().toString(36).substring(7)}...`,
        isMock: true,
      }));
      
      return NextResponse.json({
        data: mockTxs,
        meta: { hasMore: true },
      });
    }

    const client = getCieloClient();
    const response = await client.getWalletTransactions(address, { limit, cursor });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
