import React, { useState } from 'react';
import { X, Bed, Users, Maximize2, Bath, Sun, Wifi, Tv, ShieldCheck, Check, Calendar, ArrowRight, Clock, Star, Eye, Phone, MessageCircle } from 'lucide-react';
import { Language, RoomType, HotelProperty } from '../types';

interface RoomDetailModalProps {
  room: RoomType | null;
  hotel?: HotelProperty;
  language: Language;
  onClose: () => void;
  onBookRoom: (room: RoomType) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  hotel,
  language,
  onClose,
  onBookRoom,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!room) return null;

  const isIndochine = room.hotelId === 'indochine-casa';
  const phoneHref = isIndochine ? 'tel:+84708570838' : 'tel:+84966572935';
  const phoneDisplay = isIndochine ? '+84 708 570 838' : '+84 966 572 935';
  const zaloHref = isIndochine ? 'https://zalo.me/0708570838' : 'https://zalo.me/0966572935';

  const t = {
    vi: {
      roomSpecs: 'Thông số phòng',
      size: 'Diện tích',
      occupancy: 'Sức chứa tiêu chuẩn',
      bedType: 'Hạng giường',
      view: 'Hướng nhìn',
      amenitiesTitle: 'Trang thiết bị & Tiện nghi phòng',
      policiesTitle: 'Quy định & Chính sách lưu trú',
      checkInPolicy: 'Check-in: 14:00 | Check-out: 12:00 hôm sau (Hỗ trợ check-in sớm linh hoạt)',
      cleanPolicy: 'Phòng được vệ sinh khử trùng & thay mới toàn bộ drap nệm, khăn tắm 100% trước khi giao',
      cancelPolicy: 'Miễn phí hủy hoặc đổi ngày trước 24 giờ nhận phòng khi đặt trực tiếp',
      dailyRateTitle: 'Giá theo đêm từ:',
      bookNow: 'Đặt Phòng Này',
      callDesk: 'Gọi điện',
      chatZalo: 'Zalo',
      close: 'Đóng',
      perksIncluded: 'Đã bao gồm: Wifi tốc độ cao, nước suối, trà cafe và đồ dùng cá nhân cao cấp.',
    },
    en: {
      roomSpecs: 'Room Specifications',
      size: 'Room Size',
      occupancy: 'Standard Occupancy',
      bedType: 'Bed Type',
      view: 'Room View',
      amenitiesTitle: 'Amenities & In-room Equipment',
      policiesTitle: 'House Rules & Policies',
      checkInPolicy: 'Check-in: 14:00 | Check-out: 12:00 (Complimentary early check-in subject to availability)',
      cleanPolicy: 'Sanitized & refreshed with 100% fresh crisp linens and towels prior to arrival',
      cancelPolicy: 'Free cancellation or date change up to 24 hours prior when booked directly',
      dailyRateTitle: 'Price per night from:',
      bookNow: 'Book This Room',
      callDesk: 'Call Desk',
      chatZalo: 'Zalo',
      close: 'Close',
      perksIncluded: 'Includes: High-speed Wi-Fi, mineral water, tea, coffee, and luxury toiletries.',
    },
  }[language];

  const allImages = [room.featuredImage, ...(room.gallery || [])];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 my-8 max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery Showcase */}
        <div className="relative bg-stone-950 h-72 sm:h-96 shrink-0">
          <img
            src={allImages[activeImageIndex] || room.featuredImage}
            alt={room.name[language]}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          {/* Badges on Gallery */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {hotel && (
              <span className="px-3 py-1 rounded-full bg-stone-900/90 text-amber-400 text-xs font-bold backdrop-blur-md">
                {hotel.name}
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-amber-700 text-white text-xs font-semibold">
              {room.category[language]}
            </span>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
              {room.name[language]}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {hotel?.fullAddress}
            </p>
          </div>

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-1.5 bg-black/50 p-1.5 rounded-xl backdrop-blur-md">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-9 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-stone-700">
          {/* Key specs row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div>
              <span className="text-[11px] text-stone-500 block uppercase font-bold">{t.size}</span>
              <div className="font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                <Maximize2 className="w-4 h-4 text-amber-700" />
                <span>{room.sizeM2} m²</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-stone-500 block uppercase font-bold">{t.occupancy}</span>
              <div className="font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                <Users className="w-4 h-4 text-amber-700" />
                <span>{room.maxAdults} Người lớn</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-stone-500 block uppercase font-bold">{t.bedType}</span>
              <div className="font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                <Bed className="w-4 h-4 text-amber-700" />
                <span className="truncate">{room.bedType[language].split('(')[0]}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-stone-500 block uppercase font-bold">{t.view}</span>
              <div className="font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                {room.hasBalcony ? <Sun className="w-4 h-4 text-emerald-600" /> : <Eye className="w-4 h-4 text-stone-500" />}
                <span className="truncate">{room.view[language]}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-stone-700 leading-relaxed">
              {room.description[language]}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-3">
              {t.amenitiesTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities[language].map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs text-stone-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-amber-950 uppercase tracking-wider">
              {t.policiesTitle}
            </h4>
            <p className="text-stone-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{t.checkInPolicy}</span>
            </p>
            <p className="text-stone-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.cleanPolicy}</span>
            </p>
            <p className="text-stone-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{t.cancelPolicy}</span>
            </p>
          </div>
        </div>

        {/* Modal Footer / Direct CTA */}
        <div className="p-4 sm:p-6 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                {t.dailyRateTitle}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
                  {room.dailyPrice.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-xs font-bold text-stone-600">/đêm</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* Quick Call & Zalo links */}
            <a
              href={phoneHref}
              className="py-2.5 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              title={`Gọi ${phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{phoneDisplay}</span>
            </a>

            <a
              href={zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.chatZalo}</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
