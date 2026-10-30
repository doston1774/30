import React from 'react';
import { Product } from '../data/products';
import { calculateDualPrice } from '../utils/pricing';
import { evaluateQuality } from '../utils/quality';
import { X, Box, Sparkles, ShieldCheck, Flame, CheckCircle2, MapPin, Award, Phone } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  primaryCurrency: 'UZS' | 'USD';
  onClose: () => void;
  onOpen3d: (modelKey: 'crystal_goblet' | 'porcelain_teapot' | 'royal_platter', title: string) => void;
  onBookShowroomVisit: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  primaryCurrency,
  onClose,
  onOpen3d,
  onBookShowroomVisit,
}: ProductDetailModalProps) {
  if (!product) return null;

  const dualPrice = calculateDualPrice(product.basePriceUsd);
  const quality = evaluateQuality({ ...product.indicators, materialType: product.materialType });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#12151e] border border-amber-800/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-amber-950/80 bg-[#161a25] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest font-cinzel">
              Mahsulotning Toʻliq Pasporti & Sifat Bahosi
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/60 transition"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top 2-Column: Media & Quick Buy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual preview with 3D button */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/30 bg-black aspect-square">
              <img
                src={product.heroImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  onClose();
                  onOpen3d(product.model3dKey, product.title);
                }}
                className="absolute bottom-4 left-4 right-4 py-2.5 px-4 rounded-xl bg-[#141720]/90 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/40 shadow-xl backdrop-blur-md transition flex items-center justify-center gap-2 text-xs font-bold font-cinzel"
              >
                <Box className="w-4 h-4" />
                <span>Ushbu Buyumni 3D Studio PBR da Aylantirish</span>
              </button>
            </div>

            {/* Info and Dual Price */}
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-cinzel">
                  {product.categoryLabelUz}
                </span>
                <h2 className="text-2xl font-bold text-stone-100 font-cinzel mt-1">
                  {product.title}
                </h2>
                <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                  {product.subtitle}
                </p>
              </div>

              {/* DUAL CURRENCY DISPLAY */}
              <div className="p-4 rounded-xl bg-[#161a25] border border-amber-900/40">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                  Rasmiy Belgilangan Narx (Oʻzbek soʻmida va AQSH dollarida):
                </span>
                <div className="flex flex-col gap-0.5">
                  <div className="text-2xl font-black text-amber-300 tracking-tight">
                    {dualPrice.formattedUzs}
                  </div>
                  <div className="text-sm font-semibold text-stone-300">
                    va {dualPrice.formattedUsd} ($ USD)
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                  <span>Holati: <strong className="text-emerald-400">{product.stockStatus}</strong></span>
                  <span>Boʻlaklar: <strong>{product.piecesCount}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookShowroomVisit(product);
                  }}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 shadow-lg shadow-amber-950/40 hover:brightness-110 transition font-cinzel"
                >
                  Shourumga Tashrif Buyurib Xarid Qilish
                </button>

                <a
                  href="tel:+998712008844"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#1a1e29] hover:bg-[#232938] text-amber-300 border border-amber-900/40 flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>VIP Menejerga Qoʻngʻiroq Qilish (+998 71 200 88 44)</span>
                </a>
              </div>
            </div>
          </div>

          {/* DETAILED QUALITY INDICATORS & CIRCULAR PROGRESS / BARS */}
          <div className="p-5 rounded-2xl bg-[#161a25] border border-amber-800/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider font-cinzel flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Sifat va Xususiyatlarning Detallashgan Baholash Tizimi
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                Indeks: {quality.overallScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {/* Metric 1 */}
              <div className="p-3 rounded-xl bg-[#0e1118] border border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Material Sofligi & Zichligi</span>
                <div className="text-xl font-bold text-amber-300 mb-1">{product.indicators.materialPurity}%</div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${product.indicators.materialPurity}%` }} />
                </div>
                <p className="text-[10px] text-stone-400">{product.indicators.materialPurityLabel}</p>
              </div>

              {/* Metric 2 */}
              <div className="p-3 rounded-xl bg-[#0e1118] border border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Qoʻl Mehnati & Eksklyuzivlik</span>
                <div className="text-xl font-bold text-amber-300 mb-1">{product.indicators.handcraftRate}%</div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${product.indicators.handcraftRate}%` }} />
                </div>
                <p className="text-[10px] text-stone-400">{product.indicators.handcraftLabel}</p>
              </div>

              {/* Metric 3 */}
              <div className="p-3 rounded-xl bg-[#0e1118] border border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Harorat & Idish Mashinasi</span>
                <div className="text-xl font-bold text-amber-300 mb-1">{product.indicators.thermalResistance}%</div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${product.indicators.thermalResistance}%` }} />
                </div>
                <p className="text-[10px] text-stone-400">{product.indicators.thermalResistanceLabel}</p>
              </div>

              {/* Metric 4 */}
              <div className="p-3 rounded-xl bg-[#0e1118] border border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Haqiqiylik Sertifikati</span>
                <div className="text-xl font-bold text-emerald-400 mb-1">{product.indicators.certificationScore}%</div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${product.indicators.certificationScore}%` }} />
                </div>
                <p className="text-[10px] text-stone-400">{product.indicators.certificationLabel}</p>
              </div>
            </div>
          </div>

          {/* WORKSHOP & CRAFTSMANSHIP PRODUCTION STORY */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1a1c24] to-[#12151e] border border-amber-900/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame className="w-4 h-4" />
              <h3 className="text-xs uppercase tracking-widest font-bold font-cinzel">
                Ishlab Chiqarish Jarayoni va Ustaxona Tarixi
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 space-y-2">
                <h4 className="text-base font-bold text-stone-100 font-cinzel">
                  {product.workshop.title}
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {product.workshop.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-amber-950/80 text-amber-300 border border-amber-800/40">
                    Bosqich: {product.workshop.processStep}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-stone-900 text-stone-300 border border-stone-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {product.workshop.location}
                  </span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-amber-800/30 aspect-video md:aspect-auto h-36">
                <img
                  src={product.workshop.imageUrl}
                  alt={product.workshop.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* SPECIFICATIONS TABLE */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-stone-300 font-cinzel mb-3">
              Texnik Xususiyatlar & Tarkibi
            </h3>
            <div className="divide-y divide-stone-800/60 border border-stone-800/60 rounded-xl overflow-hidden text-xs">
              {product.specifications.map((spec, i) => (
                <div key={i} className="grid grid-cols-3 p-3 bg-[#11141c]">
                  <span className="text-stone-400 font-medium">{spec.label}</span>
                  <span className="col-span-2 text-stone-200">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
