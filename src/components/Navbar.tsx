import React from 'react';
import { Sparkles, Phone, ShieldCheck, Box, Camera, MapPin, Compass } from 'lucide-react';

interface NavbarProps {
  primaryCurrency: 'UZS' | 'USD';
  setPrimaryCurrency: (c: 'UZS' | 'USD') => void;
  onOpenAiAppraiser: () => void;
  onOpen3dViewer: () => void;
  onScrollToBooking: () => void;
  onScrollToCollections: () => void;
}

export function Navbar({
  primaryCurrency,
  setPrimaryCurrency,
  onOpenAiAppraiser,
  onOpen3dViewer,
  onScrollToBooking,
  onScrollToCollections,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0d0f14]/95 backdrop-blur-md border-b border-amber-900/30">
      {/* Top micro bar for VIP phone and address */}
      <div className="bg-[#141720] border-b border-amber-950/40 text-[11px] text-stone-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Asl Bohemia & Limoges Halqaro Sertifikati
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Toshkent, Amir Temur shohi, "Zarhal & Billur" Saroyi
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+998712008844"
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              +998 71 200 88 44
            </a>
            <span className="text-stone-500">|</span>
            <div className="flex items-center gap-1 bg-[#1a1f2c] px-2 py-0.5 rounded-md border border-amber-800/30">
              <span className="text-[10px] text-stone-400 uppercase">Asosiy valyuta:</span>
              <button
                onClick={() => setPrimaryCurrency('UZS')}
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold transition ${
                  primaryCurrency === 'UZS' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                UZS
              </button>
              <button
                onClick={() => setPrimaryCurrency('USD')}
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold transition ${
                  primaryCurrency === 'USD' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onScrollToCollections}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-lg shadow-amber-950/40 flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f14] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold tracking-widest text-amber-100 font-cinzel leading-none">
              ZARHAL & BILLUR
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-amber-500/90 font-medium">
              Chinni va Shisha Sanʼati Uyi
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-stone-300">
          <button
            onClick={onScrollToCollections}
            className="hover:text-amber-300 transition py-1"
          >
            Kolleksiyalar
          </button>
          <button
            onClick={onOpen3dViewer}
            className="hover:text-amber-300 transition py-1 flex items-center gap-1.5 text-amber-400"
          >
            <Box className="w-3.5 h-3.5" />
            3D Interaktiv
          </button>
          <button
            onClick={onOpenAiAppraiser}
            className="hover:text-amber-300 transition py-1 flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent font-bold"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            AI Ekspertiza
          </button>
          <button
            onClick={onScrollToBooking}
            className="hover:text-amber-300 transition py-1"
          >
            Shourumga Tashrif
          </button>
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAiAppraiser}
            className="sm:hidden px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs flex items-center gap-1"
            aria-label="AI Ekspertiza"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onScrollToBooking}
            className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 hover:brightness-110 shadow-lg shadow-amber-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0 font-cinzel"
          >
            Tashrif Buyurish
          </button>
        </div>
      </div>
    </header>
  );
}
