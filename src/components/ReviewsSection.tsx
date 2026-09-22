import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Sparkles, ThumbsUp, ShieldCheck, Quote } from 'lucide-react';
import { Language, Review, HotelProperty } from '../types';
import { getLocalizedText } from '../utils/i18n';

interface ReviewsSectionProps {
  language: Language;
  reviews: Review[];
  hotels: HotelProperty[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  language,
  reviews,
  hotels,
}) => {
  const [filterHotelId, setFilterHotelId] = useState<string>('all');

  const translations = {
    vi: {
      badge: 'Cảm Nhận Từ Khách Hàng Thực Tế',
      title: 'Hơn 850+ Đánh Giá 5 Sao Trên Google Maps & Booking',
      subtitle: 'Sự hài lòng và trải nghiệm thoải mái của quý khách là niềm tự hào và động lực lớn nhất của đội ngũ Indochine Casa & Chinchu.',
      allProperties: 'Tất cả đánh giá',
      verifiedStay: 'Đã lưu trú thực tế',
      googleBadge: 'Google Reviews 4.9 / 5.0',
      statClean: '100% Sạch sẽ & Khử khuẩn',
      statCleanDesc: 'Quy trình vệ sinh khắt khe sau mỗi lượt khách',
      statStaff: '99% Khen ngợi thái độ lễ tân',
      statStaffDesc: 'Lễ tân thân thiện, giao tiếp tiếng Anh tốt',
      statLocation: '98% Đánh giá vị trí xuất sắc',
      statLocationDesc: 'Trọng tâm Thảo Điền, sát Metro và ẩm thực',
    },
    en: {
      badge: 'Genuine Guest Experiences',
      title: '850+ Five-Star Reviews Across Google Maps & Booking',
      subtitle: 'Your seamless comfort, privacy, and serene relaxation are the ultimate metrics of our hospitality.',
      allProperties: 'All Reviews',
      verifiedStay: 'Verified Guest Stay',
      googleBadge: 'Google Reviews 4.9 / 5.0',
      statClean: '100% Impeccable Cleanliness',
      statCleanDesc: 'Strict sanitation and fresh linen replacement between every guest',
      statStaff: '99% Front Desk Service Satisfaction',
      statStaffDesc: 'Warm, hospitable concierge with fluent English assistance',
      statLocation: '98% Prime Location Rating',
      statLocationDesc: 'Heart of Thao Dien, walking distance to Metro & top dining',
    },
    ko: {
      badge: '실제 투숙객 리얼 후기',
      title: 'Google 지도 및 Booking.com 평점 4.9점 만점',
      subtitle: '고객 여러분의 편안한 휴식과 따뜻한 만족은 인도차이나 카사 & 친추 호텔의 가장 큰 보람이자 자부심입니다.',
      allProperties: '전체 이용 후기',
      verifiedStay: '실제 투숙 완료 인증',
      googleBadge: 'Google Reviews 4.9 / 5.0',
      statClean: '100% 청결 및 위생 안심',
      statCleanDesc: '매 투숙마다 엄격한 침구류 교체 및 살균 소독',
      statStaff: '99% 프런트 친절도 만족',
      statStaffDesc: '친절하고 배려 깊은 영어 응대 및 24시간 서비스',
      statLocation: '98% 뛰어난 입지 평가',
      statLocationDesc: '타오디엔 중심부 위치, 메트로역 및 미식거리 인접',
    },
    zh: {
      badge: '真实住客入住体验',
      title: '谷歌地图与 Booking.com 850+ 条五星好评',
      subtitle: '每一位客人的舒心居停与安心放松，都是 Indochine Casa 与 Chinchu 团队不懈追求的最高荣耀。',
      allProperties: '全部住客点评',
      verifiedStay: '真实入住验证',
      googleBadge: '谷歌评分 4.9 / 5.0',
      statClean: '100% 洁净与消毒保障',
      statCleanDesc: '每客一换严格高温洗涤烘干与房间深度消杀',
      statStaff: '99% 赞赏前台服务态度',
      statStaffDesc: '全天候热情守候，流利英语与细致周到服务',
      statLocation: '98% 认可核心地段交通',
      statLocationDesc: '草田核心腹地，紧邻地铁站与异国风情街区',
    },
  };

  const t = translations[language] || translations.vi;

  const filteredReviews = reviews.filter((r) => {
    if (filterHotelId === 'all') return true;
    return r.hotelId === filterHotelId;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-100 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Overall Rating Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Score box */}
            <div className="text-center md:text-left md:border-r md:border-stone-200 md:pr-6">
              <div className="font-serif-luxury text-5xl font-extrabold text-stone-900 mb-1">
                4.9<span className="text-xl text-stone-400 font-normal">/5</span>
              </div>
              <div className="flex justify-center md:justify-start text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-stone-500 font-medium block">
                {t.googleBadge} (850+ reviews)
              </span>
            </div>

            {/* Sub-stats */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-0.5 justify-center sm:justify-start">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.statClean}</span>
                </div>
                <p className="text-[11px] text-stone-500">{t.statCleanDesc}</p>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-0.5 justify-center sm:justify-start">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{t.statStaff}</span>
                </div>
                <p className="text-[11px] text-stone-500">{t.statStaffDesc}</p>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-0.5 justify-center sm:justify-start">
                  <CheckCircle className="w-4 h-4" />
                  <span>{t.statLocation}</span>
                </div>
                <p className="text-[11px] text-stone-500">{t.statLocationDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Hotel Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setFilterHotelId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterHotelId === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {t.allProperties}
          </button>
          {hotels.map((h) => (
            <button
              key={h.id}
              onClick={() => setFilterHotelId(h.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterHotelId === h.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-stone-200 flex flex-col justify-between relative"
            >
              <div>
                {/* Guest info row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{rev.guestName}</h4>
                    <p className="text-xs text-stone-500">{getLocalizedText(rev.guestOrigin, language)}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex text-amber-500 justify-end mb-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 block font-medium">
                      {rev.source} • {rev.date}
                    </span>
                  </div>
                </div>

                {/* Hotel and Room tag */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
                  <span>{rev.hotelName}</span>
                  <span className="text-stone-400">|</span>
                  <span className="font-normal text-stone-600">{getLocalizedText(rev.roomName, language)}</span>
                </div>

                {/* Review text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{getLocalizedText(rev.comment, language)}"
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px] text-stone-400">{getLocalizedText(rev.stayType, language)}</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{t.verifiedStay}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
