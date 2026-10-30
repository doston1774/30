import React, { useState } from 'react';
import { Camera, Upload, Sparkles, X, Gem, CheckCircle2, AlertCircle, RefreshCw, Send, BookOpen } from 'lucide-react';

interface AiAppraiserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiAppraiserModal({ isOpen, onClose }: AiAppraiserModalProps) {
  const [activeTab, setActiveTab] = useState<'appraise' | 'consult'>('appraise');

  // Photo Analysis State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // High Thinking Consultation State
  const [consultQuestion, setConsultQuestion] = useState('');
  const [consulting, setConsulting] = useState(false);
  const [consultAnswer, setConsultAnswer] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Iltimos, faqat rasm faylini yuklang (JPEG, PNG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setAnalysisResult(null);
      setAnalysisError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSampleImage = (type: 'vintage_teapot' | 'crystal_glass') => {
    const sampleTeapot = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop';
    const sampleGoblet = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop';
    setImagePreview(type === 'vintage_teapot' ? sampleTeapot : sampleGoblet);
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const runAnalysis = async () => {
    if (!imagePreview) {
      alert('Iltimos, avval fotosuratni yuklang yoki namunalardan birini tanlang');
      return;
    }

    setAnalyzing(true);
    setAnalysisError(null);

    try {
      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: 'image/jpeg',
          userPrompt: userPrompt.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisError(data.error || 'Tahlil qilishda xatolik yuz berdi');
      }
    } catch (err: any) {
      setAnalysisError('Server bilan aloqa uzildi: ' + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const runConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultQuestion.trim()) return;

    setConsulting(true);
    try {
      const res = await fetch('/api/expert-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: consultQuestion,
          contextCategory: 'Toʻy, marosim va shaxsiy kolleksiya etiketi',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConsultAnswer(data.answer);
      } else {
        alert(data.error || 'Xatolik yuz berdi');
      }
    } catch (err: any) {
      alert('Xatolik: ' + err.message);
    } finally {
      setConsulting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#12151e] border border-amber-700/50 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-amber-950/80 bg-[#161a25] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 font-cinzel">
                Gemini AI Idish-Tovoq Ekspertizasi (gemini-4-argon)
              </h3>
              <p className="text-[11px] text-amber-400 font-medium">
                High Thinking rejimida material, muhr, davr va narxni aniqlash
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/60 transition"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 bg-[#0e1118] px-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('appraise')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'appraise'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Rasm Yuklash & Ekspertiza</span>
          </button>
          <button
            onClick={() => setActiveTab('consult')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'consult'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dasturxon Etiketi & Konsultatsiya</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'appraise' ? (
            <div className="space-y-6">
              {/* Image Input Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider font-cinzel">
                    Idishingiz yoki Qadahingiz Suratini Yuklang:
                  </label>
                  <div className="flex gap-2 text-[11px]">
                    <span className="text-stone-500">yoki namunani tanlang:</span>
                    <button
                      type="button"
                      onClick={() => handleSampleImage('vintage_teapot')}
                      className="text-amber-400 hover:underline"
                    >
                      Shohona Choynak
                    </button>
                    <span className="text-stone-600">|</span>
                    <button
                      type="button"
                      onClick={() => handleSampleImage('crystal_glass')}
                      className="text-amber-400 hover:underline"
                    >
                      Billur Qadah
                    </button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-stone-700 hover:border-amber-500/60 rounded-2xl p-6 bg-[#0e1119] text-center transition cursor-pointer relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-56 rounded-xl object-contain border border-amber-900/40 shadow-lg mb-2"
                      />
                      <p className="text-xs text-amber-300 font-medium">
                        Surat muvaffaqiyatli tanlandi. Boshqa rasm yuklash uchun bosing.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-stone-200 font-medium">
                        Rasmni bu yerga tashlang yoki faylni tanlash uchun bosing
                      </p>
                      <p className="text-[11px] text-stone-500">
                        PNG, JPG, WEBP (Qimmatbaho idish, choynak, vaza, qadah yoki taglik muhri)
                      </p>
                    </div>
                  )}
                </div>

                {/* Optional Note */}
                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Qoʻshimcha savolingiz (Masalan: Bu haqiqiy Meissenmi yoki Chexiya billurimi? Narxi qancha?)"
                  className="w-full bg-[#0e1119] border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />

                <button
                  type="button"
                  onClick={runAnalysis}
                  disabled={!imagePreview || analyzing}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 shadow-xl shadow-amber-950/40 hover:brightness-110 transition flex items-center justify-center gap-2 font-cinzel disabled:opacity-50"
                >
                  {analyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Gemini-4-Argon (High Thinking) tahlil qilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Fotosuratni Chuqur Ekspertizadan Oʻtkazish</span>
                    </>
                  )}
                </button>
              </div>

              {analysisError && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{analysisError}</span>
                </div>
              )}

              {/* Analysis Results Display */}
              {analysisResult && (
                <div className="p-5 rounded-2xl bg-[#161a25] border border-amber-700/50 space-y-4 animate-fade-in text-xs">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-200 font-cinzel flex items-center gap-1.5">
                      <Gem className="w-4 h-4 text-amber-400" />
                      Ekspert Xulosasi & Baholash Natijasi
                    </h4>
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px]">
                      Shaffoflik: {analysisResult.translucencyScore || 96}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-[#0e1119] border border-stone-800/80">
                      <span className="text-[10px] uppercase text-stone-400 block mb-0.5">Aniqlangan Material:</span>
                      <strong className="text-stone-100 text-xs">{analysisResult.materialType}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0e1119] border border-stone-800/80">
                      <span className="text-[10px] uppercase text-stone-400 block mb-0.5">Ishlanish Uslubi:</span>
                      <strong className="text-stone-100 text-xs">{analysisResult.craftStyle}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0e1119] border border-stone-800/80">
                      <span className="text-[10px] uppercase text-stone-400 block mb-0.5">Muhr / Shtamp Holati:</span>
                      <strong className="text-stone-100 text-xs">{analysisResult.hallmarkInspection}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0e1119] border border-stone-800/80">
                      <span className="text-[10px] uppercase text-stone-400 block mb-0.5">Taxminiy Bozor Bahosi:</span>
                      <strong className="text-amber-300 text-xs">
                        {analysisResult.estimatedValueUzs} ({analysisResult.estimatedValueUsd})
                      </strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1119] border border-stone-800/80">
                    <span className="text-[10px] uppercase text-stone-400 block mb-1">Ekspertning Xulosasi:</span>
                    <p className="text-stone-200 leading-relaxed font-light">{analysisResult.expertVerdict}</p>
                  </div>

                  {analysisResult.careRecommendations && (
                    <div className="p-3 rounded-xl bg-[#0e1119] border border-stone-800/80 space-y-1">
                      <span className="text-[10px] uppercase text-stone-400 block mb-1">Parvarish Qoidalari:</span>
                      {analysisResult.careRecommendations.map((rec: string, i: number) => (
                        <p key={i} className="text-stone-300 flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* High Thinking Consultation View */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#141721] border border-amber-900/40 text-xs text-stone-300 space-y-1">
                <p className="font-semibold text-amber-300">
                  Dasturxon Etiketi va Sarpo Konsulʼtanti (ThinkingLevel: HIGH):
                </p>
                <p className="font-light">
                  Toʻy marosimlarida qadahlarni toʻgʻri joylashtirish, 68 boʻlakli toʻplamning qaysi taomga moʻljallangani, 24K zarhal chinni bilan kumush anjomlar uygʻunligi kabi har qanday savolingizga chuqur tahliliy javob oling.
                </p>
              </div>

              <form onSubmit={runConsultation} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  value={consultQuestion}
                  onChange={(e) => setConsultQuestion(e.target.value)}
                  placeholder="Savolingizni yozing: Masalan: Toʻy sarposi uchun suyak chinnisi bilan qaysi turdagi billur qadahlar mos keladi?..."
                  className="w-full bg-[#0e1119] border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                />

                <button
                  type="submit"
                  disabled={consulting}
                  className="w-full py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md transition flex items-center justify-center gap-2 font-cinzel disabled:opacity-50"
                >
                  {consulting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Ekspert fikrlamoqda (ThinkingLevel.HIGH)...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Maslahat Olish</span>
                    </>
                  )}
                </button>
              </form>

              {consultAnswer && (
                <div className="p-5 rounded-2xl bg-[#161a25] border border-amber-700/50 space-y-2 animate-fade-in text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold font-cinzel block">
                    Bosh Ekspertning Tavsiyasi:
                  </span>
                  <div className="text-stone-200 whitespace-pre-line leading-relaxed font-light">
                    {consultAnswer}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
