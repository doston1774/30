import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TablewareViewer } from './components/3d/TablewareViewer';
import { WorkshopVisualsSection } from './components/WorkshopVisualsSection';
import { ShowroomBookingSection } from './components/ShowroomBookingSection';
import { AiAppraiserModal } from './components/AiAppraiserModal';
import { Footer } from './components/Footer';
import { Box, Sparkles, X, ChevronRight, Star, ShieldCheck } from 'lucide-react';

export default function App() {
  // Dual currency preference (UZS or USD as primary, but both are always shown)
  const [primaryCurrency, setPrimaryCurrency] = useState<'UZS' | 'USD'>('UZS');

  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'quality_score'>('featured');

  // Modals & Active Selections
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [productForBooking, setProductForBooking] = useState<Product | null>(null);

  // 3D Viewer State
  const [is3dModalOpen, setIs3dModalOpen] = useState(false);
  const [active3dModelKey, setActive3dModelKey] = useState<'crystal_goblet' | 'porcelain_teapot' | 'royal_platter'>('crystal_goblet');
  const [active3dTitle, setActive3dTitle] = useState('Bohemia Olmos Qadahi');

  // AI Appraiser Modal State
  const [isAiAppraiserOpen, setIsAiAppraiserOpen] = useState(false);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Category match
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Material match
      if (selectedMaterial !== 'all' && prod.materialType !== selectedMaterial) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prod.title.toLowerCase().includes(q);
        const matchDesc = prod.descriptionUz.toLowerCase().includes(q);
        const matchMaterial = prod.materialLabelUz.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchMaterial) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.basePriceUsd - b.basePriceUsd;
      if (sortBy === 'price_desc') return b.basePriceUsd - a.basePriceUsd;
      if (sortBy === 'quality_score') return b.indicators.materialPurity - a.indicators.materialPurity;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedMaterial, searchQuery, sortBy]);

  // Open 3D viewer handler
  const handleOpen3d = (
    modelKey: 'crystal_goblet' | 'porcelain_teapot' | 'royal_platter',
    title: string
  ) => {
    setActive3dModelKey(modelKey);
    setActive3dTitle(title);
    setIs3dModalOpen(true);
  };

  // Scroll to booking section handler
  const handleScrollToBooking = (product?: Product) => {
    if (product) {
      setProductForBooking(product);
    }
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCollections = () => {
    const el = document.getElementById('collections-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* 1. Prestigious Navigation */}
      <Navbar
        primaryCurrency={primaryCurrency}
        setPrimaryCurrency={setPrimaryCurrency}
        onOpenAiAppraiser={() => setIsAiAppraiserOpen(true)}
        onOpen3dViewer={() => handleOpen3d('crystal_goblet', 'Bohemia Optik Billur Qadahi')}
        onScrollToBooking={() => handleScrollToBooking()}
        onScrollToCollections={handleScrollToCollections}
      />

      {/* 2. Hero Section */}
      <Hero
        onExploreCollections={handleScrollToCollections}
        onOpen3d={() => handleOpen3d('porcelain_teapot', 'Shohona Zarhal Choynak')}
        onOpenAi={() => setIsAiAppraiserOpen(true)}
      />

      {/* 3. Main Collections & Categorization Section */}
      <main id="collections-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Eksklyuziv Katalog & Saralash</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-stone-100 tracking-tight">
            Maqsad va Ehtiyojingizga Mos Toʻplamlar
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 font-light leading-relaxed">
            Har bir mahsulot narxi Oʻzbek soʻmida hamda AQSH dollarida koʻrsatilgan boʻlib, detallashgan sifat pasporti va ustaxona lavhalari bilan taqdim etiladi.
          </p>
        </div>

        {/* Categories, Search & Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredProducts.length}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                primaryCurrency={primaryCurrency}
                onSelect={(p) => setSelectedProductForModal(p)}
                onOpen3d={handleOpen3d}
                onBookShowroomVisit={(p) => handleScrollToBooking(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#12151e] rounded-2xl border border-stone-800 p-8 space-y-3">
            <p className="text-stone-300 text-sm">Ushbu mezonlar boʻyicha mahsulot topilmadi.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedMaterial('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl"
            >
              Filtrlarni Tozalash
            </button>
          </div>
        )}
      </main>

      {/* 4. Standalone 3D Interactive Tableware Feature Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-[#0d0f14] via-[#11141c] to-[#0d0f14] border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-2">
                <Box className="w-3.5 h-3.5 text-amber-400" />
                <span>Three.js Real-Time 3D Studio Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-stone-100">
                Idishlarni 3D Realistik Muhitda Aylantirib Koʻring
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
                24K oltin qoplama, platina va optik billurning yorugʻlik sinishi (RoomEnvironment PBR).
              </p>
            </div>

            {/* Model switcher tabs */}
            <div className="flex items-center gap-2 bg-[#161a24] p-1.5 rounded-xl border border-amber-800/40">
              <button
                onClick={() => {
                  setActive3dModelKey('crystal_goblet');
                  setActive3dTitle('Bohemia Optik Billur Qadahi');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  active3dModelKey === 'crystal_goblet'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Billur Qadah
              </button>
              <button
                onClick={() => {
                  setActive3dModelKey('porcelain_teapot');
                  setActive3dTitle('Shohona Zarhal Choynak');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  active3dModelKey === 'porcelain_teapot'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Zarhal Choynak
              </button>
              <button
                onClick={() => {
                  setActive3dModelKey('royal_platter');
                  setActive3dTitle('Imperator Dasturxon Lagani va Billur Qopqoq');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  active3dModelKey === 'royal_platter'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Qirollik Lagani
              </button>
            </div>
          </div>

          {/* Embedded Full-Featured 3D Tableware Viewer */}
          <TablewareViewer
            modelKey={active3dModelKey}
            productTitle={active3dTitle}
            fullScreen={false}
          />
        </div>
      </section>

      {/* 5. Production & Workshop Visuals Section (Gemini Omni Flash Video) */}
      <WorkshopVisualsSection />

      {/* 6. VIP Showroom Visit & Direct Purchase Section (Requirement #5) */}
      <ShowroomBookingSection
        products={PRODUCTS}
        selectedProductForBooking={productForBooking}
        onClearSelectedProduct={() => setProductForBooking(null)}
      />

      {/* 7. Footer */}
      <Footer />

      {/* 3D Fullscreen Modal */}
      {is3dModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0f1117] rounded-2xl border border-amber-600/40 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-3 bg-[#151822] border-b border-amber-900/40 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300 font-cinzel">
                3D Studio PBR: {active3dTitle}
              </span>
              <button
                onClick={() => setIs3dModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 relative">
              <TablewareViewer
                modelKey={active3dModelKey}
                productTitle={active3dTitle}
                onClose={() => setIs3dModalOpen(false)}
                fullScreen={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Passport Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        primaryCurrency={primaryCurrency}
        onClose={() => setSelectedProductForModal(null)}
        onOpen3d={handleOpen3d}
        onBookShowroomVisit={(p) => {
          setSelectedProductForModal(null);
          handleScrollToBooking(p);
        }}
      />

      {/* AI Image Appraiser & High Thinking Modal */}
      <AiAppraiserModal
        isOpen={isAiAppraiserOpen}
        onClose={() => setIsAiAppraiserOpen(false)}
      />
    </div>
  );
}
