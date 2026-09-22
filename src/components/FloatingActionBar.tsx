import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Calendar, ArrowUp, X, Check, Copy } from 'lucide-react';
import { Language, HotelProperty } from '../types';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';
import { getAssetUrl } from '../utils/assets';

interface FloatingActionBarProps {
  language: Language;
  onOpenBooking: () => void;
  hotels: HotelProperty[];
  selectedHotelId: string;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  language,
  onOpenBooking,
  hotels,
  selectedHotelId,
  onOpenWeChat,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactModalType, setContactModalType] = useState<'call' | 'zalo' | 'whatsapp' | 'wechat' | null>(null);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeHotel = hotels.find((h) => h.id === selectedHotelId) || hotels[0];
  const isIndochine = activeHotel.id === 'indochine-casa';

  // Exact Contact Definitions for both properties
  const indochineContact = {
    name: 'Indochine Casa Hotel',
    address: '04 Thái Ly, P. Thảo Điền, TP. Thủ Đức',
    hotlineDisplay: '+84 708 570 838',
    hotlineTel: 'tel:+84708570838',
    zaloDisplay: '+84 708 570 838',
    zaloUrl: 'https://zalo.me/0708570838',
    whatsappDisplay: '+84 708 570 838',
    whatsappUrl: 'https://wa.me/84708570838',
    wechatId: '0708570838',
    logo: getAssetUrl('/logo-indochine.png'),
  };

  const chinchuContact = {
    name: 'Chinchu Stay',
    address: '46 Nguyễn Cừ & 24 Xuân Thủy, Thảo Điền',
    hotlineDisplay: '+84 966 572 935',
    hotlineTel: 'tel:+84966572935',
    zaloDisplay: '+84 966 572 935',
    zaloUrl: 'https://zalo.me/0966572935',
    whatsappDisplay: '+84 966 572 935',
    whatsappUrl: 'https://wa.me/84966572935',
    wechatId: '0966572935',
    logo: getAssetUrl('/logo-chinchu.png'),
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const translations = {
    vi: {
      call: 'Hotline',
      zalo: 'Zalo',
      whatsapp: 'WhatsApp',
      wechat: 'WeChat',
      book: 'Đặt phòng',
      chooseFacilityCall: 'Chọn cơ sở cần gọi Hotline 24/7:',
      chooseFacilityZalo: 'Chọn cơ sở để nhắn Chat Zalo tư vấn:',
      chooseFacilityWhatsApp: 'Chọn cơ sở để nhắn tin qua WhatsApp:',
      chooseFacilityWeChat: 'Chọn cơ sở để kết nối qua WeChat (微信):',
      indochineDesc: 'Phong cách Indochine cổ điển • Bồn tắm ngâm',
      chinchuDesc: 'Phong cách hiện đại • Ngay phố đi bộ Thảo Điền',
      close: 'Đóng',
      callHotlinePrefix: 'Gọi Hotline',
      chatZaloPrefix: 'Chat Zalo',
      chatWhatsAppPrefix: 'Nhắn WhatsApp',
      chatWeChatPrefix: 'WeChat ID',
      copyId: 'Sao chép ID',
      copiedId: 'Đã sao chép!',
      hotlineDirect: 'Hotline & Chat Trực Tiếp 24/7',
      selectFacilityZalo: 'Chọn cơ sở chat Zalo:',
      selectFacilityHotline: 'Gọi Hotline 24/7 từng cơ sở:',
      selectFacilityWhatsApp: 'Nhắn tin WhatsApp 24/7:',
      selectFacilityWeChat: 'Kết nối WeChat (微信) 24/7:',
    },
    en: {
      call: 'Hotline',
      zalo: 'Zalo',
      whatsapp: 'WhatsApp',
      wechat: 'WeChat',
      book: 'Book Now',
      chooseFacilityCall: 'Choose property to call 24/7 Hotline:',
      chooseFacilityZalo: 'Choose property to chat directly on Zalo:',
      chooseFacilityWhatsApp: 'Choose property to chat on WhatsApp:',
      chooseFacilityWeChat: 'Choose property to connect on WeChat (微信):',
      indochineDesc: 'Indochine Boutique Elegance • Soaking Tubs',
      chinchuDesc: 'Modern Suites • Central Thao Dien Xuan Thuy',
      close: 'Close',
      callHotlinePrefix: 'Call Hotline',
      chatZaloPrefix: 'Chat Zalo',
      chatWhatsAppPrefix: 'Chat WhatsApp',
      chatWeChatPrefix: 'WeChat ID',
      copyId: 'Copy ID',
      copiedId: 'Copied!',
      hotlineDirect: 'Direct 24/7 Hotline & Chat',
      selectFacilityZalo: 'Select property for Zalo chat:',
      selectFacilityHotline: 'Call 24/7 Hotline per property:',
      selectFacilityWhatsApp: 'Message on WhatsApp 24/7:',
      selectFacilityWeChat: 'Connect on WeChat (微信) 24/7:',
    },
    ko: {
      call: '핫라인',
      zalo: 'Zalo',
      whatsapp: 'WhatsApp',
      wechat: '위챗 (WeChat)',
      book: '예약 문의',
      chooseFacilityCall: '24시간 핫라인으로 통화할 지점 선택:',
      chooseFacilityZalo: 'Zalo 실시간 채팅 상담할 지점 선택:',
      chooseFacilityWhatsApp: 'WhatsApp 메신저로 상담할 지점 선택:',
      chooseFacilityWeChat: '위챗(WeChat / 微信)으로 상담할 지점 선택:',
      indochineDesc: '클래식 인도차이나 스타일 • 힐링 전신 욕조',
      chinchuDesc: '모던 럭셔리 객실 • 타오디엔 중심 쑤언투이',
      close: '닫기',
      callHotlinePrefix: '핫라인 전화',
      chatZaloPrefix: 'Zalo 상담',
      chatWhatsAppPrefix: 'WhatsApp 상담',
      chatWeChatPrefix: 'WeChat ID',
      copyId: 'ID 복사',
      copiedId: '복사 완료!',
      hotlineDirect: '24시간 핫라인 & 채팅 직영',
      selectFacilityZalo: 'Zalo 상담 지점 선택:',
      selectFacilityHotline: '지점별 24시간 핫라인 전화:',
      selectFacilityWhatsApp: 'WhatsApp 상담 지점 선택:',
      selectFacilityWeChat: '위챗(WeChat / 微信) 지점 선택:',
    },
    zh: {
      call: '电话热线',
      zalo: 'Zalo',
      whatsapp: 'WhatsApp',
      wechat: '微信客服',
      book: '致电直订',
      chooseFacilityCall: '选择您需要拨打 24 小时热线的分店：',
      chooseFacilityZalo: '选择您需要通过 Zalo 在线咨询的分店：',
      chooseFacilityWhatsApp: '选择您需要通过 WhatsApp 咨询的分店：',
      chooseFacilityWeChat: '选择您需要通过微信 (WeChat) 咨询的分店：',
      indochineDesc: '经典法式印支风情 • 放松泡澡大浴缸',
      chinchuDesc: '现代商务轻奢 • 草田春水核心商业步行区',
      close: '关闭',
      callHotlinePrefix: '拨打热线',
      chatZaloPrefix: 'Zalo 咨询',
      chatWhatsAppPrefix: 'WhatsApp 咨询',
      chatWeChatPrefix: '微信号 (WeChat ID)',
      copyId: '复制微信号',
      copiedId: '已复制微信号！',
      hotlineDirect: '24小时官方热线与即时在线咨询',
      selectFacilityZalo: '选择 Zalo 咨询分店：',
      selectFacilityHotline: '各分店 24小时专属热线：',
      selectFacilityWhatsApp: '选择 WhatsApp 咨询分店：',
      selectFacilityWeChat: '选择微信 (WeChat) 咨询分店：',
    },
  };

  const t = translations[language] || translations.vi;

  return (
    <>
      {/* Modal Popover for choosing facility (Call / Zalo / WhatsApp / WeChat) */}
      {contactModalType && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setContactModalType(null)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs ${
                  contactModalType === 'call'
                    ? 'bg-amber-100 text-amber-900'
                    : contactModalType === 'zalo'
                    ? 'bg-blue-100 text-blue-700'
                    : contactModalType === 'whatsapp'
                    ? 'bg-emerald-100 text-[#25D366]'
                    : 'bg-green-100 text-[#07C160]'
                }`}>
                  {contactModalType === 'call' && <Phone className="w-4 h-4" />}
                  {contactModalType === 'zalo' && <ZaloIcon className="w-4 h-4" />}
                  {contactModalType === 'whatsapp' && <WhatsAppIcon className="w-4 h-4" />}
                  {contactModalType === 'wechat' && <WeChatIcon className="w-4 h-4" />}
                </div>
                <h3 className="font-bold text-stone-900 text-sm">
                  {contactModalType === 'call' && t.chooseFacilityCall}
                  {contactModalType === 'zalo' && t.chooseFacilityZalo}
                  {contactModalType === 'whatsapp' && t.chooseFacilityWhatsApp}
                  {contactModalType === 'wechat' && t.chooseFacilityWeChat}
                </h3>
              </div>
              <button
                onClick={() => setContactModalType(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                aria-label={t.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option 1: Indochine Casa */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <div className="flex items-center justify-between gap-2 mb-2.5">
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

              {contactModalType === 'call' && (
                <a
                  href={indochineContact.hotlineTel}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.callHotlinePrefix}: {indochineContact.hotlineDisplay}</span>
                </a>
              )}

              {contactModalType === 'zalo' && (
                <a
                  href={indochineContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <ZaloIcon className="w-3.5 h-3.5" />
                  <span>{t.chatZaloPrefix}: {indochineContact.zaloDisplay}</span>
                </a>
              )}

              {contactModalType === 'whatsapp' && (
                <a
                  href={indochineContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWhatsAppPrefix}: {indochineContact.whatsappDisplay}</span>
                </a>
              )}

              {contactModalType === 'wechat' && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-xl bg-stone-900 text-emerald-300 font-mono text-xs font-bold border border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">ID:</span>
                    <span>{indochineContact.wechatId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('indochine-wechat', indochineContact.wechatId)}
                    className="px-3 py-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    {copiedId === 'indochine-wechat' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>{t.copiedId}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyId}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Option 2: Chinchu Stay */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between gap-2 mb-2.5">
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

              {contactModalType === 'call' && (
                <a
                  href={chinchuContact.hotlineTel}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.callHotlinePrefix}: {chinchuContact.hotlineDisplay}</span>
                </a>
              )}

              {contactModalType === 'zalo' && (
                <a
                  href={chinchuContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <ZaloIcon className="w-3.5 h-3.5" />
                  <span>{t.chatZaloPrefix}: {chinchuContact.zaloDisplay}</span>
                </a>
              )}

              {contactModalType === 'whatsapp' && (
                <a
                  href={chinchuContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWhatsAppPrefix}: {chinchuContact.whatsappDisplay}</span>
                </a>
              )}

              {contactModalType === 'wechat' && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-xl bg-stone-900 text-amber-300 font-mono text-xs font-bold border border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">ID:</span>
                    <span>{chinchuContact.wechatId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('chinchu-wechat', chinchuContact.wechatId)}
                    className="px-3 py-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    {copiedId === 'chinchu-wechat' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>{t.copiedId}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyId}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar (visible on md:hidden) - 5 Clear Touch Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl p-2 md:hidden">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {/* 1. Hotline (Call) */}
          <button
            type="button"
            onClick={() => setContactModalType('call')}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors active:scale-95 cursor-pointer"
            aria-label="Gọi điện thoại Hotline 2 cơ sở"
          >
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-1">
              <Phone className="w-3.5 h-3.5 text-amber-900" />
            </div>
            <span className="text-[10px] font-bold leading-none truncate">{t.call}</span>
          </button>

          {/* 2. Zalo */}
          <button
            type="button"
            onClick={() => setContactModalType('zalo')}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-blue-50/60 hover:bg-blue-100 text-blue-700 transition-colors active:scale-95 cursor-pointer"
            aria-label="Nhắn tin Zalo 2 cơ sở"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
              <ZaloIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none truncate">{t.zalo}</span>
          </button>

          {/* 3. WhatsApp */}
          <button
            type="button"
            onClick={() => setContactModalType('whatsapp')}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100 text-emerald-700 transition-colors active:scale-95 cursor-pointer"
            aria-label="Nhắn tin WhatsApp 2 cơ sở"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center mb-1">
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none truncate">{t.whatsapp}</span>
          </button>

          {/* 4. WeChat */}
          <button
            type="button"
            onClick={() => {
              if (onOpenWeChat) {
                onOpenWeChat();
              } else {
                setContactModalType('wechat');
              }
            }}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-green-50/60 hover:bg-green-100 text-green-700 transition-colors active:scale-95 cursor-pointer"
            aria-label="Kết nối WeChat 2 cơ sở"
          >
            <div className="w-7 h-7 rounded-full bg-green-100 text-[#07C160] flex items-center justify-center mb-1">
              <WeChatIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none truncate">{t.wechat}</span>
          </button>

          {/* 5. Đặt phòng ngay */}
          <button
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md active:scale-95 cursor-pointer"
            aria-label="Gọi đặt phòng ngay"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-200" />
            </div>
            <span className="text-[10px] font-bold leading-none truncate">{t.book}</span>
          </button>
        </div>
      </div>

      {/* Desktop Floating Speed-Dial Buttons (hidden on mobile, visible on md:flex) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-2.5">
        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white text-stone-700 shadow-lg border border-stone-200 hover:bg-stone-100 flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating Contact Panel Popover for Desktop */}
        {showDesktopMenu && (
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-4 w-88 mb-1 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t.hotlineDirect}</span>
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
                  <span>Hotline</span>
                </a>
                <a
                  href={indochineContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Chat Zalo +84 708 570 838"
                >
                  <ZaloIcon className="w-3 h-3" />
                  <span>Zalo</span>
                </a>
                <a
                  href={indochineContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Chat WhatsApp +84 708 570 838"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWeChat) {
                      onOpenWeChat('indochine');
                    } else {
                      setContactModalType('wechat');
                    }
                  }}
                  className="py-1.5 px-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="Kết nối WeChat ID: 0708570838"
                >
                  <WeChatIcon className="w-3 h-3" />
                  <span>WeChat</span>
                </button>
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
                  <span>Hotline</span>
                </a>
                <a
                  href={chinchuContact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Chat Zalo +84 966 572 935"
                >
                  <ZaloIcon className="w-3 h-3" />
                  <span>Zalo</span>
                </a>
                <a
                  href={chinchuContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  title="Chat WhatsApp +84 966 572 935"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWeChat) {
                      onOpenWeChat('chinchu');
                    } else {
                      setContactModalType('wechat');
                    }
                  }}
                  className="py-1.5 px-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="Kết nối WeChat ID: 0966572935"
                >
                  <WeChatIcon className="w-3 h-3" />
                  <span>WeChat</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. Nút WeChat Desktop */}
        <div className="relative group flex items-center">
          <div className="absolute right-full mr-2 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-2.5 rounded-2xl shadow-xl text-xs whitespace-nowrap min-w-[270px] z-50">
            <span className="text-[11px] text-stone-400 font-semibold px-1">{t.selectFacilityWeChat}</span>
            <button
              type="button"
              onClick={() => {
                if (onOpenWeChat) onOpenWeChat('indochine');
                else setContactModalType('wechat');
              }}
              className="px-3 py-2 rounded-xl bg-[#07C160]/90 hover:bg-[#07C160] text-white font-bold flex items-center justify-between gap-3 cursor-pointer text-left"
            >
              <span>Indochine Casa (04 Thái Ly)</span>
              <span className="text-[11px] text-emerald-100 font-mono">ID: {indochineContact.wechatId}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenWeChat) onOpenWeChat('chinchu');
                else setContactModalType('wechat');
              }}
              className="px-3 py-2 rounded-xl bg-[#07C160]/90 hover:bg-[#07C160] text-white font-bold flex items-center justify-between gap-3 cursor-pointer text-left"
            >
              <span>Chinchu Stay (Nguyễn Cừ)</span>
              <span className="text-[11px] text-emerald-100 font-mono">ID: {chinchuContact.wechatId}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onOpenWeChat) onOpenWeChat();
              else setContactModalType('wechat');
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#07C160] hover:bg-[#059648] text-white rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer font-bold text-xs"
            aria-label="WeChat"
          >
            <WeChatIcon className="w-4 h-4" />
            <span>WeChat</span>
          </button>
        </div>

        {/* 2. Nút WhatsApp Desktop */}
        <div className="relative group flex items-center">
          <div className="absolute right-full mr-2 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-2.5 rounded-2xl shadow-xl text-xs whitespace-nowrap min-w-[270px] z-50">
            <span className="text-[11px] text-stone-400 font-semibold px-1">{t.selectFacilityWhatsApp}</span>
            <a
              href={indochineContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-[#25D366]/90 hover:bg-[#25D366] text-white font-bold flex items-center justify-between gap-3"
            >
              <span>Indochine Casa (04 Thái Ly)</span>
              <span className="text-[11px] text-emerald-100 font-mono">{indochineContact.whatsappDisplay}</span>
            </a>
            <a
              href={chinchuContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-[#25D366]/90 hover:bg-[#25D366] text-white font-bold flex items-center justify-between gap-3"
            >
              <span>Chinchu Stay (Nguyễn Cừ)</span>
              <span className="text-[11px] text-emerald-100 font-mono">{chinchuContact.whatsappDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setContactModalType('whatsapp')}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer font-bold text-xs"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* 3. Nút Zalo Desktop */}
        <div className="relative group flex items-center">
          <div className="absolute right-full mr-2 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-2.5 rounded-2xl shadow-xl text-xs whitespace-nowrap min-w-[270px] z-50">
            <span className="text-[11px] text-stone-400 font-semibold px-1">{t.selectFacilityZalo}</span>
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
              <span>Chinchu Stay (Nguyễn Cừ)</span>
              <span className="text-[11px] text-blue-100 font-mono">{chinchuContact.zaloDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setContactModalType('zalo')}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer font-bold text-xs"
            aria-label="Chat Zalo"
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
            </span>
            <ZaloIcon className="w-4 h-4" />
            <span>Zalo</span>
          </button>
        </div>

        {/* 4. Nút Hotline Desktop */}
        <div className="relative group flex items-center">
          <div className="absolute right-full mr-2 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-2.5 rounded-2xl shadow-xl text-xs whitespace-nowrap min-w-[270px] z-50">
            <span className="text-[11px] text-stone-400 font-semibold px-1">{t.selectFacilityHotline}</span>
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
              <span>Chinchu Stay (Nguyễn Cừ)</span>
              <span className="text-[11px] text-amber-300 font-mono">{chinchuContact.hotlineDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setContactModalType('call')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer font-bold text-xs"
            aria-label="Call Hotline"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Hotline</span>
          </button>
        </div>
      </div>
    </>
  );
};
