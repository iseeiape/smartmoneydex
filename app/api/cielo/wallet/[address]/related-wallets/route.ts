// API Route: /api/cielo/wallet/[address]/related-wallets

import { NextRequest, NextResponse } from 'next/server';

const CIELO_API_BASE = 'https://feed-api.cielo.finance/api/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    
    // Check if Cielo API key is configured
    if (!process.env.CIELO_API_KEY) {
      return NextResponse.json({
        relatedWallets: [],
        isMock: true,
      });
    }

    const response = await fetch(`${CIELO_API_BASE}/${address}/related-wallets`, {
      headers: {
        'X-API-KEY': process.env.CIELO_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          relatedWallets: [],
          message: 'No related wallets found',
        });
      }
      return NextResponse.json(
        { error: `Cielo API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      relatedWallets: data.related_wallets || data.wallets || [],
      count: data.count || 0,
    });

  } catch (error) {
    console.error('Related wallets API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related wallets' },
      { status: 500 }
    );
  }
}
