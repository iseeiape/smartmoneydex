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
    const txLimit = parseInt(searchParams.get('limit') || '10', 10);
    const cursor = searchParams.get('cursor') || undefined;

    // Check if Cielo API key is configured
    if (!process.env.CIELO_API_KEY) {
      const mockTxs = Array.from({ length: txLimit }, (_, i) => ({
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

    // Use Cielo feed endpoint: /api/v1/feed?wallet={address}
    const client = getCieloClient();
    const queryParams = new URLSearchParams({
      wallet: address,
      limit: txLimit.toString(),
    });
    if (cursor) queryParams.append('cursor', cursor);

    const feed = await client.fetch<any>(`/feed?${queryParams.toString()}`);
    const items: any[] = feed?.data?.items ?? [];

    // Normalize Cielo feed items to match the expected transaction shape
    const transactions = items.map((tx: any) => ({
      id: tx.tx_hash,
      wallet: tx.wallet || tx.to || tx.from || address,
      type: tx.tx_type || 'transfer',
      tokenInSymbol: tx.contract_symbol || tx.amount_symbol || 'SOL',
      tokenOutSymbol: tx.amount_symbol || tx.contract_symbol || 'USDC',
      amountIn: tx.amount || 0,
      amountOut: tx.amount || 0,
      valueUsd: tx.amount_usd || 0,
      pnl: tx.pnl || 0,
      timestamp: new Date((tx.timestamp || 0) * 1000).toISOString(),
      chain: tx.chain || 'solana',
      txHash: tx.tx_hash,
      from: tx.from,
      to: tx.to,
    }));

    return NextResponse.json({
      data: transactions,
      meta: {
        hasMore: items.length >= txLimit,
        nextCursor: feed?.data?.paging?.next_object || null,
      },
    });
  } catch (error) {
    console.error('Cielo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
