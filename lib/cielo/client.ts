// Cielo API Client

import { CieloWalletStats, CieloTransaction, CieloWalletPnL, CieloTrendingWallet, CieloApiResponse } from './types';

const CIELO_API_BASE = 'https://feed-api.cielo.finance/api/v1';

class CieloClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${CIELO_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cielo API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Get wallet PnL tokens (working endpoint)
  async getWalletPnL(walletAddress: string): Promise<CieloWalletPnL> {
    return this.fetch<CieloWalletPnL>(`/${walletAddress}/pnl/tokens`);
  }

  // Get wallet transactions
  async getWalletTransactions(
    walletAddress: string,
    options?: {
      limit?: number;
      cursor?: string;
      chain?: string;
    }
  ): Promise<CieloApiResponse<CieloTransaction[]>> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.cursor) params.append('cursor', options.cursor);
    if (options?.chain) params.append('chain', options.chain);

    return this.fetch<CieloApiResponse<CieloTransaction[]>>(
      `/transactions?wallet=${walletAddress}&${params.toString()}`
    );
  }

  // Get multiple wallets PnL (batch)
  async getWalletsPnL(walletAddresses: string[]): Promise<CieloWalletPnL[]> {
    const promises = walletAddresses.map(addr => 
      this.getWalletPnL(addr).catch(() => null)
    );
    const results = await Promise.all(promises);
    return results.filter((r): r is CieloWalletPnL => r !== null);
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
