// Cielo API Client
// Docs: https://developer.cielo.finance/reference
// Base URL: https://feed-api.cielo.finance/api/v1

const CIELO_API_BASE = 'https://feed-api.cielo.finance/api/v1';

class CieloClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generic fetch — used internally and by API routes
  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${CIELO_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': this.apiKey,
        ...options?.headers,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cielo API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // GET /api/v1/{wallet}/pnl/tokens — PnL by token for a wallet
  async getWalletPnL(walletAddress: string): Promise<any> {
    return this.fetch<any>(`/${walletAddress}/pnl/tokens`);
  }

  // GET /api/v1/{wallet}/pnl/total-stats — aggregated PnL + winrate
  async getWalletTotalStats(walletAddress: string): Promise<any> {
    return this.fetch<any>(`/${walletAddress}/pnl/total-stats`);
  }

  // GET /api/v1/{wallet}/trading-stats — trading behavior stats
  async getWalletTradingStats(walletAddress: string): Promise<any> {
    return this.fetch<any>(`/${walletAddress}/trading-stats`);
  }

  // GET /api/v1/{wallet}/portfolio — current portfolio
  async getWalletPortfolio(walletAddress: string): Promise<any> {
    return this.fetch<any>(`/${walletAddress}/portfolio`);
  }

  // GET /api/v1/{wallet}/related-wallets — related wallets
  async getRelatedWallets(walletAddress: string): Promise<any> {
    return this.fetch<any>(`/${walletAddress}/related-wallets`);
  }

  // GET /api/v1/trending-tokens — trending tokens
  async getTrendingTokens(chain: string = 'solana', limit: number = 20): Promise<any> {
    return this.fetch<any>(`/trending-tokens?chain=${chain}&limit=${limit}`);
  }

  // Batch PnL for multiple wallets
  async getWalletsPnL(walletAddresses: string[]): Promise<any[]> {
    const promises = walletAddresses.map(addr =>
      this.getWalletPnL(addr).catch(() => null)
    );
    const results = await Promise.all(promises);
    return results.filter((r): r is any => r !== null);
  }
}

// Singleton instance
let cieloClient: CieloClient | null = null;

export function getCieloClient(): CieloClient {
  if (!cieloClient) {
    const apiKey = process.env.CIELO_API_KEY;
    if (!apiKey) {
      throw new Error('CIELO_API_KEY environment variable is not set');
    }
    cieloClient = new CieloClient(apiKey);
  }
  return cieloClient;
}

// For server-side usage with explicit key
export function createCieloClient(apiKey: string): CieloClient {
  return new CieloClient(apiKey);
}

export { CieloClient };
