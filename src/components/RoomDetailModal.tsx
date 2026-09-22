import React, { useState } from 'react';
import { X, Bed, Users, Bath, Sun, Wifi, Tv, ShieldCheck, Check, Calendar, ArrowRight, Clock, Star, Eye, Phone, MessageCircle } from 'lucide-react';
import { Language, RoomType, HotelProperty } from '../types';
import { getLocalizedText, getLocalizedList } from '../utils/i18n';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';
import { getAssetUrl } from '../utils/assets';

interface RoomDetailModalProps {
  room: RoomType | null;
  hotel?: HotelProperty;
  language: Language;
  onClose: () => void;
  onBookRoom: (room: RoomType) => void;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  hotel,
  language,
  onClose,
  onBookRoom,
  onOpenWeChat,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!room) return null;

  const isIndochine = room.hotelId === 'indochine-casa';
  const phoneHref = isIndochine ? 'tel:+84708570838' : 'tel:+84966572935';
  const phoneDisplay = isIndochine ? '+84 708 570 838' : '+84 966 572 935';
  const zaloHref = isIndochine ? 'https://zalo.me/0708570838' : 'https://zalo.me/0966572935';
  const whatsappHref = isIndochine ? 'https://wa.me/84708570838' : 'https://wa.me/84966572935';
  const wechatBranch = isIndochine ? 'indochine' : 'chinchu';

  const translations = {
    vi: {
      roomSpecs: 'Thông số phòng',
      size: 'Diện tích',
      occupancy: 'Sức chứa tiêu chuẩn',
      adultsLabel: 'Người lớn',
      bedType: 'Hạng giường',
      view: 'Hướng nhìn',
      nightlyPriceLabel: 'Giá cơ sở chỉ từ:',
      nightSuffix: '/ đêm',
      amenitiesTitle: 'Trang thiết bị & Tiện nghi phòng',
      policiesTitle: 'Quy định & Chính sách lưu trú',
      checkInPolicy: 'Nhận phòng: 14:00 | Trả phòng: 12:00 (Hỗ trợ nhận sớm theo tình trạng phòng)',
      cleanPolicy: 'Dọn phòng & thay ga gối sạch 100% trước mỗi lượt đón khách',
      cancelPolicy: 'Miễn phí hủy/đổi phòng trước 24h khi liên hệ trực tiếp',
      dailyRateTitle: 'Gọi Hotline Đặt Phòng Trực Tiếp',
      dailyRateSub: 'Quý khách vui lòng gọi điện thoại hoặc nhắn Zalo / WhatsApp / WeChat để lễ tân tư vấn giữ phòng ngay.',
      bookNow: 'Gọi Đặt Phòng',
      callDesk: 'Gọi Hotline',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      close: 'Đóng',
      perksIncluded: 'Đã bao gồm: Wifi tốc độ cao, nước suối, trà cafe và đồ dùng cá nhân cao cấp.',
    },
    en: {
      roomSpecs: 'Room Specifications',
      size: 'Room Size',
      occupancy: 'Standard Occupancy',
      adultsLabel: 'Adults',
      bedType: 'Bed Type',
      view: 'Room View',
      nightlyPriceLabel: 'Property rate starting from:',
      nightSuffix: '/ night',
      amenitiesTitle: 'Amenities & In-room Equipment',
      policiesTitle: 'House Rules & Policies',
      checkInPolicy: 'Check-in: 14:00 | Check-out: 12:00 (Complimentary early check-in subject to availability)',
      cleanPolicy: 'Sanitized & refreshed with 100% fresh crisp linens and towels prior to arrival',
      cancelPolicy: 'Complimentary cancellation up to 24h prior to arrival for direct reservations',
      dailyRateTitle: '24/7 Direct Call Reservations',
      dailyRateSub: 'Please call or chat via Zalo, WhatsApp, or WeChat directly for instant room confirmation and best rates.',
      bookNow: 'Call Front Desk',
      callDesk: 'Call Desk',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      close: 'Close',
      perksIncluded: 'Includes: High-speed Wi-Fi, mineral water, tea, coffee, and luxury toiletries.',
    },
    ko: {
      roomSpecs: '객실 기본 제원',
      size: '면적',
      occupancy: '기준 투숙 인원',
      adultsLabel: '성인 기준',
      bedType: '침대 타입',
      view: '전망 / 뷰',
      nightlyPriceLabel: '지점 최저 1박 요금:',
      nightSuffix: '/ 박',
      amenitiesTitle: '객실 비품 및 편의시설',
      policiesTitle: '체크인 규정 및 편의 안내',
      checkInPolicy: '체크인 14:00 | 체크아웃 12:00 (객실 현황에 따라 무료 얼리 체크인 가능)',
      cleanPolicy: '매 체크인 전 100% 멸균 세탁된 린넨 및 타월 교체, 철저한 살균 청소',
      cancelPolicy: '직영 전화 예약 시 체크인 24시간 전까지 위약금 없이 일정 변경 가능',
      dailyRateTitle: '24시간 직영 예약 핫라인',
      dailyRateSub: '전화, Zalo, WhatsApp 또는 WeChat으로 문의하시면 실시간 잔여 객실 확인 및 최고 혜택을 드립니다.',
      bookNow: '전화 예약하기',
      callDesk: '전화 걸기',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '위챗 (WeChat)',
      close: '닫기',
      perksIncluded: '포함 내역: 초고속 Wi-Fi, 생수, 프리미엄 티 & 커피, 고급 어메니티 일체.',
    },
    zh: {
      roomSpecs: '房型参数与规格',
      size: '房间面积',
      occupancy: '标准容纳人数',
      adultsLabel: '位成人',
      bedType: '床型配置',
      view: '客房景观',
      nightlyPriceLabel: '分店基础起步价：',
      nightSuffix: '/ 晚',
      amenitiesTitle: '房间设备与精致备品',
      policiesTitle: '入住须知与服务守则',
      checkInPolicy: '入住时间 14:00 | 退房时间 次日12:00（视当日房态可享灵活提早入住）',
      cleanPolicy: '每客一换 100% 严苛高温消毒床单被套与毛巾，严格清洁无死角',
      cancelPolicy: '直订尊享入住前 24 小时免费改期或取消',
      dailyRateTitle: '24小时官方直订热线',
      dailyRateSub: '请致电前台或通过微信 WeChat、WhatsApp、Zalo 咨询，专属管家为您即时锁定房间与专享优惠。',
      bookNow: '致电直订',
      callDesk: '前台电话',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
      close: '关闭',
      perksIncluded: '房费包含：高速无线网络、瓶装矿泉水、精选茶饮咖啡及高档洗护备品。',
    },
  };

  const t = translations[language] || translations.vi;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-stone-200 my-4 sm:my-8 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              {hotel ? hotel.name : 'Khách sạn Thảo Điền'}
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              {getLocalizedText(room.name, language)}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 shadow-inner">
              <img
                src={getAssetUrl(room.gallery[activeImageIndex] || room.featuredImage)}
                alt={getLocalizedText(room.name, language)}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-xs font-medium">
                {activeImageIndex + 1} / {room.gallery.length}
              </div>
            </div>

            {/* Thumbnails */}
            {room.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {room.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-600 scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={getAssetUrl(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">{t.size}</span>
                <span className="font-bold text-stone-900 text-sm">{room.size}m²</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">{t.occupancy}</span>
                <span className="font-bold text-stone-900 text-sm">{room.capacity.adults} {t.adultsLabel}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">{t.bedType}</span>
                <span className="font-bold text-stone-900 text-xs truncate max-w-[120px] block">
                  {getLocalizedText(room.bedType, language)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">{t.view}</span>
                <span className="font-bold text-stone-900 text-xs truncate max-w-[120px] block">
                  {getLocalizedText(room.view, language)}
                </span>
              </div>
            </div>
          </div>

          {/* Room Description */}
          <div>
            <p className="text-stone-700 text-sm leading-relaxed font-light">
              {getLocalizedText(room.description, language)}
            </p>
            <p className="text-emerald-800 text-xs font-medium mt-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/60">
              ✨ {t.perksIncluded}
            </p>
          </div>

          {/* Amenities List */}
          <div>
            <h3 className="font-serif-luxury font-bold text-stone-900 text-base mb-3">
              {t.amenitiesTitle}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {getLocalizedList(room.amenities, language).map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 text-xs text-stone-700"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies Box */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-2">
            <h4 className="font-bold text-amber-950 uppercase tracking-wider mb-1">
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

        {/* Modal Footer / Direct Multi-channel CTA */}
        <div className="p-4 sm:p-6 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                {t.nightlyPriceLabel} {hotel ? hotel.priceRange.dailyFrom.toLocaleString('vi-VN') : '600.000'}đ {t.nightSuffix}
              </span>
              <span className="text-xs text-stone-600 font-medium block mt-0.5 max-w-sm">
                {t.dailyRateSub}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-end">
            {/* Quick Multi-channel links: Hotline, Zalo, WhatsApp, WeChat */}
            <a
              href={phoneHref}
              className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              title={`Gọi ${phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{phoneDisplay}</span>
              <span className="sm:hidden">Hotline</span>
            </a>

            <a
              href={zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <ZaloIcon className="w-3.5 h-3.5" />
              <span>{t.chatZalo}</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{t.chatWhatsApp}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenWeChat) onOpenWeChat(wechatBranch);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <WeChatIcon className="w-3.5 h-3.5" />
              <span>{t.chatWeChat}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{t.bookNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
