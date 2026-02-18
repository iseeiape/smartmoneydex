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
    address: 'C21R6y1fqFUNCEzNj6VcEnjTE2y6Cq7GWLfZzkbBm7a',
    label: 'SmartMoneyWhale',
    category: 'whale',
    totalPnl: 2847500,
    winRate: 78.5,
    totalTrades: 342,
    favoriteTokens: ['SOL', 'BONK', 'JUP', 'WIF'],
    verified: true,
    description: 'Legendary whale known for early entries on memecoins',
    socials: { twitter: '@smartmoneywhale' }
  },
  {
    id: '2',
    address: 'H8sMJSCgF6R3C3sKgn8F3sFnRKL5hKHNrVJg7fJ8QmE',
    label: 'SolanaDev_pro',
    category: 'dev',
    totalPnl: 1250000,
    winRate: 82.3,
    totalTrades: 156,
    favoriteTokens: ['SOL', 'JUP', 'RNDR', 'PYTH'],
    verified: true,
    description: 'Former Solana core dev turned full-time trader',
  },
  {
    id: '3',
    address: 'A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0',
    label: 'CryptoAlphaKing',
    category: 'influencer',
    totalPnl: 890000,
    winRate: 71.2,
    totalTrades: 523,
    favoriteTokens: ['BONK', 'WIF', 'MYRO', 'HODL'],
    verified: true,
    description: 'Twitter alpha caller with 200K+ followers',
    socials: { twitter: '@cryptoalphaking' }
  },
  {
    id: '4',
    address: '9xK2P8N4jQ3mL8R2X7wY5vT1N6Z9pL2jH6W4M8kR7nY3',
    label: 'JumpTrading_MM',
    category: 'institution',
    totalPnl: 5200000,
    winRate: 68.9,
    totalTrades: 1204,
    favoriteTokens: ['SOL', 'USDC', 'JUP', 'W'],
    verified: true,
    description: 'Suspected Jump Trading wallet',
  },
  {
    id: '5',
    address: '5pX9M4K2hT8qP4M1K7nT6nY3K9L2mQ9pL3N7M8jR4wE3',
    label: 'DayTradeDegen',
    category: 'trader',
    totalPnl: 456000,
    winRate: 75.8,
    totalTrades: 892,
    favoriteTokens: ['BONK', 'WIF', 'GIGA', 'POPCAT'],
    verified: false,
    description: 'Day trader specializing in memecoin volatility',
  },
  {
    id: '6',
    address: '8qP4M1K7nT6nY3K9L2mQ9pL3N7M8jR4wE3X9K2P8N4',
    label: 'TheBonkWhale',
    category: 'whale',
    totalPnl: 1920000,
    winRate: 65.4,
    totalTrades: 234,
    favoriteTokens: ['BONK', 'SOL', 'WIF'],
    verified: true,
    description: 'Early BONK investor who never sold',
  },
  {
    id: '7',
    address: '4wE9X3H5jP8qP4M1K7nT6nY3K9L2mQ9pL3N7M8jR4wE',
    label: 'JupiterDAO_Treasury',
    category: 'institution',
    totalPnl: 3200000,
    winRate: 72.1,
    totalTrades: 445,
    favoriteTokens: ['JUP', 'SOL', 'USDC'],
    verified: true,
    description: 'Jupiter DAO treasury wallet',
  },
  {
    id: '8',
    address: '6nY3K9L2mQ1sA7D5F8hJ3kL6N1M8rS4nT8Q1H5jR7cB4',
    label: 'MemeCoinMillionaire',
    category: 'trader',
    totalPnl: 780000,
    winRate: 69.3,
    totalTrades: 678,
    favoriteTokens: ['WIF', 'MYRO', 'BONK', 'GIGA'],
    verified: false,
    description: 'Turned $10K into $800K on memecoins in 2024',
  },
  {
    id: '9',
    address: '1sA7D5F8hJ3kL6N1M8rS4nT8Q1H5jR7cB4F2G9kL9mH2',
    label: 'KOL_WhaleWatcher',
    category: 'influencer',
    totalPnl: 620000,
    winRate: 74.6,
    totalTrades: 412,
    favoriteTokens: ['SOL', 'JUP', 'W', 'PYTH'],
    verified: true,
    description: 'KOL focused on whale tracking and alerts',
    socials: { twitter: '@whalewatchsol' }
  },
  {
    id: '10',
    address: '7cB4F2G9kL9mH2J8N4pQ3kL6N1M8rS4nT8Q1H5jR7cB',
    label: 'DeFiProtocol_Dev',
    category: 'dev',
    totalPnl: 1450000,
    winRate: 79.8,
    totalTrades: 267,
    favoriteTokens: ['SOL', 'JUP', 'RNDR', 'HNT'],
    verified: true,
    description: 'DeFi protocol founder and yield farmer',
  },
  {
    id: '11',
    address: '9mH2J8N4pQ2vR7H6J4kP8wE3K9L6mN1M8rS4nT8Q1H5',
    label: 'AsianWhale_Crypto',
    category: 'whale',
    totalPnl: 4100000,
    winRate: 66.7,
    totalTrades: 189,
    favoriteTokens: ['SOL', 'USDT', 'BTC', 'ETH'],
    verified: false,
    description: 'Mysterious Asian whale with massive holdings',
  },
  {
    id: '12',
    address: '3kL6N1M8rS2vR7H6J4kP8wE3K9L6mN1M8rS4nT8Q1H5',
    label: 'MemeLord_Solana',
    category: 'trader',
    totalPnl: 520000,
    winRate: 68.2,
    totalTrades: 756,
    favoriteTokens: ['WIF', 'BONK', 'POPCAT', 'HODL'],
    verified: true,
    description: 'Memecoin specialist and community leader',
    socials: { twitter: '@memelordsol' }
  },
  {
    id: '13',
    address: '2vR7H6J4kP8wE3K9L6mN1M8rS4nT8Q1H5jR7cB4F2G9',
    label: 'SolanaFoundation',
    category: 'institution',
    totalPnl: 8500000,
    winRate: 81.4,
    totalTrades: 89,
    favoriteTokens: ['SOL', 'USDC'],
    verified: true,
    description: 'Official Solana Foundation wallet',
  },
  {
    id: '14',
    address: '8wE3K9L6mN1M8rS4nT8Q1H5jR7cB4F2G9kL9mH2J8N4',
    label: 'NFTFlipper_Pro',
    category: 'trader',
    totalPnl: 340000,
    winRate: 63.5,
    totalTrades: 1023,
    favoriteTokens: ['SOL', 'WIF', 'BONK'],
    verified: false,
    description: 'Former NFT degen turned memecoin trader',
  },
  {
    id: '15',
    address: '4nT8Q1H5jR7cB4F2G9kL9mH2J8N4pQ3kL6N1M8rS4nT',
    label: 'CryptoVCTracker',
    category: 'influencer',
    totalPnl: 280000,
    winRate: 71.8,
    totalTrades: 334,
    favoriteTokens: ['SOL', 'JUP', 'PYTH', 'W'],
    verified: true,
    description: 'Tracks VC investments and insider activity',
    socials: { twitter: '@vcwatchsol' }
  },
  {
    id: '16',
    address: '7yM4P3K9nL2vR7H6J4kP8wE3K9L6mN1M8rS4nT8Q1H5',
    label: 'BONK_Team_Wallet',
    category: 'dev',
    totalPnl: 2200000,
    winRate: 0,
    totalTrades: 1,
    favoriteTokens: ['BONK'],
    verified: true,
    description: 'BONK token treasury and development fund',
  },
  {
    id: '17',
    address: '1jH6W8N2kQ4nT8Q1H5jR7cB4F2G9kL9mH2J8N4pQ3kL',
    label: 'MarketMaker_Alameda2',
    category: 'institution',
    totalPnl: -150000,
    winRate: 52.3,
    totalTrades: 2345,
    favoriteTokens: ['SOL', 'USDC', 'USDT'],
    verified: false,
    description: 'Suspected Alameda-related market maker',
  },
  {
    id: '18',
    address: '6xK9M2L5hP7yM4P3K9nL2vR7H6J4kP8wE3K9L6mN1M8',
    label: 'AirdropFarmer_Pro',
    category: 'trader',
    totalPnl: 180000,
    winRate: 77.4,
    totalTrades: 445,
    favoriteTokens: ['JUP', 'W', 'PYTH', 'DRIFT'],
    verified: false,
    description: 'Professional airdrop farmer and protocol tester',
  },
  {
    id: '19',
    address: '9pL3N7M8jR1jH6W8N2kQ4nT8Q1H5jR7cB4F2G9kL9mH',
    label: 'WIF_Whale',
    category: 'whale',
    totalPnl: 1650000,
    winRate: 64.2,
    totalTrades: 156,
    favoriteTokens: ['WIF', 'SOL', 'BONK'],
    verified: true,
    description: 'One of the largest WIF holders',
  },
  {
    id: '20',
    address: '3cB7F4G2kH6xK9M2L5hP7yM4P3K9nL2vR7H6J4kP8wE',
    label: 'SolanaOG_2019',
    category: 'dev',
    totalPnl: 5600000,
    winRate: 84.6,
    totalTrades: 123,
    favoriteTokens: ['SOL', 'SRM', 'RAY', 'FIDA'],
    verified: true,
    description: 'Solana OG since 2019, validator operator',
  },
  {
    id: '21',
    address: '5vE9X1J6mN9pL3N7M8jR1jH6W8N2kQ4nT8Q1H5jR7cB',
    label: 'StakingWhale_SOL',
    category: 'whale',
    totalPnl: 1200000,
    winRate: 95.2,
    totalTrades: 45,
    favoriteTokens: ['SOL'],
    verified: false,
    description: 'Long-term SOL staker with minimal trading',
  },
  {
    id: '22',
    address: '2nT5Q8H4jP3cB7F4G2kH6xK9M2L5hP7yM4P3K9nL2vR',
    label: 'MEV_Bot_Operator',
    category: 'institution',
    totalPnl: 980000,
    winRate: 89.7,
    totalTrades: 5678,
    favoriteTokens: ['SOL', 'USDC'],
    verified: false,
    description: 'High-frequency MEV extraction bot',
  },
  {
    id: '23',
    address: '8wH2K5L9mR2nT5Q8H4jP3cB7F4G2kH6xK9M2L5hP7yM4',
    label: 'DeFi_YieldChaser',
    category: 'trader',
    totalPnl: 220000,
    winRate: 68.9,
    totalTrades: 567,
    favoriteTokens: ['SOL', 'JUP', 'RNDR'],
    verified: false,
    description: 'Yield farming and liquidity mining specialist',
  },
  {
    id: '24',
    address: '4jM8P9N3kL8wH2K5L9mR2nT5Q8H4jP3cB7F4G2kH6xK9',
    label: 'MemeCoinAlpha',
    category: 'influencer',
    totalPnl: 420000,
    winRate: 73.1,
    totalTrades: 489,
    favoriteTokens: ['BONK', 'WIF', 'MYRO', 'POPCAT'],
    verified: true,
    description: 'Telegram alpha channel with 50K+ members',
    socials: { telegram: 't.me/memecoinalpha' }
  },
  {
    id: '25',
    address: '6jN2vR8S5tU9pL3N7M8jR1jH6W8N2kQ4nT8Q1H5jR7cB',
    label: 'JUP_MegaWhale',
    category: 'whale',
    totalPnl: 3800000,
    winRate: 76.8,
    totalTrades: 234,
    favoriteTokens: ['JUP', 'SOL', 'W'],
    verified: true,
    description: 'Accumulated JUP since launch, never sold',
  },
  {
    id: '26',
    address: '498g1rVnFcnjBjpfw1xyqA1WvgQXUU8RWuELjxkjAayQ',
    label: 'FrankDeGods',
    category: 'influencer',
    totalPnl: 0,
    winRate: 0,
    totalTrades: 0,
    favoriteTokens: ['SOL', 'DEGODS'],
    verified: true,
    description: 'DeGods NFT founder and crypto influencer',
    socials: { twitter: '@FrankDeGods' }
  },
  {
    id: '27',
    address: 'EwTNPYTuwxMzrvL19nzBsSLXdAoEmVBKkisN87csKgtt',
    label: 'Gake',
    category: 'influencer',
    totalPnl: 747630,
    winRate: 100,
    totalTrades: 733,
    favoriteTokens: ['RALPH', 'titcoin', 'Franklin'],
    verified: false,
    description: 'Popular Wallet Bot #1788 on Cielo',
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
