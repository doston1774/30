import React from 'react';
import { Sparkles, Box, ShieldCheck, Flame, Compass, ChevronRight, Gem } from 'lucide-react';

interface HeroProps {
  onExploreCollections: () => void;
  onOpen3d: () => void;
  onOpenAi: () => void;
}

export function Hero({ onExploreCollections, onOpen3d, onOpenAi }: HeroProps) {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#0d0f14] text-white py-16 px-4 sm:px-8">
      {/* Background ambient lighting and high-res workshop imagery */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1920&auto=format&fit=crop"
          alt="1420C Porcelain & Glass Workshop"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/80 to-[#0d0f14]/90" />
      </div>

      {/* Subtle gold radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Prestige badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Qirollik Standartidagi Chinni va Optik Billur</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-100 font-cinzel leading-tight mb-6">
          Nafis Chinni & Nozik Shisha <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
            Qimmatbaho Sanʼat Uyi
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-stone-300 font-sans font-light leading-relaxed mb-8">
          Haddan tashqari hashamatli toʻylar, sarpo, kundalik oilaviy lazzatlanish hamda Michelin darajasidagi HoReCa restoranlari uchun 24K zarhal suvi yuritilgan chinni va Chexiya fasetli billur toʻplamlari.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onExploreCollections}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 font-bold text-sm tracking-wider uppercase font-cinzel shadow-xl shadow-amber-950/50 hover:brightness-110 transition transform hover:-translate-y-0.5"
          >
            Toʻplamlarni Koʻrish
          </button>

          <button
            onClick={onOpen3d}
            className="px-5 py-3.5 rounded-xl bg-[#161a22] hover:bg-[#1f2532] text-amber-300 border border-amber-500/40 font-semibold text-sm tracking-wide transition flex items-center gap-2 shadow-lg"
          >
            <Box className="w-4 h-4 text-amber-400" />
            <span>3D Interaktiv Modellar</span>
          </button>

          <button
            onClick={onOpenAi}
            className="px-5 py-3.5 rounded-xl bg-[#161a22] hover:bg-[#1f2532] text-stone-200 border border-stone-700 font-medium text-sm transition flex items-center gap-2"
          >
            <Gem className="w-4 h-4 text-amber-400" />
            <span>AI Idish Ekspertizasi</span>
          </button>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-[#13161e]/90 border border-amber-900/30">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Gem className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
              Shohona Toʻylar
            </h4>
            <p className="text-[11px] text-stone-400 leading-snug">
              68-120 boʻlakli 24K zarhalli sarpo toʻplamlari
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#13161e]/90 border border-amber-900/30">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
              Kundalik Premium
            </h4>
            <p className="text-[11px] text-stone-400 leading-snug">
              Tirnalishga chidamli oilaviy dasturxon nafisligi
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#13161e]/90 border border-amber-900/30">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
              HoReCa Eksklyuziv
            </h4>
            <p className="text-[11px] text-stone-400 leading-snug">
              Michelin restoranlar uchun mustahkamlangan chinni
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#13161e]/90 border border-amber-900/30">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-amber-200 font-cinzel uppercase tracking-wider mb-1">
              Nafis Sovgʻalar
            </h4>
            <p className="text-[11px] text-stone-400 leading-snug">
              Venetsiya Murano & Bohemiya unikal buyumlari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
