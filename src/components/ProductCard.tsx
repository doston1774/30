import React, { useState } from 'react';
import { Product } from '../data/products';
import { calculateDualPrice } from '../utils/pricing';
import { evaluateQuality } from '../utils/quality';
import { Sparkles, Shield, Flame, Box, Eye, CheckCircle2, Award, Info, ChevronRight, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  primaryCurrency: 'UZS' | 'USD';
  onSelect: (p: Product) => void;
  onOpen3d: (modelKey: 'crystal_goblet' | 'porcelain_teapot' | 'royal_platter', title: string) => void;
  onBookShowroomVisit: (product: Product) => void;
}

export function ProductCard({
  product,
  primaryCurrency,
  onSelect,
  onOpen3d,
  onBookShowroomVisit,
}: ProductCardProps) {
  const [showWorkshopPreview, setShowWorkshopPreview] = useState(false);
  const dualPrice = calculateDualPrice(product.basePriceUsd);
  const quality = evaluateQuality({ ...product.indicators, materialType: product.materialType });

  return (
    <div className="group relative bg-[#13161f] rounded-2xl border border-amber-900/30 overflow-hidden flex flex-col hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/40 transition duration-300">
      {/* Top Media Container with Toggleable Workshop Background view */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0b0c10]">
        {/* Main Product Hero Image vs Workshop Background */}
        <img
          src={showWorkshopPreview ? product.workshop.imageUrl : product.heroImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161f] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-stone-950 shadow-md">
            {product.materialLabelUz.split('(')[0]}
          </span>
          {quality.overallScore >= 95 && (
            <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 flex items-center gap-1 shadow-md">
              <Award className="w-3 h-3 text-emerald-400" />
              24K Zarhal
            </span>
          )}
        </div>

        {/* 3D Interactive trigger button in image corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen3d(product.model3dKey, product.title);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-stone-900/80 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/40 shadow-lg backdrop-blur-md transition flex items-center gap-1 text-xs font-semibold"
          title="3D Interaktiv tomosha qilish"
          aria-label="3D koʻrish"
        >
          <Box className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">3D</span>
        </button>

        {/* Workshop view toggle pill */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowWorkshopPreview(!showWorkshopPreview);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition backdrop-blur-md border flex items-center gap-1.5 ${
              showWorkshopPreview
                ? 'bg-amber-600 text-white border-amber-400 shadow-lg'
                : 'bg-black/60 text-stone-200 border-white/20 hover:bg-black/80'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{showWorkshopPreview ? 'Ustaxona lavhasi faol' : 'Ustaxona jarayoni fonini koʻrish'}</span>
          </button>

          <span className="text-[11px] font-medium text-stone-300 bg-black/60 px-2 py-1 rounded-md border border-white/10">
            {product.piecesCount.split('(')[0]}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category subtitle */}
          <p className="text-[11px] uppercase tracking-wider text-amber-400/90 font-medium mb-1 font-cinzel">
            {product.categoryLabelUz}
          </p>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-base sm:text-lg font-bold text-stone-100 font-cinzel group-hover:text-amber-300 transition cursor-pointer mb-2 line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed font-light">
            {product.descriptionUz}
          </p>

          {/* DETAILED QUALITY INDICATORS BLOCK (Requirement #3) */}
          <div className="bg-[#0e1117] rounded-xl p-3 border border-amber-950/60 mb-4 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-[11px] border-b border-stone-800/80 pb-1.5">
              <span className="font-semibold text-stone-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Sifat Koʻrsatkichlari:
              </span>
              <span className="text-amber-300 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40 text-[10px]">
                {quality.overallScore} / 100 ({quality.tierNameUz})
              </span>
            </div>

            {/* 1. Material Purity & Durability */}
            <div>
              <div className="flex justify-between text-[11px] text-stone-300 mb-1">
                <span className="text-stone-400">Material & 24K Zarhal:</span>
                <span className="font-medium text-amber-200">{product.indicators.materialPurity}%</span>
              </div>
              <div className="w-full bg-stone-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-600 to-amber-300 h-1.5 rounded-full"
                  style={{ width: `${product.indicators.materialPurity}%` }}
                />
              </div>
              <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">
                {product.indicators.materialPurityLabel}
              </p>
            </div>

            {/* 2. Handcraft & Exclusivity */}
            <div>
              <div className="flex justify-between text-[11px] text-stone-300 mb-1">
                <span className="text-stone-400">Qoʻl mehnati & Eksklyuzivlik:</span>
                <span className="font-medium text-amber-200">{product.indicators.handcraftRate}%</span>
              </div>
              <div className="w-full bg-stone-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-600 to-amber-400 h-1.5 rounded-full"
                  style={{ width: `${product.indicators.handcraftRate}%` }}
                />
              </div>
              <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">
                {product.indicators.handcraftLabel}
              </p>
            </div>

            {/* 3. Thermal & Dishwasher Safety */}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800/50">
              <span className="text-stone-400">Harorat chidamliligi:</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                quality.isDishwasherSafe
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                  : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
              }`}>
                {quality.isDishwasherSafe ? 'Dishwasher Safe (240°C)' : 'Nozik Qoʻl Parvarishi'}
              </span>
            </div>

            {/* 4. Certificate of Authenticity */}
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400 pt-0.5">
              <Shield className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="line-clamp-1">{product.indicators.certificationLabel}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM PRICE & ACTION BLOCK (Requirement #4: Dual Currency Display) */}
        <div className="pt-3 border-t border-amber-950/60">
          <div className="mb-3">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
              Rasmiy Doʻkon Narxi:
            </span>

            {/* Prominent Dual Currency Display */}
            {primaryCurrency === 'UZS' ? (
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-amber-300 tracking-tight">
                  {dualPrice.formattedUzs}
                </span>
                <span className="text-xs font-medium text-stone-400">
                  yoki {dualPrice.formattedUsd} ($ USD)
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-amber-300 tracking-tight">
                  {dualPrice.formattedUsd}
                </span>
                <span className="text-xs font-medium text-stone-400">
                  yoki {dualPrice.formattedUzs}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#1a1e28] hover:bg-[#232837] text-stone-200 border border-stone-700/60 transition flex items-center justify-center gap-1"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Batafsil</span>
            </button>

            <button
              onClick={() => onBookShowroomVisit(product)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md transition flex items-center justify-center gap-1 font-cinzel"
            >
              <span>Band Qilish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
