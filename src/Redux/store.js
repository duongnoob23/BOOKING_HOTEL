import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import textReducer from "./Slice/text";
import hotelReducer from "./Slice/hotelSlice";
import serviceReducer from "./Slice/serviceSlice";
import promotionReducer from "./Slice/promotionSlice";
import paymentReducer from "./Slice/paymentSlice";
import notificationReducer from "./Slice/notificationSlice";
import bookingReducer from "./Slice/bookingSlice";
import voucherReducer from "./Slice/voucherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    text: textReducer,
    hotel: hotelReducer,
    service: serviceReducer,
    promotion: promotionReducer,
    payment: paymentReducer,
    notification: notificationReducer,
    booking: bookingReducer,
    voucher: voucherReducer,
  },
});
