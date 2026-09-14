import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Users, ArrowRight, ShieldCheck, Zap, Phone, Sparkles, Check, MessageCircle } from 'lucide-react';
import { Language, HotelProperty, BookingType } from '../types';

interface HeroProps {
  language: Language;
  hotels: HotelProperty[];
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  onSearchRooms: (params: { hotelId: string; bookingType: BookingType; checkInDate: string; checkOutDate: string }) => void;
  onOpenBooking: (hotelId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  hotels,
  selectedHotelId,
  onSelectHotel,
  onSearchRooms,
  onOpenBooking,
}) => {
  const [bookingType, setBookingType] = useState<BookingType>('daily');
  const [targetHotelId, setTargetHotelId] = useState<string>(selectedHotelId || 'all');
  const [checkInDate, setCheckInDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState<number>(2);

  const activeHotel = hotels.find((h) => h.id === selectedHotelId) || hotels[0];

  const t = {
    vi: {
      badge: 'Bình chọn Khách sạn Boutique được yêu thích tại Thảo Điền 2025',
      mainTitle: 'Trải nghiệm lưu trú đầy tinh tế gần thảo điền, TP Hồ Chí Minh',
      subTitle: 'Hệ thống 3 cơ sở lưu trú cao cấp tại An Khánh & Thảo Điền: Indochine Casa cổ điển lãng mạn, Chinchu Luxury hiện đại đẳng cấp và Chinchu Stay năng động trên phố Tây Xuân Thủy.',
      googleRating: '4.9/5 trên Google Maps (850+ đánh giá xác thực)',
      tabAll: 'Khám phá cả 3 cơ sở',
      labelHotel: 'Cơ sở khách sạn',
      allHotelsOption: 'Tất cả 3 cơ sở (Thảo Điền)',
      labelBookingType: 'Hình thức thuê',
      daily: 'Theo đêm (Overnight)',
      hourly: 'Theo giờ (Từ 2h)',
      monthly: 'Theo tháng / Dài hạn',
      labelCheckIn: 'Ngày nhận phòng',
      labelCheckOut: 'Ngày trả phòng',
      labelGuests: 'Số khách',
      guestOption1: '1 Khách (Solo)',
      guestOption2: '2 Khách (Cặp đôi)',
      guestOption3: '3-4 Khách (Gia đình / Bạn bè)',
      ctaSearch: 'Tìm Phòng & Xem Giá Trực Tiếp',
      perk1: 'Cam kết mức giá trực tiếp tốt nhất',
      perk2: 'Hỗ trợ nhận phòng sớm linh hoạt',
      perk3: 'Không cần thẻ tín dụng quốc tế',
      perk4: 'Lễ tân 24/7 & Hỗ trợ Zalo tức thì',
      quickCall: 'Gọi Hotline Giữ Phòng Ngay',
      viewLocations: 'Xem 3 địa chỉ trên Google Maps',
      branch1Contact: 'Indochine Casa (04 Thái Ly)',
      branch2Contact: 'Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy)',
    },
    en: {
      badge: 'Top-rated Boutique Hospitality in Thao Dien, District 2 (2025)',
      mainTitle: 'Refined Boutique Stays in the Heart of Thao Dien',
      subTitle: '3 premier properties in Thao Dien & An Khanh: Indochine Casa vintage romance, Chinchu Luxury executive suites, and Chinchu Stay right on iconic Xuan Thuy dining strip.',
      googleRating: '4.9/5 on Google Maps (850+ verified reviews)',
      tabAll: 'Explore all 3 locations',
      labelHotel: 'Hotel Property',
      allHotelsOption: 'All 3 Properties (Thao Dien)',
      labelBookingType: 'Stay Type',
      daily: 'Overnight Stay',
      hourly: 'Hourly (From 2 hours)',
      monthly: 'Monthly / Extended',
      labelCheckIn: 'Check-in Date',
      labelCheckOut: 'Check-out Date',
      labelGuests: 'Guests',
      guestOption1: '1 Guest (Solo)',
      guestOption2: '2 Guests (Couple)',
      guestOption3: '3-4 Guests (Group/Family)',
      ctaSearch: 'Search Rooms & Best Rates',
      perk1: 'Guaranteed Best Direct Rate',
      perk2: 'Complimentary early check-in (upon availability)',
      perk3: 'Zero credit card prepayment needed',
      perk4: '24/7 Front Desk & instant WhatsApp support',
      quickCall: 'Call Reception to Reserve',
      viewLocations: 'Explore 3 locations on Maps',
      branch1Contact: 'Indochine Casa (04 Thai Ly)',
      branch2Contact: 'Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy)',
    },
  }[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchRooms({
      hotelId: targetHotelId,
      bookingType,
      checkInDate,
      checkOutDate,
    });
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeHotel.heroImage}
          alt={activeHotel.name}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out filter brightness-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.badge}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 text-xs font-medium backdrop-blur-md">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>{t.googleRating}</span>
          </div>
        </div>

        {/* Main Hero Typography */}
        <div className="max-w-3xl mb-8">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            {t.mainTitle}
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light mb-6">
            {t.subTitle}
          </p>

          {/* Quick hotel pill selector */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {hotels.map((h) => {
              const isSelected = selectedHotelId === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    onSelectHotel(h.id);
                    setTargetHotelId(h.id);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50 border border-amber-400'
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-700'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-white p-0.5 inline-flex items-center justify-center shrink-0 shadow-xs">
                    <img src={h.logoUrl} alt="" className="w-full h-full object-contain" />
                  </span>
                  <span>{h.name}</span>
                </button>
              );
            })}
          </div>

          {/* 2 Quick Hotline & Zalo Contact Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-stone-900/90 border border-emerald-800/60 rounded-2xl p-3 backdrop-blur-md">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                📍 1. Indochine Casa Hotel (04 Thái Ly)
              </div>
              <div className="text-[11px] text-stone-300 mb-2">Thảo Điền, TP. Thủ Đức (TP.HCM)</div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:+84708570838"
                  className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>+84 708 570 838</span>
                </a>
                <a
                  href="https://zalo.me/0708570838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Zalo</span>
                </a>
              </div>
            </div>

            <div className="bg-stone-900/90 border border-emerald-800/60 rounded-2xl p-3 backdrop-blur-md">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                📍 2. Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy)
              </div>
              <div className="text-[11px] text-stone-300 mb-2">Thảo Điền, TP. Thủ Đức (TP.HCM)</div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:+84966572935"
                  className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>+84 966 572 935</span>
                </a>
                <a
                  href="https://zalo.me/0966572935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Zalo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* High Converting Direct Booking Engine Box */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-stone-200 text-stone-900">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* 1. Chọn khách sạn */}
            <div className="lg:col-span-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                {t.labelHotel}
              </label>
              <div className="relative">
                <select
                  value={targetHotelId}
                  onChange={(e) => {
                    setTargetHotelId(e.target.value);
                    if (e.target.value !== 'all') {
                      onSelectHotel(e.target.value);
                    }
                  }}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                >
                  <option value="all">{t.allHotelsOption}</option>
                  {hotels.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.address})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Check-in Date */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                {t.labelCheckIn}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkInDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                />
              </div>
            </div>

            {/* 3. Check-out Date */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                {t.labelCheckOut}
              </label>
              <input
                type="date"
                value={checkOutDate}
                min={checkInDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
              />
            </div>

            {/* 4. Số khách */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                {t.labelGuests}
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
              >
                <option value={1}>{t.guestOption1}</option>
                <option value={2}>{t.guestOption2}</option>
                <option value={3}>{t.guestOption3}</option>
              </select>
            </div>

            {/* 5. Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-950 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.ctaSearch}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Value Props Strip */}
          <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-stone-800">{t.perk1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.perk2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.perk3}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.perk4}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
