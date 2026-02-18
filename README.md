# SmartMoneyDEX

A Next.js directory website for tracking top smart money wallets on Solana. 
Built with the Greg Isenberg directory model for SEO traffic and lead generation.

**Live URL:** https://smartmoneydex.com

## Features

- 📊 **Top Smart Money Wallets** - Curated list with P&L, win rate, and trading stats
- 🔍 **Search & Filter** - Find wallets by name, address, or token
- 🏷️ **Categories** - Whales, Devs, Influencers, Institutions, Pro Traders
- 📈 **Leaderboard** - Rankings by performance
- 🎯 **Individual Wallet Pages** - SEO-optimized profile pages
- 📱 **Responsive Design** - Mobile-first, dark mode crypto aesthetic
- 🔗 **Cielo Integration** - Real-time wallet tracking via Cielo API

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Custom components with glassmorphism design
- **Data**: Cielo API + Fallback mock data
- **Referral**: Cielo affiliate integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cielo API key (get from [cielo.finance](https://cielo.finance))

### Installation

```bash
cd my-app
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
CIELO_API_KEY=your_cielo_api_key_here
CIELO_REFERRAL_CODE=your_referral_code
NEXT_PUBLIC_CIELO_REF_CODE=your_referral_code
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Cielo API Integration

This project uses the **Cielo API** for real-time wallet data:

### Endpoints Used

- `GET /v1/wallet/{address}/stats` - Wallet statistics
- `GET /v1/pnl/wallet/{address}` - PnL data
- `GET /v1/transactions/wallet/{address}` - Recent transactions
- `GET /v1/wallets/trending` - Trending wallets

### API Routes

- `/api/cielo/wallet/[address]/stats`
- `/api/cielo/wallet/[address]/pnl`
- `/api/cielo/wallet/[address]/transactions`
- `/api/cielo/wallets/trending`

### Referral Monetization

Each wallet page includes a "Track on Cielo" button with your referral code.

**How it works:**
1. User clicks "Track on Cielo" → Goes to Cielo with your ref code
2. User signs up for Cielo Pro/Whale → You earn 20-30% commission
3. Get paid monthly in USDC

**Referral URL format:**
```
https://cielo.finance/ref/YOUR_CODE?wallet=WALLET_ADDRESS
```

## Project Structure

```
my-app/
├── app/                    # Next.js app router pages
│   ├── api/cielo/         # Cielo API routes
│   ├── page.tsx           # Homepage
│   ├── wallets/           # Wallet directory & detail pages
│   ├── categories/        # Category browsing
│   ├── leaderboard/       # Rankings page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── header.tsx
│   ├── hero.tsx
│   ├── wallet-card.tsx
│   ├── wallet-table.tsx
│   ├── category-grid.tsx
│   ├── copy-button.tsx
│   └── footer.tsx
├── lib/                   # Utilities & data
│   ├── cielo/            # Cielo integration
│   │   ├── client.ts     # API client
│   │   ├── types.ts      # TypeScript types
│   │   ├── hooks.ts      # React hooks
│   │   └── referral.ts   # Referral utilities
│   ├── data.ts           # Wallet data
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Deployment

### Vercel

```bash
vercel --prod
```

### Connect Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS records:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

## Monetization Strategy

1. **Cielo Referrals** - 20-30% commission on Pro/Whale subscriptions
2. **Featured Listings** - Projects pay to highlight wallets
3. **Premium API** - Sell API access to developers
4. **Newsletter Sponsorships** - Crypto projects pay for exposure

## Next Steps

1. ✅ Domain connected - smartmoneydex.com
2. ✅ Cielo API integration - Ready for real data
3. 🔄 Add more wallets - Expand to 100+ tracked wallets
4. 🔄 Telegram bot - Real-time alerts
5. 🔄 Newsletter - Weekly alpha digest

## Resources

- [Cielo Docs](https://docs.cielo.finance)
- [Greg Isenberg Directory Model](https://latecheckout.substack.com)
- [Next.js Docs](https://nextjs.org/docs)

---

**SmartMoneyDEX** - Track smart money, trade smarter 🦎

Built with ❤️ for the Solana community
