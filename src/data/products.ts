export interface ProductWorkshop {
  title: string;
  description: string;
  tag: string;
  processStep: string;
  location: string;
  imageUrl: string;
}

export interface ProductIndicators {
  materialPurity: number; // 0-100
  materialPurityLabel: string;
  thermalResistance: number; // 0-100
  thermalResistanceLabel: string;
  handcraftRate: number; // 0-100
  handcraftLabel: string;
  certificationScore: number; // 0-100
  certificationLabel: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'wedding' | 'daily_premium' | 'horeca' | 'gift_collectible';
  categoryLabelUz: string;
  materialType: 'bone_china' | 'crystal' | 'murano_glass' | 'porcelain';
  materialLabelUz: string;
  basePriceUsd: number;
  piecesCount: string;
  heroImage: string;
  workshop: ProductWorkshop;
  indicators: ProductIndicators;
  model3dKey: 'crystal_goblet' | 'porcelain_teapot' | 'royal_platter';
  descriptionUz: string;
  specifications: { label: string; value: string }[];
  stockStatus: string;
  featured?: boolean;
}

export const CATEGORIES = [
  {
    id: 'all',
    label: 'Barcha Toʻplamlar',
    description: 'Eksklyuziv chinni, optik billur va qoʻlda ishlangan sanʼat asarlari',
  },
  {
    id: 'wedding',
    label: 'Toʻy & Marosimlar',
    description: 'Haddan tashqari hashamatli toʻylar, sarpo va shohona tantanalar uchun 68-120 boʻlakli toʻplamlar',
  },
  {
    id: 'daily_premium',
    label: 'Kundalik Premium',
    description: 'Oilaviy kechki ovqatlar va har kungi lazzatlanish uchun nafis, bardoshli chinni idishlar',
  },
  {
    id: 'horeca',
    label: 'HoReCa & Restoranlar',
    description: 'Michelin darajasidagi restoranlar, mehmonxonalar va elita qahvaxonalar uchun bardoshli toʻplamlar',
  },
  {
    id: 'gift_collectible',
    label: 'Sovgʻa & Kolleksiya',
    description: 'Nafis sovgʻalar, cheklangan nusxadagi vaza va shohona kolleksion sanʼat buyumlari',
  },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'zarhal-imperator-68',
    title: 'Imperator Zarhal Servisi (68 boʻlak)',
    subtitle: '24K Oltin Qoplamali Qirollik Suyak Chinnisi',
    category: 'wedding',
    categoryLabelUz: 'Haddan tashqari hashamatli toʻylar va marosimlar',
    materialType: 'bone_china',
    materialLabelUz: 'Oliy Darajali Suyak Chinnisi (Bone China 50%)',
    basePriceUsd: 2850,
    piecesCount: '68 boʻlakli toʻliq dasturxon servisi (12 kishilik)',
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop',
    workshop: {
      title: '1420°C Olovli Sirlash & 24K Oltin Filigran',
      description: 'Har bir likobcha va laganga sof 24 karatli oltin suvi usta rassomlar tomonidan mikron nozikligida qoʻlda chiziladi va 850°C haroratda ikkinchi marotaba mustahkamlanadi.',
      tag: 'Qoʻlda Zarhal Chizish',
      processStep: '3 bosqichli pishirish & qoʻlda zarhal bezatish',
      location: 'Limoges / Fransiya & Meissen ustaxonasi',
      imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop',
    },
    indicators: {
      materialPurity: 99,
      materialPurityLabel: '24K Oltin suvi (0.8 mkm) & 50% Suyak kuli kalsiysi',
      thermalResistance: 82,
      thermalResistanceLabel: '220°C gacha chidamli (Zarhal sabab nozik qoʻlda yuvish talab etiladi)',
      handcraftRate: 96,
      handcraftLabel: '96% qoʻlda ishlangan naqsh va sirlash mehnati',
      certificationScore: 99,
      certificationLabel: 'Imperator Litsenziyasi № 774-G / Oltin Muhr',
    },
    model3dKey: 'porcelain_teapot',
    descriptionUz: 'Shohona toʻylar va xonadonlar uchun eng oliy darajadagi dasturxon bezagi. Yupqa, qorongʻida yorugʻlikni oʻtkazuvchi oq suyak chinnisi va sof 24 karatli zarhal chiziqlar har bir taomni qirollik ziyofatiga aylantiradi.',
    specifications: [
      { label: 'Tarkibi', value: '12 ta katta lagan, 12 ta shoʻrva kosasi, 12 ta salat likobchasi, 12 ta desert likobchasi, 2 ta oval baliq lagani, 1 ta katta shohona shoʻrva idishi (tyurin), 1 ta choynak, 1 ta sutdon, 1 ta shakardon va salfetka ushlagichlar' },
      { label: 'Sof Oltin', value: '24 Karat (999 probali sof oltin suvi)' },
      { label: 'Chinni turi', value: 'Fine Bone China (yuqori mustahkamlik va yorugʻlik oʻtkazuvchanligi)' },
      { label: 'Qadoqlanishi', value: 'Maxsus baxmal qoplamali qimmatbaho yogʻoch sandiq' },
    ],
    stockStatus: 'Mavjud (Shourumda koʻrish mumkin)',
    featured: true,
  },
  {
    id: 'bohemia-olmos-qadah-6',
    title: 'Bohemia Olmos Qadahlari Toʻplami',
    subtitle: '24% PbO Optik Billur, Qoʻlda Kesilgan Fasetlar',
    category: 'wedding',
    categoryLabelUz: 'Haddan tashqari hashamatli toʻylar va marosimlar',
    materialType: 'crystal',
    materialLabelUz: 'Chexiya Optik Billuri (24% PbO Lead Crystal)',
    basePriceUsd: 890,
    piecesCount: '6 dona shampan & sharob qadahi (240ml)',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    workshop: {
      title: 'Bohemiya Ustaxonasida Olmosli Faset Kesish',
      description: 'Shisha puflash trubkasida 1200°C da erigan eritmaga usta tomonidan shakl berilib, soʻngra olmosli disk bilan har bir qirrasi 0.1 mm aniqlikda silliqlanadi.',
      tag: 'Qoʻlda Olmos Kesish',
      processStep: 'Ogʻiz bilan puflash & qirralarni olmosda charxlash',
      location: 'Bogemiya Vodiysi / Chexiya',
      imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
    },
    indicators: {
      materialPurity: 98,
      materialPurityLabel: '99.4% Optik billur tiniqligi (kamalak refraksiyasi)',
      thermalResistance: 68,
      thermalResistanceLabel: 'Harorat oʻzgarishiga chidamli (faqat qoʻlda parvarish)',
      handcraftRate: 98,
      handcraftLabel: '98% Ustaning ogʻiz bilan puflashi va qirralash sanʼati',
      certificationScore: 97,
      certificationLabel: 'Bohemia Crystal Authentic Passport № CZ-4192',
    },
    model3dKey: 'crystal_goblet',
    descriptionUz: 'Har bir zarbida billurga xos musiqiy jarang taratuvchi, nur tushganda yetti xil kamalak rangiga boʻlinuvchi shohona qadahlar. Toʻy oqshomi va tantanalarda qadah koʻtarish marosimining tengsiz gultoji.',
    specifications: [
      { label: 'Sigʻimi', value: '240 ml x 6 dona' },
      { label: 'Billur xususiyati', value: '24% PbO (ogʻir va qoʻlda yoqimli salmoq beruvchi optik billur)' },
      { label: 'Zarhal jilo', value: 'Tepki gardishida 24K yupqa oltin halqa' },
      { label: 'Ovozi', value: 'Rezonansli 8 soniyalik toza kristall musiqasi' },
    ],
    stockStatus: 'Mavjud (Shourumda koʻrish mumkin)',
    featured: true,
  },
  {
    id: 'safir-oilaviy-kechki-ovqat-24',
    title: 'Safir Koʻk & Oltin Oilaviy Toʻplam (24 boʻlak)',
    subtitle: 'Kundalik Premium & Dam Olish Kunlari Dasturxoni',
    category: 'daily_premium',
    categoryLabelUz: 'Kundalik premium va oilaviy kechki ovqatlar',
    materialType: 'porcelain',
    materialLabelUz: 'Mustahkamlangan Sirlangan Chinni',
    basePriceUsd: 1150,
    piecesCount: '24 boʻlakli toʻliq toʻplam (6 kishilik)',
    heroImage: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?q=80&w=1200&auto=format&fit=crop',
    workshop: {
      title: 'Yuqori Zichlikdagi Izostatik Presslash & Kobalt Sirlash',
      description: 'Chinni xomashyosi 200 bar bosim ostida zichlashtirilib, tirnalishga va issiq taomlarga nisbatan oʻta mustahkam himoya qatlami bilan qoplanadi.',
      tag: 'Kobalt Glazur Texnologiyasi',
      processStep: 'Yuqori bosimli presslash va qattiq sirlash',
      location: 'Karlovy Vary / Chexiya',
      imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop',
    },
    indicators: {
      materialPurity: 92,
      materialPurityLabel: 'Tirik kobalt pigmenti & mustahkam kvarsli chinni',
      thermalResistance: 95,
      thermalResistanceLabel: 'Idish yuvish mashinasiga toʻliq mos (Dishwasher Safe)',
      handcraftRate: 84,
      handcraftLabel: '84% Qoʻlda sirlangan va detallari tekshirilgan',
      certificationScore: 94,
      certificationLabel: 'Evropa Sifat Sertifikati EN-12875',
    },
    model3dKey: 'royal_platter',
    descriptionUz: 'Kundalik hayotga hashamat bagʻishlovchi toʻplam. Chuqur qirollik kobalt koʻki va oltin hoshiyalar taomlarni nafis koʻrsatadi. Zamonaviy idish yuvish mashinasida yuvishga toʻliq chidamli.',
    specifications: [
      { label: 'Tarkibi', value: '6 ta katta ovqat likobchasi, 6 ta shoʻrva kosasi, 6 ta desert likobchasi, 2 ta salat kosasi, 2 ta non likobchasi, 2 ta tuzdon' },
      { label: 'Chidamlilik', value: 'Pichoq va sanchqi izlari qolmaydigan olmosli sirlanish' },
      { label: 'Harorat', value: '-20°C dan +240°C gacha termo-zarbaga bardoshli' },
    ],
    stockStatus: 'Mavjud (Omborda 18 toʻplam)',
  },
  {
    id: 'venetsiya-murano-shisha-vaza',
    title: 'Murano Maestro Oltin Zarrali Shisha Vaza',
    subtitle: 'Nafis Sovgʻalar & Eksklyuziv Kolleksion Sanʼat',
    category: 'gift_collectible',
    categoryLabelUz: 'Nafis sovgʻalar va kolleksion buyumlar',
    materialType: 'murano_glass',
    materialLabelUz: 'Haqiqiy Venetsiya Murano Sanʼat Shishasi',
    basePriceUsd: 1450,
    piecesCount: '1 dona unikal sanʼat asari (Balandligi: 38 sm)',
    heroImage: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1200&auto=format&fit=crop',
    workshop: {
      title: 'Murano Orolida Olovli Shisha Puflash Sanʼati',
      description: 'Har bir buyum Venetsiya anʼanalariga sodiq qolgan holda 1300°C li pechdan olinib, usta qoʻllarida erigan oltin folgasi bilan aralashtirilgan holda erkin nafas bilan shakllantiriladi. Ikkinchi nusxasi mavjud emas.',
      tag: 'Mouth-Blown Murano Art',
      processStep: 'Erkin qoʻlda puflash & ichki 24K oltin barglari qoʻshish',
      location: 'Murano Oroli, Venetsiya / Italiya',
      imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop',
    },
    indicators: {
      materialPurity: 97,
      materialPurityLabel: 'Haqiqiy Murano kvarsi va 24K eritilgan oltin changi',
      thermalResistance: 75,
      thermalResistanceLabel: 'Xona harorati uchun (toʻgʻridan-toʻgʻri quyoshdan qoʻriqlanadi)',
      handcraftRate: 100,
      handcraftLabel: '100% Unikal qoʻl mehnati (ikkinchi nusxasi dunyoda yoʻq)',
      certificationScore: 100,
      certificationLabel: 'Vetro Artistico® Murano Sertifikat belgisi № 042',
    },
    model3dKey: 'crystal_goblet',
    descriptionUz: 'Italiyaning afsonaviy Murano ustalari tomonidan yaratilgan unikal vaza. Ichki qatlamlariga singdirilgan 24 karatli oltin varaqlari xonadondagi yorugʻlikni oʻzida sehrli ravishda aks ettiradi. Eng nufuzli sovgʻa va kolleksiya buyumi.',
    specifications: [
      { label: 'Balandligi va vazni', value: 'Balandligi 38 sm, ogʻirligi 3.4 kg' },
      { label: 'Mualliflik', value: 'Maestro imzolagan original gilyosh gravyura' },
      { label: 'Sertifikat', value: 'Italiya Hunarmandlar Palatasi QR-kodli sertifikati' },
    ],
    stockStatus: 'Eksklyuziv (Faqat 1 dona mavjud)',
    featured: true,
  },
  {
    id: 'horeca-michelin-restoran-to-plami',
    title: 'Michelin HoReCa Pro Chinni Toʻplami (48 boʻlak)',
    subtitle: 'Elita Restoranlar & Mehmonxonalar Uchun',
    category: 'horeca',
    categoryLabelUz: 'Restoran hamda qahvaxonalar (HoReCa) uchun',
    materialType: 'bone_china',
    materialLabelUz: 'Alyuminiy Oksidi Bilan Kuchaytirilgan Oliy Chinni',
    basePriceUsd: 1980,
    piecesCount: '48 boʻlakli gastronomiya toʻplami (12 kishi uchun toʻliq servis)',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    workshop: {
      title: 'HoReCa Maxsus Qattiqlashtirilgan Pech Sinovi',
      description: 'Restoranlardagi intensiv ishlatish sharoitiga moslashtirilgan. Chetlarida uvoqlanishga (anti-chip) qarshi maxsus kavisli gardish texnologiyasi bilan tayyorlanadi.',
      tag: 'Anti-Chip & Thermal Shock Resistant',
      processStep: 'Yuqori haroratli sirlash & qirralarni mustahkamlash',
      location: 'Bavariya / Germaniya',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    },
    indicators: {
      materialPurity: 94,
      materialPurityLabel: 'Ultra-oq mustahkamlangan chinni xamiri',
      thermalResistance: 99,
      thermalResistanceLabel: 'Sanoat idish yuvish mashinasida 5000+ marta yuvishga kafolat',
      handcraftRate: 80,
      handcraftLabel: '80% Yuqori texnologik nemis standartidagi nazorat',
      certificationScore: 98,
      certificationLabel: 'HoReCa GastroNorm & ISO 9001 sertifikati',
    },
    model3dKey: 'royal_platter',
    descriptionUz: 'Toshkent va xorijdagi eng mashhur Michelin darajasidagi restoranlar tanlovi. Oshpazlarning nozik taom dizaynlari uchun ideal mot va yaltiroq qoplamalar uygʻunligi. Chetlarining uvoqlanishiga qarshi 5 yillik kafolat beriladi.',
    specifications: [
      { label: 'Tarkibi', value: '12 ta steyk va asosiy taom lagani (30 sm), 12 ta chuqur pasta lagani (27 sm), 12 ta aperitiv likobchasi (21 sm), 12 ta kofe finjonlari' },
      { label: 'Qoplama', value: 'Gidrofob tirnalmas sirlanish' },
      { label: 'Qoʻllanishi', value: 'Restoranlar, elita kofexona va banket zallari' },
    ],
    stockStatus: 'Mavjud (Katta hajmda tezkor yetkazib berish)',
  },
  {
    id: 'shohona-choy-marosimi-to-plami',
    title: 'Shohona Choy Marosimi Servisi (15 boʻlak)',
    subtitle: 'Nafis Sovgʻalar & Oila Fayzi Uchun',
    category: 'gift_collectible',
    categoryLabelUz: 'Nafis sovgʻalar va kolleksion buyumlar',
    materialType: 'bone_china',
    materialLabelUz: 'Xitoy Qadimiy Jingdezhen Chinnisi & Oltin Filigran',
    basePriceUsd: 780,
    piecesCount: '15 boʻlak (6 kishilik choy marosimi toʻplami)',
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
    workshop: {
      title: 'Jingdezhen 1000 Yillik Chinni Poytaxti Anʼanasi',
      description: 'Ming sulolasi davridan saqlanib kelgan retsept boʻyicha kaolin tuprogʻidan qoʻlda charxda aylanib, 24K zarhal naqshlar mayin ipak moʻyqalam bilan chiziladi.',
      tag: 'Qadimiy Kaolin Chinnisi',
      processStep: 'Qoʻlda charxda quyish & moʻyqalamli zarhal chizish',
      location: 'Jingdezhen / Sharqiy Chinni Markazi',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop',
    },
    indicators: {
      materialPurity: 96,
      materialPurityLabel: 'Sof Jingdezhen oq kaolini va 24K oltin naqsh',
      thermalResistance: 88,
      thermalResistanceLabel: 'Qaynoq choy va qaynatilgan suvga toʻliq chidamli',
      handcraftRate: 95,
      handcraftLabel: '95% Qoʻlda charxlangan va boʻyalgan',
      certificationScore: 96,
      certificationLabel: 'Sharq Hunarmandlik Ustozlari Gildiyasi Sertifikati',
    },
    model3dKey: 'porcelain_teapot',
    descriptionUz: 'Sharqona mehmondoʻstlik va yevropacha hashamat uygʻunligi. 1 ta shohona choynak, 6 ta nafis piyola/finjon, 6 ta likobcha, sutdon va shakardon. Toʻy sarposi va qadrli insonlarga sovgʻa qilish uchun eng saralangan tuhfa.',
    specifications: [
      { label: 'Tarkibi', value: '1 ta 1.2L choynak, 6 ta finjon, 6 ta likobcha, 1 ta sutdon, 1 ta qopqoqli shakardon' },
      { label: 'Material', value: 'Translyutsent (nurni oʻtkazuvchi) qadimiy oq chinni' },
      { label: 'Qadoq', value: 'Ipak toʻqimali sovgʻa qutisi' },
    ],
    stockStatus: 'Mavjud (Shourumda koʻrish mumkin)',
  },
];
