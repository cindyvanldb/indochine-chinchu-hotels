import React from 'react';
import { ShieldCheck, Percent, Clock, CreditCard, Sparkles, Coffee, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface WhyBookDirectProps {
  language: Language;
  onOpenBooking: () => void;
}

export const WhyBookDirect: React.FC<WhyBookDirectProps> = ({
  language,
  onOpenBooking,
}) => {
  const t = {
    vi: {
      badge: 'Đặc Quyền Khách Hàng Đặt Trực Tiếp',
      title: 'Vì Sao Quý Khách Nên Đặt Phòng Trực Tiếp Tại Website / Hotline?',
      subtitle: 'Tận hưởng mức giá trực tiếp ưu đãi nhất cùng dịch vụ chăm sóc khách hàng cá nhân hóa 24/7 từ đội ngũ lễ tân chuyên nghiệp.',
      cta: 'Đặt Phòng Trực Tiếp Giá Tốt Nhất',
      perks: [
        {
          icon: Percent,
          title: 'Cam Kết Giá Tốt Nhất Trực Tiếp',
          description: 'Đặt trực tiếp qua Hotline và Zalo luôn đảm bảo bạn nhận được mức giá phòng cạnh tranh, minh bạch và tiết kiệm nhất.',
        },
        {
          icon: Clock,
          title: 'Ưu Tiên Check-in Sớm & Check-out Muộn',
          description: 'Khách đặt trực tiếp được ưu tiên nhận phòng từ 11:00 sáng hoặc trả phòng muộn đến 13:30 (tùy tình trạng phòng trống thực tế) hoàn toàn miễn phí.',
        },
        {
          icon: CreditCard,
          title: 'Không Cần Thẻ Tín Dụng Trả Trước',
          description: 'Thủ tục giữ phòng đơn giản trong 1 phút qua Hotline/Zalo, thanh toán trực tiếp tại khách sạn khi nhận phòng (Tiền mặt, QR Code, Thẻ).',
        },
        {
          icon: Sparkles,
          title: 'Ưu Tiên Chọn Hướng Phòng Đẹp Nhất',
          description: 'Lễ tân ưu tiên xếp phòng tầng cao, view thoáng đãng ngắm phố Thảo Điền hoặc phòng có bồn tắm ngâm mình thư thái theo sở thích.',
        },
        {
          icon: HeartHandshake,
          title: 'Linh Hoạt Đổi Ngày & Hủy Miễn Phí',
          description: 'Hỗ trợ thay đổi ngày nhận phòng linh hoạt trước 24 giờ nhanh chóng và thuận tiện trực tiếp với lễ tân.',
        },
        {
          icon: Coffee,
          title: 'Tặng Kèm Trà, Cà Phê & Nước Suối Mỗi Ngày',
          description: 'Luôn sẵn sàng nước khoáng, trà và cà phê chất lượng cao miễn phí tại phòng mỗi ngày để khởi đầu buổi sáng sảng khoái.',
        },
      ],
    },
    en: {
      badge: 'Direct Booking Privileges',
      title: 'Why Book Directly on Our Official Website or Hotline?',
      subtitle: 'Enjoy the best guaranteed direct rates and personalized 24/7 hospitality from our dedicated front desk team.',
      cta: 'Book Direct — Best Rate Guaranteed',
      perks: [
        {
          icon: Percent,
          title: 'Guaranteed Best Direct Rate',
          description: 'Booking directly via our website or hotline guarantees transparent, competitive rates with no hidden fees.',
        },
        {
          icon: Clock,
          title: 'Priority Early Check-in & Late Check-out',
          description: 'Direct bookers enjoy complimentary early check-in from 11:00 AM or late check-out until 1:30 PM (subject to availability).',
        },
        {
          icon: CreditCard,
          title: 'No Credit Card Prepayment Required',
          description: 'Lock in your reservation with zero prepayment stress. Pay comfortably upon arrival via cash, card, or domestic transfer.',
        },
        {
          icon: Sparkles,
          title: 'Priority Room Allocation & View Preference',
          description: 'Our receptionists assign top-floor rooms, preferred balcony layouts, or deep soaking bathtubs based on your request.',
        },
        {
          icon: HeartHandshake,
          title: 'Flexible Rescheduling & Free Cancellation',
          description: 'Reschedule or cancel your stay up to 24 hours prior easily and directly with our reception team.',
        },
        {
          icon: Coffee,
          title: 'Complimentary Tea, Coffee & Daily Bottled Water',
          description: 'Enjoy complimentary fresh mineral water, fine tea, and premium Vietnamese coffee replenished daily.',
        },
      ],
    },
  }[language];

  return (
    <section id="perks" className="py-16 sm:py-24 bg-stone-900 text-white scroll-mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="bg-stone-800/80 backdrop-blur-md rounded-2xl p-6 border border-stone-700 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-600/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 group-hover:bg-amber-900 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action center */}
        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
