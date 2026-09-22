import React from 'react';
import { MapPin, Star, ExternalLink, Calendar, Check, Clock, Sparkles, Navigation, Phone, MessageCircle } from 'lucide-react';
import { Language, HotelProperty } from '../types';
import { getLocalizedText, getLocalizedList } from '../utils/i18n';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';
import { getAssetUrl } from '../utils/assets';

interface PropertyShowcaseProps {
  language: Language;
  hotels: HotelProperty[];
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  onOpenBooking: (hotelId: string) => void;
  onFilterRoomsByHotel: (hotelId: string) => void;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  language,
  hotels,
  selectedHotelId,
  onSelectHotel,
  onOpenBooking,
  onFilterRoomsByHotel,
  onOpenWeChat,
}) => {
  const translations = {
    vi: {
      sectionBadge: 'Hệ Thống Cơ Sở Lưu Trú Tại An Khánh & Thảo Điền',
      title: 'Cơ Sở Khách Sạn Thảo Điền',
      subtitle: 'Hệ thống cơ sở lưu trú tại An Khánh & Thảo Điền. Indochine Casa cổ điển lãng mạn, Chinchu Luxury hiện đại tiện ích và Chinchu Stay năng động thân thiện giữa trung tâm Hồ Chí Minh.',
      dailyRate: 'Giá chỉ từ:',
      viewRooms: 'Xem hình ảnh phòng',
      bookDirect: 'Gọi đặt phòng',
      openMaps: 'Xem Google Maps',
      metroDistance: 'Ga Metro Thảo Điền:',
      district1Distance: 'Sang Quận 1:',
      directBookingBonus: 'Ưu đãi đặt trực tiếp:',
      discountTag: 'Giá Chỉ Từ 600K - 800K/Đêm',
      callNow: 'Gọi hotline',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      perNight: '/đêm',
      minuteSuffix: 'phút',
      directBookingRateText: 'Giá đặt trực tiếp',
    },
    en: {
      sectionBadge: 'Hospitality System • An Khanh & Thao Dien',
      title: 'Thao Dien Hotel Branches',
      subtitle: 'Boutique hospitality system in An Khanh & Thao Dien. Indochine Casa classic romance, Chinchu Luxury contemporary comfort, and Chinchu Stay vibrant and friendly in the heart of Ho Chi Minh City.',
      dailyRate: 'Rates starting from:',
      viewRooms: 'View Room Photos',
      bookDirect: 'Call to Book',
      openMaps: 'View on Google Maps',
      metroDistance: 'Thao Dien Metro:',
      district1Distance: 'To District 1:',
      directBookingBonus: 'Direct Booking Perks:',
      discountTag: 'From 600K - 800K / Night',
      callNow: 'Call Hotline',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      perNight: '/night',
      minuteSuffix: 'mins',
      directBookingRateText: 'Direct booking rate',
    },
    ko: {
      sectionBadge: '안칸 & 타오디엔 호텔 지점',
      title: '타오디엔 호텔 지점 둘러보기',
      subtitle: '안칸 & 타오디엔 호텔 시스템. 클래식 로맨스의 인도차이나 카사, 모던 럭셔리의 친추 럭셔리, 활기찬 도심의 친추 스테이.',
      dailyRate: '1박 요금 최저가:',
      viewRooms: '객실 사진 보기',
      bookDirect: '전화 예약',
      openMaps: 'Google 지도 보기',
      metroDistance: '타오디엔 메트로역:',
      district1Distance: '1군 시내까지:',
      directBookingBonus: '직접 예약 특전:',
      discountTag: '1박 600K - 800K동부터',
      callNow: '전화 문의',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '위챗 (WeChat)',
      perNight: '/박',
      minuteSuffix: '분',
      directBookingRateText: '공식 직영 최저가',
    },
    zh: {
      sectionBadge: '安庆与草田精品旅宿',
      title: '探索草田酒店分店',
      subtitle: '安庆与草田精品酒店体系：经典法式印支风情 Indochine Casa、现代商务轻奢 Chinchu Luxury，以及位于核心商业街的 Chinchu Stay。',
      dailyRate: '最低房价起：',
      viewRooms: '查看客房实景',
      bookDirect: '电话预订',
      openMaps: '在谷歌地图查看',
      metroDistance: '草田地铁站：',
      district1Distance: '前往第一郡：',
      directBookingBonus: '官方直订礼遇：',
      discountTag: '每晚 600K - 800K 盾起',
      callNow: '致电前台',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
      perNight: '/晚',
      minuteSuffix: '分钟',
      directBookingRateText: '官方直接预订价格',
    },
  };

  const t = translations[language] || translations.vi;

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
            const isIndochine = hotel.id === 'indochine-casa';
            const phoneDisplay = isIndochine ? '+84 708 570 838' : '+84 966 572 935';
            const phoneTel = isIndochine ? 'tel:+84708570838' : 'tel:+84966572935';
            const zaloUrl = isIndochine ? 'https://zalo.me/0708570838' : 'https://zalo.me/0966572935';
            const whatsappUrl = isIndochine ? 'https://wa.me/84708570838' : 'https://wa.me/84966572935';
            const wechatBranch = isIndochine ? 'indochine' : 'chinchu';

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
                    src={getAssetUrl(hotel.heroImage)}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  {/* Brand & Stars Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <div className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-stone-200 flex items-center gap-2">
                      <img
                        src={getAssetUrl(hotel.logoUrl)}
                        alt={`Logo ${hotel.name}`}
                        className="h-5 w-auto object-contain"
                      />
                      <span className="text-xs font-bold text-stone-900 tracking-tight">
                        {hotel.brand}
                      </span>
                    </div>

                    <div className="px-2 py-1 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700 text-amber-400 flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-white">{hotel.googleRating || hotel.starRating || 4.9}</span>
                      <span className="text-[10px] text-stone-400">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  {/* Direct Price Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                        {getLocalizedText(hotel.tagline, language)}
                      </div>
                      <h3 className="font-serif-luxury text-xl font-bold leading-tight">
                        {hotel.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Address & Google Maps link */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 text-stone-600 text-xs">
                        <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-stone-800">{hotel.fullAddress}</p>
                          {hotel.ward && (
                            <p className="text-[11px] text-stone-500 mt-0.5">{hotel.ward}</p>
                          )}
                        </div>
                      </div>
                      <a
                        href={hotel.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors shrink-0"
                        title={t.openMaps}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {getLocalizedText(hotel.description, language)}
                    </p>

                    {/* Transit Proximity Badges */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-medium pt-1">
                      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-700">
                        <span className="text-stone-500 block text-[10px]">{t.metroDistance}</span>
                        <span className="font-bold text-stone-900">
                          {hotel.distanceMetrics.metroMinutes} {t.minuteSuffix} (350m)
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-700">
                        <span className="text-stone-500 block text-[10px]">{t.district1Distance}</span>
                        <span className="font-bold text-stone-900">
                          {hotel.distanceMetrics.district1Minutes} {t.minuteSuffix}
                        </span>
                      </div>
                    </div>

                    {/* Highlights bullet list */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      {getLocalizedList(hotel.features, language).slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-stone-500 block">
                          {t.dailyRate}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          {t.directBookingRateText}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-amber-950 tracking-tight">
                          {hotel.priceRange.dailyFrom.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs font-bold text-stone-700 ml-1">{t.perNight}</span>
                      </div>
                    </div>

                    {/* Multi-channel Contact Grid for this specific branch (Phone, Zalo, WhatsApp, WeChat) */}
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                      <a
                        href={phoneTel}
                        className="py-2 px-1 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-colors"
                        title={`Gọi ${phoneDisplay}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">Hotline</span>
                      </a>
                      <a
                        href={zaloUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-colors"
                        title="Chat Zalo"
                      >
                        <ZaloIcon className="w-3.5 h-3.5" />
                        <span className="truncate">{t.chatZalo}</span>
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-1 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-colors"
                        title="Chat WhatsApp"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span className="truncate">{t.chatWhatsApp}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenWeChat) onOpenWeChat(wechatBranch);
                        }}
                        className="py-2 px-1 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer"
                        title="Kết nối WeChat"
                      >
                        <WeChatIcon className="w-3.5 h-3.5" />
                        <span className="truncate">{t.chatWeChat}</span>
                      </button>
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
                        <Phone className="w-3.5 h-3.5 text-amber-300" />
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
