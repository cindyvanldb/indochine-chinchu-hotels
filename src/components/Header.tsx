import React, { useState } from 'react';
import { Phone, MessageCircle, Globe, Menu, X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Language, HotelProperty } from '../types';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  hotels: HotelProperty[];
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenBooking,
  hotels,
  onOpenWeChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const translations = {
    vi: {
      announcement: '🔥 Đặt phòng trực tiếp: Cam kết giá tốt nhất + Ưu tiên chọn phòng đẹp & Lễ tân 24/7',
      hotlineText: 'Hotline:',
      navProperties: 'Cơ Sở Khách Sạn',
      navRooms: 'Hình Ảnh & Tiện Ích Phòng',
      navPerks: 'Đặc Quyền Trực Tiếp',
      navLocation: 'Vị Trí & Bản Đồ Maps',
      navReviews: 'Đánh Giá Khách',
      navFaq: 'Hỏi Đáp',
      bookNow: 'Gọi Đặt Phòng',
      callNow: 'Liên Hệ / Gọi Điện',
      zaloChat: 'Nhắn Tin Zalo',
      selectBranch: 'Hotline theo cơ sở:',
      indochinePhone: 'Indochine Casa (04 Thái Ly): +84 708 570 838',
      chinchuPhone: 'Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy): +84 966 572 935',
      languageLabel: 'Ngôn ngữ:',
      selectBranchTitle: 'Chọn cơ sở liên hệ trực tiếp 24/7:',
      indochineSubtitle: 'Thảo Điền • Phong cách Đông Dương',
      chinchuSubtitle: 'Thảo Điền • Hiện đại & Sầm uất',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      districtTag: 'Thảo Điền & An Khánh • TP. Hồ Chí Minh',
      langSelectLabel: 'Ngôn ngữ / Language:',
      contactButtonText: 'Liên Hệ 24/7',
    },
    en: {
      announcement: '🔥 Direct Booking Privilege: Guaranteed Best Rate + Priority Room Assignment & 24/7 Front Desk',
      hotlineText: 'Hotlines:',
      navProperties: 'Hotel Branches',
      navRooms: 'Room Gallery & Amenities',
      navPerks: 'Direct Booking Perks',
      navLocation: 'Location & Maps',
      navReviews: 'Guest Reviews',
      navFaq: 'FAQ',
      bookNow: 'Book Direct Now',
      callNow: 'Call Front Desk',
      zaloChat: 'Zalo Chat',
      selectBranch: 'Hotline by property:',
      indochinePhone: 'Indochine Casa (04 Thai Ly): +84 708 570 838',
      chinchuPhone: 'Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy): +84 966 572 935',
      languageLabel: 'Language:',
      selectBranchTitle: 'Select location to contact directly 24/7:',
      indochineSubtitle: 'Thao Dien • Classic Indochine Vibe',
      chinchuSubtitle: 'Thao Dien • Modern & Vibrant',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      districtTag: 'Thao Dien & An Khanh • Ho Chi Minh City',
      langSelectLabel: 'Language:',
      contactButtonText: 'Contact 24/7',
    },
    ko: {
      announcement: '🔥 공식 직영 예약: 최저가 보장 + 선호 객실 배정 & 24시간 프런트 데스크',
      hotlineText: '핫라인:',
      navProperties: '호텔 지점',
      navRooms: '객실 사진 & 편의시설',
      navPerks: '직접 예약 혜택',
      navLocation: '위치 및 지도',
      navReviews: '고객 이용 후기',
      navFaq: '자주 묻는 질문',
      bookNow: '바로 예약하기',
      callNow: '전화 문의',
      zaloChat: 'Zalo 상담',
      selectBranch: '지점별 핫라인:',
      indochinePhone: 'Indochine Casa (04 Thai Ly): +84 708 570 838',
      chinchuPhone: 'Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy): +84 966 572 935',
      languageLabel: '언어 선택 (Language):',
      selectBranchTitle: '지점 선택 및 24시간 실시간 직통 문의:',
      indochineSubtitle: '타오디엔 • 클래식 인도차이나 감성',
      chinchuSubtitle: '타오디엔 • 모던 & 도심 번화가',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
      districtTag: '호치민 타오디엔 & 안칸',
      langSelectLabel: '언어 선택 (Language):',
      contactButtonText: '24시간 직통 문의',
    },
    zh: {
      announcement: '🔥 官方直订特权：全网最低价保证 + 优选房型 & 24小时前台服务',
      hotlineText: '服务热线:',
      navProperties: '酒店分店',
      navRooms: '客房实景与设施',
      navPerks: '直接预订礼遇',
      navLocation: '地理位置与地图',
      navReviews: '住客好评',
      navFaq: '常见问题',
      bookNow: '立即直接预订',
      callNow: '致电前台',
      zaloChat: 'Zalo 在线咨询',
      selectBranch: '各分店热线:',
      indochinePhone: 'Indochine Casa (04 Thai Ly): +84 708 570 838',
      chinchuPhone: 'Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy): +84 966 572 935',
      languageLabel: '语言选择 (Language):',
      selectBranchTitle: '选择分店 24小时即时联系:',
      indochineSubtitle: '草田 • 经典法式印支风格',
      chinchuSubtitle: '草田 • 现代轻奢与繁华商圈',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
      districtTag: '胡志明市草田与安庆',
      langSelectLabel: '语言选择 (Language):',
      contactButtonText: '24小时客服咨询',
    },
  };

  const t = translations[language] || translations.vi;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* 1. Dedicated Top Row for Language Selection in the Corner */}
      <div className="bg-[#031c17] text-stone-300 text-xs py-1.5 px-4 border-b border-emerald-950/80">
        <div className="max-w-7xl mx-auto flex items-center justify-end">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-stone-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold text-amber-300/90">{t.languageLabel}</span>
            </span>
            <div className="flex items-center gap-1 bg-stone-900/90 rounded-lg p-0.5 border border-stone-700/80 shadow-xs">
              <button
                type="button"
                onClick={() => onLanguageChange('vi')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  language === 'vi'
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                aria-label="Tiếng Việt"
              >
                <span>🇻🇳</span>
                <span>VIỆT</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                aria-label="English"
              >
                <span>🇬🇧</span>
                <span>ANH</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ko')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  language === 'ko'
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                aria-label="한국어"
              >
                <span>🇰🇷</span>
                <span>HÀN</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('zh')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  language === 'zh'
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                aria-label="中文"
              >
                <span>🇨🇳</span>
                <span>TRUNG</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Announcement Banner & Hotlines */}
      <div className="bg-[#052621] text-stone-200 text-xs py-2 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.announcement}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            {/* 1. Indochine Casa Hotline */}
            <a
              href="tel:+84708570838"
              className="flex items-center gap-1 text-stone-300 hover:text-amber-400 font-semibold transition-colors"
              title="Gọi Indochine Casa Hotel (04 Thái Ly): +84 708 570 838"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Indochine Casa: <strong className="text-white hover:text-amber-400">+84 708 570 838</strong></span>
            </a>

            <span className="text-emerald-800 hidden md:inline">|</span>

            {/* 2. Chinchu Stay Hotline */}
            <a
              href="tel:+84966572935"
              className="flex items-center gap-1 text-stone-300 hover:text-amber-400 font-semibold transition-colors"
              title="Gọi Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy): +84 966 572 935"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Chinchu Stay: <strong className="text-white hover:text-amber-400">+84 966 572 935</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group">
            {/* Dual Brand Logos: Exact designs uploaded for Indochine Casa and Chinchu */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-2xl p-1.5 sm:p-2 border border-stone-200/90 shadow-xs group-hover:border-amber-600/60 group-hover:shadow-md transition-all shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}logo-indochine.png`}
                alt="Logo Indochine Casa Hotel"
                className="h-8 sm:h-10 w-auto max-w-[70px] sm:max-w-[95px] object-contain"
                title="Indochine Casa Hotel"
              />
              <div className="w-px h-6 sm:h-7 bg-stone-200" />
              <img
                src={`${import.meta.env.BASE_URL}logo-chinchu.png`}
                alt="Logo Chinchu"
                className="h-8 sm:h-10 w-auto max-w-[50px] sm:max-w-[65px] object-contain"
                title="Chinchu Luxury & Stay"
              />
            </div>

            <div>
              <div className="font-serif-luxury font-bold text-stone-900 text-base sm:text-lg lg:text-xl tracking-tight leading-tight group-hover:text-amber-900 transition-colors">
                INDOCHINE CASA <span className="text-amber-700">&</span> CHINCHU
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium tracking-wider text-stone-500 uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600 inline shrink-0" />
                <span className="truncate">{t.districtTag}</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-stone-700">
            <a
              href="#properties"
              className="hover:text-amber-800 transition-colors py-1"
            >
              {t.navProperties}
            </a>
            <a
              href="#rooms"
              className="hover:text-amber-800 transition-colors py-1"
            >
              {t.navRooms}
            </a>
            <a
              href="#perks"
              className="hover:text-amber-800 transition-colors py-1"
            >
              {t.navPerks}
            </a>
            <a
              href="#location"
              className="hover:text-amber-800 transition-colors py-1"
            >
              {t.navLocation}
            </a>
            <a
              href="#reviews"
              className="hover:text-amber-800 transition-colors py-1"
            >
              {t.navReviews}
            </a>
            <a
              href="#faq"
              className="hover:text-amber-800 transition-colors py-1"
            >
              {t.navFaq}
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            {/* Quick Contact Popover for 4 Channels */}
            <div className="relative">
              <button
                onClick={() => setShowContactDropdown(!showContactDropdown)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  <ZaloIcon className="w-3.5 h-3.5 text-blue-600" />
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <WeChatIcon className="w-3.5 h-3.5 text-[#07C160]" />
                </div>
                <span>{t.contactButtonText}</span>
              </button>

              {showContactDropdown && (
                <div className="absolute right-0 mt-2 w-84 bg-white rounded-3xl shadow-2xl border border-stone-200 p-4 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between font-bold text-stone-900 pb-2 mb-3 border-b border-stone-100">
                    <span>{t.selectBranchTitle}</span>
                    <button
                      onClick={() => setShowContactDropdown(false)}
                      className="text-stone-400 hover:text-stone-600 cursor-pointer p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 1. Indochine Casa */}
                  <div className="mb-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <div className="font-bold text-stone-900 text-xs">1. Indochine Casa (04 Thái Ly)</div>
                    <div className="text-[11px] text-stone-500 mb-2">{t.indochineSubtitle}</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href="tel:+84708570838"
                        className="py-1.5 px-2 rounded-lg bg-stone-900 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-stone-800 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>Hotline</span>
                      </a>
                      <a
                        href="https://zalo.me/0708570838"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-blue-700 transition-colors"
                      >
                        <ZaloIcon className="w-3 h-3" />
                        <span>{t.chatZalo}</span>
                      </a>
                      <a
                        href="https://wa.me/84708570838"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg bg-[#25D366] text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-[#1EBE5D] transition-colors"
                      >
                        <WhatsAppIcon className="w-3 h-3" />
                        <span>{t.chatWhatsApp}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setShowContactDropdown(false);
                          if (onOpenWeChat) onOpenWeChat('indochine');
                        }}
                        className="py-1.5 px-2 rounded-lg bg-[#07C160] text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-[#059648] transition-colors cursor-pointer"
                      >
                        <WeChatIcon className="w-3 h-3" />
                        <span>{t.chatWeChat}</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Chinchu Stay */}
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                    <div className="font-bold text-stone-900 text-xs">2. Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy)</div>
                    <div className="text-[11px] text-stone-500 mb-2">{t.chinchuSubtitle}</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href="tel:+84966572935"
                        className="py-1.5 px-2 rounded-lg bg-stone-900 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-stone-800 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>Hotline</span>
                      </a>
                      <a
                        href="https://zalo.me/0966572935"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-blue-700 transition-colors"
                      >
                        <ZaloIcon className="w-3 h-3" />
                        <span>{t.chatZalo}</span>
                      </a>
                      <a
                        href="https://wa.me/84966572935"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg bg-[#25D366] text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-[#1EBE5D] transition-colors"
                      >
                        <WhatsAppIcon className="w-3 h-3" />
                        <span>{t.chatWhatsApp}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setShowContactDropdown(false);
                          if (onOpenWeChat) onOpenWeChat('chinchu');
                        }}
                        className="py-1.5 px-2 rounded-lg bg-[#07C160] text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-[#059648] transition-colors cursor-pointer"
                      >
                        <WeChatIcon className="w-3 h-3" />
                        <span>{t.chatWeChat}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{t.bookNow}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.bookNow}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col gap-2 pb-3 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.langSelectLabel}</span>
            </span>
            <div className="grid grid-cols-4 gap-1.5 bg-stone-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('vi');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg font-bold text-xs transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                  language === 'vi' ? 'bg-white text-amber-800 shadow-sm' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <span className="text-base">🇻🇳</span>
                <span>VIỆT</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('en');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg font-bold text-xs transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                  language === 'en' ? 'bg-white text-amber-800 shadow-sm' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <span className="text-base">🇬🇧</span>
                <span>ANH</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('ko');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg font-bold text-xs transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                  language === 'ko' ? 'bg-white text-amber-800 shadow-sm' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <span className="text-base">🇰🇷</span>
                <span>HÀN</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('zh');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg font-bold text-xs transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                  language === 'zh' ? 'bg-white text-amber-800 shadow-sm' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <span className="text-base">🇨🇳</span>
                <span>TRUNG</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-800 pt-1">
            <a
              href="#properties"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {t.navProperties}
            </a>
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {t.navRooms}
            </a>
            <a
              href="#perks"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {t.navPerks}
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {t.navLocation}
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {t.navReviews}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {t.navFaq}
            </a>
          </div>

          {/* Quick Call, Zalo, WhatsApp & WeChat for both branches on Mobile */}
          <div className="pt-2 border-t border-stone-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-semibold text-center text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs space-y-3">
              {/* Branch 1: Indochine Casa */}
              <div>
                <div className="font-bold text-stone-900 text-xs mb-1.5">1. Indochine Casa (04 Thái Ly):</div>
                <div className="grid grid-cols-4 gap-1">
                  <a
                    href="tel:+84708570838"
                    className="py-2 px-1 rounded-lg bg-stone-900 text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5"
                    title="Gọi +84 708 570 838"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotline</span>
                  </a>
                  <a
                    href="https://zalo.me/0708570838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5"
                    title="Chat Zalo"
                  >
                    <ZaloIcon className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>
                  <a
                    href="https://wa.me/84708570838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenWeChat) onOpenWeChat('indochine');
                    }}
                    className="py-2 px-1 rounded-lg bg-[#07C160] text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                    title="WeChat"
                  >
                    <WeChatIcon className="w-3.5 h-3.5" />
                    <span>WeChat</span>
                  </button>
                </div>
              </div>

              {/* Branch 2: Chinchu Stay */}
              <div>
                <div className="font-bold text-stone-900 text-xs mb-1.5">2. Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy):</div>
                <div className="grid grid-cols-4 gap-1">
                  <a
                    href="tel:+84966572935"
                    className="py-2 px-1 rounded-lg bg-stone-900 text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5"
                    title="Gọi +84 966 572 935"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotline</span>
                  </a>
                  <a
                    href="https://zalo.me/0966572935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5"
                    title="Chat Zalo"
                  >
                    <ZaloIcon className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>
                  <a
                    href="https://wa.me/84966572935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenWeChat) onOpenWeChat('chinchu');
                    }}
                    className="py-2 px-1 rounded-lg bg-[#07C160] text-white font-bold text-[11px] text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                    title="WeChat"
                  >
                    <WeChatIcon className="w-3.5 h-3.5" />
                    <span>WeChat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
