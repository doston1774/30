import express from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// The dev server must always run on port 3000 as required by AI Studio runtime environment
const PORT = 3000;

// Allow large base64 image uploads for porcelain/glass inspection
app.use(express.json({ limit: '25mb' }));

// Server-side Gemini client initialization with mandatory User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory store for VIP Showroom visits and customer reviews
interface Booking {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  selectedProductId?: string;
  selectedProductTitle?: string;
  notes?: string;
  createdAt: string;
  status: 'Tasdiqlandi' | 'Kutilmoqda';
}

interface Review {
  id: string;
  authorName: string;
  rating: number;
  productName: string;
  commentUz: string;
  date: string;
  verifiedBuyer: boolean;
  location: string;
}

const bookings: Booking[] = [
  {
    id: 'VIP-7821',
    name: 'Alisher Qodirov',
    phone: '+998 90 123 45 67',
    preferredDate: '2026-11-02',
    preferredTime: '15:00',
    selectedProductTitle: 'Imperator Zarhal Servisi (68 boʻlak)',
    notes: 'Toʻy sarposi uchun shaxsan kelib koʻrmoqchiman',
    createdAt: new Date().toISOString(),
    status: 'Tasdiqlandi',
  },
];

const reviews: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Gulnora Karimova',
    rating: 5,
    productName: 'Imperator Zarhal Servisi (68 boʻlak)',
    commentUz: 'Qizimning toʻyiga sarpo uchun oldik. 24K oltin naqshlari va suyak chinnisi nurni shunday mayin oʻtkazadiki, mehmonlarimiz lol qoldi! Shourumdagi VIP xizmat va chiroyli sovgʻa qutisi uchun alohida tashakkur.',
    date: '2026-10-18',
    verifiedBuyer: true,
    location: 'Toshkent shahri',
  },
  {
    id: 'rev-2',
    authorName: 'Bobur Mirzayev',
    rating: 5,
    productName: 'Bohemia Olmos Qadahlari Toʻplami',
    commentUz: 'Chexiya billurining ovozi boshqacha — qadah koʻtarilgandagi jarang 7-8 soniya toza yangraydi. Quyosh nuri tushganda haqiqiy kamalak jilosini koʻrsatadi. 100% original sertifikati bilan berildi.',
    date: '2026-10-24',
    verifiedBuyer: true,
    location: 'Samarqand',
  },
  {
    id: 'rev-3',
    authorName: 'Farrux Zokirov (Chef & HoReCa Director)',
    rating: 5,
    productName: 'Michelin HoReCa Pro Chinni Toʻplami',
    commentUz: 'Restoranimiz uchun 120 dona toʻplam buyurtma qilgan edik. Sanoat mashinasida yuvilganda ham sirlari bir zarracha xiralashmadi, qirralari uvoqlanmadi. Yuqori darajadagi xalqaro sifat.',
    date: '2026-10-27',
    verifiedBuyer: true,
    location: 'Toshkent shahri',
  },
];

// --- 1. POST /api/analyze-image (Analyze Images using gemini-4-argon with ThinkingLevel.HIGH) ---
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Rasm maʼlumotlari yuklanmadi' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Return high-fidelity expert mock evaluation if API key is pending
      return res.json({
        success: true,
        isDemo: true,
        analysis: {
          materialType: 'Oliy Darajali Suyak Chinnisi (Fine Bone China) & 24K Oltin Qoplama',
          craftStyle: 'Yevropa Imperator saroyi anʼanasi (Limoges / Meissen uslubi)',
          hallmarkInspection: 'Taglik qismida koʻk kobaltli usta muhri va seriya raqami aniqlandi',
          translucencyScore: 96,
          estimatedEra: 'XX asr oxiri / Zamonaviy eksklyuziv cheklangan kolleksiya',
          overallCondition: 'Aʼlo darajada (MINT condition, sirlarda tirnalish yoki darz yoʻq)',
          estimatedValueUzs: '18 500 000 – 26 000 000 soʻm',
          estimatedValueUsd: '$1,440 – $2,020',
          careRecommendations: [
            '24 karatli oltin qoplamasini saqlash uchun qattiq choʻtka va abraziv vositalardan saqlaning',
            'Faqat iliq suvda yumshoq paxta mato yoki mikrofilba bilan artib quriting',
            'Idish yuvish mashinasining kuchli kimyoviy tabletkalaridan asrang',
          ],
          expertVerdict: 'Ushbu buyum yuqori sifatli kaolin va suyak kuli aralashmasidan nozik qilib ishlangan haqiqiy qimmatbaho kolleksion chinni namunasidir.',
        },
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

    const systemInstruction = `Siz chinnidan, billurdan va optik shishadan yasalgan antikvar va zamonaviy qimmatbaho idish-tovoqlar bo'yicha bosh ekspert va baholovchisiz.
Foydalanuvchi taqdim etgan rasmga qarab buyumni professional tahlil qiling:
1. Material turi (Suyak chinnisi, qattiq chinni, Chexiya optik billuri, Murano shishasi va h.k.)
2. Ishlanish uslubi va naqshlari (Zarhal, kobalt, gravyura, faset)
3. Shtamp/muhr yoki usta belgilari bor-yo'qligi
4. Taxminiy narxi (so'mda va USD da)
5. Sifat va parvarish bo'yicha tavsiyalar.

Javobni aniq va o'zbek tilida berilgan JSON formatida qaytaring:
{
  "materialType": "...",
  "craftStyle": "...",
  "hallmarkInspection": "...",
  "translucencyScore": 95,
  "estimatedEra": "...",
  "overallCondition": "...",
  "estimatedValueUzs": "...",
  "estimatedValueUsd": "...",
  "careRecommendations": ["...", "..."],
  "expertVerdict": "..."
}`;

    const promptText = userPrompt
      ? `Foydalanuvchi savoli: "${userPrompt}". Iltimos, ushbu idishning fotosuratini chuqur tekshiring va baholang.`
      : `Ushbu chinni yoki shisha buyumning materialini, naqsh sifatini va eksklyuzivligini to'liq tahlil qilib bering.`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error('Image analysis error:', error);
    return res.status(500).json({
      error: 'Rasm tahlilida xatolik yuz berdi: ' + (error?.message || 'Nomaʼlum xato'),
    });
  }
});

// --- 2. POST /api/expert-consult (Connoisseur & Banquet Styling Advisor using gemini-4-argon with ThinkingLevel.HIGH) ---
app.post('/api/expert-consult', async (req, res) => {
  try {
    const { question, contextCategory, currentProduct } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Savol kiritilmadi' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        isDemo: true,
        answer: `Shohona toʻylar va yuqori darajadagi marosimlar uchun 24K oltin bilan qoplangan suyak chinnisi (Fine Bone China) va Chexiya optik billuri eng mukammal tandem hisoblanadi. 

Dasturxon bezatish protokoli:
1. Har bir mehmon oldiga avval taglik lagan (charger plate), uning ustiga asosiy taom likobchasi va shoʻrva kosasi qoʻyiladi.
2. Oʻng tomonda qadahlar: suv uchun billur tumbler, oq sharob va qizil sharob uchun baland oyoqli fasetli Bohemia qadahlari.
3. Markazda esa 24K zarhal detallari boʻlgan vaza yoki shisha meva idishi dasturxonga qirollik ruhini bagʻishlaydi.

Zarhal & Billur butigimizda barcha toʻplamlar maxsus sertifikat va kafolat bilan taqdim etiladi.`,
      });
    }

    const systemInstruction = `Siz "Zarhal & Billur" hashamatli idish-tovoqlar uyi bosh konsul'tanti va dasturxon etiket bo'yicha xalqaro darajadagi ekspertsiz.
Siz o'zbek tilida nihoyatda xushmuomala, oliy tabaqaga xos madaniyat bilan, aniq faktlar va tavsiyalar bilan javob berasiz.
Mavzular: Chinni va billur xususiyatlari, to'y va sarpo tanlovi, HoReCa restoranlari uchun idishlar, 24K oltin va billurni asrash qoidalari.`;

    const userMessage = `Kategoriya: ${contextCategory || 'Umumiy'}. Mahsulot: ${currentProduct || 'Mavjud toʻplamlar'}.
Xaridor savoli: "${question}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: userMessage,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error('Expert consult error:', error);
    return res.status(500).json({ error: error?.message || 'Maslahat berishda xatolik' });
  }
});

// --- 3. POST /api/generate-video (Generate Video using gemini-omni-1.1-flash via Interactions API) ---
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, aspectRatio = '16:9' } = req.body;

    const craftPrompt = prompt || 'Artisanal glassblower shaping a glowing optical crystal goblet in a Venetian glassmaking workshop furnace with dancing fire sparks, cinematic 4k lighting';

    if (!process.env.GEMINI_API_KEY) {
      // Demo response
      return res.json({
        success: true,
        isDemo: true,
        message: 'Video generatsiyasi uchun tayyor ustaxona lavhasi faollashtirildi',
        presetVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      });
    }

    // Call Interactions API with gemini-omni-1.1-flash
    const interaction = await ai.interactions.create(
      {
        model: 'gemini-omni-1.1-flash',
        input: craftPrompt,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: aspectRatio === '9:16' ? '9:16' : '16:9',
          duration: '5s',
          resolution: '720p',
        },
      },
      { timeout: 300000 },
    );

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      return res.json({
        success: true,
        videoBase64: `data:${videoPart.mime_type || 'video/mp4'};base64,${videoPart.data}`,
      });
    }

    return res.json({
      success: true,
      message: 'Video yaratildi',
      interactionId: interaction.id,
    });
  } catch (error: any) {
    console.error('Video generation error:', error);
    return res.status(500).json({ error: error?.message || 'Video generatsiyasida xatolik yuz berdi' });
  }
});

// --- 4. VIP Showroom Visit & Booking API ---
app.get('/api/visit-booking', (req, res) => {
  return res.json({ success: true, bookings });
});

app.post('/api/visit-booking', (req, res) => {
  const { name, phone, preferredDate, preferredTime, selectedProductId, selectedProductTitle, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Ism va telefon raqam kiritilishi shart' });
  }

  const newBooking: Booking = {
    id: `VIP-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    phone,
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: preferredTime || '14:00',
    selectedProductId,
    selectedProductTitle: selectedProductTitle || 'Shourumdagi umumiy ekskursiya',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    status: 'Tasdiqlandi',
  };

  bookings.unshift(newBooking);

  return res.json({
    success: true,
    booking: newBooking,
    message: `Hurmatli ${name}, tashrifingiz muvaffaqiyatli band qilindi! VIP menejerimiz ${phone} raqamingiz orqali bogʻlanadi.`,
  });
});

// --- 5. Customer Reviews API ---
app.get('/api/reviews', (req, res) => {
  return res.json({ success: true, reviews });
});

app.post('/api/reviews', (req, res) => {
  const { authorName, rating, productName, commentUz, location } = req.body;

  if (!authorName || !commentUz) {
    return res.status(400).json({ error: 'Fikr va ism kiritilishi shart' });
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    authorName,
    rating: Number(rating) || 5,
    productName: productName || 'Zarhal & Billur Toʻplami',
    commentUz,
    date: new Date().toISOString().split('T')[0],
    verifiedBuyer: true,
    location: location || 'Oʻzbekiston',
  };

  reviews.unshift(newReview);
  return res.json({ success: true, review: newReview, message: 'Fikringiz uchun tashakkur!' });
});

// --- 6. Vite / Static Middleware Handling ---
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zarhal & Billur server listening on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is in use. Exiting to allow clean restart.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer();
