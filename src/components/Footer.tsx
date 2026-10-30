import React from 'react';
import { Sparkles, Phone, MapPin, Mail, ShieldCheck, Clock, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#090b0f] border-t border-amber-950 text-stone-400 text-xs py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-amber-100 font-cinzel">
              ZARHAL & BILLUR
            </span>
          </div>
          <p className="text-stone-400 text-xs font-light leading-relaxed">
            Qimmatbaho suyak chinnisi, optik Chexiya billuri va Venetsiya Murano sanʼat shishasi boʻyicha Oʻzbekistondagi nufuzli e-commerce uyi.
          </p>
          <div className="flex items-center gap-2 pt-1 text-amber-400 font-medium text-[11px]">
            <Award className="w-4 h-4" />
            <span>Xalqaro Sifat va Asllik Kafolati</span>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-cinzel">
            Asosiy Yoʻnalishlar
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>Shohona Toʻy va Sarpo Servislari (68-120 boʻlak)</li>
            <li>Kundalik Premium Oilaviy Toʻplamlar</li>
            <li>HoReCa Michelin Gastro Chinni</li>
            <li>Bohemia Olmos Qadahlari (24% PbO)</li>
            <li>Murano Qoʻlda Puflangan Kolleksion Vazalar</li>
          </ul>
        </div>

        {/* Showroom & Hours */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-cinzel">
            Shourum & Tashrif
          </h4>
          <div className="space-y-1.5 text-stone-400">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Toshkent, Amir Temur shoh koʻchasi, 88-uy</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>10:00 – 21:00 (Dam olish kunlarisiz)</span>
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>VIP Mehmonlar uchun maxsus avtoturargoh</span>
            </p>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-cinzel">
            Bogʻlanish & Buyurtma
          </h4>
          <div className="space-y-2">
            <a href="tel:+998712008844" className="text-sm font-bold text-amber-300 block hover:underline">
              +998 71 200 88 44
            </a>
            <span className="text-[11px] text-stone-400 block">Telegram / Konsultatsiya: +998 90 999 88 44</span>
            <span className="text-[11px] text-stone-500 block">Elektron pochta: vip@zarhal-billur.uz</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-stone-500">
        <div>
          © 2026 Zarhal & Billur. Barcha huquqlar himoyalangan.
        </div>
        <div className="flex gap-4">
          <span>Oʻzbek soʻmida (UZS) & AQSH dollarida ($ USD) toʻlov</span>
          <span>Bohemia Crystal Authentic Passport</span>
        </div>
      </div>
    </footer>
  );
}
