import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Calendar, ArrowUp, X, CheckCircle2 } from 'lucide-react';
import { Language, HotelProperty } from '../types';

interface FloatingActionBarProps {
  language: Language;
  onOpenBooking: () => void;
  hotels: HotelProperty[];
  selectedHotelId: string;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  language,
  onOpenBooking,
  hotels,
  selectedHotelId,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactModalType, setContactModalType] = useState<'call' | 'zalo' | null>(null);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeHotel = hotels.find((h) => h.id === selectedHotelId) || hotels[0];
  const isIndochine = activeHotel.id === 'indochine-casa';

  // Exact Contact Definitions requested by User
  const indochineContact = {
    name: 'Indochine Casa Hotel',
    address: '04 Thái Ly, P. Thảo Điền, TP. Thủ Đức',
    hotlineDisplay: '+84 708 570 838',
    hotlineTel: 'tel:+84708570838',
    zaloDisplay: '+84 708 570 838',
    zaloUrl: 'https://zalo.me/0708570838',
    logo: '/logo-indochine.png',
  };

  const chinchuContact = {
    name: 'Chinchu Stay',
    address: '46 Nguyễn Cừ & 24 Xuân Thủy, Thảo Điền',
    hotlineDisplay: '+84 966 572 935',
    hotlineTel: 'tel:+84966572935',
    zaloDisplay: '+84 966 572 935',
    zaloUrl: 'https://zalo.me/0966572935',
    logo: '/logo-chinchu.png',
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = {
    vi: {
      call: 'Gọi điện',
      zalo: 'Chat Zalo',
      maps: 'Bản đồ',
      book: 'Đặt phòng',
      chooseFacilityCall: 'Chọn cơ sở cần gọi Hotline 24/7:',
      chooseFacilityZalo: 'Chọn cơ sở để nhắn Chat Zalo tư vấn:',
      indochineDesc: 'Phong cách Indochine cổ điển • Bồn tắm ngâm',
      chinchuDesc: 'Phong cách hiện đại • Ngay phố đi bộ Thảo Điền',
      close: 'Đóng',
    },
    en: {
      call: 'Call',
      zalo: 'Zalo Chat',
      maps: 'Maps',
      book: 'Book Now',
      chooseFacilityCall: 'Choose property to call 24/7 Hotline:',
      chooseFacilityZalo: 'Choose property to chat directly on Zalo:',
      indochineDesc: 'Indochine Boutique Elegance • Soaking Tubs',
      chinchuDesc: 'Modern Suites • Central Thao Dien Xuan Thuy',
      close: 'Close',
    },
  }[language];

  return (
    <>
      {/* Modal Popover for choosing facility (Call / Zalo) */}
      {contactModalType && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setContactModalType(null)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  contactModalType === 'call' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-700'
                }`}>
                  {contactModalType === 'call' ? <Phone className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                </div>
                <h3 className="font-bold text-stone-900 text-sm">
                  {contactModalType === 'call' ? t.chooseFacilityCall : t.chooseFacilityZalo}
                </h3>
              </div>
              <button
                onClick={() => setContactModalType(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option 1: Indochine Casa */}
            <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-lg border border-stone-200 shadow-xs shrink-0">
                    <img src={indochineContact.logo} alt="Indochine Casa" className="h-5 w-auto object-contain" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">{indochineContact.name}</span>
                    <span className="text-[11px] text-stone-600 block">{indochineContact.address}</span>
                  </div>
                </div>
              </div>
              {contactModalType === 'call' ? (
                <a
                  href={indochineContact.hotlineTel}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Gọi Hotline: {indochineContact.hotlineDisplay}</span>
                </a>
              ) : (
                <a
                  href={indochineContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Zalo: {indochineContact.zaloDisplay}</span>
                </a>
              )}
            </div>

            {/* Option 2: Chinchu Stay */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded-lg border border-stone-200 shadow-xs shrink-0">
                    <img src={chinchuContact.logo} alt="Chinchu Stay" className="h-5 w-auto object-contain" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">{chinchuContact.name}</span>
                    <span className="text-[11px] text-stone-600 block">{chinchuContact.address}</span>
                  </div>
                </div>
              </div>
              {contactModalType === 'call' ? (
                <a
                  href={chinchuContact.hotlineTel}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gọi Hotline: {chinchuContact.hotlineDisplay}</span>
                </a>
              ) : (
                <a
                  href={chinchuContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Zalo: {chinchuContact.zaloDisplay}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar (visible on md:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl p-2 md:hidden">
        <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
          {/* 1. Gọi điện (mở modal chọn 2 cơ sở) */}
          <button
            type="button"
            onClick={() => setContactModalType('call')}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors active:scale-95 cursor-pointer"
            aria-label="Gọi điện thoại Hotline 2 cơ sở"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-1">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold leading-none">{t.call}</span>
          </button>

          {/* 2. Chat Zalo (mở modal chọn 2 cơ sở) */}
          <button
            type="button"
            onClick={() => setContactModalType('zalo')}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-100 hover:bg-blue-50 text-blue-700 transition-colors active:scale-95 cursor-pointer"
            aria-label="Nhắn tin Zalo 2 cơ sở"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold leading-none">{t.zalo}</span>
          </button>

          {/* 3. Google Maps */}
          <a
            href={activeHotel.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-100 hover:bg-emerald-50 text-emerald-700 transition-colors active:scale-95"
            aria-label="Mở bản đồ Google Maps"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold leading-none">{t.maps}</span>
          </a>

          {/* 4. Đặt phòng ngay */}
          <button
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md active:scale-95 cursor-pointer"
            aria-label="Đặt phòng ngay"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold leading-none">{t.book}</span>
          </button>
        </div>
      </div>

      {/* Desktop Floating Speed-Dial Buttons (hidden on mobile, visible on md:flex) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3">
        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white text-stone-700 shadow-lg border border-stone-200 hover:bg-stone-100 flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Contact Panel Popover for Desktop */}
        {showDesktopMenu && (
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-4 w-80 mb-1 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Hotline & Zalo Trực Tiếp 24/7</span>
              </div>
              <button
                onClick={() => setShowDesktopMenu(false)}
                className="w-6 h-6 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cơ sở 1: Indochine Casa */}
            <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
              <div className="flex items-center gap-2 mb-1.5">
                <img src={indochineContact.logo} alt="Indochine Casa" className="h-5 w-auto object-contain" />
                <div className="min-w-0">
                  <div className="font-bold text-xs text-stone-900 leading-tight">Indochine Casa (04 Thái Ly)</div>
                  <div className="text-[10px] text-stone-500 truncate">Thảo Điền, TP. Thủ Đức</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <a
                  href={indochineContact.hotlineTel}
                  className="py-1.5 px-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Gọi +84 708 570 838"
                >
                  <Phone className="w-3 h-3 text-amber-300" />
                  <span>+84 708 570 838</span>
                </a>
                <a
                  href={indochineContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Chat Zalo +84 708 570 838"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Chat Zalo</span>
                </a>
              </div>
            </div>

            {/* Cơ sở 2: Chinchu Stay */}
            <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 mb-1.5">
                <img src={chinchuContact.logo} alt="Chinchu Stay" className="h-5 w-auto object-contain" />
                <div className="min-w-0">
                  <div className="font-bold text-xs text-stone-900 leading-tight">Chinchu Stay (Nguyễn Cừ & Xuân Thủy)</div>
                  <div className="text-[10px] text-stone-500 truncate">Thảo Điền, TP. Thủ Đức</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <a
                  href={chinchuContact.hotlineTel}
                  className="py-1.5 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Gọi +84 966 572 935"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>+84 966 572 935</span>
                </a>
                <a
                  href={chinchuContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Chat Zalo +84 966 572 935"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Zalo</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 1. Nút Zalo: Chỉ thể hiện Chat Zalo, khi bấm vào hiện popup chọn từng cơ sở */}
        <div className="relative group flex items-center">
          {/* Tooltip hovering for Zalo choices */}
          <div className="absolute right-full mr-2 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-2.5 rounded-2xl shadow-xl text-xs whitespace-nowrap min-w-[260px] z-50">
            <span className="text-[11px] text-stone-400 font-semibold px-1">Chọn cơ sở chat Zalo:</span>
            <a
              href={indochineContact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-bold flex items-center justify-between gap-3"
            >
              <span>Indochine Casa (04 Thái Ly)</span>
              <span className="text-[11px] text-blue-100 font-mono">{indochineContact.zaloDisplay}</span>
            </a>
            <a
              href={chinchuContact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-bold flex items-center justify-between gap-3"
            >
              <span>Chinchu Stay (Nguyễn Cừ & Xuân Thủy)</span>
              <span className="text-[11px] text-blue-100 font-mono">{chinchuContact.zaloDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setContactModalType('zalo')}
            className="relative flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer font-bold text-xs"
            aria-label="Chat Zalo"
          >
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
            <MessageCircle className="w-5 h-5" />
            <span>Chat Zalo</span>
          </button>
        </div>

        {/* 2. Nút Hotline: Chỉ thể hiện Hotline, khi bấm vào hiện popup chọn từng cơ sở */}
        <div className="relative group flex items-center">
          {/* Tooltip hovering for Hotline choices */}
          <div className="absolute right-full mr-2 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-2.5 rounded-2xl shadow-xl text-xs whitespace-nowrap min-w-[260px] z-50">
            <span className="text-[11px] text-stone-400 font-semibold px-1">Gọi Hotline 24/7 từng cơ sở:</span>
            <a
              href={indochineContact.hotlineTel}
              className="px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold flex items-center justify-between gap-3"
            >
              <span>Indochine Casa (04 Thái Ly)</span>
              <span className="text-[11px] text-amber-200 font-mono">{indochineContact.hotlineDisplay}</span>
            </a>
            <a
              href={chinchuContact.hotlineTel}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold flex items-center justify-between gap-3"
            >
              <span>Chinchu Stay (Nguyễn Cừ & Xuân Thủy)</span>
              <span className="text-[11px] text-amber-300 font-mono">{chinchuContact.hotlineDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setContactModalType('call')}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer font-bold text-xs"
            aria-label="Call Hotline"
          >
            <Phone className="w-5 h-5 text-amber-300" />
            <span>Hotline</span>
          </button>
        </div>
      </div>
    </>
  );
};

