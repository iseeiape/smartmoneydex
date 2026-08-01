// POST /api/indexnow — triggers IndexNow submission for all public URLs
// Call this after each deploy to notify Bing of changes
import { NextRequest, NextResponse } from 'next/server';
import { wallets } from '@/lib/data';

const INDEXNOW_KEY = '77da368350ce4766a01470e6a72dd472';
const BING_URL = 'https://www.bing.com/indexnow';
const BASE_URL = 'https://smartmoneydex.com';

export async function POST(request: NextRequest) {
  try {
    const staticUrls = [
      '/', '/wallets', '/leaderboard', '/categories',
      '/categories/whale', '/categories/dev', '/categories/influencer',
      '/categories/institution', '/categories/trader',
    ];

    const walletUrls = wallets.map(w => `/wallets/${w.address}`);
    const allPaths = [...staticUrls, ...walletUrls];

    // Bing IndexNow accepts up to 10,000 URLs per POST
    // Each call should be a batch (we can do all at once with our count)
    const urlList = allPaths.map(p => `${BASE_URL}${p}`);

    const payload = {
      host: 'smartmoneydex.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const response = await fetch(BING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let body = '';
    try { body = await response.text(); } catch {}

    return NextResponse.json({
      success: status === 200,
      status,
      message: status === 200
        ? `✅ IndexNow submitted ${urlList.length} URLs successfully`
        : `⚠️ Bing returned ${status}: ${body}`,
      urlCount: urlList.length,
    });
  } catch (error) {
    console.error('IndexNow error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit to IndexNow' },
      { status: 500 }
    );
  }
}
