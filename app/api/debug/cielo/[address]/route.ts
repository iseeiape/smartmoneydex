// Debug endpoint to check Cielo API response format

import { NextRequest, NextResponse } from 'next/server';

const CIELO_API_BASE = 'https://feed-api.cielo.finance/api/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    const apiKey = process.env.CIELO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Try pnl/tokens endpoint with pagination
    const tokensResponse = await fetch(`${CIELO_API_BASE}/${address}/pnl/tokens?limit=100`, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!tokensResponse.ok) {
      return NextResponse.json({
        error: `API error: ${tokensResponse.status}`,
        text: await tokensResponse.text(),
      }, { status: tokensResponse.status });
    }

    const tokensData = await tokensResponse.json();
    const tokens = tokensData.data?.items || [];

    // Calculate portfolio value our way
    let ourCalculation = 0;
    let totalTrades = 0;
    let tokenDetails: any[] = [];

    for (const token of tokens.slice(0, 10)) {
      const holdingValue = token.holding_amount_usd || 0;
      ourCalculation += holdingValue;
      totalTrades += token.num_swaps || 0;
      
      tokenDetails.push({
        symbol: token.token_symbol,
        name: token.token_name,
        holding_usd: holdingValue,
        num_swaps: token.num_swaps,
        total_pnl: token.total_pnl_usd,
        first_trade: token.first_trade,
        last_trade: token.last_trade,
      });
    }

    // Check total-stats endpoint
    const statsResponse = await fetch(`${CIELO_API_BASE}/${address}/pnl/total-stats`, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    let totalStats = null;
    if (statsResponse.ok) {
      totalStats = await statsResponse.json();
    }

    // Check portfolio endpoint
    const portfolioResponse = await fetch(`${CIELO_API_BASE}/${address}/portfolio`, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    let portfolioData = null;
    if (portfolioResponse.ok) {
      portfolioData = await portfolioResponse.json();
    }

    // Calculate 30-day stats
    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60);
    
    let trades30d = 0;
    let profitableTokens30d = 0;
    let tokensWithActivity30d = 0;

    for (const token of tokens) {
      // Check if token had activity in last 30 days
      if (token.last_trade && token.last_trade >= thirtyDaysAgo) {
        tokensWithActivity30d++;
        trades30d += token.num_swaps || 0;
        
        if ((token.total_pnl_usd || 0) > 0) {
          profitableTokens30d++;
        }
      }
    }

    const winRate30d = tokensWithActivity30d > 0 
      ? (profitableTokens30d / tokensWithActivity30d) * 100 
      : 0;

    return NextResponse.json({
      wallet: address,
      summary: {
        token_count: tokens.length,
        our_portfolio_calculation: ourCalculation,
        our_trade_calculation: totalTrades,
        first_10_tokens: tokenDetails,
        stats_30d: {
          tokens_with_activity: tokensWithActivity30d,
          total_trades_30d: trades30d,
          profitable_tokens_30d: profitableTokens30d,
          win_rate_30d: winRate30d,
        }
      },
      portfolio_endpoint: portfolioData,
      raw_tokens_data: tokensData,
      total_stats: totalStats,
    });

  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
