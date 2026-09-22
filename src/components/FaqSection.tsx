import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { Language, FAQItem } from '../types';
import { getLocalizedText } from '../utils/i18n';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';

interface FaqSectionProps {
  language: Language;
  faqs: FAQItem[];
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  language,
  faqs,
  onOpenWeChat,
}) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const translations = {
    vi: {
      badge: 'Giải Đáp Thắc Mắc Thường Gặp',
      title: 'Câu Hỏi & Thông Tin Cần Biết Khi Đặt Phòng',
      subtitle: 'Mọi thắc mắc của bạn về dịch vụ, vị trí, giờ giấc và phương thức thanh toán đều được giải đáp chi tiết dưới đây.',
      stillQuestions: 'Bạn vẫn còn thắc mắc cần tư vấn thêm?',
      contactSupport: 'Đội ngũ lễ tân 24/7 luôn sẵn sàng hỗ trợ bạn qua Hotline, Zalo, WhatsApp hoặc WeChat trực tiếp tại 2 cơ sở:',
      branch1Name: 'Indochine Casa - 04 Thái Ly',
      branch2Name: 'Chinchu Stay - 46 Nguyễn Cừ & 24 Xuân Thủy',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    en: {
      badge: 'Frequently Asked Questions',
      title: 'Essential Information Before Reserving',
      subtitle: 'Clear answers regarding nightly rates, check-in policies, parking, transit times, and official tax invoicing.',
      stillQuestions: 'Have more specific questions?',
      contactSupport: 'Our 24/7 concierge team is ready to assist you anytime via Phone, Zalo, WhatsApp or WeChat at our 2 locations:',
      branch1Name: 'Indochine Casa - 04 Thai Ly',
      branch2Name: 'Chinchu Stay - 46 Nguyen Cu & 24 Xuan Thuy',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    ko: {
      badge: '자주 묻는 질문 (FAQ)',
      title: '예약 전 꼭 알아두어야 할 핵심 안내',
      subtitle: '1박 요금, 체크인 규정, 주차, 교통 및 영수증 발행에 관한 모든 정보를 상세히 안내해 드립니다.',
      stillQuestions: '추가로 궁금한 점이 있으신가요?',
      contactSupport: '24시간 상주하는 전문 프런트 팀이 각 지점별 전화, Zalo, WhatsApp 및 WeChat으로 즉시 친절하게 도와드립니다:',
      branch1Name: '인도차이나 카사 - 04 Thai Ly',
      branch2Name: '친추 스테이 - 46 Nguyen Cu & 24 Xuan Thuy',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '위챗 (WeChat)',
    },
    zh: {
      badge: '住客常见疑问解答 (FAQ)',
      title: '预订入住前核心须知与常见问题',
      subtitle: '关于每晚房价、入住时间、押金政策、停车设施、前往市中心交通及发票等信息均在此详细解答。',
      stillQuestions: '还有其他疑问或个性化需求？',
      contactSupport: '24小时贴心前台管家随时在线，通过专属热线、Zalo、WhatsApp 或微信 WeChat 为您提供即时解答：',
      branch1Name: 'Indochine Casa - 04 Thai Ly',
      branch2Name: 'Chinchu Stay - 46 Nguyen Cu & 24 Xuan Thuy',
      chatZalo: 'Zalo',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
    },
  };

  const t = translations[language] || translations.vi;

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white text-stone-900 scroll-mt-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-all bg-white hover:border-amber-400"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-serif-luxury font-bold text-base sm:text-lg text-stone-900 hover:text-amber-800 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                    <span>{getLocalizedText(faq.question, language)}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-amber-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    <p>{getLocalizedText(faq.answer, language)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white text-center shadow-xl">
          <div className="max-w-xl mx-auto mb-6">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold mb-2">
              {t.stillQuestions}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm">
              {t.contactSupport}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            {/* Branch 1: Indochine Casa */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {t.branch1Name}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <a
                  href="tel:+84708570838"
                  className="py-2 px-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs"
                  title="Gọi Indochine Casa: +84 708 570 838"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hotline</span>
                </a>
                <a
                  href="https://zalo.me/0708570838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs"
                  title="Zalo Indochine Casa"
                >
                  <ZaloIcon className="w-3.5 h-3.5" />
                  <span>{t.chatZalo}</span>
                </a>
                <a
                  href="https://wa.me/84708570838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-1 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs"
                  title="WhatsApp Indochine Casa"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWhatsApp}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWeChat) onOpenWeChat('indochine');
                  }}
                  className="py-2 px-1 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs cursor-pointer"
                  title="WeChat Indochine Casa"
                >
                  <WeChatIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWeChat}</span>
                </button>
              </div>
            </div>

            {/* Branch 2: Chinchu Stay */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {t.branch2Name}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <a
                  href="tel:+84966572935"
                  className="py-2 px-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs"
                  title="Gọi Chinchu Stay: +84 966 572 935"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hotline</span>
                </a>
                <a
                  href="https://zalo.me/0966572935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs"
                  title="Zalo Chinchu Stay"
                >
                  <ZaloIcon className="w-3.5 h-3.5" />
                  <span>{t.chatZalo}</span>
                </a>
                <a
                  href="https://wa.me/84966572935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-1 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs"
                  title="WhatsApp Chinchu Stay"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWhatsApp}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWeChat) onOpenWeChat('chinchu');
                  }}
                  className="py-2 px-1 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-xs cursor-pointer"
                  title="WeChat Chinchu Stay"
                >
                  <WeChatIcon className="w-3.5 h-3.5" />
                  <span>{t.chatWeChat}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
