const test = [
  {
    createdAt: null,
    id: 2,
    message: "Chúc mừng bạn đã đặt phòng thành công.",
    title: "Đặt phòng thành công!!",
    type: "BOOKING",
  },
  {
    createdAt: null,
    id: 3,
    message:
      "Bạn có voucher SUMMER25 sẽ hết hạn vào ngày mai hãy sử dụng trước lúc hết hạn.",
    title: "Mã khuyến mãi sắp hết hạn.",
    type: "BOOKING",
  },
  {
    createdAt: null,
    id: 4,
    message: "Vui lòng check in sau 14:00 trước 23:00",
    title: "Ngày mai bạn có lịch checkin lúc 14:00",
    type: "BOOKING",
  },
  {
    createdAt: null,
    id: 5,
    message: "Vui lòng check in sau 14:00 trước 23:00",
    title: "Ngày mai bạn có lịch checkout lúc 12:00",
    type: "BOOKING",
  },
][
  ({ bookingStatus: "BOOKED", hotelBookingList: [] },
  { bookingStatus: "CHECKIN", hotelBookingList: [[Object]] },
  { bookingStatus: "CHECKOUT", hotelBookingList: [] },
  {
    bookingStatus: "CANCELED",
    hotelBookingList: [[Object], [Object], [Object]],
  })
];
