import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck, CreditCard, Navigation, Heart } from 'lucide-react';
import { Language, HotelProperty } from '../types';

interface FooterProps {
  language: Language;
  hotels: HotelProperty[];
  onOpenBooking: (hotelId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  hotels,
  onOpenBooking,
}) => {
  const t = {
    vi: {
      aboutTitle: 'Về Hệ Thống Khách Sạn',
      aboutDesc: 'Hệ thống 3 cơ sở lưu trú cao cấp tại khu vực Thảo Điền & An Khánh, TP. Thủ Đức. Tận hưởng không gian nghỉ dưỡng tĩnh lặng, nội thất tinh tế và vị trí đắc địa gần Ga Metro và các điểm ăn uống sôi động.',
      branchTitle: 'Danh Sách 3 Cơ Sở Lưu Trú',
      contactTitle: 'Thông Tin Liên Hệ & Đặt Phòng',
      hotlineLabel: 'Hotline đặt phòng 24/7:',
      emailLabel: 'Email hỗ trợ:',
      paymentTitle: 'Phương Thức Thanh Toán Linh Hoạt',
      paymentDesc: 'Tiền mặt, Chuyển khoản QR ngân hàng (Vietcombank, MB, Techcombank), Thẻ nội địa & Quốc tế (Visa, Mastercard, JCB).',
      vatInvoice: 'Có hỗ trợ xuất hóa đơn điện tử VAT cho khách công tác & doanh nghiệp.',
      seoKeywordsTitle: 'Từ Khóa Tìm Kiếm Khách Sạn Thảo Điền:',
      rights: 'Bản quyền thuộc về Hệ thống Khách sạn Indochine Casa & Chinchu.',
      allRightsReserved: 'Đã đăng ký bản quyền. Phát triển cho chiến dịch Google Ads & Trải nghiệm khách hàng.',
      bookDirectBtn: 'Đặt Phòng Trực Tiếp Giá Tốt Nhất',
    },
    en: {
      aboutTitle: 'About Our Hospitality Collection',
      aboutDesc: '3 curated boutique accommodation properties in Thao Dien & An Khanh, Thu Duc City, HCMC. Discover serene architecture, bespoke comforts, and unrivaled proximity to the Metro Line and gourmet dining.',
      branchTitle: 'Our 3 Properties',
      contactTitle: 'Direct Reservations & Inquiries',
      hotlineLabel: 'Hotline đặt phòng 24/7:',
      emailLabel: 'Support Email:',
      paymentTitle: 'Flexible Payment Methods',
      paymentDesc: 'Cash upon arrival, Banking QR Transfer, Visa, Mastercard, and JCB accepted.',
      vatInvoice: 'Official electronic corporate VAT invoices available upon request.',
      seoKeywordsTitle: 'Popular Search Queries in Thao Dien:',
      rights: 'Copyright Indochine Casa & Chinchu Hotels.',
      allRightsReserved: 'All rights reserved. Optimized for high-converting Google Ads & mobile guests.',
      bookDirectBtn: 'Book Direct — Best Rate Guaranteed',
    },
  }[language];

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
                  src="/logo-indochine.png"
                  alt="Logo Indochine Casa Hotel"
                  className="h-8 sm:h-9 w-auto max-w-[85px] object-contain"
                  title="Indochine Casa Hotel"
                />
                <div className="w-px h-6 bg-stone-300" />
                <img
                  src="/logo-chinchu.png"
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
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                  Indochine Casa - 04 Thái Ly
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+84708570838"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+84 708 570 838</span>
                  </a>
                  <a
                    href="https://zalo.me/0708570838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>
                </div>
              </div>

              {/* Branch 2: Chinchu Stay */}
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                  Chinchu Stay - 46 Nguyễn Cừ & 24 Xuân Thủy
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+84966572935"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+84 966 572 935</span>
                  </a>
                  <a
                    href="https://zalo.me/0966572935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-[11px] pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Tiếp nhận phòng 24/24 tất cả các ngày trong tuần</span>
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
            <span className="hover:text-stone-300">Thuê phòng khách sạn theo giờ Thảo Điền</span>
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
