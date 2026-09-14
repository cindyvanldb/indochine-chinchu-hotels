import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { Language, FAQItem } from '../types';

interface FaqSectionProps {
  language: Language;
  faqs: FAQItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  language,
  faqs,
}) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const t = {
    vi: {
      badge: 'Giải Đáp Thắc Mắc Thường Gặp',
      title: 'Câu Hỏi & Thông Tin Cần Biết Khi Đặt Phòng',
      subtitle: 'Mọi thắc mắc của bạn về dịch vụ, vị trí, giờ giấc và phương thức thanh toán đều được giải đáp chi tiết dưới đây.',
      stillQuestions: 'Bạn vẫn còn thắc mắc cần tư vấn thêm?',
      contactSupport: 'Đội ngũ lễ tân 24/7 luôn sẵn sàng hỗ trợ bạn qua Hotline hoặc Zalo trực tiếp tại 2 cơ sở:',
      branch1Name: 'Indochine Casa - 04 Thái Ly',
      branch2Name: 'Chinchu Stay - 46 Nguyễn Cừ & 24 Xuân Thủy',
    },
    en: {
      badge: 'Frequently Asked Questions',
      title: 'Essential Information Before Reserving',
      subtitle: 'Clear answers regarding hourly rates, check-in policies, parking, transit times, and official tax invoicing.',
      stillQuestions: 'Have more specific questions?',
      contactSupport: 'Our 24/7 concierge team is ready to assist you anytime via Phone or Zalo at our 2 locations:',
      branch1Name: 'Indochine Casa - 04 Thai Ly',
      branch2Name: 'Chinchu Stay - 46 Nguyen Cu & 24 Xuan Thuy',
    },
  }[language];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white text-stone-900 scroll-mt-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#062923] text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-800" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-12">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm sm:text-base hover:text-emerald-800 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question[language]}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 border-emerald-300 text-emerald-800' : 'text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50 bg-white">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout for BOTH Branches */}
        <div className="bg-gradient-to-br from-[#062923] via-[#0A3B32] to-[#041F1A] text-white rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl border border-emerald-700/30">
          <div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-2">
              {t.stillQuestions}
            </h3>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl mx-auto">
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
              <div className="flex items-center gap-2">
                <a
                  href="tel:+84708570838"
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="Gọi Indochine Casa: +84 708 570 838"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+84 708 570 838</span>
                </a>
                <a
                  href="https://zalo.me/0708570838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="Zalo Indochine Casa"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Zalo</span>
                </a>
              </div>
            </div>

            {/* Branch 2: Chinchu Stay */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {t.branch2Name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:+84966572935"
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="Gọi Chinchu Stay: +84 966 572 935"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+84 966 572 935</span>
                </a>
                <a
                  href="https://zalo.me/0966572935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="Zalo Chinchu Stay"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Zalo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
