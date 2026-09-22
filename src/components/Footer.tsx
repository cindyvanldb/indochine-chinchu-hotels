import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck, CreditCard, Navigation, Heart } from 'lucide-react';
import { Language, HotelProperty } from '../types';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';
import { getAssetUrl } from '../utils/assets';

interface FooterProps {
  language: Language;
  hotels: HotelProperty[];
  onOpenBooking: (hotelId?: string) => void;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  hotels,
  onOpenBooking,
  onOpenWeChat,
}) => {
  const translations = {
    vi: {
      aboutTitle: 'Về Hệ Thống Khách Sạn',
      aboutDesc: 'Hệ thống cơ sở lưu trú tại An Khánh & Thảo Điền. Indochine Casa cổ điển lãng mạn, Chinchu Luxury hiện đại tiện ích và Chinchu Stay năng động thân thiện giữa trung tâm Hồ Chí Minh.',
      branchTitle: 'Cơ Sở Khách Sạn Thảo Điền',
      contactTitle: 'Thông Tin Liên Hệ & Báo Giá Trực Tiếp',
      hotlineLabel: 'Hotline đặt phòng 24/7:',
      emailLabel: 'Email hỗ trợ:',
      paymentTitle: 'Phương Thức Thanh Toán Linh Hoạt',
      paymentDesc: 'Tiền mặt, Chuyển khoản QR ngân hàng (Vietcombank, MB, Techcombank), Thẻ nội địa & Quốc tế (Visa, Mastercard, JCB).',
      vatInvoice: 'Có hỗ trợ xuất hóa đơn điện tử VAT cho khách công tác & doanh nghiệp.',
      seoKeywordsTitle: 'Từ Khóa Tìm Kiếm Khách Sạn Thảo Điền:',
      rights: 'Bản quyền thuộc về Hệ thống Khách sạn Indochine Casa & Chinchu.',
      allRightsReserved: 'Đã đăng ký bản quyền. Phát triển cho chiến dịch Google Ads & Trải nghiệm khách hàng.',
      bookDirectBtn: 'Để Lại Thông Tin Nhận Báo Giá',
      reception247Notice: 'Tiếp nhận phòng 24/24 tất cả các ngày trong tuần',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    en: {
      aboutTitle: 'About Our Hospitality System',
      aboutDesc: 'Boutique hospitality system in An Khanh & Thao Dien. Indochine Casa classic romance, Chinchu Luxury contemporary comfort, and Chinchu Stay vibrant and friendly in the heart of Ho Chi Minh City.',
      branchTitle: 'Hotel Branches',
      contactTitle: 'Direct Inquiries & Rate Quotes',
      hotlineLabel: '24/7 Direct Reception Hotline:',
      emailLabel: 'Support Email:',
      paymentTitle: 'Flexible Payment Methods',
      paymentDesc: 'Cash upon arrival, Banking QR Transfer, Visa, Mastercard, and JCB accepted.',
      vatInvoice: 'Official electronic corporate VAT invoices available upon request.',
      seoKeywordsTitle: 'Popular Search Queries in Thao Dien:',
      rights: 'Copyright Indochine Casa & Chinchu Hotels.',
      allRightsReserved: 'All rights reserved. Optimized for high-converting direct guest bookings.',
      bookDirectBtn: 'Leave Details for Best Rate Quote',
      reception247Notice: '24/7 Front desk check-in available 365 days a year',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    ko: {
      aboutTitle: '호텔 시스템 소개',
      aboutDesc: '안칸 & 타오디엔 부티크 호텔 시스템. 클래식 로맨스의 인도차이나 카사, 모던 럭셔리의 친추 럭셔리, 활기찬 도심의 친추 스테이.',
      branchTitle: '타오디엔 호텔 지점 안내',
      contactTitle: '직영 문의 및 실시간 견적 안내',
      hotlineLabel: '24시간 직영 예약 핫라인:',
      emailLabel: '고객 지원 이메일:',
      paymentTitle: '편리하고 다양한 결제 수단',
      paymentDesc: '체크인 현장 현금, 계좌이체 QR코드, 국내외 신용카드(Visa, Mastercard, JCB) 사용 가능.',
      vatInvoice: '출장 및 법인 고객을 위한 베트남 전자 세금계산서(VAT) 발행 지원.',
      seoKeywordsTitle: '타오디엔 호텔 인기 검색어:',
      rights: 'Indochine Casa & Chinchu Hotels. All rights reserved.',
      allRightsReserved: '모든 권리 보유. 최고 수준의 투숙 경험 및 직영 예약을 제공합니다.',
      bookDirectBtn: '직영 예약 문의 및 상담',
      reception247Notice: '연중무휴 24시간 체크인 및 프런트 데스크 운영',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '위챗 (WeChat)',
    },
    zh: {
      aboutTitle: '关于精品酒店系统',
      aboutDesc: '安庆与草田精品酒店体系：经典法式印支风情 Indochine Casa、现代商务轻奢 Chinchu Luxury，以及位于核心商业街的 Chinchu Stay。',
      branchTitle: '草田酒店各分店',
      contactTitle: '官方直订咨询与报价',
      hotlineLabel: '24小时直订前台热线：',
      emailLabel: '客户支持邮箱：',
      paymentTitle: '灵活便捷的付款方式',
      paymentDesc: '到店现金支付、越南网银 QR 扫码转账、国际信用卡（Visa、Mastercard、JCB）均可支持。',
      vatInvoice: '可为商务出差与企业客户开具越南合规电子增值税发票（VAT）。',
      seoKeywordsTitle: '胡志明草田热门搜索标签：',
      rights: '版权所有 © Indochine Casa & Chinchu 精品酒店。',
      allRightsReserved: '保留所有权利。专为宾客提供卓越的直订与居停体验。',
      bookDirectBtn: '提交信息获取专属优惠',
      reception247Notice: '全天候 24 小时接待入住，全年无休',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
    },
  };

  const t = translations[language] || translations.vi;

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-28 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-2xl p-2 border border-stone-700 shadow-md shrink-0">
                <img
                  src={getAssetUrl('/logo-indochine.png')}
                  alt="Logo Indochine Casa Hotel"
                  className="h-8 sm:h-9 w-auto max-w-[85px] object-contain"
                  title="Indochine Casa Hotel"
                />
                <div className="w-px h-6 bg-stone-300" />
                <img
                  src={getAssetUrl('/logo-chinchu.png')}
                  alt="Logo Chinchu"
                  className="h-8 sm:h-9 w-auto max-w-[55px] object-contain"
                  title="Chinchu Luxury & Stay"
                />
              </div>
              <div>
                <div className="font-serif-luxury font-bold text-white text-lg tracking-tight">
                  INDOCHINE CASA <span className="text-amber-500">&</span> CHINCHU
                </div>
                <div className="text-[11px] font-medium tracking-wider text-stone-400 uppercase">
                  Boutique Hotels & Serviced Stays Thảo Điền
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              {t.aboutDesc}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {t.bookDirectBtn}
              </button>
            </div>
          </div>

          {/* Column 2: 3 Properties addresses & Maps (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {t.branchTitle}
            </h4>

            <div className="space-y-3 text-xs">
              {hotels.map((h) => (
                <div key={h.id} className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-amber-400">{h.name}</span>
                    <a
                      href={h.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-white flex items-center gap-1 text-[11px] shrink-0"
                    >
                      <span>Google Maps</span>
                      <Navigation className="w-3 h-3 text-amber-500" />
                    </a>
                  </div>
                  <p className="text-stone-300 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{h.fullAddress}</span>
                  </p>
                  <p className="text-stone-400 mt-1 flex items-center gap-1.5 text-[11px]">
                    <Phone className="w-3 h-3 text-stone-500" />
                    <span>Hotline: {h.phone}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & Payment Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {t.contactTitle}
            </h4>

            <div className="space-y-3.5 text-xs">
              {/* Branch 1: Indochine Casa */}
              <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                  Indochine Casa - 04 Thái Ly
                </span>
                <div className="grid grid-cols-4 gap-1">
                  <a
                    href="tel:+84708570838"
                    className="py-1.5 px-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors"
                    title="Gọi +84 708 570 838"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotline</span>
                  </a>
                  <a
                    href="https://zalo.me/0708570838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors"
                    title="Zalo +84 708 570 838"
                  >
                    <ZaloIcon className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>
                  <a
                    href="https://wa.me/84708570838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-1 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors"
                    title="WhatsApp +84 708 570 838"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenWeChat) onOpenWeChat('indochine');
                    }}
                    className="py-1.5 px-1 rounded-lg bg-[#07C160] hover:bg-[#059648] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer"
                    title="WeChat: 0708570838"
                  >
                    <WeChatIcon className="w-3.5 h-3.5" />
                    <span>WeChat</span>
                  </button>
                </div>
              </div>

              {/* Branch 2: Chinchu Stay */}
              <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                  Chinchu Stay - 46 Nguyễn Cừ & 24 Xuân Thủy
                </span>
                <div className="grid grid-cols-4 gap-1">
                  <a
                    href="tel:+84966572935"
                    className="py-1.5 px-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors"
                    title="Gọi +84 966 572 935"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotline</span>
                  </a>
                  <a
                    href="https://zalo.me/0966572935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors"
                    title="Zalo +84 966 572 935"
                  >
                    <ZaloIcon className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>
                  <a
                    href="https://wa.me/84966572935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-1 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors"
                    title="WhatsApp +84 966 572 935"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenWeChat) onOpenWeChat('chinchu');
                    }}
                    className="py-1.5 px-1 rounded-lg bg-[#07C160] hover:bg-[#059648] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer"
                    title="WeChat: 0966572935"
                  >
                    <WeChatIcon className="w-3.5 h-3.5" />
                    <span>WeChat</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-[11px] pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{t.reception247Notice}</span>
              </div>
            </div>

            {/* Payment & VAT notice */}
            <div className="pt-3 border-t border-stone-800 text-xs">
              <span className="font-bold text-stone-200 block mb-1">💳 {t.paymentTitle}</span>
              <p className="text-stone-400 text-[11px] leading-relaxed mb-1">
                {t.paymentDesc}
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{t.vatInvoice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Strip */}
        <div className="py-6 border-b border-stone-800/80 text-[11px] text-stone-500">
          <span className="font-semibold text-stone-400 block mb-1.5">{t.seoKeywordsTitle}</span>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="hover:text-stone-300">Khách sạn Thảo Điền</span>
            <span>•</span>
            <span className="hover:text-stone-300">Khách sạn An Khánh Thủ Đức</span>
            <span>•</span>
            <span className="hover:text-stone-300">Indochine Casa Hotel 4 Thái Ly</span>
            <span>•</span>
            <span className="hover:text-stone-300">Chinchu Luxury Hotel 46 Nguyễn Cừ</span>
            <span>•</span>
            <span className="hover:text-stone-300">Chinchu Stay 24 Xuân Thủy</span>
            <span>•</span>
            <span className="hover:text-stone-300">Khách sạn có bồn tắm Thảo Điền</span>
            <span>•</span>
            <span className="hover:text-stone-300">Khách sạn nghỉ đêm Thảo Điền giá tốt</span>
            <span>•</span>
            <span className="hover:text-stone-300">Boutique Hotel Thao Dien Saigon</span>
            <span>•</span>
            <span className="hover:text-stone-300">Khách sạn gần Ga Metro Thảo Điền</span>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {t.rights}</p>
          <p className="text-[11px]">{t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};
