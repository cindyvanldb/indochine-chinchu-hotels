import React, { useState } from 'react';
import { Phone, MessageCircle, Globe, Menu, X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Language, HotelProperty } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  hotels: HotelProperty[];
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenBooking,
  hotels,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const t = {
    vi: {
      announcement: '🔥 Đặt phòng trực tiếp: Cam kết giá tốt nhất + Ưu tiên chọn phòng đẹp & Lễ tân 24/7',
      hotlineText: 'Hotline:',
      navProperties: '3 Cơ Sở Khách Sạn',
      navRooms: 'Phòng Nghỉ & Bảng Giá',
      navPerks: 'Đặc Quyền Trực Tiếp',
      navLocation: 'Vị Trí & Bản Đồ Maps',
      navReviews: 'Đánh Giá Khách',
      navFaq: 'Hỏi Đáp',
      bookNow: 'Đặt Phòng Ngay',
      callNow: 'Liên Hệ / Gọi Điện',
      zaloChat: 'Nhắn Tin Zalo',
      selectBranch: 'Hotline theo cơ sở:',
      indochinePhone: 'Indochine Casa (04 Thái Ly): +84 708 570 838',
      chinchuPhone: 'Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy): +84 966 572 935',
    },
    en: {
      announcement: '🔥 Direct Booking Privilege: Guaranteed Best Rate + Priority Room Assignment & 24/7 Front Desk',
      hotlineText: 'Hotlines:',
      navProperties: '3 Locations',
      navRooms: 'Rooms & Rates',
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
    },
  }[language];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200">
      {/* Top Banner for Google Ads high conversion */}
      <div className="bg-[#052621] text-stone-200 text-xs py-1.5 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5">
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
              <span>Indochine Casa (04 Thái Ly): <strong className="text-white hover:text-amber-400">+84 708 570 838</strong></span>
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

            <span className="text-emerald-800 hidden md:inline">|</span>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-stone-900/80 rounded-md p-0.5 border border-emerald-800/50">
              <button
                onClick={() => onLanguageChange('vi')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  language === 'vi' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
                aria-label="Tiếng Việt"
              >
                🇻🇳 VI
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  language === 'en' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
                aria-label="English"
              >
                🇬🇧 EN
              </button>
            </div>
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
                <span className="truncate">Thảo Điền & An Khánh • TP. Hồ Chí Minh</span>
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
            {/* Quick Contact Popover for Zalo & Call */}
            <div className="relative">
              <button
                onClick={() => setShowContactDropdown(!showContactDropdown)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 cursor-pointer shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span>Zalo & Hotline</span>
              </button>

              {showContactDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 text-xs">
                  <div className="font-bold text-stone-900 pb-2 mb-2 border-b border-stone-100">
                    Chọn cơ sở liên hệ trực tiếp:
                  </div>

                  {/* 1. Indochine Casa */}
                  <div className="mb-3 p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="font-bold text-stone-900">1. Indochine Casa (04 Thái Ly)</div>
                    <div className="text-[11px] text-stone-500 mb-2">Thảo Điền • Phong cách Đông Dương</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href="tel:+84708570838"
                        className="py-1.5 px-2 rounded-lg bg-stone-900 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-stone-800"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>+84 708 570 838</span>
                      </a>
                      <a
                        href="https://zalo.me/0708570838"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-blue-700"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Chat Zalo</span>
                      </a>
                    </div>
                  </div>

                  {/* 2. Chinchu Stay */}
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="font-bold text-stone-900">2. Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy)</div>
                    <div className="text-[11px] text-stone-500 mb-2">Thảo Điền • Hiện đại & Sầm uất</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <a
                        href="tel:+84966572935"
                        className="py-1.5 px-2 rounded-lg bg-stone-900 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-stone-800"
                      >
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>+84 966 572 935</span>
                      </a>
                      <a
                        href="https://zalo.me/0966572935"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center gap-1 text-[11px] hover:bg-blue-700"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Chat Zalo</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold"
            >
              {t.bookNow}
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
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase">{t.selectBranch}</span>
            <div className="flex items-center gap-1 bg-stone-100 rounded-md p-0.5">
              <button
                onClick={() => onLanguageChange('vi')}
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  language === 'vi' ? 'bg-amber-700 text-white' : 'text-stone-600'
                }`}
              >
                🇻🇳 VI
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  language === 'en' ? 'bg-amber-700 text-white' : 'text-stone-600'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 text-sm font-medium text-stone-800">
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

          {/* Quick Call & Zalo for both branches on Mobile */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
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

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs space-y-2">
              <div>
                <div className="font-bold text-stone-900 text-[11px] mb-1">1. Indochine Casa (04 Thái Ly):</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:+84708570838"
                    className="py-2 px-2 rounded-lg bg-stone-900 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>+84 708 570 838</span>
                  </a>
                  <a
                    href="https://zalo.me/0708570838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-lg bg-blue-600 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Zalo 0708</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="font-bold text-stone-900 text-[11px] mb-1">2. Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy):</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="tel:+84966572935"
                    className="py-2 px-2 rounded-lg bg-stone-900 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>+84 966 572 935</span>
                  </a>
                  <a
                    href="https://zalo.me/0966572935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-lg bg-blue-600 text-white font-bold text-[11px] text-center flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Zalo 0966</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
