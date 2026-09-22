import React from 'react';
import { X, Phone, MessageCircle, MapPin, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Language, HotelProperty, RoomType } from '../types';
import { getLocalizedText } from '../utils/i18n';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';

interface DirectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  hotels: HotelProperty[];
  rooms: RoomType[];
  initialHotelId?: string;
  initialRoomId?: string;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const DirectBookingModal: React.FC<DirectBookingModalProps> = ({
  isOpen,
  onClose,
  language,
  hotels,
  rooms,
  initialHotelId,
  initialRoomId,
  onOpenWeChat,
}) => {
  if (!isOpen) return null;

  const preselectedHotel = hotels.find((h) => h.id === initialHotelId) || hotels[0];
  const preselectedRoom = rooms.find((r) => r.id === initialRoomId);

  const translations = {
    vi: {
      badge: 'Hotline Đặt Phòng Trực Tiếp',
      title: 'Gọi Điện Đặt Phòng Trực Tiếp 24/7',
      subtitle: 'Quý khách vui lòng gọi điện thoại trực tiếp hoặc nhắn tin Zalo / WhatsApp / WeChat đến lễ tân để được tư vấn giá ưu đãi và giữ phòng ngay tức thì.',
      viewingRoom: 'Quý khách đang quan tâm:',
      branch1Badge: 'Cơ sở 1',
      branch2Badge: 'Cơ sở 2 & 3',
      branchIndochineTitle: '1. Indochine Casa Hotel',
      branchIndochineAddress: '04 Thái Ly, P. Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
      branchIndochinePhone: '+84 708 570 838',
      branchIndochineDesc: 'Phong cách Đông Dương sang trọng • Bồn tắm thư giãn cao cấp • Ban công ngập tràn ánh sáng',
      branchChinchuTitle: '2. Chinchu Luxury & Chinchu Stay',
      branchChinchuAddress: '46 Nguyễn Cừ & 24 Xuân Thủy, P. Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
      branchChinchuPhone: '+84 966 572 935',
      branchChinchuDesc: 'Hiện đại sầm uất ngay trung tâm phố đi bộ Xuân Thủy & khu ẩm thực Thảo Điền',
      callNowBtn: 'Gọi hotline',
      chatZaloBtn: 'Zalo',
      chatWhatsAppBtn: 'WhatsApp',
      chatWeChatBtn: 'WeChat',
      perksTitle: 'Đặc Quyền Khi Gọi Điện Đặt Phòng Trực Tiếp:',
      perk1: 'Lễ tân trực 24/7 giải đáp & xác nhận phòng ngay',
      perk2: 'Ưu tiên chọn tầng cao, view thoáng hoặc phòng bồn tắm',
      perk3: 'Không cần thẻ tín dụng, thanh toán khi nhận phòng',
      perk4: 'Hỗ trợ nhận phòng sớm linh hoạt theo tình trạng phòng',
      receptionNotice: 'Lễ tân phục vụ 24/7 tất cả các ngày trong tuần',
      closeBtn: 'Đóng',
    },
    en: {
      badge: '24/7 Direct Booking Hotline',
      title: 'Direct Call Booking & 24/7 Hotline',
      subtitle: 'Please call our front desk directly or chat via Zalo, WhatsApp, or WeChat below for the best direct rates and immediate room confirmation.',
      viewingRoom: 'Selected Room:',
      branch1Badge: 'Property 1',
      branch2Badge: 'Properties 2 & 3',
      branchIndochineTitle: '1. Indochine Casa Hotel',
      branchIndochineAddress: '04 Thai Ly, Thao Dien, Thu Duc City, HCMC',
      branchIndochinePhone: '+84 708 570 838',
      branchIndochineDesc: 'Indochine heritage elegance • Freestanding soaking tubs • Private quiet balconies',
      branchChinchuTitle: '2. Chinchu Luxury & Chinchu Stay',
      branchChinchuAddress: '46 Nguyen Cu & 24 Xuan Thuy, Thao Dien, Thu Duc City, HCMC',
      branchChinchuPhone: '+84 966 572 935',
      branchChinchuDesc: 'Modern comfort right at the heart of Xuan Thuy culinary & nightlife strip',
      callNowBtn: 'Call Hotline',
      chatZaloBtn: 'Zalo',
      chatWhatsAppBtn: 'WhatsApp',
      chatWeChatBtn: 'WeChat',
      perksTitle: 'Direct Booking Privileges & Guarantees:',
      perk1: '24/7 Dedicated Concierge & Instant Confirmation',
      perk2: 'Priority room allocation with premium bathtub or view',
      perk3: 'Zero credit card prepayment required upon booking',
      perk4: 'Flexible complimentary early check-in subject to availability',
      receptionNotice: '24/7 Front desk available 365 days a year',
      closeBtn: 'Close',
    },
    ko: {
      badge: '24시간 직영 예약 핫라인',
      title: '24시간 핫라인 전화 및 메신저 간편 예약',
      subtitle: '아래 각 지점별 직영 핫라인, Zalo, WhatsApp 또는 WeChat으로 문의하시면 최저가 혜택 및 실시간 객실 확인을 바로 도와드립니다.',
      viewingRoom: '현재 확인 중인 객실:',
      branch1Badge: '지점 1',
      branch2Badge: '지점 2 & 3',
      branchIndochineTitle: '1. 인도차이나 카사 호텔 (Indochine Casa)',
      branchIndochineAddress: '04 Thai Ly, Thao Dien, Thu Duc City, HCMC',
      branchIndochinePhone: '+84 708 570 838',
      branchIndochineDesc: '클래식 인도차이나 헤리티지 • 힐링 전신 욕조 • 햇살 가득한 발코니',
      branchChinchuTitle: '2. 친추 럭셔리 & 친추 스테이 (Chinchu)',
      branchChinchuAddress: '46 Nguyen Cu & 24 Xuan Thuy, Thao Dien, Thu Duc City, HCMC',
      branchChinchuPhone: '+84 966 572 935',
      branchChinchuDesc: '타오디엔 쑤언투이 보행자 미식 거리 중심의 세련되고 편리한 모던 숙소',
      callNowBtn: '전화 걸기',
      chatZaloBtn: 'Zalo',
      chatWhatsAppBtn: 'WhatsApp',
      chatWeChatBtn: '위챗 (WeChat)',
      perksTitle: '직접 전화 예약 시 단독 특전:',
      perk1: '24시간 프런트 상주 즉각 안내 및 실시간 예약 확정',
      perk2: '고층 뷰, 타오디엔 전망 또는 욕조 객실 우선 배정',
      perk3: '해외 신용카드 선결제 불필요, 현장 도착 시 편하게 결제',
      perk4: '객실 상황에 따른 무료 얼리 체크인 우선 지원',
      receptionNotice: '연중무휴 24시간 프런트 데스크 친절 운영',
      closeBtn: '닫기',
    },
    zh: {
      badge: '24小时官方直订热线',
      title: '致电前台或在线直订 (24/7)',
      subtitle: '请拨打对应分店前台热线，或通过微信 WeChat、WhatsApp、Zalo 咨询，获取全网直订底价并即时锁定心仪房型。',
      viewingRoom: '您当前浏览的房型：',
      branch1Badge: '分店 1',
      branch2Badge: '分店 2 & 3',
      branchIndochineTitle: '1. Indochine Casa 印支风情精品酒店',
      branchIndochineAddress: '胡志明市守德市草田坊蔡莉街04号 (04 Thai Ly, Thao Dien)',
      branchIndochinePhone: '+84 708 570 838',
      branchIndochineDesc: '典雅法式印支风格 • 舒缓身心大浴缸 • 采光通透独立阳台',
      branchChinchuTitle: '2. Chinchu Luxury & Chinchu Stay',
      branchChinchuAddress: '胡志明市守德市草田坊阮巨街46号与春水街24号',
      branchChinchuPhone: '+84 966 572 935',
      branchChinchuDesc: '坐落于草田春水美食街核心商圈，现代商务与活力夜生活近在咫尺',
      callNowBtn: '致电前台',
      chatZaloBtn: 'Zalo',
      chatWhatsAppBtn: 'WhatsApp',
      chatWeChatBtn: '微信 (WeChat)',
      perksTitle: '官方直订专属尊享礼遇：',
      perk1: '24小时前台专属管家在线，即时确认保留房态',
      perk2: '优先挑选高楼层开阔景观房或特色泡澡浴缸客房',
      perk3: '无需信用卡线上扣费，到店办理入住现场付款',
      perk4: '视实际房态尊享免费提前入住礼遇',
      receptionNotice: '全天候 24 小时前台接待，全年无休',
      closeBtn: '关闭',
    },
  };

  const t = translations[language] || translations.vi;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            {t.title}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          {/* Viewing Room Preview if triggered from room card */}
          {preselectedRoom && (
            <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-amber-300 font-semibold block">{t.viewingRoom}</span>
                <span className="font-bold text-white text-sm">
                  {getLocalizedText(preselectedRoom.name, language)}
                </span>
                <span className="text-stone-300 ml-2 font-serif-luxury font-bold">
                  {preselectedRoom.price.daily.toLocaleString('vi-VN')}đ/đêm
                </span>
              </div>
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-700">
                <img
                  src={preselectedRoom.featuredImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content: 2 Branches Direct Calling Cards */}
        <div className="p-5 sm:p-7 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* 1. Indochine Casa */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              initialHotelId === 'indochine-casa'
                ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-500/20 shadow-sm'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-amber-800 text-white font-bold">
                    {t.branch1Badge}
                  </span>
                  <h3 className="font-serif-luxury font-bold text-stone-900 text-base sm:text-lg">
                    {t.branchIndochineTitle}
                  </h3>
                </div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{t.branchIndochineAddress}</span>
                </p>
              </div>
              <img
                src="/logo-indochine.png"
                alt="Indochine Casa Logo"
                className="h-8 w-auto max-w-[70px] object-contain shrink-0 hidden sm:block"
              />
            </div>

            <p className="text-xs text-stone-600 mb-3.5 font-light leading-relaxed">
              {t.branchIndochineDesc}
            </p>

            {/* 4 contact channels: Phone, Zalo, WhatsApp, WeChat */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href="tel:+84708570838"
                className="py-2.5 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{t.callNowBtn}</span>
              </a>

              <a
                href="https://zalo.me/0708570838"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <ZaloIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.chatZaloBtn}</span>
              </a>

              <a
                href="https://wa.me/84708570838"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.chatWhatsAppBtn}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenWeChat) onOpenWeChat('indochine');
                }}
                className="py-2.5 px-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <WeChatIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.chatWeChatBtn}</span>
              </button>
            </div>
          </div>

          {/* 2. Chinchu Luxury & Chinchu Stay */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              initialHotelId !== 'indochine-casa'
                ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-500/20 shadow-sm'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-stone-800 text-white font-bold">
                    {t.branch2Badge}
                  </span>
                  <h3 className="font-serif-luxury font-bold text-stone-900 text-base sm:text-lg">
                    {t.branchChinchuTitle}
                  </h3>
                </div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{t.branchChinchuAddress}</span>
                </p>
              </div>
              <img
                src="/logo-chinchu.png"
                alt="Chinchu Logo"
                className="h-8 w-auto max-w-[50px] object-contain shrink-0 hidden sm:block"
              />
            </div>

            <p className="text-xs text-stone-600 mb-3.5 font-light leading-relaxed">
              {t.branchChinchuDesc}
            </p>

            {/* 4 contact channels: Phone, Zalo, WhatsApp, WeChat */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href="tel:+84966572935"
                className="py-2.5 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{t.callNowBtn}</span>
              </a>

              <a
                href="https://zalo.me/0966572935"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <ZaloIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.chatZaloBtn}</span>
              </a>

              <a
                href="https://wa.me/84966572935"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.chatWhatsAppBtn}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenWeChat) onOpenWeChat('chinchu');
                }}
                className="py-2.5 px-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-xs cursor-pointer text-center"
              >
                <WeChatIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.chatWeChatBtn}</span>
              </button>
            </div>
          </div>

          {/* Direct Booking Perks Note */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{t.perksTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.perk1}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.perk2}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.perk3}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.perk4}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-400" />
            <span>{t.receptionNotice}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
