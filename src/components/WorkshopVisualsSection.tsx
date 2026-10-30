import React, { useState } from 'react';
import { Flame, Sparkles, Video, Play, CheckCircle2, RefreshCw, Wand2, Compass } from 'lucide-react';

export function WorkshopVisualsSection() {
  const [activeTab, setActiveTab] = useState<'glassblowing' | 'kiln_firing' | 'gold_gilding' | 'diamond_cut'>('glassblowing');
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [videoStatusMsg, setVideoStatusMsg] = useState<string | null>(null);

  const craftScenes = {
    glassblowing: {
      title: 'Nozik Shisha Puflash Sanʼati (Venetian Glassblowing)',
      location: 'Murano Oroli, Venetsiya & Bogemiya',
      temperature: '1300°C Olovli Pech',
      description: 'Shisha ustasi temir trubka yordamida olovdan olingan qizil eritmaga oʻz nafasi orqali shakl beradi. Har bir qadah va vaza inson nafasi va mahoratining betakror mujassamidir.',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    kiln_firing: {
      title: 'Chinni Sirlash & 1420°C Oliy Pishirish',
      location: 'Limoges / Fransiya & Jingdezhen',
      temperature: '1420°C Olov Pechi',
      description: 'Sof kaolin loyi 3 bosqichli pishirishdan oʻtadi. 1420°C haroratda chinni kristallashib, shaffof, yupqa va yorugʻlikni oʻtkazuvchi imperator sifatiga erishadi.',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    gold_gilding: {
      title: '24K Sof Oltin Suvi Filigran Naqshi',
      location: 'Meissen & Sankt-Peterburg',
      temperature: '850°C da Ikkilamchi Fiksatsiya',
      description: 'Usta rassomlar 999 probali sof oltin kukunini mikron qalinlikdagi tuya juni moʻyqalam bilan likobcha va qadahlarga qoʻlda chizadilar. Soʻngra 850°C pechda oltin jilosi abadiylashtiriladi.',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
    diamond_cut: {
      title: 'Olmos Diskda Billur Fasetlarni Qirralash',
      location: 'Bogemiya Billur Vodiysi / Chexiya',
      temperature: 'Suv sovutishli 3200 ayl/daq disk',
      description: 'Har bir qirra (facet) yorugʻlik nurini kamalak ranglariga parchalash uchun optik burchak ostida qoʻlda yoʻniladi va olmos pastasi bilan oynaday tiniqlashtiriladi.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    },
  };

  const current = craftScenes[activeTab];

  const handleGenerateVideo = async () => {
    setGeneratingVideo(true);
    setVideoStatusMsg('Gemini Omni Flash (gemini-omni-1.1-flash) bilan ustaxona lavhasi generatsiya qilinmoqda...');
    try {
      const promptToSend = customPrompt || `${current.title} in an authentic master workshop with cinematic golden light and slow motion sparks`;
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend, aspectRatio: '16:9' }),
      });
      const data = await res.json();
      if (data.videoBase64) {
        setVideoResult(data.videoBase64);
        setVideoStatusMsg('Video muvaffaqiyatli tayyorlandi!');
      } else if (data.presetVideoUrl) {
        setVideoResult(data.presetVideoUrl);
        setVideoStatusMsg('Tayyor ustaxona lavhasi yuklandi (Demo rejim)');
      } else {
        setVideoStatusMsg(data.message || 'Video qabul qilindi');
      }
    } catch (err: any) {
      setVideoStatusMsg('Xatolik: ' + err.message);
    } finally {
      setGeneratingVideo(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-[#0c0e13] border-t border-b border-amber-900/30 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Mahsulot Ortidagi Ustaxona & Ishlab Chiqarish Sirlari</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-stone-100 tracking-tight">
            Olov, Nafas va 24K Zarhal Sanʼati
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 font-light leading-relaxed">
            Har bir buyumimiz shunchaki idish emas, balki asrlar davomida avloddan avlodga oʻtib kelayotgan haqiqiy ustalar mehnati va qimmatbaho sanʼat durdonasidir.
          </p>
        </div>

        {/* 4 Craft Scenes Switcher */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          <button
            onClick={() => setActiveTab('glassblowing')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              activeTab === 'glassblowing'
                ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-lg'
                : 'bg-[#12151e] border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold font-cinzel">1. Shisha Puflash</span>
            <span className="text-[10px] text-stone-500 mt-1">1300°C Murano & Bogemiya</span>
          </button>

          <button
            onClick={() => setActiveTab('kiln_firing')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              activeTab === 'kiln_firing'
                ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-lg'
                : 'bg-[#12151e] border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold font-cinzel">2. Sirlash & Pech</span>
            <span className="text-[10px] text-stone-500 mt-1">1420°C Kaolin Kristallanishi</span>
          </button>

          <button
            onClick={() => setActiveTab('gold_gilding')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              activeTab === 'gold_gilding'
                ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-lg'
                : 'bg-[#12151e] border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold font-cinzel">3. 24K Zarhal Filigran</span>
            <span className="text-[10px] text-stone-500 mt-1">999 Sof Oltin Suvi</span>
          </button>

          <button
            onClick={() => setActiveTab('diamond_cut')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
              activeTab === 'diamond_cut'
                ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-lg'
                : 'bg-[#12151e] border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <span className="text-xs font-bold font-cinzel">4. Olmos Faset Kesish</span>
            <span className="text-[10px] text-stone-500 mt-1">Optik Billur Kamalak Jilosi</span>
          </button>
        </div>

        {/* Featured Workshop Scene Hero */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 bg-[#12151e] grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
          {/* Visual Showcase (Image or Video) */}
          <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-black">
            {videoResult ? (
              <video
                src={videoResult}
                controls
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition duration-700 hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
                {current.temperature}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-black/70 text-stone-200 backdrop-blur-md border border-white/20">
                {current.location}
              </span>
            </div>
          </div>

          {/* Details & Interactive Video Generator */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-cinzel">
                Ustaxona Jarayoni
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-100 font-cinzel mt-1 mb-3">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="p-4 rounded-xl bg-[#171b26] border border-stone-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-stone-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Harorat nazorati va mikro-yoriqlarni rentgen tekshiruvi</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ustoz ustaning shaxsiy gravyura muhri va pasporti</span>
                </div>
              </div>
            </div>

            {/* Video Generation with gemini-omni-1.1-flash */}
            <div className="p-4 rounded-xl bg-[#191d28] border border-amber-700/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5 font-cinzel">
                  <Video className="w-4 h-4 text-amber-400" />
                  Video Lavha (Gemini Omni Flash)
                </span>
                <span className="text-[10px] text-stone-400">16:9 HD</span>
              </div>

              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Maxsus prompt: Masalan, 24K oltin naqsh solayotgan usta..."
                className="w-full bg-[#10131b] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/60"
              />

              <button
                onClick={handleGenerateVideo}
                disabled={generatingVideo}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 font-cinzel"
              >
                {generatingVideo ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Video yaratilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Ustaxona Videosini Generatsiya Qilish</span>
                  </>
                )}
              </button>

              {videoStatusMsg && (
                <p className="text-[11px] text-amber-300/90 text-center animate-fade-in">
                  {videoStatusMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
