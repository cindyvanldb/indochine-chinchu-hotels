import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  Bed,
  Bath,
  Tv,
  Wind,
  Coffee,
  Clock,
  Images,
} from 'lucide-react';
import { Language, RoomType, LocalizedString } from '../types';
import { getLocalizedText } from '../utils/i18n';
import { WhatsAppIcon, WeChatIcon, ZaloIcon } from './ContactIcons';
import { getAssetUrl } from '../utils/assets';

export interface GalleryPhoto {
  url: string;
  title: LocalizedString;
  caption?: LocalizedString;
  propertyBadge: LocalizedString;
  pricePerNight?: LocalizedString;
  category: 'room' | 'space';
  roomId?: string;
  specs?: LocalizedString;
}

// 13 authentic photos for Indochine Casa (04 Thái Ly, Thảo Điền)
const INDOCHINE_PHOTOS: GalleryPhoto[] = [
  {
    url: '/assets/indochine/toan-canh-3.jpg',
    title: {
      vi: 'Mặt Tiền Tòa Nhà 6 Tầng Về Đêm',
      en: '6-Storey Building Facade at Night',
      ko: '6층 호텔 야경 외관 전경',
      zh: '6层酒店大楼夜景全景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'space',
  },
  {
    url: '/assets/indochine/sanh-1.png',
    title: {
      vi: 'Sảnh Lễ Tân Đón Tiếp 24/7',
      en: '24/7 Front Reception Lobby',
      ko: '24시간 프런트 리셉션 로비',
      zh: '24小时前台接待大厅',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'space',
  },
  {
    url: '/assets/indochine/sanh-022.jpg',
    title: {
      vi: 'Sảnh Lounge Thư Giãn',
      en: 'Guest Relaxation Lounge',
      ko: '투숙객 휴식 라운지',
      zh: '住客休闲艺术酒廊',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'space',
  },
  {
    url: '/assets/indochine/studio-1.png',
    title: {
      vi: 'Ảnh Phòng Studio',
      en: 'Studio Room Photo',
      ko: '스튜디오 객실 실사',
      zh: '精选单间客房实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/twin-bed-1.png',
    title: {
      vi: '2 Giường Đơn Indochine',
      en: '2 Beds Indochine Room',
      ko: '인도차이나 트윈 베드 객실',
      zh: '印支风情双单人床房',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/premium-bed-1.png',
    title: {
      vi: 'Ảnh Giường King Indochine',
      en: 'Indochine King Bed',
      ko: '인도차이나 킹사이즈 침대',
      zh: '印支典雅特大双人床实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/pre-bed-4.png',
    title: {
      vi: 'Ảnh Giường Ngủ Indochine',
      en: 'Indochine Bedroom Photo',
      ko: '인도차이나 침실 실사',
      zh: '印支风格卧房实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/pre-balco-1.png',
    title: {
      vi: 'Ảnh Ban Công Thảo Điền',
      en: 'Balcony View Photo',
      ko: '타오디엔 전망 발코니 실사',
      zh: '草田景观阳台实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/pre-kit-1.png',
    title: {
      vi: 'Ảnh Khu Bếp Tiện Nghi',
      en: 'Kitchenette Photo',
      ko: '주방 조리 공간 실사',
      zh: '配备简易厨房实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/suite-2.png',
    title: {
      vi: 'Ảnh Phòng Suite Thượng Hạng',
      en: 'Suite Room Photo',
      ko: '스위트 룸 객실 실사',
      zh: '顶级套房客房实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/apt-bed-1.png',
    title: {
      vi: 'Ảnh Giường Ngủ Căn Hộ',
      en: 'Apartment Master Bed',
      ko: '아파트먼트 마스터 베드',
      zh: '豪华公寓套房主卧大床',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/apt-kit-1.png',
    title: {
      vi: 'Ảnh Khu Bếp Quầy Bar Đảo',
      en: 'Kitchen & Island Bar Photo',
      ko: '주방 & 아일랜드 바 실사',
      zh: '厨房与中岛吧台实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
  {
    url: '/assets/indochine/apt-toilet-2.png',
    title: {
      vi: 'Ảnh Phòng Tắm Bồn Ngâm',
      en: 'Bathroom & Bathtub Photo',
      ko: '욕실 & 독립형 욕조 실사',
      zh: '高端卫浴与独立浴缸实景',
    },
    propertyBadge: {
      vi: 'Indochine Casa • 04 Thái Ly',
      en: 'Indochine Casa • 04 Thai Ly',
      ko: '인도차이나 카사 • 04 Thai Ly',
      zh: 'Indochine Casa • 04 Thai Ly',
    },
    category: 'room',
  },
];

// Reference photos for Chinchu (46 Nguyễn Cừ & 24 Xuân Thủy)
const CHINCHU_PHOTOS: GalleryPhoto[] = [
  // Cơ sở 46 Nguyễn Cừ (Chinchu Luxury)
  {
    url: '/assets/chinchu/toan-canh-46nc.png',
    title: {
      vi: 'Toàn Cảnh Tòa Nhà (46 Nguyễn Cừ)',
      en: 'Building Facade (46 Nguyen Cu)',
      ko: '호텔 건물 전경 (Nguyen Cu 46)',
      zh: '大厦全貌（阮渠街46号）',
    },
    propertyBadge: {
      vi: 'Chinchu Luxury • 46 Nguyễn Cừ',
      en: 'Chinchu Luxury • 46 Nguyen Cu',
      ko: '친추 럭셔리 • 46 Nguyen Cu',
      zh: 'Chinchu Luxury • 46 Nguyen Cu',
    },
    category: 'space',
  },
  {
    url: '/assets/chinchu/phong-bancol-1-46nc.png',
    title: {
      vi: 'Ảnh Phòng Ban Công (46 Nguyễn Cừ)',
      en: 'Balcony Room Photo (46 Nguyen Cu)',
      ko: '발코니 객실 실사 (Nguyen Cu 46)',
      zh: '景观阳台客房（阮渠街46号）',
    },
    propertyBadge: {
      vi: 'Chinchu Luxury • 46 Nguyễn Cừ',
      en: 'Chinchu Luxury • 46 Nguyen Cu',
      ko: '친추 럭셔리 • 46 Nguyen Cu',
      zh: 'Chinchu Luxury • 46 Nguyen Cu',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/nvs-1.png',
    title: {
      vi: 'Ảnh Toilet (46 Nguyễn Cừ)',
      en: 'Toilet & Bathroom (46 Nguyen Cu)',
      ko: '욕실 및 화장실 (Nguyen Cu 46)',
      zh: '卫浴空间（阮渠街46号）',
    },
    propertyBadge: {
      vi: 'Chinchu Luxury • 46 Nguyễn Cừ',
      en: 'Chinchu Luxury • 46 Nguyen Cu',
      ko: '친추 럭셔리 • 46 Nguyen Cu',
      zh: 'Chinchu Luxury • 46 Nguyen Cu',
    },
    category: 'room',
  },

  // Cơ sở 24 Xuân Thủy (Chinchu Stay)
  {
    url: '/assets/chinchu/sanh-cc-xt-1.png',
    title: {
      vi: 'Ảnh Sảnh Đón Tiếp (24 Xuân Thủy)',
      en: 'Lobby Photo (24 Xuan Thuy)',
      ko: '로비 실사 (Xuan Thuy 24)',
      zh: '接待大堂实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'space',
  },
  {
    url: '/assets/chinchu/sanh-cc-xt-2.png',
    title: {
      vi: 'Ảnh Sảnh Đón Tiếp (24 Xuân Thủy)',
      en: 'Lobby Photo (24 Xuan Thuy)',
      ko: '로비 실사 (Xuan Thuy 24)',
      zh: '接待大堂实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'space',
  },
  {
    url: '/assets/chinchu/sanh-cc-xt-3.png',
    title: {
      vi: 'Ảnh Sảnh Đón Tiếp (24 Xuân Thủy)',
      en: 'Lobby Photo (24 Xuan Thuy)',
      ko: '로비 실사 (Xuan Thuy 24)',
      zh: '接待大堂实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'space',
  },
  {
    url: '/assets/chinchu/bed-24xt.png',
    title: {
      vi: 'Ảnh Giường Queen (24 Xuân Thủy)',
      en: 'Queen Bed (24 Xuan Thuy)',
      ko: '퀸 침대 실사 (Xuan Thuy 24)',
      zh: 'Queen 双人床实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/bed-24xt-1.png',
    title: {
      vi: 'Ảnh Giường Ngủ (24 Xuân Thủy)',
      en: 'Bedroom Photo (24 Xuan Thuy)',
      ko: '침실 실사 (Xuan Thuy 24)',
      zh: '客房睡房实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/room-24xt.png',
    title: {
      vi: 'Ảnh Phòng Ngủ (24 Xuân Thủy)',
      en: 'Room Photo (24 Xuan Thuy)',
      ko: '객실 공간 실사 (Xuan Thuy 24)',
      zh: '客房空间实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/room-24xt-2.png',
    title: {
      vi: 'Ảnh Phòng Tiện Nghi (24 Xuân Thủy)',
      en: 'Room Setup (24 Xuan Thuy)',
      ko: '객실 내부 실사 (Xuan Thuy 24)',
      zh: '客房布局实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/room-24xt-3.png',
    title: {
      vi: 'Ảnh Phòng Thoáng Mát (24 Xuân Thủy)',
      en: 'Breezy Room (24 Xuan Thuy)',
      ko: '쾌적한 객실 실사 (Xuan Thuy 24)',
      zh: '通风采光客房（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/bed-dup-1.png',
    title: {
      vi: 'Ảnh Giường Đôi (24 Xuân Thủy)',
      en: 'Double Bed (24 Xuan Thuy)',
      ko: '더블 침대 실사 (Xuan Thuy 24)',
      zh: '双人床实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/bed-dup-2.png',
    title: {
      vi: 'Ảnh Giường Ấm Cúng (24 Xuân Thủy)',
      en: 'Cozy Bed Setup (24 Xuan Thuy)',
      ko: '아늑한 침대 실사 (Xuan Thuy 24)',
      zh: '温馨床品实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/room-dup-1.png',
    title: {
      vi: 'Ảnh Phòng Duplex (24 Xuân Thủy)',
      en: 'Duplex Room (24 Xuan Thuy)',
      ko: '복층 룸 실사 (Xuan Thuy 24)',
      zh: '跃层复式客房（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/kit-dup-24xt-1.png',
    title: {
      vi: 'Ảnh Gian Bếp Nhỏ (24 Xuân Thủy)',
      en: 'Kitchenette (24 Xuan Thuy)',
      ko: '간이 주방 실사 (Xuan Thuy 24)',
      zh: '简易厨房实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
  {
    url: '/assets/chinchu/toilet-24xt.png',
    title: {
      vi: 'Ảnh Toilet Sạch Sẽ (24 Xuân Thủy)',
      en: 'Clean Bathroom (24 Xuan Thuy)',
      ko: '청결한 욕실 실사 (Xuan Thuy 24)',
      zh: '洁净卫浴实景（春水街24号）',
    },
    propertyBadge: {
      vi: 'Chinchu Stay • 24 Xuân Thủy',
      en: 'Chinchu Stay • 24 Xuan Thuy',
      ko: '친추 스테이 • 24 Xuan Thuy',
      zh: 'Chinchu Stay • 24 Xuan Thuy',
    },
    category: 'room',
  },
];

interface RoomCatalogProps {
  language: Language;
  onFilterChange: (hotelId: string) => void;
  selectedHotelId?: string;
  selectedHotelFilter?: string;
  onOpenBookingModal?: (hotelId?: string, roomId?: string) => void;
  onBookRoom?: (room: RoomType) => void;
  rooms?: RoomType[];
  hotels?: any[];
  onSelectRoomDetail?: (room: RoomType) => void;
  onOpenWeChat?: (branch?: 'indochine' | 'chinchu') => void;
}

export const RoomCatalog: React.FC<RoomCatalogProps> = ({
  language,
  onFilterChange,
  selectedHotelId,
  selectedHotelFilter,
  rooms = [],
  onOpenWeChat,
}) => {
  const currentHotelId = selectedHotelId || selectedHotelFilter || 'indochine-casa';
  const [activeFacility, setActiveFacility] = useState<'indochine' | 'chinchu'>(
    currentHotelId === 'indochine-casa' ? 'indochine' : 'chinchu'
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'room' | 'space'>('all');

  useEffect(() => {
    if (currentHotelId === 'indochine-casa') {
      setActiveFacility('indochine');
    } else {
      setActiveFacility('chinchu');
    }
  }, [currentHotelId]);

  const allPhotos = activeFacility === 'indochine' ? INDOCHINE_PHOTOS : CHINCHU_PHOTOS;
  const filteredPhotos = allPhotos.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const isIndochine = activeFacility === 'indochine';

  const translations = {
    vi: {
      badge: 'Ảnh Thực Tế Tham Khảo',
      title: 'Hình Ảnh Thực Tế Cơ Sở Khách Sạn',
      subtitle:
        'Tất cả hình ảnh thực tế nguyên bản tại cơ sở để quý khách tham khảo không gian phòng khi bấm vào xem. Mức giá cơ sở chỉ từ 600.000đ / đêm.',
      indochineName: 'INDOCHINE CASA HOTEL',
      indochineSub: '04 Thái Ly • Giá chỉ từ 600.000đ / đêm',
      chinchuName: 'CHINCHU (LUXURY & STAY)',
      chinchuSub: '46 Nguyễn Cừ & 24 Xuân Thủy • Giá từ 600.000đ / đêm',
      photosCount: 'ảnh',
      priceHint: 'Giá lưu trú theo đêm: Chỉ từ 600.000đ / đêm',
      callReception: 'Gọi Lễ Tân',
      zalo: 'Zalo',
      amenity1: 'Đệm êm & Ga cotton thay mới 100%',
      amenity2: 'Điều hòa mát sâu êm dịu',
      amenity3: 'Smart TV & Wi-Fi cáp quang',
      amenity4: 'Nước nóng 24/24 & Bồn tắm ngâm',
      amenity5: 'Nước suối & Trà cafe miễn phí',
      amenity6: 'Lễ tân 24/7 & Hỗ trợ check-in linh hoạt',
      allPhotos: 'Tất cả hình ảnh',
      referenceRooms: 'Ảnh phòng tham khảo',
      spacesAndLobby: 'Sảnh & Không gian',
      clickTip: '💡 Bấm vào ảnh để xem ảnh thực tế toàn màn hình',
      viewPhoto: 'Xem ảnh',
      ctaTitle: 'Quý Khách Muốn Đặt Phòng Trực Tiếp?',
      ctaSubtitle:
        'Gọi Hotline hoặc nhắn tin Zalo để lễ tân kiểm tra phòng trống và giữ phòng ngay với mức giá trực tiếp ưu đãi nhất.',
      callNow: 'Gọi Ngay',
      chatZalo247: 'Nhắn Tin Zalo 24/7',
      authenticBadge: 'Ảnh thực tế',
      callToBook: 'Gọi Đặt',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    en: {
      badge: 'Authentic Reference Photos',
      title: 'Authentic Hotel & Room Photos',
      subtitle:
        'Unfiltered, 100% authentic reference photography showcasing real guest rooms, lobbies, and spaces. Rates start from 600,000 VND / night.',
      indochineName: 'INDOCHINE CASA HOTEL',
      indochineSub: '04 Thai Ly • From 600,000 VND / night',
      chinchuName: 'CHINCHU (LUXURY & STAY)',
      chinchuSub: '46 Nguyen Cu & 24 Xuan Thuy • From 600,000 VND',
      photosCount: 'photos',
      priceHint: 'Nightly rates: From 600,000 VND / night',
      callReception: 'Call Desk',
      zalo: 'Zalo',
      amenity1: 'Orthopedic Bed & 100% Fresh Cotton Linens',
      amenity2: 'Quiet & Rapid Air Conditioning',
      amenity3: 'Smart TV & High-Speed Optical Wi-Fi',
      amenity4: '24/7 Hot Water & Soaking Bathtubs',
      amenity5: 'Complimentary Bottled Water & Coffee',
      amenity6: '24/7 Concierge & Flexible Early Check-In',
      allPhotos: 'All Photos',
      referenceRooms: 'Reference Rooms',
      spacesAndLobby: 'Lobbies & Architecture',
      clickTip: '💡 Click any photo to view in high-resolution full screen',
      viewPhoto: 'View',
      ctaTitle: 'Ready to Book Directly with Front Desk?',
      ctaSubtitle:
        'Call our 24/7 hotline or message via Zalo, WhatsApp, or WeChat for live availability, preferred room assignment, and guaranteed direct pricing.',
      callNow: 'Call Now',
      chatZalo247: 'Chat via Zalo 24/7',
      authenticBadge: 'Authentic photo',
      callToBook: 'Call to Book',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: 'WeChat',
    },
    ko: {
      badge: '실제 현장 실사 갤러리',
      title: '호텔 및 객실 100% 무보정 실제 사진',
      subtitle:
        '투숙객 여러분의 신뢰를 위해 필터 없는 실제 객실과 로비 공간을 있는 그대로 안내해 드립니다. 1박 최저 600,000동부터.',
      indochineName: '인도차이나 카사 호텔',
      indochineSub: '04 Thai Ly • 1박 600,000동부터',
      chinchuName: '친추 호텔 (럭셔리 & 스테이)',
      chinchuSub: '46 Nguyen Cu & 24 Xuan Thuy • 600,000동부터',
      photosCount: '장',
      priceHint: '1박 숙박 요금: 최저 600,000동부터',
      callReception: '프런트 전화',
      zalo: 'Zalo 상담',
      amenity1: '포근한 침대 & 100% 순면 교체 침구',
      amenity2: '저소음 고성능 쾌속 냉방 에어컨',
      amenity3: '스마트 TV & 초고속 기가 Wi-Fi',
      amenity4: '24시간 온수 & 편안한 반신욕조',
      amenity5: '매일 무료 미네랄 생수 & 커피 티',
      amenity6: '24시간 프런트 상주 & 얼리체크인 배려',
      allPhotos: '전체 사진',
      referenceRooms: '객실 사진 모아보기',
      spacesAndLobby: '로비 & 건물 전경',
      clickTip: '💡 사진을 클릭하시면 고화질 전체 화면으로 크게 보실 수 있습니다',
      viewPhoto: '사진 보기',
      ctaTitle: '프런트 데스크와 직접 소통하고 예약하세요',
      ctaSubtitle:
        '24시간 핫라인 전화, Zalo, WhatsApp 또는 WeChat으로 문의하시면 실시간 잔여 객실 확인 및 최고 혜택 직영가로 즉시 예약해 드립니다.',
      callNow: '전화 문의',
      chatZalo247: '24시간 Zalo 상담',
      authenticBadge: '실제 사진',
      callToBook: '예약 전화',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '위챗 (WeChat)',
    },
    zh: {
      badge: '现场实景真实参考',
      title: '酒店外观与客房 100% 真实实拍',
      subtitle:
        '所有图片均为分店现场真实无滤镜实景拍摄，直观展示客房细节、卫浴及接待大堂。每晚房价仅 600,000 越南盾起。',
      indochineName: 'INDOCHINE CASA 酒店',
      indochineSub: '04 Thai Ly • 每晚仅 600,000 越南盾起',
      chinchuName: 'CHINCHU 酒店（轻奢 & 活力公寓）',
      chinchuSub: '46 Nguyen Cu & 24 Xuan Thuy • 600,000 盾起',
      photosCount: '张',
      priceHint: '每晚住宿价格：仅 600,000 越南盾起',
      callReception: '致电前台',
      zalo: 'Zalo 在线',
      amenity1: '减压舒适床垫 & 100% 全新纯棉床品',
      amenity2: '强劲静音舒适恒温空调',
      amenity3: '高清智能网络电视与极速光纤 Wi-Fi',
      amenity4: '24小时恒温热水 & 惬意浸泡浴缸',
      amenity5: '每日免费品牌矿泉水与醇香茶饮咖啡',
      amenity6: '24小时全天候前台服务 & 灵活提前入住',
      allPhotos: '全部实景照片',
      referenceRooms: '客房内部实拍',
      spacesAndLobby: '大堂与建筑外观',
      clickTip: '💡 点击任意照片可进入高清大图全屏浏览',
      viewPhoto: '查看大图',
      ctaTitle: '想要通过前台直接预订客房？',
      ctaSubtitle:
        '随时拨打 24 小时前台热线，或通过微信 WeChat、WhatsApp、Zalo 在线沟通，即时查询空房状态并锁定全网最底直订优惠。',
      callNow: '立即致电',
      chatZalo247: '24小时 Zalo 咨询',
      authenticBadge: '实景拍摄',
      callToBook: '致电直订',
      chatWhatsApp: 'WhatsApp',
      chatWeChat: '微信 (WeChat)',
    },
  };

  const t = translations[language] || translations.vi;

  const currentFacilityInfo = isIndochine
    ? {
        name: 'INDOCHINE CASA HOTEL',
        address: '04 Thái Ly, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
        phone: '+84 708 570 838',
        phoneHref: 'tel:+84708570838',
        zaloHref: 'https://zalo.me/0708570838',
        whatsappHref: 'https://wa.me/84708570838',
        branch: 'indochine' as const,
      }
    : {
        name: 'CHINCHU HOTEL & STAY',
        address: '46 Nguyễn Cừ & 24 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
        phone: '+84 966 572 935',
        phoneHref: 'tel:+84966572935',
        zaloHref: 'https://zalo.me/0966572935',
        whatsappHref: 'https://wa.me/84966572935',
        branch: 'chinchu' as const,
      };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const handleCardClick = (idx: number) => {
    setLightboxIndex(idx);
  };

  return (
    <section id="rooms" className="py-12 sm:py-20 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Images className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 1. Facility Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveFacility('indochine');
              onFilterChange('indochine-casa');
              setFilterCategory('all');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm ${
              activeFacility === 'indochine'
                ? 'bg-gradient-to-r from-amber-800 to-amber-950 text-white shadow-lg ring-2 ring-amber-700 ring-offset-2 scale-102'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                activeFacility === 'indochine' ? 'bg-amber-400 animate-pulse' : 'bg-stone-300'
              }`}
            />
            <div className="text-left">
              <div className="font-bold tracking-tight">{t.indochineName}</div>
              <div
                className={`text-xs font-normal ${
                  activeFacility === 'indochine' ? 'text-amber-200' : 'text-stone-500'
                }`}
              >
                {t.indochineSub}
              </div>
            </div>
            <span
              className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                activeFacility === 'indochine'
                  ? 'bg-amber-700/60 text-amber-200'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {INDOCHINE_PHOTOS.length} {t.photosCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFacility('chinchu');
              onFilterChange('chinchu-luxury');
              setFilterCategory('all');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm ${
              activeFacility === 'chinchu'
                ? 'bg-gradient-to-r from-stone-800 to-stone-950 text-white shadow-lg ring-2 ring-stone-700 ring-offset-2 scale-102'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                activeFacility === 'chinchu' ? 'bg-emerald-400 animate-pulse' : 'bg-stone-300'
              }`}
            />
            <div className="text-left">
              <div className="font-bold tracking-tight">{t.chinchuName}</div>
              <div
                className={`text-xs font-normal ${
                  activeFacility === 'chinchu' ? 'text-emerald-200' : 'text-stone-500'
                }`}
              >
                {t.chinchuSub}
              </div>
            </div>
            <span
              className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                activeFacility === 'chinchu'
                  ? 'bg-stone-700 text-stone-200'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {CHINCHU_PHOTOS.length} {t.photosCount}
            </span>
          </button>
        </div>

        {/* 2. Selected Property Highlight Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-base sm:text-lg text-stone-900 font-serif-luxury">
                {currentFacilityInfo.name}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {currentFacilityInfo.address}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.priceHint}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={currentFacilityInfo.phoneHref}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.callReception}: {currentFacilityInfo.phone}</span>
            </a>
            <a
              href={currentFacilityInfo.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <ZaloIcon className="w-3.5 h-3.5" />
              <span>{t.zalo}</span>
            </a>
            <a
              href={currentFacilityInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{t.chatWhatsApp}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (onOpenWeChat) onOpenWeChat(currentFacilityInfo.branch);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <WeChatIcon className="w-3.5 h-3.5" />
              <span>{t.chatWeChat}</span>
            </button>
          </div>
        </div>

        {/* 3. Compact Amenities Pill Bar */}
        <div className="bg-stone-100/80 rounded-xl p-3 border border-stone-200/80 mb-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-stone-700">
          <div className="flex items-center gap-1.5 font-medium">
            <Bed className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.amenity1}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Wind className="w-3.5 h-3.5 text-sky-700" />
            <span>{t.amenity2}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Tv className="w-3.5 h-3.5 text-indigo-700" />
            <span>{t.amenity3}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Bath className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.amenity4}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Coffee className="w-3.5 h-3.5 text-orange-700" />
            <span>{t.amenity5}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-rose-700" />
            <span>{t.amenity6}</span>
          </div>
        </div>

        {/* 4. Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {t.allPhotos} ({allPhotos.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('room')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filterCategory === 'room'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {t.referenceRooms} ({allPhotos.filter((p) => p.category === 'room').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('space')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                filterCategory === 'space'
                  ? 'bg-stone-800 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {t.spacesAndLobby} ({allPhotos.filter((p) => p.category === 'space').length})
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            {t.clickTip}
          </div>
        </div>

        {/* 5. Main Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredPhotos.map((photo, idx) => {
            const photoTitle = getLocalizedText(photo.title, language);
            const photoBadge = getLocalizedText(photo.propertyBadge, language);
            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={getAssetUrl(photo.url)}
                    alt={photoTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-900/80 text-white text-[11px] font-semibold backdrop-blur-xs shadow-xs">
                      {photoBadge}
                    </span>
                  </div>

                  {/* Hover Enlarge Indicator */}
                  <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/95 text-stone-900 flex items-center justify-center shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5 flex-1 flex items-center justify-between">
                  <h3 className="text-stone-900 text-sm font-bold leading-snug group-hover:text-amber-800 transition-colors line-clamp-1">
                    {photoTitle}
                  </h3>

                  <span className="text-amber-700 text-xs font-bold flex items-center gap-1 group-hover:underline shrink-0 ml-2">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{t.viewPhoto}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 6. Simple Direct Booking Hotline Banner */}
        <div className="mt-10 bg-gradient-to-r from-stone-900 via-stone-950 to-amber-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg text-center flex flex-col items-center">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold mb-2">
            {t.ctaTitle}
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mb-5">
            {t.ctaSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={currentFacilityInfo.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>{t.callNow}: {currentFacilityInfo.phone}</span>
            </a>

            <a
              href={currentFacilityInfo.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <ZaloIcon className="w-4 h-4" />
              <span>{t.chatZalo247}</span>
            </a>

            <a
              href={currentFacilityInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.chatWhatsApp}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                if (onOpenWeChat) onOpenWeChat(currentFacilityInfo.branch);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#07C160] hover:bg-[#059648] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <WeChatIcon className="w-4 h-4" />
              <span>{t.chatWeChat}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white z-10 w-full max-w-6xl mx-auto pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-stone-200 font-bold text-sm sm:text-base">
                {getLocalizedText(filteredPhotos[lightboxIndex].title, language)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-600/90 text-white text-xs font-bold shadow-xs">
                {t.authenticBadge}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-xs font-medium">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image */}
          <div
            className="relative flex-1 flex items-center justify-center overflow-hidden my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
                )
              }
              className="absolute left-1 sm:left-4 z-20 w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xl border border-white/20 cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="max-h-[82vh] max-w-6xl w-full flex items-center justify-center p-1">
              <img
                src={getAssetUrl(filteredPhotos[lightboxIndex].url)}
                alt={getLocalizedText(filteredPhotos[lightboxIndex].title, language)}
                className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl transition-all"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : 0))
              }
              className="absolute right-1 sm:right-4 z-20 w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xl border border-white/20 cursor-pointer"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar */}
          <div
            className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-stone-300 text-xs text-center sm:text-left flex items-center gap-2">
              <span className="font-bold text-amber-300">{currentFacilityInfo.name}</span>
              <span>•</span>
              <span>{t.priceHint}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={currentFacilityInfo.phoneHref}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-200" />
                <span>{t.callToBook}: {currentFacilityInfo.phone}</span>
              </a>
              <a
                href={currentFacilityInfo.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all"
              >
                <ZaloIcon className="w-3.5 h-3.5" />
                <span>{t.zalo}</span>
              </a>
              <a
                href={currentFacilityInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>{t.chatWhatsApp}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  if (onOpenWeChat) onOpenWeChat(currentFacilityInfo.branch);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07C160] hover:bg-[#059648] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <WeChatIcon className="w-3.5 h-3.5" />
                <span>{t.chatWeChat}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
