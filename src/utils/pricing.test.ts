import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDualPrice, formatUZS, formatUSD, calculateDiscount, DEFAULT_USD_TO_UZS_RATE } from './pricing';
import { evaluateQuality } from './quality';

test('calculateDualPrice converts USD to UZS accurately with default rate', () => {
  const result = calculateDualPrice(100);
  assert.equal(result.usd, 100);
  assert.equal(result.uzs, 100 * DEFAULT_USD_TO_UZS_RATE);
  assert.equal(result.formattedUsd, '$100');
  assert.match(result.formattedUzs, /so'm/);
});

test('calculateDualPrice handles custom exchange rate and zero safely', () => {
  const result = calculateDualPrice(50, 13000);
  assert.equal(result.usd, 50);
  assert.equal(result.uzs, 650000);

  const zeroResult = calculateDualPrice(-10);
  assert.equal(zeroResult.usd, 0);
  assert.equal(zeroResult.uzs, 0);
});

test('calculateDiscount applies wedding and HoReCa tiered incentives', () => {
  const weddingDiscount = calculateDiscount(1200, 'wedding');
  assert.equal(weddingDiscount.discountPercent, 12);
  assert.equal(weddingDiscount.savedUsd, 144);
  assert.equal(weddingDiscount.discountedUsd, 1056);

  const horecaDiscount = calculateDiscount(2500, 'horeca');
  assert.equal(horecaDiscount.discountPercent, 15);
  assert.equal(horecaDiscount.savedUsd, 375);
  assert.equal(horecaDiscount.discountedUsd, 2125);
});

test('evaluateQuality scores bone china with 24k gold accurately', () => {
  const highQuality = evaluateQuality({
    materialPurity: 98,
    thermalResistance: 85,
    handcraftRate: 95,
    certificationScore: 98,
    materialType: 'bone_china',
  });

  assert.ok(highQuality.overallScore >= 94);
  assert.equal(highQuality.tierNameUz, 'Imperator Saroyi Eksklyuzivi');
  assert.equal(highQuality.goldCarat, 24);
  assert.equal(highQuality.isDishwasherSafe, false); // Gold leaf demands delicate care
});
