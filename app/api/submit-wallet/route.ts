// API Route: /api/submit-wallet - Auto-approve based on Cielo validation

import { NextRequest, NextResponse } from 'next/server';
import { wallets } from '@/lib/data';
import { isWalletSubmitted, addSubmission } from '@/lib/submissions';

const CIELO_API_BASE = 'https://feed-api.cielo.finance/api/v1';

interface ValidationResult {
  isValid: boolean;
  reason?: string;
  portfolioValue?: number;
  totalTrades?: number;
  winRate?: number;
}

async function validateWallet(address: string): Promise<ValidationResult> {
  try {
    const apiKey = process.env.CIELO_API_KEY;

    if (!apiKey) {
      return {
        isValid: false,
        reason: 'API not configured',
      };
    }

    // Fetch portfolio value from /portfolio endpoint (matches Cielo's UI)
    const portfolioResponse = await fetch(`${CIELO_API_BASE}/${address}/portfolio`, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Fetch token data for trades and win rate
    const pnlResponse = await fetch(`${CIELO_API_BASE}/${address}/pnl/tokens`, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Check if wallet exists in Cielo
    if (!portfolioResponse.ok && !pnlResponse.ok) {
      if (portfolioResponse.status === 404 || pnlResponse.status === 404) {
        return {
          isValid: false,
          reason: 'Wallet not found in Cielo database. Wallet needs trading history.',
        };
      }
      return {
        isValid: false,
        reason: `Cielo API error: ${portfolioResponse.status}`,
      };
    }

    // Get portfolio value from /portfolio endpoint
    let portfolioValue = 0;
    if (portfolioResponse.ok) {
      const portfolioResult = await portfolioResponse.json();
      portfolioValue = portfolioResult.data?.total_usd || 0;
    }

    // Get token data for trades and win rate
    let totalTrades = 0;
    let winRate = 0;
    
    if (pnlResponse.ok) {
      const pnlResult = await pnlResponse.json();
      const tokens = pnlResult.data?.items || [];
      
      // Count total trades
      totalTrades = tokens.reduce((sum: number, token: any) => {
        return sum + (token.num_swaps || 0);
      }, 0);
      
      // Calculate win rate: % of tokens with positive total_pnl
      const profitableTokens = tokens.filter((t: any) => (t.total_pnl_usd || 0) > 0).length;
      winRate = tokens.length > 0 ? (profitableTokens / tokens.length) * 100 : 0;
    }

    // Validate criteria
    const minPortfolio = 10000; // $10k
    const minTrades = 10;

    if (portfolioValue < minPortfolio) {
      return {
        isValid: false,
        reason: `Portfolio value $${Math.round(portfolioValue).toLocaleString()} below $10k minimum`,
        portfolioValue,
        totalTrades,
        winRate,
      };
    }

    if (totalTrades < minTrades) {
      return {
        isValid: false,
        reason: `Only ${totalTrades} trades. Minimum 10 trades required.`,
        portfolioValue,
        totalTrades,
        winRate,
      };
    }

    return {
      isValid: true,
      portfolioValue,
      totalTrades,
      winRate,
    };

  } catch (error) {
    console.error('Validation error:', error);
    return {
      isValid: false,
      reason: 'Failed to validate wallet',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, label, category, description, twitter, telegram } = body;

    // Basic validation
    if (!walletAddress || !label || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate Solana address format
    if (!/^[A-HJ-NP-Za-km-z1-9]{32,44}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid Solana wallet address' },
        { status: 400 }
      );
    }

    // Check if wallet already exists
    const existingWallet = wallets.find(w => 
      w.address.toLowerCase() === walletAddress.toLowerCase()
    );
    
    if (existingWallet) {
      return NextResponse.json(
        { error: 'Wallet already in directory' },
        { status: 409 }
      );
    }

    // Check if wallet was already submitted
    const alreadySubmitted = await isWalletSubmitted(walletAddress);
    if (alreadySubmitted) {
      return NextResponse.json(
        { error: 'Wallet already submitted for review' },
        { status: 409 }
      );
    }

    // Validate against Cielo
    const validation = await validateWallet(walletAddress);

    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Wallet does not meet smart money criteria',
          reason: validation.reason,
          criteria: {
            minPortfolio: 10000,
            minTrades: 10,
            actualPortfolio: validation.portfolioValue,
            actualTrades: validation.totalTrades,
            winRate: validation.winRate,
          }
        },
        { status: 403 }
      );
    }

    // Wallet passes validation - would add to database here
    // For now, return success with the data that would be added
    const newWallet = {
      id: Date.now().toString(),
      address: walletAddress,
      label,
      category,
      totalPnl: 0, // Will be fetched live
      winRate: validation.winRate || 0,
      totalTrades: validation.totalTrades || 0,
      favoriteTokens: [],
      verified: false,
      description: description || '',
      socials: {
        twitter: twitter || undefined,
        telegram: telegram || undefined,
      },
      autoApproved: true,
      approvedAt: new Date().toISOString(),
      portfolioValue: validation.portfolioValue,
    };

    // Save submission to file
    try {
      await addSubmission({
        address: walletAddress,
        label,
        category,
        description: description || '',
        twitter: twitter || '',
        telegram: telegram || '',
        submittedAt: new Date().toISOString(),
        status: 'approved',
        portfolioValue: validation.portfolioValue,
        totalTrades: validation.totalTrades,
        winRate: validation.winRate,
      });
    } catch (e) {
      console.error('Failed to save submission:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Wallet approved and added to directory! Note: Wallet will appear after next deployment.',
      wallet: newWallet,
      stats: {
        portfolioValue: validation.portfolioValue,
        totalTrades: validation.totalTrades,
        winRate: validation.winRate,
        winRateNote: 'Based on tracked tokens (50 most recent)',
      }
    });

  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
