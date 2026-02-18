# Cielo API Integration for SmartMoneyDEX

## Overview
Using Cielo API to fetch real-time wallet data, transactions, and PnL for the SmartMoneyDEX directory.

## Cielo API Endpoints

### Authentication
- API Key required in header: `X-API-KEY: your_api_key`
- Base URL: `https://api.cielo.finance`

### Key Endpoints

#### 1. Get Wallet PnL
```
GET /v1/pnl/wallet/{walletAddress}
```
Returns PnL data for a specific wallet.

#### 2. Get Wallet Transactions
```
GET /v1/transactions/wallet/{walletAddress}
Query params:
- limit: number of transactions (default: 50)
- cursor: pagination cursor
- chains: comma-separated chain IDs (e.g., "solana,ethereum")
```

#### 3. Get Wallet Stats
```
GET /v1/wallet/{walletAddress}/stats
```
Returns aggregated wallet statistics.

#### 4. Get Trending Wallets
```
GET /v1/wallets/trending
Query params:
- timeframe: 1d, 7d, 30d
- chain: solana, ethereum, etc.
- limit: number of results
```

#### 5. Get Token Data
```
GET /v1/tokens/{tokenAddress}
```

### Response Format Examples

#### Wallet Stats Response:
```json
{
  "wallet": "7nY7H...3K9mP",
  "totalPnl": 2847500,
  "winRate": 78.5,
  "totalTrades": 342,
  "profitableTrades": 269,
  "favoriteTokens": ["SOL", "BONK", "JUP"],
  "lastActivity": "2026-02-17T10:00:00Z"
}
```

#### Transaction Response:
```json
{
  "transactions": [
    {
      "id": "tx_123",
      "wallet": "7nY7H...3K9mP",
      "type": "swap",
      "tokenIn": "SOL",
      "tokenOut": "BONK",
      "amountIn": 100,
      "amountOut": 5000000,
      "valueUsd": 18500,
      "pnl": 4500,
      "timestamp": "2026-02-17T09:30:00Z",
      "chain": "solana",
      "txHash": "5xK2P...8N4jQ"
    }
  ]
}
```

## Monetization via Referral

### Cielo Referral Program
- Sign up: https://cielo.finance/ref/your_code
- Commission: 20-30% of referred subscriptions
- Payout: Monthly in USDC or crypto

### Implementation Strategy
1. Add "Track on Cielo" buttons to wallet profiles
2. Use referral links for CTA buttons
3. Promote Cielo Pro/Whale plans in newsletter

### Referral Link Format
```
https://cielo.finance/ref/YOUR_CODE?wallet={walletAddress}
```

## Integration Architecture

### File Structure
```
lib/
├── cielo/
│   ├── client.ts        # Axios/fetch client with auth
│   ├── types.ts         # TypeScript interfaces
│   ├── wallets.ts       # Wallet data fetching
│   ├── transactions.ts  # Transaction fetching
│   └── pnl.ts           # PnL calculations
```

### Environment Variables
```
CIELO_API_KEY=your_api_key_here
CIELO_REFERRAL_CODE=your_ref_code
NEXT_PUBLIC_CIELO_REF_URL=https://cielo.finance/ref/YOUR_CODE
```

### Rate Limits
- Free tier: 100 requests/minute
- Pro tier: 1000 requests/minute
- Whale tier: 5000 requests/minute

## Next Steps

1. Get Cielo API key from dashboard
2. Set up environment variables
3. Create API client
4. Replace mock data with real Cielo data
5. Add "Track on Cielo" referral buttons
6. Set up caching (Redis) for rate limit compliance
