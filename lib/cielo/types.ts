// Cielo API Types

export interface CieloWalletStats {
  wallet: string;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  profitableTrades: number;
  unprofitableTrades: number;
  favoriteTokens: string[];
  lastActivity: string;
  chains: string[];
}

export interface CieloTransaction {
  id: string;
  wallet: string;
  type: 'swap' | 'transfer' | 'mint' | 'burn' | 'stake' | 'unstake';
  tokenIn?: string;
  tokenOut?: string;
  tokenInSymbol?: string;
  tokenOutSymbol?: string;
  amountIn?: number;
  amountOut?: number;
  valueUsd: number;
  pnl?: number;
  timestamp: string;
  chain: string;
  txHash: string;
  protocol?: string;
  isBuy: boolean;
}

export interface CieloToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  priceUsd: number;
  volume24h: number;
  marketCap?: number;
}

export interface CieloTokenPnL {
  token_address: string;
  token_symbol: string;
  token_name: string;
  realized_pnl: number;
  unrealized_pnl: number;
  total_pnl: number;
  trades_count: number;
  avg_buy_price: number;
  avg_sell_price: number;
  current_price: number;
  remaining_amount: number;
}

export interface CieloWalletPnL {
  wallet: string;
  totalPnlUsd: number;
  realizedPnl: number;
  unrealizedPnl: number;
  pnlPercentage: number;
  timeframe: '1d' | '7d' | '30d' | 'all';
  tokens?: CieloTokenPnL[];
  total_balance_usd?: number;
}

export interface CieloTrendingWallet {
  wallet: string;
  label?: string;
  pnl24h: number;
  pnl7d: number;
  pnl30d: number;
  winRate: number;
  totalTrades: number;
  followers: number;
  tags: string[];
}

export interface CieloApiResponse<T> {
  data: T;
  meta?: {
    cursor?: string;
    hasMore?: boolean;
    total?: number;
  };
}
