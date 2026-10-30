/**
 * Luxury Tableware Pricing & Currency Utilities
 */

export const DEFAULT_USD_TO_UZS_RATE = 12850;

export interface PriceInfo {
  usd: number;
  uzs: number;
  formattedUsd: string;
  formattedUzs: string;
}

/**
 * Calculates dual-currency prices given USD base price and exchange rate
 */
export function calculateDualPrice(usdPrice: number, rate: number = DEFAULT_USD_TO_UZS_RATE): PriceInfo {
  const safeUsd = Math.max(0, usdPrice);
  const safeRate = rate > 0 ? rate : DEFAULT_USD_TO_UZS_RATE;
  const uzs = Math.round(safeUsd * safeRate);

  return {
    usd: safeUsd,
    uzs,
    formattedUsd: formatUSD(safeUsd),
    formattedUzs: formatUZS(uzs),
  };
}

/**
 * Format USD currency
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format Uzbek So'm (UZS)
 */
export function formatUZS(amount: number): string {
  const formatted = new Intl.NumberFormat('uz-UZ').format(amount).replace(/,/g, ' ');
  return `${formatted} so'm`;
}

/**
 * Calculate VIP / Volume discount for weddings and HoReCa orders
 */
export function calculateDiscount(totalUsd: number, category: string): { discountPercent: number; discountedUsd: number; savedUsd: number } {
  let discountPercent = 0;

  if (category === 'wedding' && totalUsd >= 1000) {
    discountPercent = 12; // 12% off for Grand Royal Wedding suites
  } else if (category === 'horeca' && totalUsd >= 2000) {
    discountPercent = 15; // 15% off for HoReCa commercial orders
  } else if (totalUsd >= 3000) {
    discountPercent = 10;
  } else if (totalUsd >= 1500) {
    discountPercent = 5;
  }

  const savedUsd = Math.round((totalUsd * discountPercent) / 100);
  const discountedUsd = totalUsd - savedUsd;

  return {
    discountPercent,
    discountedUsd,
    savedUsd,
  };
}
