import React, { useState } from 'react';
import { Bed, Users, Maximize2, Bath, Sun, Wifi, Tv, Check, Calendar, Eye, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { Language, RoomType, HotelProperty } from '../types';

interface RoomCatalogProps {
  language: Language;
  rooms: RoomType[];
  hotels: HotelProperty[];
  selectedHotelFilter: string;
  onFilterChange: (hotelId: string) => void;
  onSelectRoomDetail: (room: RoomType) => void;
  onBookRoom: (room: RoomType) => void;
}

export const RoomCatalog: React.FC<RoomCatalogProps> = ({
  language,
  rooms,
  hotels,
  selectedHotelFilter,
  onFilterChange,
  onSelectRoomDetail,
  onBookRoom,
}) => {
  const [featureFilter, setFeatureFilter] = useState<'all' | 'bathtub' | 'balcony' | 'bestseller'>('all');

  const t = {
    vi: {
      badge: 'Bộ Sưu Tập Hạng Phòng Nghỉ',
      title: 'Khám Phá Các Hạng Phòng & Bảng Giá Trực Tiếp',
      subtitle: 'Tất cả các phòng đều được khử khuẩn sạch sẽ theo tiêu chuẩn cao cấp, trang bị nệm êm ái, máy lạnh và Wifi 5G tốc độ cao.',
      filterAllHotels: 'Tất cả 3 cơ sở',
      filterAllFeatures: 'Tất cả phòng',
      filterBathtub: '🛁 Có bồn tắm',
      filterBalcony: '🌿 Có ban công',
      filterBestSeller: '⭐ Được yêu thích nhất',
      pricePerNightFrom: 'Giá theo đêm từ:',
      directGuarantee: 'Đặt trực tiếp giá tốt nhất',
      btnDetail: 'Chi tiết phòng',
      btnBookNow: 'Đặt phòng',
      callBranch: 'Gọi đặt phòng',
      zaloBranch: 'Zalo',
      maxGuests: 'Khách:',
      size: 'Diện tích:',
      bed: 'Giường:',
      view: 'Hướng nhìn:',
      directPerks: 'Bao gồm: Trà, cafe, nước suối miễn phí & Hỗ trợ check-in 24/7',
    },
    en: {
      badge: 'Curated Room Collection',
      title: 'Explore Room Types & Direct Rates',
      subtitle: 'Every room is deeply sanitized to luxury standards, outfitted with orthopedic bedding, whisper-quiet AC, and high-speed 5G Wi-Fi.',
      filterAllHotels: 'All 3 Properties',
      filterAllFeatures: 'All Rooms',
      filterBathtub: '🛁 With Bathtub',
      filterBalcony: '🌿 With Balcony',
      filterBestSeller: '⭐ Best Sellers',
      pricePerNightFrom: 'Price per night from:',
      directGuarantee: 'Guaranteed best direct rate',
      btnDetail: 'Room Details',
      btnBookNow: 'Book Room',
      callBranch: 'Call Desk',
      zaloBranch: 'Zalo',
      maxGuests: 'Max:',
      size: 'Size:',
      bed: 'Bed:',
      view: 'View:',
      directPerks: 'Includes: Complimentary water, tea & 24/7 personalized service',
    },
  }[language];

  // Filter logic
  const filteredRooms = rooms.filter((room) => {
    if (selectedHotelFilter !== 'all' && room.hotelId !== selectedHotelFilter) {
      return false;
    }
    if (featureFilter === 'bathtub' && !room.hasBathtub) return false;
    if (featureFilter === 'balcony' && !room.hasBalcony) return false;
    if (featureFilter === 'bestseller' && !room.isBestSeller) return false;
    return true;
  });

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Hotel Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedHotelFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {t.filterAllHotels}
            </button>
            {hotels.map((h) => (
              <button
                key={h.id}
                onClick={() => onFilterChange(h.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedHotelFilter === h.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {h.name.replace(' HOTEL', '')}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Attribute & Rate Mode */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Attribute Filter */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFeatureFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  featureFilter === 'all' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                }`}
              >
                {t.filterAllFeatures}
              </button>
              <button
                onClick={() => setFeatureFilter('bathtub')}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  featureFilter === 'bathtub' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                }`}
              >
                {t.filterBathtub}
              </button>
              <button
                onClick={() => setFeatureFilter('balcony')}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  featureFilter === 'balcony' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                }`}
              >
                {t.filterBalcony}
              </button>
            </div>

            {/* Direct rate tag */}
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs text-emerald-800 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.directGuarantee}</span>
            </div>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const hotel = hotels.find((h) => h.id === room.hotelId);
            const isIndochine = room.hotelId === 'indochine-casa';
            const phoneHref = isIndochine ? 'tel:+84708570838' : 'tel:+84966572935';
            const phoneDisplay = isIndochine ? '+84 708 570 838' : '+84 966 572 935';
            const zaloHref = isIndochine ? 'https://zalo.me/0708570838' : 'https://zalo.me/0966572935';

            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-stone-200 group"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={room.featuredImage}
                    alt={room.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {hotel && (
                      <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 text-amber-400 text-[11px] font-bold backdrop-blur-md">
                        {hotel.name.replace(' HOTEL', '')}
                      </span>
                    )}
                    {room.isBestSeller && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-bold shadow-xs">
                        ⭐ Best Seller
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    {room.hasBathtub && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-900/80 text-sky-200 text-[11px] font-semibold backdrop-blur-md flex items-center gap-1">
                        <Bath className="w-3 h-3" /> Bồn tắm
                      </span>
                    )}
                    {room.hasBalcony && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-900/80 text-emerald-200 text-[11px] font-semibold backdrop-blur-md flex items-center gap-1">
                        <Sun className="w-3 h-3" /> Ban công
                      </span>
                    )}
                  </div>

                  {/* Room Category */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
                      {room.category[language]}
                    </span>
                    <h3 className="font-serif-luxury font-bold text-lg leading-tight drop-shadow-sm">
                      {room.name[language]}
                    </h3>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Key Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-b border-stone-100 text-xs text-stone-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{room.sizeM2} m²</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{room.maxAdults} Người lớn</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{room.bedType[language].split('(')[0]}</span>
                      </div>
                    </div>

                    {/* Room Description preview */}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {room.description[language]}
                    </p>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {room.amenities[language].slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Box - ONLY Bold Overnight Price */}
                  <div className="pt-3 border-t border-stone-100">
                    <div className="bg-stone-50 rounded-2xl p-3 mb-3 border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                          {t.pricePerNightFrom}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          {t.directGuarantee}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
                          {room.dailyPrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs font-bold text-stone-600 ml-1">/đêm</span>
                      </div>
                    </div>

                    {/* Quick Call & Zalo for this specific hotel */}
                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                      <a
                        href={phoneHref}
                        className="py-1.5 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        title={`Gọi ${phoneDisplay}`}
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>{phoneDisplay}</span>
                      </a>
                      <a
                        href={zaloHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Chat Zalo</span>
                      </a>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectRoomDetail(room)}
                        className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-600" />
                        <span>{t.btnDetail}</span>
                      </button>

                      <button
                        onClick={() => onBookRoom(room)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.btnBookNow}</span>
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
