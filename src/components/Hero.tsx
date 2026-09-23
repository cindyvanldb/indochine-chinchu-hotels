import React from 'react';
import { Star, ArrowRight, Phone, Sparkles, Check, MessageCircle } from 'lucide-react';
import { Language, HotelProperty, BookingType } from '../types';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  language: Language;
  hotels: HotelProperty[];
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  onSearchRooms?: (params: { hotelId: string; bookingType: BookingType; checkInDate: string; checkOutDate: string }) => void;
  onOpenBooking: (hotelId?: string) => void;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  hotels,
  selectedHotelId,
  onSelectHotel,
  onOpenBooking,
  onOpenWeChat,
}) => {
  const activeHotel = hotels.find((h) => h.id === selectedHotelId) || hotels[0];

  const translations = {
    vi: {
      badge: 'Hệ thống cơ sở lưu trú tại An Khánh & Thảo Điền',
      mainTitle: 'Trải nghiệm lưu trú đầy tinh tế gần Thảo Điền, TP Hồ Chí Minh',
      subTitle: 'Hệ thống cơ sở lưu trú tại An Khánh & Thảo Điền. Indochine Casa cổ điển lãng mạn, Chinchu Luxury hiện đại tiện ích và Chinchu Stay năng động thân thiện giữa trung tâm Hồ Chí Minh.',
      pricingHeadline: 'Indochine giá chỉ từ 800.000đ /đêm - Chinchu Stay chỉ 600.000đ /đêm - Chinchu Luxury Hotel chỉ từ 700.000đ /đêm',
      pricingSub: 'Quý khách xem thông tin phòng trên website và gọi điện trực tiếp hotline để lễ tân hỗ trợ đặt phòng nhanh nhất.',
      googleRating: '4.9/5 trên Google Maps (850+ đánh giá xác thực)',
      fromRate: 'Giá chỉ từ',
      perNight: '/ đêm',
      selectedBadge: 'Đang chọn',
      branch1Badge: 'Cơ sở 1',
      branch2Badge: 'Cơ sở 2',
      branch3Badge: 'Cơ sở 3',
      ctaSearch: 'Gọi Đặt Phòng Trực Tiếp',
      ctaViewRooms: 'Xem Ảnh Tham Khảo & Tiện Ích',
      branch1Title: '📍 1. Indochine Casa Hotel (04 Thái Ly)',
      branch2Title: '📍 2. Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy)',
      branchLocation: 'Thảo Điền, TP. Thủ Đức (TP.HCM)',
      perk1: 'Cam kết mức giá trực tiếp tốt nhất',
      perk2: 'Hỗ trợ nhận phòng sớm linh hoạt',
      perk3: 'Không cần thẻ tín dụng quốc tế',
      perk4: 'Lễ tân 24/7 & Hỗ trợ đa kênh tức thì',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    en: {
      badge: 'Hospitality System • An Khanh & Thao Dien',
      mainTitle: 'Refined Boutique Stays in the Heart of Thao Dien',
      subTitle: 'Boutique hospitality system in An Khanh & Thao Dien. Indochine Casa classic romance, Chinchu Luxury contemporary comfort, and Chinchu Stay vibrant and friendly in the heart of Ho Chi Minh City.',
      pricingHeadline: 'Indochine from 800,000 VND / night - Chinchu Stay from 600,000 VND / night - Chinchu Luxury Hotel from 700,000 VND / night',
      pricingSub: 'Browse room photos and call front desk directly for instant reservation & best rates',
      googleRating: '4.9/5 on Google Maps (850+ verified reviews)',
      fromRate: 'Starting from',
      perNight: '/ night',
      selectedBadge: 'Selected',
      branch1Badge: 'Branch 1',
      branch2Badge: 'Branch 2',
      branch3Badge: 'Branch 3',
      ctaSearch: 'Call Front Desk (24/7 Hotline)',
      ctaViewRooms: 'Browse Photos & Room Types',
      branch1Title: '📍 1. Indochine Casa Hotel (04 Thai Ly)',
      branch2Title: '📍 2. Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy)',
      branchLocation: 'Thao Dien, Thu Duc City (HCMC)',
      perk1: 'Guaranteed Best Direct Rate',
      perk2: 'Complimentary early check-in (upon availability)',
      perk3: 'Zero credit card prepayment needed',
      perk4: '24/7 Front Desk & instant multi-channel support',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    ko: {
      badge: '호치민 안칸 & 타오디엔 부티크 숙소',
      mainTitle: '호치민시 타오디엔 중심의 품격 있는 부티크 스테이',
      subTitle: '안칸 & 타오디엔 호텔 시스템. 클래식 로맨스의 인도차이나 카사, 모던 럭셔리의 친추 럭셔리, 활기찬 도심의 친추 스테이.',
      pricingHeadline: '인도차이나 1박 800,000동부터 - 친추 스테이 600,000동부터 - 친추 럭셔리 700,000동부터',
      pricingSub: '웹사이트에서 객실 정보를 둘러보시고 전화로 간편하게 예약하세요',
      googleRating: 'Google 지도 4.9/5 (850개 이상의 실제 후기)',
      fromRate: '1박 최저',
      perNight: '/ 박',
      selectedBadge: '선택됨',
      branch1Badge: '1호점',
      branch2Badge: '2호점',
      branch3Badge: '3호점',
      ctaSearch: '전화로 바로 예약하기 (24/7)',
      ctaViewRooms: '객실 사진 & 타입 보기',
      branch1Title: '📍 1. 인도차이나 카사 (04 Thai Ly)',
      branch2Title: '📍 2. 친추 스테이 (46 Nguyen Cu & 24 Xuan Thuy)',
      branchLocation: '호치민시 투득시 타오디엔',
      perk1: '공식 직영 최저가 보장',
      perk2: '얼리 체크인 우선 지원',
      perk3: '해외 신용카드 선결제 불필요',
      perk4: '24시간 프런트 데스크 & 메신저 상담',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '위챗 (WeChat)',
    },
    zh: {
      badge: '胡志明市安庆与草田精品旅宿',
      mainTitle: '胡志明市第二郡草田 雅致典雅居停体验',
      subTitle: '安庆与草田精品酒店体系：经典法式印支风情 Indochine Casa、现代轻奢商务 Chinchu Luxury，以及位于核心商业街的 Chinchu Stay。',
      pricingHeadline: 'Indochine 每晚 800,000 越南盾起 - Chinchu Stay 600,000 越南盾起 - Chinchu Luxury 700,000 越南盾起',
      pricingSub: '在网站查看房型详情后，直接致电前台热线办理预订',
      googleRating: '谷歌地图 4.9/5（850+ 条真实住客好评）',
      fromRate: '每晚起价',
      perNight: '/ 晚',
      selectedBadge: '已选',
      branch1Badge: '1号店',
      branch2Badge: '2号店',
      branch3Badge: '3号店',
      ctaSearch: '致电前台直订房间 (24/7)',
      ctaViewRooms: '查看客房实景与房型',
      branch1Title: '📍 1. Indochine Casa (蔡莉街04号)',
      branch2Title: '📍 2. Chinchu Stay (阮巨街46号 & 春水街24号)',
      branchLocation: '胡志明市守德市草田坊',
      perk1: '官方直订全网最低价保证',
      perk2: '视房态优先安排提前入住',
      perk3: '无需信用卡预付，到店付款',
      perk4: '24小时前台服务与即时在线咨询',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
    },
  };

  const t = translations[language] || translations.vi;

  const getBranchBadge = (hotelId: string) => {
    if (hotelId === 'indochine-casa') return t.branch1Badge;
    if (hotelId === 'chinchu-luxury') return t.branch2Badge;
    return t.branch3Badge;
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] text-stone-900 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80">
      {/* Background Hero Image with Translucent Glass Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={getAssetUrl(activeHotel.heroImage)}
          alt={activeHotel.name}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out brightness-[0.96] contrast-[1.04]"
        />
        {/* Translucent overlay that lets the hotel photo shine through clearly while preserving contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/70 via-[#FAF8F5]/55 to-[#FAF8F5]/95 backdrop-blur-[1.5px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-stone-200/90 text-stone-800 text-xs font-semibold shadow-2xs backdrop-blur-md">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>{t.googleRating}</span>
          </div>
        </div>

        {/* Main Hero Typography */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col items-center">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight mb-4">
            {t.mainTitle}
          </h1>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal mb-6 max-w-2xl">
            {t.subTitle}
          </p>

          {/* Hotel Selector Cards - Larger, balanced 3-column framed design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl mb-8">
            {hotels.map((h) => {
              const isSelected = selectedHotelId === h.id;

              return (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => onSelectHotel(h.id)}
                  className={`group relative p-4 sm:p-4.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-center backdrop-blur-md ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-50/90 via-white to-amber-50/70 border-2 border-amber-600 text-stone-900 shadow-xl shadow-amber-900/10 ring-2 ring-amber-500/25 scale-[1.02]'
                      : 'bg-white/90 hover:bg-white border border-stone-200/90 text-stone-700 hover:text-stone-900 hover:border-amber-600/50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="w-full">
                    {/* Branch Badge & Selection Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-amber-600 ring-2 ring-amber-400 animate-pulse'
                              : 'bg-stone-300 group-hover:bg-amber-500'
                          }`}
                        />
                        <span
                          className={`text-[11px] font-bold tracking-wider uppercase ${
                            isSelected ? 'text-amber-800' : 'text-stone-500'
                          }`}
                        >
                          {getBranchBadge(h.id)}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80">
                          {t.selectedBadge}
                        </span>
                      )}
                    </div>

                    {/* Hotel Name */}
                    <div className="font-bold text-sm sm:text-base text-stone-900 tracking-tight leading-snug mb-1.5">
                      {h.name}
                    </div>

                    {/* Address */}
                    <div className="text-xs text-stone-600 flex items-center gap-1.5 font-normal">
                      <span className="text-amber-700">📍</span>
                      <span>{h.address} • Thảo Điền</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-8">
            <button
              onClick={() => onOpenBooking(selectedHotelId)}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>{t.ctaSearch}</span>
            </button>
            <a
              href="#rooms"
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>{t.ctaViewRooms}</span>
              <ArrowRight className="w-4 h-4 text-amber-700" />
            </a>
          </div>

          {/* 2 Quick Multi-channel Contact Badges (Hotline, Zalo, WhatsApp, WeChat) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-2xl text-left">
            {/* Branch 1: Indochine Casa */}
            <div className="bg-white/95 border border-stone-200/90 shadow-sm hover:shadow-md rounded-2xl p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                  {t.branch1Title}
                </div>
                <div className="text-[11px] text-stone-600 mb-3">{t.branchLocation}</div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="tel:+84708570838"
                  className="py-1.5 px-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Gọi +84 708 570 838"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-200" />
                  <span>+84 708 570 838</span>
                </a>
                <a
                  href="https://zalo.me/0708570838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Zalo +84 708 570 838"
                >
                  <ZaloIcon className="w-3.5 h-3.5" />
                  <span>{t.chatZalo}</span>
                </a>
                <a
                  href="https://wa.me/84708570838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="WhatsApp +84 708 570 838"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWhatsApp}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWeChat) onOpenWeChat('indochine');
                  }}
                  className="py-1.5 px-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="WeChat ID: 0708570838"
                >
                  <WeChatIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWeChat}</span>
                </button>
              </div>
            </div>

            {/* Branch 2: Chinchu Stay */}
            <div className="bg-white/95 border border-stone-200/90 shadow-sm hover:shadow-md rounded-2xl p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                  {t.branch2Title}
                </div>
                <div className="text-[11px] text-stone-600 mb-3">{t.branchLocation}</div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="tel:+84966572935"
                  className="py-1.5 px-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Gọi +84 966 572 935"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-200" />
                  <span>+84 966 572 935</span>
                </a>
                <a
                  href="https://zalo.me/0966572935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Zalo +84 966 572 935"
                >
                  <ZaloIcon className="w-3.5 h-3.5" />
                  <span>{t.chatZalo}</span>
                </a>
                <a
                  href="https://wa.me/84966572935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="WhatsApp +84 966 572 935"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWhatsApp}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWeChat) onOpenWeChat('chinchu');
                  }}
                  className="py-1.5 px-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="WeChat ID: 0966572935"
                >
                  <WeChatIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWeChat}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Value Props Strip */}
          <div className="pt-4 border-t border-stone-200/90 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-stone-700 w-full max-w-2xl">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-semibold text-stone-900">{t.perk1}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.perk2}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.perk3}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.perk4}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
