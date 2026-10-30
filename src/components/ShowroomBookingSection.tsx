import React, { useState } from 'react';
import { Product } from '../data/products';
import { calculateDualPrice } from '../utils/pricing';
import { Phone, Calendar, Clock, MapPin, Send, CheckCircle2, MessageSquare, Star, Sparkles, User, ShoppingBag } from 'lucide-react';

interface ShowroomBookingSectionProps {
  products: Product[];
  selectedProductForBooking: Product | null;
  onClearSelectedProduct: () => void;
}

export function ShowroomBookingSection({
  products,
  selectedProductForBooking,
  onClearSelectedProduct,
}: ShowroomBookingSectionProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('15:00');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    selectedProductForBooking?.id || products[0]?.id || ''
  );
  const [notes, setNotes] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Review Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLocation, setReviewLocation] = useState('Toshkent');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  // Synchronize when parent passes a product to book
  React.useEffect(() => {
    if (selectedProductForBooking) {
      setSelectedProductId(selectedProductForBooking.id);
    }
  }, [selectedProductForBooking]);

  const activeSelectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const activeDualPrice = activeSelectedProduct ? calculateDualPrice(activeSelectedProduct.basePriceUsd) : null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Iltimos, ismingiz va telefon raqamingizni kiriting');
      return;
    }

    setSubmittingBooking(true);
    try {
      const res = await fetch('/api/visit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          preferredDate: visitDate,
          preferredTime: visitTime,
          selectedProductId: activeSelectedProduct?.id,
          selectedProductTitle: activeSelectedProduct?.title,
          notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccess(
          `Hurmatli ${name}! Sizning buyurtmangiz va shourumga tashrifingiz (${data.booking.id}) muvaffaqiyatli band qilindi. VIP menejerimiz ${phone} raqamingiz orqali tez orada bogʻlanadi.`
        );
        setName('');
        setPhone('+998 ');
        setNotes('');
      } else {
        alert(data.error || 'Xatolik yuz berdi');
      }
    } catch (err: any) {
      alert('Xatolik: ' + err.message);
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) {
      alert('Iltimos, ismingiz va fikringizni yozing');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName,
          rating,
          productName: activeSelectedProduct?.title,
          commentUz: reviewComment,
          location: reviewLocation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReviewSuccess('Fikringiz muvaffaqiyatli qabul qilindi va eʼlon qilindi! Qimmatli mulohazangiz uchun tashakkur.');
        setAuthorName('');
        setReviewComment('');
      }
    } catch (err: any) {
      alert('Xatolik: ' + err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <section id="booking-section" className="py-16 px-4 sm:px-8 bg-[#0e1017] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>VIP Tashrif & Toʻgʻridan-Toʻgʻri Sotib Olish</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-stone-100 tracking-tight">
            Shourumimizga Tashrif Buyuring va Fikr Qoldiring
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 font-light leading-relaxed">
            Qimmatbaho suyak chinnisi va Chexiya billurini shaxsan koʻrish, optik jilosini his qilish va professional mutaxassislarimizdan bepul maslahat olish uchun qulay vaqtni band qiling.
          </p>
        </div>

        {/* TOP CONTACT HIGHLIGHT BAR (Requirement #5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-[#141824] border border-amber-800/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block">Doʻkon Telefon Raqami:</span>
              <a href="tel:+998712008844" className="text-base font-bold text-amber-300 hover:underline">
                +998 71 200 88 44
              </a>
              <span className="text-[11px] text-stone-500 block">Mobil / Telegram: +998 90 999 88 44</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141824] border border-amber-800/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block">Markaziy Shourum:</span>
              <span className="text-xs font-semibold text-stone-200 block">
                Toshkent, Amir Temur shoh koʻchasi, 88-uy
              </span>
              <span className="text-[11px] text-stone-500">"Zarhal & Billur" Markaziy Saroyi (VIP Parking)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141824] border border-amber-800/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block">Ish Vaqti:</span>
              <span className="text-xs font-semibold text-stone-200 block">Har kuni: 10:00 dan 21:00 gacha</span>
              <span className="text-[11px] text-emerald-400">Dam olish kunlarisiz xizmat koʻrsatamiz</span>
            </div>
          </div>
        </div>

        {/* 2 MAIN FORMS: 1) VIP SHOWROOM BOOKING & PURCHASE, 2) REVIEWS & FEEDBACK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1. Showroom Visit & Purchase Booking Form (Requirement #5) */}
          <div className="lg:col-span-7 bg-[#131722] border border-amber-800/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-amber-950/80 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-100 font-cinzel">
                  Tashrif Buyurib Sotib Olishga Band Qilish
                </h3>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  Maʼlumotlaringizni kiriting va shaxsiy VIP konsulʼtant bilan uchrashuvni rejalashtiring.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-emerald-200 font-cinzel">Tashrif Qabul Qilindi!</h4>
                <p className="text-xs text-emerald-300 leading-relaxed">{bookingSuccess}</p>
                <button
                  onClick={() => setBookingSuccess(null)}
                  className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-stone-950"
                >
                  Yana Band Qilish
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Visual Selected Product Menu */}
                <div>
                  <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 font-cinzel">
                    Yoqqan Mahsulotni Tanlash Uchun Qulay Menyu:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-[#0e1119] border border-amber-700/50 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    >
                      {products.map((prod) => {
                        const price = calculateDualPrice(prod.basePriceUsd);
                        return (
                          <option key={prod.id} value={prod.id} className="bg-stone-900 text-stone-100 py-1">
                            {prod.title} — {price.formattedUzs} ({price.formattedUsd})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Selected product mini summary preview */}
                  {activeSelectedProduct && activeDualPrice && (
                    <div className="mt-3 p-3 rounded-xl bg-[#0c0e14] border border-stone-800 flex items-center gap-3">
                      <img
                        src={activeSelectedProduct.heroImage}
                        alt={activeSelectedProduct.title}
                        className="w-14 h-14 rounded-lg object-cover shrink-0 border border-amber-900/40"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-200 line-clamp-1">
                          {activeSelectedProduct.title}
                        </h4>
                        <p className="text-[11px] text-amber-400 font-bold">
                          {activeDualPrice.formattedUzs} &nbsp;
                          <span className="text-stone-400 font-normal">({activeDualPrice.formattedUsd})</span>
                        </p>
                        <p className="text-[10px] text-stone-400">{activeSelectedProduct.piecesCount}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      Toʻliq Ismingiz (F.I.SH) *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masalan: Sardor Rahimov"
                        className="w-full bg-[#0e1119] border border-stone-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      Telefon Raqamingiz *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+998 90 123 45 67"
                        className="w-full bg-[#0e1119] border border-stone-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      Tashrif Sanasi
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-[#0e1119] border border-stone-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      Tashrif Vaqti
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full bg-[#0e1119] border border-stone-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      >
                        <option value="11:00">11:00 (Ertalabki seans)</option>
                        <option value="13:00">13:00 (Tushki seans)</option>
                        <option value="15:00">15:00 (Kechki seans)</option>
                        <option value="17:00">17:00 (Kechki seans)</option>
                        <option value="19:00">19:00 (VIP Ziyofat vaqti)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes & Special Requests */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Qoʻshimcha Istak yoki Fikr (Sarpo qadogʻi, sovgʻa sertifikati, HoReCa namuna koʻrigi)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Masalan: Toʻy sarposi uchun qizil baxmal sandiq bilan birga koʻrmoqchiman..."
                    className="w-full bg-[#0e1119] border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 shadow-xl shadow-amber-950/40 hover:brightness-110 transition flex items-center justify-center gap-2 font-cinzel disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingBooking ? 'Band qilinmoqda...' : 'Tashrifni Band Qilish'}</span>
                </button>
              </form>
            )}
          </div>

          {/* 2. Customer Reviews & Feedback Form (Requirement #5) */}
          <div className="lg:col-span-5 bg-[#131722] border border-amber-800/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-amber-950/80 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-100 font-cinzel">
                  Xaridorlar Fikri & Mulohaza
                </h3>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  Doʻkonimiz mahsulotlari haqida oʻz xolis fikringizni bildiring.
                </p>
              </div>
              <MessageSquare className="w-5 h-5 text-amber-400" />
            </div>

            {reviewSuccess ? (
              <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-200 font-cinzel">Fikr Qoldirildi!</h4>
                <p className="text-xs text-emerald-300">{reviewSuccess}</p>
                <button
                  onClick={() => setReviewSuccess(null)}
                  className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-stone-950"
                >
                  Yana yozish
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Ismingiz va Kasbingiz / Shahringiz
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Masalan: Nilufar Usmonova (Toshkent)"
                    className="w-full bg-[#0e1119] border border-stone-800 rounded-xl p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Baholash:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 transition hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-300 ml-2">{rating} / 5 yulduz</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Sizning Fikringiz va Taassurotingiz *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Chinni jilosi, qadoqlanishi, xizmat koʻrsatish sifati haqida yozing..."
                    className="w-full bg-[#0e1119] border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#1f2533] hover:bg-[#283144] text-amber-300 border border-amber-600/50 shadow-md transition"
                >
                  {submittingReview ? 'Yuborilmoqda...' : 'Fikrni Eʼlon Qilish'}
                </button>
              </form>
            )}

            {/* Quick trust guarantee */}
            <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 space-y-1">
              <p className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Har bir xarid bilan original Bohemia & Limoges pasporti taqdim etiladi.
              </p>
              <p className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Oʻzbekiston boʻylab bepul maxsus zirhli yetkazib berish xizmati.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
