import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Phone, ExternalLink, Compass, Train, Car, Plane, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import { Language, HotelProperty } from '../types';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';

interface LocationMapSectionProps {
  language: Language;
  hotels: HotelProperty[];
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  language,
  hotels,
  onOpenWeChat,
}) => {
  const [activeHotelId, setActiveHotelId] = useState<string>(hotels[0]?.id || 'indochine-casa');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const activeHotel = hotels.find((h) => h.id === activeHotelId) || hotels[0];

  const translations = {
    vi: {
      badge: 'Vị Trí Đắc Địa Tại Trung Tâm Thảo Điền & An Khánh',
      title: 'Bản Đồ Vị Trí & Hướng Dẫn Di Chuyển',
      subtitle: 'Nằm trong khu phố Tây Thảo Điền an ninh, văn minh với hàng loạt nhà hàng quốc tế, cafe specialty và kết nối giao thông hoàn hảo tới Quận 1 & Ga Metro.',
      selectLocation: 'Chọn cơ sở xem bản đồ:',
      openInGoogleMaps: 'Mở Chỉ Đường Google Maps',
      copyAddress: 'Sao chép địa chỉ',
      copiedText: 'Đã sao chép địa chỉ vào bộ nhớ tạm!',
      callReceptionForDirections: 'Gọi lễ tân đón / hướng dẫn',
      landmarksTitle: 'Khoảng cách tới các địa điểm trọng yếu',
      metro: 'Ga Metro Thảo Điền (Tuyến Metro số 1):',
      district1: 'Trung tâm Quận 1 (Phố đi bộ Nguyễn Huệ):',
      landmark81: 'Landmark 81 & Bình Thạnh:',
      vincom: 'Vincom Mega Mall Thảo Điền:',
      airport: 'Sân bay Quốc tế Tân Sơn Nhất:',
      xuanthuy: 'Phố ẩm thực & cafe Xuân Thủy:',
      grabTipTitle: 'Lưu ý khi đi Grab / Taxi:',
      grabTipText: 'Quý khách chỉ cần tìm đúng tên khách sạn trên ứng dụng Grab/XanhSM ("Indochine Casa Hotel 4 Thái Ly" hoặc "Chinchu Luxury 46 Nguyễn Cừ" hoặc "Chinchu Stay 24 Xuân Thủy") xe sẽ đưa tới tận sảnh.',
      walkMetric: 'phút đi bộ (350m)',
      driveMetric: 'phút lái xe',
      mallMetric: 'phút (600m)',
      airportMetric: 'phút',
    },
    en: {
      badge: 'Prime Location in Central Thao Dien & An Khanh',
      title: 'Location Maps & Transit Guide',
      subtitle: 'Situated in the upscale, tranquil expat hub of Thao Dien, surrounded by artisan eateries, boutique bistros, and seamless transit to District 1 and the Metro.',
      selectLocation: 'Select location to view on map:',
      openInGoogleMaps: 'Open Directions in Google Maps',
      copyAddress: 'Copy Address',
      copiedText: 'Address copied to clipboard!',
      callReceptionForDirections: 'Call Front Desk for Assistance',
      landmarksTitle: 'Travel Times to Key Landmarks',
      metro: 'Thao Dien Metro Station (Metro Line 1):',
      district1: 'District 1 Downtown (Nguyen Hue Walking Street):',
      landmark81: 'Landmark 81 & Binh Thanh District:',
      vincom: 'Vincom Mega Mall Thao Dien:',
      airport: 'Tan Son Nhat International Airport:',
      xuanthuy: 'Xuan Thuy Dining & Cafe Boulevard:',
      grabTipTitle: 'Taxi / Ride-hailing Tip:',
      grabTipText: 'Search directly by property name in Grab or XanhSM apps for seamless door-to-door arrival.',
      walkMetric: 'mins walk (350m)',
      driveMetric: 'mins drive',
      mallMetric: 'mins (600m)',
      airportMetric: 'mins',
    },
    ko: {
      badge: '타오디엔 & 안칸 중심의 최적의 위치',
      title: '호텔 위치 안내 및 오시는 길',
      subtitle: '안전하고 세련된 타오디엔 외국인 밀집 지역에 위치하여 다양한 글로벌 레스토랑, 스페셜티 카페, 1군 시내 및 메트로역과 직결되는 편리한 교통을 자랑합니다.',
      selectLocation: '지점별 지도 보기:',
      openInGoogleMaps: 'Google 지도 길찾기 열기',
      copyAddress: '주소 복사',
      copiedText: '주소가 클립보드에 복사되었습니다!',
      callReceptionForDirections: '프런트 데스크 길 안내 문의',
      landmarksTitle: '주요 랜드마크 소요 시간',
      metro: '타오디엔 메트로 1호선 역:',
      district1: '호치민 1군 시내 (응우옌후에 보행자 거리):',
      landmark81: '랜드마크 81 & 빈탄군:',
      vincom: '빈컴 메가몰 타오디엔:',
      airport: '탄손누트 국제공항:',
      xuanthuy: '쑤언투이 거리 카페 & 맛집:',
      grabTipTitle: 'Grab / 택시 이용 팁:',
      grabTipText: 'Grab 또는 XanhSM 앱에서 호텔 영문명("Indochine Casa Hotel", "Chinchu Luxury", "Chinchu Stay")을 검색하시면 로비 바로 앞까지 편안하게 이동하실 수 있습니다.',
      walkMetric: '분 도보 (350m)',
      driveMetric: '분 차량 이동',
      mallMetric: '분 (600m)',
      airportMetric: '분',
    },
    zh: {
      badge: '坐落胡志明市第二郡草田与安庆核心地段',
      title: '地理位置地图与交通指引',
      subtitle: '位于治安优良、格调高雅的草田国际使馆与外籍商圈，汇聚众多全球特色餐厅与网红咖啡馆，便捷直达第一郡市中心及地铁站。',
      selectLocation: '选择分店查看地图：',
      openInGoogleMaps: '在谷歌地图中打开导航',
      copyAddress: '复制详细地址',
      copiedText: '地址已复制到剪贴板！',
      callReceptionForDirections: '致电前台咨询到店指引',
      landmarksTitle: '前往城市主要地标时间',
      metro: '草田地铁1号线站：',
      district1: '第一郡市中心（阮惠街步行街）：',
      landmark81: 'Landmark 81 大厦与平盛区：',
      vincom: 'Vincom Mega Mall 草田购物中心：',
      airport: '新山一国际机场：',
      xuanthuy: '春水街特色美食咖啡街：',
      grabTipTitle: '打车与 Grab 出行提示：',
      grabTipText: '在 Grab 或 XanhSM 打车软件中直接输入酒店名称（"Indochine Casa Hotel" 或 "Chinchu Luxury" 或 "Chinchu Stay"），司机可直接接送至酒店大门。',
      walkMetric: '分钟步行 (350米)',
      driveMetric: '分钟车程',
      mallMetric: '分钟 (600米)',
      airportMetric: '分钟',
    },
  };

  const t = translations[language] || translations.vi;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeHotel.fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-white text-stone-900 scroll-mt-20 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Location Tabs Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {hotels.map((h) => {
            const isActive = activeHotelId === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setActiveHotelId(h.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-800 text-white shadow-md ring-2 ring-amber-700/50'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{h.name}</span>
                <span className="text-[11px] opacity-80 font-normal">({h.address})</span>
              </button>
            );
          })}
        </div>

        {/* Map & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 bg-stone-100 rounded-3xl overflow-hidden shadow-lg border border-stone-200 relative">
            <div className="relative h-[420px] sm:h-[480px] w-full bg-stone-200">
              <iframe
                title={`Google Map - ${activeHotel.name}`}
                src={activeHotel.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Quick Action bar below map */}
            <div className="p-4 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-stone-200">{activeHotel.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
                  <span>{copiedAddress ? t.copiedText : t.copyAddress}</span>
                </button>

                <a
                  href={activeHotel.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.openInGoogleMaps}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Landmark & Proximity Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 shadow-sm">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-1">
                {activeHotel.name}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                {activeHotel.fullAddress}
              </p>

              <div className="space-y-3 pt-2 border-t border-stone-200 text-xs">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                  {t.landmarksTitle}
                </h4>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-700 font-medium">
                    <Train className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{t.metro}</span>
                  </div>
                  <span className="font-bold text-stone-900">{activeHotel.distanceMetrics.metroMinutes} {t.walkMetric}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-700 font-medium">
                    <Car className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{t.district1}</span>
                  </div>
                  <span className="font-bold text-stone-900">{activeHotel.distanceMetrics.district1Minutes} {t.driveMetric}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-700 font-medium">
                    <ShoppingBag className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{t.vincom}</span>
                  </div>
                  <span className="font-bold text-stone-900">{activeHotel.distanceMetrics.vincomMegaMallMinutes} {t.mallMetric}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-700 font-medium">
                    <Plane className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{t.airport}</span>
                  </div>
                  <span className="font-bold text-stone-900">{activeHotel.distanceMetrics.airportMinutes} {t.airportMetric}</span>
                </div>
              </div>

              {/* Ride hailing tip */}
              <div className="mt-5 p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs">
                <span className="font-bold text-amber-950 block mb-1">💡 {t.grabTipTitle}</span>
                <p className="text-stone-700 leading-relaxed text-[11px]">
                  {t.grabTipText}
                </p>
              </div>

              {/* Direct Multi-channel Contact */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-bold text-stone-700 block">
                  {t.callReceptionForDirections}:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${activeHotel.phone.replace(/\s/g, '')}`}
                    className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    title={`Gọi ${activeHotel.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeHotel.phone}</span>
                  </a>

                  <a
                    href={activeHotel.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    title="Zalo"
                  >
                    <ZaloIcon className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </a>

                  <a
                    href={activeHotel.id === 'indochine-casa' ? 'https://wa.me/84708570838' : 'https://wa.me/84966572935'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenWeChat) {
                        onOpenWeChat(activeHotel.id === 'indochine-casa' ? 'indochine' : 'chinchu');
                      }
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
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
      </div>
    </section>
  );
};
