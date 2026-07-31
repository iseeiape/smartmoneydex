export interface Wallet {
  id: string;
  address: string;
  label: string;
  category: 'whale' | 'dev' | 'influencer' | 'institution' | 'trader';
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  favoriteTokens: string[];
  avatar?: string;
  verified?: boolean;
  description?: string;
  socials?: {
    twitter?: string;
    telegram?: string;
  };
}

export interface Trade {
  id: string;
  walletId: string;
  tokenSymbol: string;
  tokenName: string;
  tradeType: 'buy' | 'sell';
  amount: number;
  price: number;
  pnl: number;
  timestamp: string;
}

export const categories = [
  { id: 'whale', name: 'Whales', description: 'High volume traders with $1M+ portfolios', color: 'bg-purple-500', icon: '🐋' },
  { id: 'dev', name: 'Developers', description: 'Project founders and protocol developers', color: 'bg-blue-500', icon: '💻' },
  { id: 'influencer', name: 'Influencers', description: 'CT personalities and alpha callers', color: 'bg-pink-500', icon: '📢' },
  { id: 'institution', name: 'Institutions', description: 'VCs, funds, and market makers', color: 'bg-amber-500', icon: '🏦' },
  { id: 'trader', name: 'Pro Traders', description: 'Consistently profitable day traders', color: 'bg-green-500', icon: '📈' },
];

export const wallets: Wallet[] = [
  {
    id: '1',
    address: 'AVAZvHLR2PcWpDf8BXY4rVxNHYRBytycHkcB5z5QNXYm',
    label: 'Alpha Insider',
    category: 'whale',
    totalPnl: 13374955,
    winRate: 82.4,
    totalTrades: 1745,
    favoriteTokens: ['Fartcoin', 'ai16z', 'TRUMP', '$WIF', 'MOODENG'],
    verified: true,
    description: 'Top-performing smart money wallet with $13.3M realized P&L. Active across memecoins and blue chips.',
    socials: { twitter: '@alphainsider' }
  },
  {
    id: '2',
    address: '4UwK5AE6Djdf3MfwtPGE8pFYD47MhU9fiStDVmSHJVMB',
    label: 'DEX Pro Trader',
    category: 'trader',
    totalPnl: 234807,
    winRate: 76.3,
    totalTrades: 1905,
    favoriteTokens: ['HBULL', 'wumc', 'FARM', 'BOXABL', 'PARQ'],
    verified: true,
    description: 'Consistent DEX trader with $234k+ profit across 1,900+ trades.',
  },
  {
    id: '3',
    address: '5fM9cY5GMo8QtTmxuvNx7bWFUoNhdQ1H5w8bMdXGVtaH',
    label: 'MemeCoin Specialist',
    category: 'trader',
    totalPnl: 83847,
    winRate: 71.5,
    totalTrades: 1462,
    favoriteTokens: ['GTAVI', 'ANSEM', 'TrumpCoin', 'Embrace', 'Robbinghood'],
    verified: false,
    description: 'Memecoin trader specializing in early entries. $83k+ realized P&L.',
  },
  {
    id: '4',
    address: 'GV6UUmNxz2RpKxmNAPadYKb7uQpszwqQAu3qLJxVdC52',
    label: 'Ansem',
    category: 'influencer',
    totalPnl: 0,
    winRate: 0,
    totalTrades: 24,
    favoriteTokens: ['PUMP', 'ZAUTH', 'CLAW', 'ATELIER', 'NEST'],
    verified: true,
    description: 'Legendary crypto KOL. Known for early calls and massive market impact on Solana.',
    socials: { twitter: '@ansem' }
  },
  {
    id: '5',
    address: 'HUpPyLU8KWisCAr3mzWy2FKT6uuxQ2qGgJQxyTpDoes5',
    label: 'Mega Whale',
    category: 'whale',
    totalPnl: 17501756,
    winRate: 68.5,
    totalTrades: 3452,
    favoriteTokens: ['TRUMP', 'BUZZ', 'ACT'],
    verified: true,
    description: 'Massive whale wallet with $17.5M+ in realized profits. Heavy trader on political and narrative tokens.',
  },
  {
    id: '6',
    address: 'ECCKBDWX3MkEcf3bULbLBb9FvrEQLsmPMFTKFpvjzqgP',
    label: 'Market Master',
    category: 'whale',
    totalPnl: 12523407,
    winRate: 74.2,
    totalTrades: 2890,
    favoriteTokens: ['TRUMP', 'MELANIA', 'SNAI'],
    verified: true,
    description: 'Whale with $12.5M+ P&L. Strategic trader across multiple token narratives.',
  },
  {
    id: '7',
    address: '3tc4BVAdzjr1JpeZu6NAjLHyp4kK3iic7TexMBYGJ4Xk',
    label: 'Alpha Whale',
    category: 'whale',
    totalPnl: 9837772,
    winRate: 71.8,
    totalTrades: 2156,
    favoriteTokens: ['MELANIA', 'TRUMP', 'jellyjelly'],
    verified: true,
    description: 'Nearly $10M in realized profits. Smart money whale with excellent timing.',
  },
  {
    id: '8',
    address: 'DKgvpfttzmJqZXdavDwTxwSVkajibjzJnN2FA99dyciK',
    label: 'Crypto Whale',
    category: 'whale',
    totalPnl: 8148460,
    winRate: 65.9,
    totalTrades: 1890,
    favoriteTokens: ['MELANIA', 'TRUMP', 'CHILLGUY'],
    verified: true,
    description: '$8M+ whale with diverse portfolio of high-cap memecoins.',
  },
  {
    id: '9',
    address: '636N7frU8bUwYfyUAtvMQQsXhTFRuSWjxnEZihr5axGV',
    label: 'Institution Whale',
    category: 'institution',
    totalPnl: 5208766,
    winRate: 62.3,
    totalTrades: 987,
    favoriteTokens: ['TRUMP', 'KWAII', 'jellyjelly'],
    verified: true,
    description: 'Institutional-grade wallet with $5.2M+ profits. Large position sizes.',
  },
  {
    id: '10',
    address: '7SDs3PjT2mswKQ7Zo4FTucn9gJdtuW4jaacPA65BseHS',
    label: 'KOL Trader',
    category: 'influencer',
    totalPnl: 4187317,
    winRate: 69.4,
    totalTrades: 1567,
    favoriteTokens: ['MELANIA', 'LIBRA', 'TWC'],
    verified: true,
    description: 'KOL-level wallet with $4.1M+ P&L. Active in memecoin trading.',
    socials: { twitter: '@koltradesol' }
  },
  {
    id: '11',
    address: '9jyqFiLnruggwNn4EQwBNFXwpbLM9hrA4hV59ytyAVVz',
    label: 'Core Trader',
    category: 'trader',
    totalPnl: 2927456,
    winRate: 73.6,
    totalTrades: 2345,
    favoriteTokens: ['Pnut', 'TRUMP', 'NOLAND'],
    verified: true,
    description: 'Consistent $2.9M+ profit trader. High win rate on memecoin plays.',
  },
  {
    id: '12',
    address: '2tgaERy66PYPEovadPh5y7coWjyURTmvKgdrHd9DAoxw',
    label: 'Smart Whale',
    category: 'whale',
    totalPnl: 2805325,
    winRate: 67.8,
    totalTrades: 1123,
    favoriteTokens: ['jellyjelly', 'ZAILGO', 'ALON'],
    verified: true,
    description: 'Smart money whale with $2.8M+ in realized profits.',
  },
  {
    id: '13',
    address: '2RssnB7hcrnBEx55hXMKT1E7gN27g9ecQFbbCc5Zjajq',
    label: 'Mega Trader',
    category: 'trader',
    totalPnl: 2350957,
    winRate: 70.2,
    totalTrades: 1789,
    favoriteTokens: ['MELANIA', 'TWC', 'CAINAM'],
    verified: true,
    description: 'Top performer with $2.3M+ P&L. Diversified trading approach.',
  },
  {
    id: '14',
    address: 'H72yLkhTnoBfhBTXXaj1RBXuirm8s8G5fcVh2XpQLggM',
    label: 'GMGN Alpha',
    category: 'trader',
    totalPnl: 2083950,
    winRate: 66.4,
    totalTrades: 2340,
    favoriteTokens: ['GOAT', 'MOODENG', 'LUCE'],
    verified: false,
    description: 'Tracked by GMGN as smart money. $2M+ across trending tokens.',
  },
  {
    id: '15',
    address: '4Be9CvxqHW6BYiRAxW9Q3xu1ycTMWaL5z8NX4HR3ha7t',
    label: 'Profit Hunter',
    category: 'trader',
    totalPnl: 1779906,
    winRate: 72.1,
    totalTrades: 1256,
    favoriteTokens: ['MITCH', 'DOLAN', 'XD'],
    verified: false,
    description: 'Skilled trader with $1.7M+ in realized gains.',
  },
  {
    id: '16',
    address: 'dVs7zZksjFuq73xbtUC62brFXYYuxCuPSG4wZeGiHck',
    label: 'Political Trader',
    category: 'trader',
    totalPnl: 1753159,
    winRate: 64.8,
    totalTrades: 890,
    favoriteTokens: ['TRUMP', 'DADDY', 'MUSKIT'],
    verified: false,
    description: 'Focuses on political and narrative-driven tokens. $1.75M+ P&L.',
  },
  {
    id: '17',
    address: 'pndujwi7BeaRRenYHSShyNQXAdBNEzKDR5jgzbheJFT',
    label: 'DeFi Whale',
    category: 'whale',
    totalPnl: 1363417,
    winRate: 69.5,
    totalTrades: 1567,
    favoriteTokens: ['super-b2b', 'MELANIA', 'Valentine'],
    verified: false,
    description: '$1.36M+ whale wallet. Active in both memecoin and DeFi tokens.',
  },
  {
    id: '18',
    address: '9vWutdTBs66hWkeCmxaLFpkKy4q5RSe8DsFjfdxj5yFA',
    label: 'Seasoned Trader',
    category: 'trader',
    totalPnl: 1062539,
    winRate: 70.8,
    totalTrades: 987,
    favoriteTokens: ['FWOG', 'NEIRO', 'MLG'],
    verified: false,
    description: '$1M+ trader with proven track record across multiple tokens.',
  },
  {
    id: '19',
    address: '2HWT2KLLdN2wxYTqdSuko5SBzg2SEJASgV4GE2tD7TML',
    label: 'Blue Chip Whale',
    category: 'whale',
    totalPnl: 1026619,
    winRate: 61.3,
    totalTrades: 567,
    favoriteTokens: ['MELANIA', 'BOXABL', 'TERRA'],
    verified: false,
    description: 'Whale with $1M+ P&L focused on blue chip memecoins.',
  },
  {
    id: '20',
    address: '4Bq5yvgoiZDsukGERb7aM52jDmbVPCpoihbztscZ5PeM',
    label: 'Emerging Whale',
    category: 'whale',
    totalPnl: 1010751,
    winRate: 75.2,
    totalTrades: 567,
    favoriteTokens: ['Quant', 'CHILLGUY', 'HFC'],
    verified: false,
    description: 'Rising whale with $1M+ profits. High win rate of 75%.',
  },
  {
    id: '21',
    address: 'EdDCRfDDeiiDXdntrP59abH4DXHFNU48zpMPYisDMjA7',
    label: 'Meme Hunter',
    category: 'trader',
    totalPnl: 1150765,
    winRate: 68.4,
    totalTrades: 1345,
    favoriteTokens: ['moonpig', 'FLOOF', 'FWOG'],
    verified: false,
    description: 'Dedicated memecoin hunter with $1.15M+ P&L.',
  },
  {
    id: '22',
    address: '7Dt5oUpxHWuKH8bCTXDLz2j3JyxA7jEmtzqCG6pnh96X',
    label: 'Narrative Trader',
    category: 'trader',
    totalPnl: 346518,
    winRate: 72.5,
    totalTrades: 890,
    favoriteTokens: ['MELANIA', 'TRUMP', 'MLG'],
    verified: false,
    description: 'Skilled narrative trader with $346k+ profits.',
  },
  {
    id: '23',
    address: 'BD7oWkEQsUwE8sj4UT7jtrGjHC8Gq1iRqXY7U6DTbJpf',
    label: 'Niche Trader',
    category: 'trader',
    totalPnl: 303695,
    winRate: 65.2,
    totalTrades: 789,
    favoriteTokens: ['TRUMP', 'MELLA', 'MMGA'],
    verified: false,
    description: 'Niche trader with $303k+ P&L in political tokens.',
  },
  {
    id: '24',
    address: 'HrTZPWV4ZPebBiwyzoTBajCD49kQqVwf4dwsLuYG8CXX',
    label: 'Degen Trader',
    category: 'trader',
    totalPnl: 732931,
    winRate: 63.7,
    totalTrades: 1567,
    favoriteTokens: ['IRONYMAN', 'BINARY'],
    verified: false,
    description: 'Degen trader with $732k+ in realized profits.',
  },
];

export const recentTrades: Trade[] = [
  { id: '1', walletId: '1', tokenSymbol: 'BONK', tokenName: 'Bonk', tradeType: 'buy', amount: 2500000, price: 0.000012, pnl: 45000, timestamp: '2026-02-17T09:30:00Z' },
  { id: '2', walletId: '2', tokenSymbol: 'JUP', tokenName: 'Jupiter', tradeType: 'sell', amount: 5000, price: 1.85, pnl: 3200, timestamp: '2026-02-17T09:15:00Z' },
  { id: '3', walletId: '3', tokenSymbol: 'WIF', tokenName: 'Dog Wif Hat', tradeType: 'buy', amount: 15000, price: 0.85, pnl: -1200, timestamp: '2026-02-17T08:45:00Z' },
  { id: '4', walletId: '5', tokenSymbol: 'GIGA', tokenName: 'Giga Chad', tradeType: 'buy', amount: 50000, price: 0.045, pnl: 8500, timestamp: '2026-02-17T08:30:00Z' },
  { id: '5', walletId: '6', tokenSymbol: 'SOL', tokenName: 'Solana', tradeType: 'buy', amount: 500, price: 185.5, pnl: 12500, timestamp: '2026-02-17T07:45:00Z' },
];

export function formatAddress(address: string): string {
  // Show truncated version for display: 5 chars...5 chars
  if (address.length > 15) {
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
  }
  return address;
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(2)}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getTopWallets(limit: number = 10): Wallet[] {
  return [...wallets]
    .sort((a, b) => b.totalPnl - a.totalPnl)
    .slice(0, limit);
}

export function getWalletsByCategory(category: string): Wallet[] {
  return wallets.filter(w => w.category === category);
}

export function getWalletByAddress(address: string): Wallet | undefined {
  return wallets.find(w => w.address.toLowerCase() === address.toLowerCase());
}

export function getWalletById(id: string): Wallet | undefined {
  return wallets.find(w => w.id === id);
}
