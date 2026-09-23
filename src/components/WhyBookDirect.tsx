import React from 'react';
import { ShieldCheck, Percent, Clock, CreditCard, Sparkles, Coffee, HeartHandshake, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { Language } from '../types';

interface WhyBookDirectProps {
  language: Language;
  onOpenBooking: () => void;
}

export const WhyBookDirect: React.FC<WhyBookDirectProps> = ({
  language,
  onOpenBooking,
}) => {
  const translations = {
    vi: {
      badge: 'Đặc Quyền Khách Hàng Đặt Trực Tiếp',
      title: 'Vì Sao Quý Khách Nên Liên Hệ Đặt Phòng Trực Tiếp Tại Hotline / Zalo?',
      subtitle: 'Tận hưởng mức giá ưu đãi tốt nhất cùng dịch vụ chăm sóc khách hàng 24/7 từ đội ngũ lễ tân chuyên nghiệp.',
      cta: 'Gọi Hotline Đặt Phòng Trực Tiếp 24/7',
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
    ko: {
      badge: '공식 직영 예약 고객 특전',
      title: '공식 핫라인 및 Zalo로 직접 예약해야 하는 이유',
      subtitle: '공식 직영 최저가 혜택과 함께 전문 프런트 팀의 24시간 맞춤형 호스피탈리티 서비스를 누려보세요.',
      cta: '24시간 핫라인 전화로 바로 예약하기',
      perks: [
        {
          icon: Percent,
          title: '공식 직영 최저가 보장',
          description: '핫라인과 Zalo를 통해 직접 예약하시면 수수료 없이 가장 투명하고 합리적인 가격을 보장받으실 수 있습니다.',
        },
        {
          icon: Clock,
          title: '얼리 체크인 & 레이트 체크아웃 우선 배정',
          description: '직접 예약 고객은 오전 11:00부터 얼리 체크인 또는 오후 1:30까지 레이트 체크아웃이 무료로 우선 지원됩니다(객실 상황에 따름).',
        },
        {
          icon: CreditCard,
          title: '신용카드 사전 결제 불필요',
          description: '1분 만에 예약 완료. 해외 카드 결제 수수료 걱정 없이 체크인 시 현금, 카드, 계좌이체로 편리하게 결제하세요.',
        },
        {
          icon: Sparkles,
          title: '선호 객실 및 최고 전망 우선 배정',
          description: '고층 객실, 타오디엔 거리 전망, 여유로운 반신욕이 가능한 욕조 룸 등 고객님의 취향에 맞는 객실을 우선 배정해 드립니다.',
        },
        {
          icon: HeartHandshake,
          title: '유연한 일정 변경 및 무료 취소 지원',
          description: '체크인 24시간 전까지 프런트 데스크와 직접 소통하여 신속하고 간편하게 일정을 변경하거나 취소할 수 있습니다.',
        },
        {
          icon: Coffee,
          title: '매일 무료 티, 커피 & 생수 제공',
          description: '상쾌한 아침을 위해 매일 무료 미네랄 생수, 고급 차, 베트남 커피가 객실에 정성스럽게 준비됩니다.',
        },
      ],
    },
    zh: {
      badge: '官方直接预订专属特权',
      title: '为什么建议您通过官方热线 / Zalo 直接联系预订？',
      subtitle: '尊享全网最优官方直订特惠底价，以及专业前台团队提供的 24 小时贴心管家式服务。',
      cta: '致电 24 小时前台热线直订',
      perks: [
        {
          icon: Percent,
          title: '官方直订全网最低价保证',
          description: '通过官方热线或 Zalo 沟通预订，省去第三方中介佣金，确保您获得最优惠透明的真实底价。',
        },
        {
          icon: Clock,
          title: '优先安排提前入住与延迟退房',
          description: '官方直订住客视房态可享受免费提早至上午11:00入住，或延迟至下午13:30退房礼遇。',
        },
        {
          icon: CreditCard,
          title: '无需信用卡线上预付款',
          description: '1分钟极速保留房源。入住办理时在前台灵活支付（现金、扫码转账、信用卡），零扣费风险。',
        },
        {
          icon: Sparkles,
          title: '优选高层景观与心仪房型',
          description: '前台优先为您安排高楼层、草田街景采光良好或配有放松泡澡浴缸的精选客房。',
        },
        {
          icon: HeartHandshake,
          title: '灵活改期与入住前免费取消',
          description: '行程有变只需提前24小时联系前台，即可轻松快捷协商更改日期或免费取消。',
        },
        {
          icon: Coffee,
          title: '每日精选茶水、咖啡与纯净矿泉水',
          description: '房内每日免费提供纯净饮用水、精选名茶与浓郁越南特色滴漏咖啡，开启惬意每一天。',
        },
      ],
    },
  };

  const t = translations[language] || translations.vi;

  return (
    <section id="perks" className="py-16 sm:py-24 bg-[#FAF7F2] text-stone-900 scroll-mt-20 relative overflow-hidden border-t border-stone-200/80">
      {/* Subtle warm amber background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-300/80 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
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
                className="bg-white rounded-2xl p-6 border border-stone-200/90 hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 mb-4 group-hover:scale-110 group-hover:bg-amber-100 transition-all shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <Phone className="w-5 h-5 text-amber-200" />
            <span>{t.cta}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
