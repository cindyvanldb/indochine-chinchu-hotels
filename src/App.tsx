// Indochine Casa & Chinchu Hotels - Boutique Hospitality in Thao Dien
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyShowcase } from './components/PropertyShowcase';
import { RoomCatalog } from './components/RoomCatalog';
import { WhyBookDirect } from './components/WhyBookDirect';
import { LocationMapSection } from './components/LocationMapSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DirectBookingModal } from './components/DirectBookingModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { WeChatModal } from './components/WeChatModal';
import { HOTELS_DATA, ROOMS_DATA, REVIEWS_DATA, FAQS_DATA } from './data/hotels';
import { Language, RoomType, BookingType } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('vi');
  const [selectedHotelId, setSelectedHotelId] = useState<string>('indochine-casa');
  const [roomFilterHotelId, setRoomFilterHotelId] = useState<string>('all');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPrefillHotelId, setBookingPrefillHotelId] = useState<string>('indochine-casa');
  const [bookingPrefillRoomId, setBookingPrefillRoomId] = useState<string>('');
  const [detailRoom, setDetailRoom] = useState<RoomType | null>(null);
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState<boolean>(false);
  const [weChatModalBranch, setWeChatModalBranch] = useState<'indochine' | 'chinchu'>('indochine');

  const handleOpenBooking = (hotelId?: string, roomId?: string) => {
    if (hotelId) setBookingPrefillHotelId(hotelId);
    if (roomId) setBookingPrefillRoomId(roomId);
    setIsBookingModalOpen(true);
  };

  const handleOpenWeChat = (branch?: 'indochine' | 'chinchu') => {
    if (branch) setWeChatModalBranch(branch);
    setIsWeChatModalOpen(true);
  };

  const handleBookRoom = (room: RoomType) => {
    setBookingPrefillHotelId(room.hotelId);
    setBookingPrefillRoomId(room.id);
    setIsBookingModalOpen(true);
  };

  const handleSelectRoomDetail = (room: RoomType) => {
    setDetailRoom(room);
  };

  const handleSearchRooms = (params: {
    hotelId: string;
    bookingType: BookingType;
    checkInDate: string;
    checkOutDate: string;
  }) => {
    setRoomFilterHotelId(params.hotelId);
    if (params.hotelId !== 'all') {
      setSelectedHotelId(params.hotelId);
    }
  };

  const currentHotelForDetail = HOTELS_DATA.find((h) => h.id === detailRoom?.hotelId);

  // Schema.org Structured Data for Google Ads & SEO Rich Results
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Indochine Casa & Chinchu Hotels Thảo Điền',
    description:
      'Hệ thống khách sạn cao cấp tại Thảo Điền & An Khánh, TP. Hồ Chí Minh gồm Indochine Casa Hotel, Chinchu Luxury Hotel và Chinchu Stay.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4 Thái Ly / 46 Nguyễn Cừ / 24 Xuân Thủy',
      addressLocality: 'Thảo Điền, TP. Thủ Đức',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    telephone: '+84708570838',
    priceRange: '300.000đ - 1.250.000đ',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '850',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-800 selection:text-white">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1. Header & Navigation (Supports VIỆT, ANH, HÀN, TRUNG in dedicated row) */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onOpenBooking={() => handleOpenBooking()}
        hotels={HOTELS_DATA}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 2. Google Ads High-Converting Hero Section */}
      <Hero
        language={language}
        hotels={HOTELS_DATA}
        selectedHotelId={selectedHotelId}
        onSelectHotel={setSelectedHotelId}
        onSearchRooms={handleSearchRooms}
        onOpenBooking={handleOpenBooking}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 3. 3 Properties Side-by-side Showcase */}
      <PropertyShowcase
        language={language}
        hotels={HOTELS_DATA}
        selectedHotelId={selectedHotelId}
        onSelectHotel={setSelectedHotelId}
        onOpenBooking={handleOpenBooking}
        onFilterRoomsByHotel={(hId) => setRoomFilterHotelId(hId)}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 4. Filterable Rooms Catalog & Direct Rates */}
      <RoomCatalog
        language={language}
        rooms={ROOMS_DATA}
        hotels={HOTELS_DATA}
        selectedHotelFilter={roomFilterHotelId}
        onFilterChange={setRoomFilterHotelId}
        onSelectRoomDetail={handleSelectRoomDetail}
        onBookRoom={handleBookRoom}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 5. Direct Booking Value Props / Why Book Direct */}
      <WhyBookDirect
        language={language}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 6. Google Maps & Transit Proximity (Thảo Điền & An Khánh) */}
      <LocationMapSection
        language={language}
        hotels={HOTELS_DATA}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 7. Verified Guest Testimonials & Reviews */}
      <ReviewsSection
        language={language}
        reviews={REVIEWS_DATA}
        hotels={HOTELS_DATA}
      />

      {/* 8. Conversion FAQ Section */}
      <FaqSection
        language={language}
        faqs={FAQS_DATA}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 9. Footer */}
      <Footer
        language={language}
        hotels={HOTELS_DATA}
        onOpenBooking={handleOpenBooking}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 10. Direct Booking Engine Modal */}
      <DirectBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        language={language}
        hotels={HOTELS_DATA}
        rooms={ROOMS_DATA}
        initialHotelId={bookingPrefillHotelId}
        initialRoomId={bookingPrefillRoomId}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 11. Room Details & Photo Gallery Modal */}
      <RoomDetailModal
        room={detailRoom}
        hotel={currentHotelForDetail}
        language={language}
        onClose={() => setDetailRoom(null)}
        onBookRoom={handleBookRoom}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 12. Mobile Bottom Conversion Bar & Desktop Speed Dial */}
      <FloatingActionBar
        language={language}
        onOpenBooking={() => handleOpenBooking()}
        hotels={HOTELS_DATA}
        selectedHotelId={selectedHotelId}
        onOpenWeChat={handleOpenWeChat}
      />

      {/* 13. Dedicated WeChat Connect Modal */}
      <WeChatModal
        isOpen={isWeChatModalOpen}
        onClose={() => setIsWeChatModalOpen(false)}
        language={language}
        initialBranch={weChatModalBranch}
      />
    </div>
  );
}
