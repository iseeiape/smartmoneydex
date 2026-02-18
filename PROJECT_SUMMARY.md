# SmartMoneyDEX Project Summary

**Project Location:** `/home/dan/clawd/shared/smartmoneydex/`
**Live URL:** https://smartmoneydex.com
**Domain:** smartmoneydex.com (Namecheap)
**Hosting:** Vercel

---

## What Was Built

A Next.js directory website for tracking smart money wallets on Solana, following the Greg Isenberg directory business model.

### Key Features
- 25 smart money wallets with full profiles
- Real-time PnL stats (7D, 30D, All Time)
- Win rate tracking
- Transaction feed
- Category filtering (Whales, Devs, Influencers, Institutions, Traders)
- Search functionality
- Leaderboard with podium
- Cielo API integration for real data
- Cielo referral monetization

### Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Cielo API
- Vercel hosting

---

## Project Structure

```
app/
├── api/cielo/              # API routes for Cielo integration
├── wallets/               # Wallet directory & profile pages
├── categories/            # Category browsing
├── leaderboard/           # Rankings page
├── page.tsx              # Homepage
└── layout.tsx            # Root layout

components/
├── cielo-stats.tsx       # Real-time Cielo stats component
├── cielo-transaction-feed.tsx  # Transaction feed component
├── header.tsx
├── footer.tsx
├── hero.tsx
├── wallet-card.tsx
├── wallet-table.tsx
└── category-grid.tsx

lib/
├── cielo/                # Cielo integration
│   ├── client.ts         # API client
│   ├── types.ts          # TypeScript types
│   ├── hooks.ts          # React hooks
│   └── referral.ts       # Referral utilities
└── data.ts               # Wallet data
```

---

## Monetization

1. **Cielo Referrals** - 20-30% commission on Pro/Whale subscriptions
2. **Featured Listings** - Projects pay to highlight wallets
3. **Premium API** - Sell API access to developers
4. **Newsletter Sponsorships**

---

## Environment Variables Needed

```
CIELO_API_KEY=your_cielo_api_key
CIELO_REFERRAL_CODE=your_ref_code
NEXT_PUBLIC_CIELO_REF_CODE=your_ref_code
```

---

## Deployment

```bash
cd /home/dan/clawd/shared/smartmoneydex
vercel --prod
```

---

## Next Steps

- [ ] Add real Cielo API key for live data
- [ ] Expand to 100+ wallets
- [ ] Set up Telegram alerts bot
- [ ] Create newsletter signup
- [ ] Add more chains (ETH, Base, etc.)

---

**Created:** February 17, 2026
**Status:** Live & Operational
