export type Language = 'vi' | 'en' | 'ko' | 'zh';

export type LocalizedString = {
  vi: string;
  en: string;
  ko?: string;
  zh?: string;
};

export type LocalizedList = {
  vi: string[];
  en: string[];
  ko?: string[];
  zh?: string[];
};

export type BookingType = 'daily' | 'hourly' | 'monthly';

export interface HotelProperty {
  id: string;
  name: string;
  brand: 'INDOCHINE CASA' | 'CHINCHU';
  logoUrl: string;
  tagline: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  starRating: number;
  googleRating: number;
  reviewCount: number;
  address: string;
  ward: string;
  district: string;
  city: string;
  fullAddress: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  phone: string;
  hotline: string;
  zaloPhone: string;
  zaloUrl: string;
  whatsappPhone: string;
  whatsappUrl: string;
  wechatId?: string;
  wechatDisplay?: string;
  email: string;
  heroImage: string;
  gallery: string[];
  features: LocalizedList;
  priceRange: {
    hourlyFrom: number;
    dailyFrom: number;
    monthlyFrom: number;
  };
  distanceMetrics: {
    metroMinutes: number;
    district1Minutes: number;
    airportMinutes: number;
    vincomMegaMallMinutes: number;
    highlightWalk: LocalizedString;
  };
  checkInTime: string;
  checkOutTime: string;
}

export interface RoomAmenity {
  icon: string;
  name: LocalizedString;
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: LocalizedString;
  category: LocalizedString;
  sizeM2: number;
  bedType: LocalizedString;
  maxAdults: number;
  maxChildren: number;
  view: LocalizedString;
  hasBathtub: boolean;
  hasBalcony: boolean;
  hasWindow: boolean;
  hourlyPrice: number; // For 2 hours
  hourlyAdditional: number; // per additional hour
  dailyPrice: number; // overnight rate
  originalDailyPrice: number; // before direct booking discount
  monthlyPrice?: number;
  featuredImage: string;
  gallery: string[];
  amenities: LocalizedList;
  description: LocalizedString;
  isBestSeller?: boolean;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  hotelId: string;
  hotelName: string;
  guestName: string;
  guestOrigin: LocalizedString;
  avatar: string;
  rating: number;
  stayType: LocalizedString;
  date: string;
  roomName: LocalizedString;
  comment: LocalizedString;
  source: 'Google Maps' | 'Booking.com' | 'Agoda' | 'Direct Guest';
}

export interface FAQItem {
  id: string;
  category: 'booking' | 'policies' | 'location' | 'services';
  question: LocalizedString;
  answer: LocalizedString;
}

export interface BookingFormState {
  hotelId: string;
  roomTypeId: string;
  bookingType: BookingType;
  checkInDate: string;
  checkInTime: string; // for hourly
  checkOutDate: string;
  hoursCount: number; // for hourly
  adults: number;
  children: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
  promoCode: string;
}

export interface ConfirmedBookingVoucher {
  bookingCode: string;
  hotel: HotelProperty;
  room: RoomType;
  details: BookingFormState;
  estimatedTotal: number;
  discountAmount: number;
  createdAt: string;
}
