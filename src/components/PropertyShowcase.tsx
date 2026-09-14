import React from 'react';
import { MapPin, Star, ExternalLink, Calendar, Check, Clock, Sparkles, Navigation, Phone, MessageCircle } from 'lucide-react';
import { Language, HotelProperty } from '../types';

interface PropertyShowcaseProps {
  language: Language;
  hotels: HotelProperty[];
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  onOpenBooking: (hotelId: string) => void;
  onFilterRoomsByHotel: (hotelId: string) => void;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  language,
  hotels,
  selectedHotelId,
  onSelectHotel,
  onOpenBooking,
  onFilterRoomsByHotel,
}) => {
  const t = {
    vi: {
      sectionBadge: 'Hệ Thống 3 Cơ Sở Lưu Trú Đẳng Cấp',
      title: 'Lựa Chọn Điểm Đến Lý Tưởng Tại Thảo Điền',
      subtitle: 'Mỗi cơ sở mang một phong cách kiến trúc và trải nghiệm riêng biệt, đáp ứng mọi nhu cầu từ nghỉ dưỡng lãng mạn, công tác đến du lịch tự túc.',
      dailyRate: 'Giá theo đêm từ:',
      viewRooms: 'Xem các loại phòng',
      bookDirect: 'Đặt phòng cơ sở này',
      openMaps: 'Xem Google Maps',
      metroDistance: 'Ga Metro Thảo Điền:',
      district1Distance: 'Sang Quận 1:',
      directBookingBonus: 'Ưu đãi đặt trực tiếp:',
      discountTag: 'Đặt Trực Tiếp Giá Tốt Nhất',
      callNow: 'Gọi hotline',
      chatZalo: 'Chat Zalo',
    },
    en: {
      sectionBadge: 'Our 3 Distinct Locations',
      title: 'Select Your Ideal Stay in Thao Dien',
      subtitle: 'Each property offers unique architectural charm and curated ambiance—from vintage French-Indochine romance to contemporary executive luxury and vibrant urban living.',
      dailyRate: 'Overnight rate from:',
      viewRooms: 'Explore Room Types',
      bookDirect: 'Book This Property',
      openMaps: 'View on Google Maps',
      metroDistance: 'Thao Dien Metro:',
      district1Distance: 'To District 1:',
      directBookingBonus: 'Direct Booking Perks:',
      discountTag: 'Guaranteed Best Direct Rate',
      callNow: 'Call Hotline',
      chatZalo: 'Chat Zalo',
    },
  }[language];

  return (
    <section id="properties" className="py-16 sm:py-24 bg-stone-100 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Property Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {hotels.map((hotel) => {
            const isSelected = selectedHotelId === hotel.id;

            return (
              <div
                key={hotel.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border ${
                  isSelected ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-stone-200'
                }`}
              >
                {/* Image Container with Badges */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={hotel.heroImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  {/* Brand & Stars Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <div className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-stone-200 flex items-center gap-2">
                      <img
                        src={hotel.logoUrl}
                        alt={`Logo ${hotel.name}`}
                        className="h-6 w-auto max-w-[75px] object-contain"
                      />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-xs font-bold backdrop-blur-md">
                      {t.discountTag}
                    </span>
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-2.5 py-1 flex items-center gap-1 shadow-sm text-xs font-bold text-stone-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hotel.googleRating}</span>
                    <span className="text-stone-400 font-normal">({hotel.reviewCount})</span>
                  </div>

                  {/* Bottom Image Overlay text */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif-luxury font-bold text-xl leading-snug drop-shadow-sm">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                      {hotel.tagline[language]}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Address & Direct Maps link */}
                    <div className="flex items-start justify-between gap-2 pb-4 mb-4 border-b border-stone-100">
                      <div className="flex items-start gap-2 text-xs text-stone-600">
                        <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span className="font-medium text-stone-800">{hotel.fullAddress}</span>
                      </div>
                      <a
                        href={hotel.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-800 hover:text-amber-900 text-xs font-bold flex items-center gap-0.5 shrink-0 bg-amber-50 px-2 py-1 rounded-md"
                        title={t.openMaps}
                      >
                        <span>Maps</span>
                        <Navigation className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Proximity Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-5 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                      <div className="text-stone-600">
                        <span className="font-semibold text-stone-900">🚇 {t.metroDistance}</span>{' '}
                        {hotel.distanceMetrics.metroMinutes} phút
                      </div>
                      <div className="text-stone-600">
                        <span className="font-semibold text-stone-900">🏙️ {t.district1Distance}</span>{' '}
                        {hotel.distanceMetrics.district1Minutes} phút
                      </div>
                      <div className="col-span-2 text-stone-700 italic border-t border-stone-200/60 pt-1.5 mt-0.5">
                        📍 {hotel.distanceMetrics.highlightWalk[language]}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <ul className="space-y-2 mb-6">
                      {hotel.features[language].slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-snug">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA - Bold Overnight rate only */}
                  <div className="pt-4 border-t border-stone-100">
                    <div className="bg-stone-50 rounded-2xl p-3.5 mb-3 border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-stone-700 block uppercase tracking-wide">
                          {t.dailyRate}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          {language === 'vi' ? 'Giá đặt trực tiếp' : 'Direct booking rate'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-amber-950 tracking-tight">
                          {hotel.priceRange.dailyFrom.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs font-bold text-stone-700 ml-1">/đêm</span>
                      </div>
                    </div>

                    {/* Direct Hotline & Zalo for this specific branch */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <a
                        href={hotel.id === 'indochine-casa' ? 'tel:+84708570838' : 'tel:+84966572935'}
                        className="py-2 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        title={hotel.id === 'indochine-casa' ? 'Gọi +84 708 570 838' : 'Gọi +84 966 572 935'}
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{hotel.id === 'indochine-casa' ? '+84 708 570 838' : '+84 966 572 935'}</span>
                      </a>
                      <a
                        href={hotel.id === 'indochine-casa' ? 'https://zalo.me/0708570838' : 'https://zalo.me/0966572935'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.chatZalo}</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onSelectHotel(hotel.id);
                          onFilterRoomsByHotel(hotel.id);
                          const el = document.getElementById('rooms');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold text-center transition-colors cursor-pointer"
                      >
                        {t.viewRooms}
                      </button>

                      <button
                        onClick={() => onOpenBooking(hotel.id)}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.bookDirect}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
