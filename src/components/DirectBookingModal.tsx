import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Phone, MessageCircle, CheckCircle2, ShieldCheck, Tag, Sparkles, Copy, Printer, ArrowRight } from 'lucide-react';
import { Language, HotelProperty, RoomType, BookingType, BookingFormState, ConfirmedBookingVoucher } from '../types';

interface DirectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  hotels: HotelProperty[];
  rooms: RoomType[];
  initialHotelId?: string;
  initialRoomId?: string;
}

export const DirectBookingModal: React.FC<DirectBookingModalProps> = ({
  isOpen,
  onClose,
  language,
  hotels,
  rooms,
  initialHotelId,
  initialRoomId,
}) => {
  const [hotelId, setHotelId] = useState<string>(initialHotelId || hotels[0]?.id || 'indochine-casa');
  const [roomTypeId, setRoomTypeId] = useState<string>(initialRoomId || '');
  const [bookingType, setBookingType] = useState<BookingType>('daily');
  const [checkInDate, setCheckInDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkInTime, setCheckInTime] = useState<string>('14:00');
  const [hoursCount, setHoursCount] = useState<number>(2);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('DIRECT15');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [voucher, setVoucher] = useState<ConfirmedBookingVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Sync initial props
  useEffect(() => {
    if (initialHotelId) setHotelId(initialHotelId);
    if (initialRoomId) setRoomTypeId(initialRoomId);
  }, [initialHotelId, initialRoomId]);

  // Available rooms for selected hotel
  const availableRooms = rooms.filter((r) => r.hotelId === hotelId);

  // Auto select first room if roomTypeId is not in availableRooms
  useEffect(() => {
    if (!availableRooms.some((r) => r.id === roomTypeId) && availableRooms.length > 0) {
      setRoomTypeId(availableRooms[0].id);
    }
  }, [hotelId, availableRooms, roomTypeId]);

  const selectedHotel = hotels.find((h) => h.id === hotelId) || hotels[0];
  const selectedRoom = availableRooms.find((r) => r.id === roomTypeId) || availableRooms[0];

  // Calculate pricing
  const calculateTotal = () => {
    if (!selectedRoom) return { total: 0, nights: 1 };

    let total = 0;
    let nights = 1;

    if (bookingType === 'daily') {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = Math.max(d2.getTime() - d1.getTime(), 86400000);
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      total = selectedRoom.dailyPrice * nights;
    } else if (bookingType === 'hourly') {
      const additionalHours = Math.max(0, hoursCount - 2);
      total = selectedRoom.hourlyPrice + additionalHours * selectedRoom.hourlyAdditional;
    } else if (bookingType === 'monthly') {
      total = selectedRoom.monthlyPrice || selectedRoom.dailyPrice * 22;
    }

    return { total, nights };
  };

  const { total, nights } = calculateTotal();

  if (!isOpen) return null;

  const isIndochine = selectedHotel.id === 'indochine-casa';
  const branchPhoneDisplay = isIndochine ? '+84 708 570 838' : '+84 966 572 935';
  const branchPhoneHref = isIndochine ? 'tel:+84708570838' : 'tel:+84966572935';
  const branchZaloHref = isIndochine ? 'https://zalo.me/0708570838' : 'https://zalo.me/0966572935';

  const t = {
    vi: {
      modalTitle: 'Phiếu Đặt Phòng Trực Tiếp Giá Tốt Nhất',
      modalSubtitle: 'Giữ phòng tức thì • Không cần cọc thẻ tín dụng • Xác nhận qua Zalo / Hotline 24/7',
      tabDaily: 'Đặt theo đêm',
      tabHourly: 'Đặt theo giờ (2h+)',
      tabMonthly: 'Lưu trú theo tháng',
      labelHotel: 'Chọn cơ sở',
      labelRoom: 'Chọn hạng phòng',
      labelCheckIn: 'Ngày nhận phòng',
      labelCheckOut: 'Ngày trả phòng',
      labelCheckInTime: 'Giờ nhận phòng dự kiến',
      labelHoursCount: 'Số giờ lưu trú',
      labelGuests: 'Số lượng khách',
      labelName: 'Họ và tên quý khách',
      labelPhone: 'Số điện thoại / Zalo nhận xác nhận',
      labelEmail: 'Email (không bắt buộc)',
      labelRequests: 'Yêu cầu đặc biệt (Bồn tắm, check-in sớm, hóa đơn VAT...)',
      pricePerNightFrom: 'Giá theo đêm từ:',
      priceSummary: 'Tóm tắt chi phí dự kiến',
      totalEst: 'Tổng thanh toán tại khách sạn:',
      payAtHotelNotice: 'Thanh toán trực tiếp khi nhận phòng (Tiền mặt, Chuyển khoản, Thẻ).',
      btnSubmit: 'Hoàn Tất Đặt Phòng Ngay',
      btnCallDirect: 'Gọi Lễ Tân Đặt Nhanh',
      voucherSuccessTitle: 'ĐẶT PHÒNG THÀNH CÔNG!',
      voucherSubtitle: 'Lễ tân đã ghi nhận thông tin và sẵn sàng đón tiếp quý khách.',
      voucherCode: 'Mã đặt phòng:',
      voucherNotice: 'Quý khách vui lòng lưu lại mã này hoặc nhấn nút gửi Zalo bên dưới để lễ tân xác nhận phòng ngay.',
      sendZalo: 'Gửi qua Zalo Lễ Tân',
      sendWhatsApp: 'Gửi qua WhatsApp',
      copyCode: 'Sao chép mã',
      copied: 'Đã sao chép!',
      close: 'Đóng',
    },
    en: {
      modalTitle: 'Direct Booking Engine — Best Rate Guaranteed',
      modalSubtitle: 'Instant Reservation • No Credit Card Prepayment Required • Confirmed via WhatsApp/Hotline',
      tabDaily: 'Overnight Stay',
      tabHourly: 'Hourly Stay (2h+)',
      tabMonthly: 'Monthly Long Stay',
      labelHotel: 'Select Property',
      labelRoom: 'Select Room Type',
      labelCheckIn: 'Check-in Date',
      labelCheckOut: 'Check-out Date',
      labelCheckInTime: 'Expected Arrival Time',
      labelHoursCount: 'Hours of Stay',
      labelGuests: 'Guests',
      labelName: 'Full Name',
      labelPhone: 'Phone / WhatsApp / Zalo',
      labelEmail: 'Email (Optional)',
      labelRequests: 'Special Requests (Bathtub, early check-in, VAT invoice...)',
      pricePerNightFrom: 'Price per night from:',
      priceSummary: 'Estimated Price Summary',
      totalEst: 'Total Payable at Check-in:',
      payAtHotelNotice: 'Pay upon arrival at reception (Cash, Bank Transfer, Visa/Mastercard).',
      btnSubmit: 'Confirm Direct Booking',
      btnCallDirect: 'Call Reception to Reserve',
      voucherSuccessTitle: 'RESERVATION CONFIRMED!',
      voucherSubtitle: 'Our front desk has received your request and is preparing your room.',
      voucherCode: 'Booking Voucher Code:',
      voucherNotice: 'Please note down your booking code or click below to message reception on WhatsApp/Zalo.',
      sendZalo: 'Message Reception via Zalo',
      sendWhatsApp: 'Message via WhatsApp',
      copyCode: 'Copy Booking Code',
      copied: 'Copied!',
      close: 'Close',
    },
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert(language === 'vi' ? 'Vui lòng nhập Họ tên và Số điện thoại/Zalo để nhận xác nhận!' : 'Please enter your Name and Phone number to receive confirmation!');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `#THAODIEN-${randomSuffix}`;

    const newVoucher: ConfirmedBookingVoucher = {
      bookingCode: code,
      hotel: selectedHotel,
      room: selectedRoom,
      details: {
        hotelId,
        roomTypeId,
        bookingType,
        checkInDate,
        checkInTime,
        checkOutDate,
        hoursCount,
        adults,
        children,
        guestName,
        guestPhone,
        guestEmail,
        specialRequests,
        promoCode,
      },
      estimatedTotal: total,
      discountAmount: 0,
      createdAt: new Date().toLocaleString('vi-VN'),
    };

    setVoucher(newVoucher);
  };

  const handleCopyCode = () => {
    if (!voucher) return;
    navigator.clipboard.writeText(voucher.bookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Compose prefilled message for Zalo or WhatsApp
  const generateMessage = () => {
    if (!voucher) return '';
    const roomName = voucher.room.name[language];
    const hotelName = voucher.hotel.name;
    const stayInfo =
      voucher.details.bookingType === 'daily'
        ? `${voucher.details.checkInDate} đến ${voucher.details.checkOutDate} (${nights} đêm)`
        : `Theo giờ (${voucher.details.hoursCount}h) ngày ${voucher.details.checkInDate} lúc ${voucher.details.checkInTime}`;

    return `[ĐẶT PHÒNG TRỰC TIẾP]
Mã: ${voucher.bookingCode}
Khách: ${voucher.details.guestName} (${voucher.details.guestPhone})
Khách sạn: ${hotelName} (${voucher.hotel.address})
Hạng phòng: ${roomName}
Thời gian: ${stayInfo}
Tổng tiền dự kiến: ${voucher.estimatedTotal.toLocaleString('vi-VN')}đ
Yêu cầu: ${voucher.details.specialRequests || 'Không'}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t.modalTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300">
            {t.modalSubtitle}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {voucher ? (
            /* Confirmation Voucher Screen */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-1">
                  {t.voucherSuccessTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  {t.voucherSubtitle}
                </p>
              </div>

              {/* Voucher Ticket Card */}
              <div className="bg-stone-50 border-2 border-dashed border-amber-800/30 rounded-2xl p-5 text-left space-y-4 relative">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white rounded-xl border border-stone-200 shadow-xs">
                      <img
                        src={voucher.hotel.logoUrl}
                        alt={voucher.hotel.name}
                        className="h-8 w-auto max-w-[70px] object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                        {t.voucherCode}
                      </span>
                      <span className="font-mono text-xl font-bold text-amber-900">
                        {voucher.bookingCode}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? t.copied : t.copyCode}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Khách sạn:</span>
                    <span className="font-bold text-stone-900">{voucher.hotel.name}</span>
                    <span className="text-stone-500 block text-[11px]">{voucher.hotel.fullAddress}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Hạng phòng:</span>
                    <span className="font-bold text-stone-900">{voucher.room.name[language]}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Khách hàng:</span>
                    <span className="font-bold text-stone-900">
                      {voucher.details.guestName} ({voucher.details.guestPhone})
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Thời gian:</span>
                    <span className="font-bold text-stone-900">
                      {voucher.details.bookingType === 'daily'
                        ? `${voucher.details.checkInDate} ➔ ${voucher.details.checkOutDate}`
                        : `${voucher.details.checkInDate} (${voucher.details.hoursCount}h từ ${voucher.details.checkInTime})`}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-600 font-medium">Tổng thanh toán tại quầy:</span>
                  <span className="font-serif-luxury text-xl font-bold text-amber-900">
                    {voucher.estimatedTotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-500 italic">
                {t.voucherNotice}
              </p>

              {/* Direct message buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://zalo.me/${selectedHotel.zaloPhone}?text=${encodeURIComponent(
                    generateMessage()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.sendZalo}</span>
                </a>

                <a
                  href={`https://wa.me/${selectedHotel.whatsappPhone.replace('+', '')}?text=${encodeURIComponent(
                    generateMessage()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.sendWhatsApp}</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
              >
                {t.close}
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rental Mode Tabs */}
              <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setBookingType('daily')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    bookingType === 'daily'
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  🌙 {t.tabDaily}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('hourly')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    bookingType === 'hourly'
                      ? 'bg-amber-700 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  ⏱️ {t.tabHourly}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('monthly')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    bookingType === 'monthly'
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  🏢 {t.tabMonthly}
                </button>
              </div>

              {/* Hotel & Room Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {t.labelHotel}
                    </label>
                    <div className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">
                      <img
                        src={selectedHotel.logoUrl}
                        alt={selectedHotel.name}
                        className="h-4 sm:h-5 w-auto max-w-[60px] object-contain"
                      />
                    </div>
                  </div>
                  <select
                    value={hotelId}
                    onChange={(e) => setHotelId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                  >
                    {hotels.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} - {h.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    {t.labelRoom}
                  </label>
                  <select
                    value={roomTypeId}
                    onChange={(e) => setRoomTypeId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                  >
                    {availableRooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name[language]} ({r.sizeM2}m²)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Times */}
              {bookingType === 'daily' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelCheckIn} (14:00)
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelCheckOut} (12:00)
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>
              ) : bookingType === 'hourly' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelCheckIn}
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelCheckInTime}
                    </label>
                    <input
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelHoursCount}
                    </label>
                    <select
                      value={hoursCount}
                      onChange={(e) => setHoursCount(Number(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                    >
                      <option value={2}>2 Giờ (Tiêu chuẩn)</option>
                      <option value={3}>3 Giờ</option>
                      <option value={4}>4 Giờ</option>
                      <option value={5}>5 Giờ</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Ngày bắt đầu hợp đồng
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Thời hạn dự kiến
                    </label>
                    <select className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:outline-hidden">
                      <option>1 Tháng</option>
                      <option>3 Tháng (Giảm thêm 5%)</option>
                      <option>6 Tháng - 1 Năm (Giảm thêm 10%)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Guest Information */}
              <div className="pt-2 border-t border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelName} *
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      {t.labelPhone} *
                    </label>
                    <input
                      type="tel"
                      placeholder="0909 xxx xxx"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    {t.labelRequests}
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Cần bồn tắm ngâm mình, check-in sớm 12h, hóa đơn công ty..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-700 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Price Calculation - Bold Overnight Price */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      {bookingType === 'daily' ? t.pricePerNightFrom : 'Chi phí dự kiến:'}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      {bookingType === 'daily' ? `${nights} đêm nghỉ dưỡng` : 'Đặt trực tiếp giá tốt nhất'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-amber-950 tracking-tight">
                      {total.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 italic text-right pt-2 border-t border-amber-200/60">
                  {t.payAtHotelNotice}
                </div>
              </div>

              {/* Submit & Contact Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.btnSubmit}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={branchPhoneHref}
                    className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{branchPhoneDisplay}</span>
                  </a>
                  <a
                    href={branchZaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
