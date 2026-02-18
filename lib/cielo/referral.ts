// Cielo Referral Utilities

const CIELO_BASE_URL = 'https://app.cielo.finance';

/**
 * Generate Cielo wallet profile URL with referral code
 * 
 * Format: https://app.cielo.finance/profile/WALLET_ADDRESS?ref=CODE
 */
export function getCieloWalletUrl(
  walletAddress: string,
  referralCode: string
): string {
  return `${CIELO_BASE_URL}/profile/${walletAddress}?ref=${referralCode}`;
}

/**
 * Get Cielo app URL for a specific wallet (direct link)
 */
export function getCieloAppWalletUrl(walletAddress: string, referralCode?: string): string {
  if (referralCode) {
    return `${CIELO_BASE_URL}/profile/${walletAddress}?ref=${referralCode}`;
  }
  return `${CIELO_BASE_URL}/profile/${walletAddress}`;
}

/**
 * Get referral code from environment
 */
export function getReferralCode(): string {
  const code = process.env.NEXT_PUBLIC_CIELO_REF_CODE || process.env.CIELO_REFERRAL_CODE;
  if (!code) {
    console.warn('CIELO_REFERRAL_CODE not set, using default');
    return 'smartmoneydex';
  }
  return code;
}

/**
 * Get simple Cielo homepage referral link
 */
export function getCieloReferralUrl(code: string): string {
  return `https://cielo.finance/?ref=${code}`;
}
