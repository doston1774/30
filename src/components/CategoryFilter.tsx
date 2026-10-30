import React from 'react';
import { CATEGORIES } from '../data/products';
import { Sparkles, Search, SlidersHorizontal, Gem, ShieldCheck, Flame } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (mat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'quality_score';
  setSortBy: (sort: 'featured' | 'price_asc' | 'price_desc' | 'quality_score') => void;
  totalCount: number;
}

export function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  totalCount,
}: CategoryFilterProps) {
  const materials = [
    { id: 'all', label: 'Barcha Materiallar' },
    { id: 'bone_china', label: 'Suyak Chinnisi (Bone China)' },
    { id: 'crystal', label: 'Chexiya Optik Billuri' },
    { id: 'murano_glass', label: 'Murano Sanʼat Shishasi' },
    { id: 'porcelain', label: 'Mustahkamlangan Chinni' },
  ];

  return (
    <div className="w-full space-y-4 mb-8">
      {/* 4 Main Requested Categories Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#12151e] rounded-2xl border border-amber-900/30">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition text-center flex flex-col items-center justify-center gap-1 font-cinzel ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/90 via-amber-400 to-yellow-500 text-stone-950 shadow-lg shadow-amber-950/40'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active category explanation banner */}
      <div className="px-4 py-2 rounded-xl bg-[#141721] border border-amber-950/60 text-xs text-stone-300 flex items-center justify-between">
        <p className="line-clamp-1">
          <span className="text-amber-400 font-semibold">Tavsif: </span>
          {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
        </p>
        <span className="shrink-0 text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40 text-[11px]">
          {totalCount} ta toʻplam topildi
        </span>
      </div>

      {/* Secondary Controls: Search, Material Filter, and Sorting */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nomi, materiali yoki qadah boʻyicha qidiruv..."
            className="w-full bg-[#11141c] border border-stone-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/60 transition"
          />
        </div>

        {/* Material Selector */}
        <div>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="w-full bg-[#11141c] border border-stone-800 rounded-xl py-2.5 px-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500/60 transition"
          >
            {materials.map((m) => (
              <option key={m.id} value={m.id} className="bg-stone-900 text-stone-200">
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-[#11141c] border border-stone-800 rounded-xl py-2.5 px-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500/60 transition"
          >
            <option value="featured" className="bg-stone-900 text-stone-200">
              Saralash: Tavsiya etilgan
            </option>
            <option value="quality_score" className="bg-stone-900 text-stone-200">
              Saralash: Eng yuqori sifat reytingi (24K)
            </option>
            <option value="price_asc" className="bg-stone-900 text-stone-200">
              Saralash: Narx (arzondan qimmatga)
            </option>
            <option value="price_desc" className="bg-stone-900 text-stone-200">
              Saralash: Narx (qimmatdan arzonga)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
