export type Language = 'vi' | 'en';

export type BookingType = 'daily' | 'hourly' | 'monthly';

export interface HotelProperty {
  id: string;
  name: string;
  brand: 'INDOCHINE CASA' | 'CHINCHU';
  logoUrl: string;
  tagline: {
    vi: string;
    en: string;
  };
  subtitle: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
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
  email: string;
  heroImage: string;
  gallery: string[];
  features: {
    vi: string[];
    en: string[];
  };
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
    highlightWalk: {
      vi: string;
      en: string;
    };
  };
  checkInTime: string;
  checkOutTime: string;
}

export interface RoomAmenity {
  icon: string;
  name: {
    vi: string;
    en: string;
  };
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: {
    vi: string;
    en: string;
  };
  category: {
    vi: string;
    en: string;
  };
  sizeM2: number;
  bedType: {
    vi: string;
    en: string;
  };
  maxAdults: number;
  maxChildren: number;
  view: {
    vi: string;
    en: string;
  };
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
  amenities: {
    vi: string[];
    en: string[];
  };
  description: {
    vi: string;
    en: string;
  };
  isBestSeller?: boolean;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  hotelId: string;
  hotelName: string;
  guestName: string;
  guestOrigin: {
    vi: string;
    en: string;
  };
  avatar: string;
  rating: number;
  stayType: {
    vi: string;
    en: string;
  };
  date: string;
  roomName: {
    vi: string;
    en: string;
  };
  comment: {
    vi: string;
    en: string;
  };
  source: 'Google Maps' | 'Booking.com' | 'Agoda' | 'Direct Guest';
}

export interface FAQItem {
  id: string;
  category: 'booking' | 'policies' | 'location' | 'services';
  question: {
    vi: string;
    en: string;
  };
  answer: {
    vi: string;
    en: string;
  };
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
