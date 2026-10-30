/**
 * Quality Assessment System for Fine Porcelain & Crystal Tableware
 */

export interface QualityIndicators {
  materialPurity: number; // 0-100% (e.g., 24K Gold plating, optical clarity, bone ash content > 48%)
  thermalResistance: number; // 0-100% (Thermal shock resistance up to 240°C, microwave/dishwasher compatibility)
  handcraftRate: number; // 0-100% (Hand-painted filigree, mouth-blown crystal, hand-engraving)
  certificationScore: number; // 0-100% (Imperial mark, Master artisan signature, ISO/Limoges/Bohemia certificate)
  materialType: 'porcelain' | 'crystal' | 'murano_glass' | 'bone_china';
}

export interface QualitySummary {
  overallScore: number; // 0-100
  tierNameUz: string; // e.g. "Imperator Saroyi Eksklyuzivi", "Oliy Kolleksiya", "Premium Standart"
  tierBadgeColor: string;
  isDishwasherSafe: boolean;
  maxTemperatureCelsius: number;
  goldCarat?: number;
}

/**
 * Calculates overall weighted quality index
 */
export function evaluateQuality(indicators: QualityIndicators): QualitySummary {
  // Weights: Material 35%, Handcraft 30%, Certification 20%, Thermal 15%
  const weighted =
    indicators.materialPurity * 0.35 +
    indicators.handcraftRate * 0.30 +
    indicators.certificationScore * 0.20 +
    indicators.thermalResistance * 0.15;

  const overallScore = Math.round(Math.min(100, Math.max(0, weighted)));

  let tierNameUz = 'Yuqori Sifatli Mahsulot';
  let tierBadgeColor = 'amber';

  if (overallScore >= 94) {
    tierNameUz = 'Imperator Saroyi Eksklyuzivi';
    tierBadgeColor = 'emerald';
  } else if (overallScore >= 85) {
    tierNameUz = 'Oliy Kolleksion Marvarid';
    tierBadgeColor = 'gold';
  } else if (overallScore >= 75) {
    tierNameUz = 'Premium Litsenziyali Chinni';
    tierBadgeColor = 'blue';
  }

  // Dishwasher safety rule: Genuine 24K gold foil or delicate mouth-blown crystal require hand-wash
  const isDishwasherSafe = indicators.handcraftRate < 90 && indicators.materialPurity < 96;
  const maxTemperatureCelsius = indicators.thermalResistance > 70 ? 220 : 120;

  return {
    overallScore,
    tierNameUz,
    tierBadgeColor,
    isDishwasherSafe,
    maxTemperatureCelsius,
    goldCarat: indicators.materialPurity >= 95 ? 24 : indicators.materialPurity >= 80 ? 18 : undefined,
  };
}
