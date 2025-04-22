import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

// Hàm gọi API /api/payment/checkout
export const fetchPaymentOrder = createAsyncThunk(
  "payment/fetchPaymentOrder",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const bookingPayload = state.hotel.bookingPayload;
      // Kiểm tra accessToken

      console.log("--------------------------------------", bookingPayload);
      if (!accessToken) {
        return rejectWithValue(
          "User not logged in. Please login to proceed with payment."
        );
      }

      console.log("fetchPaymentOrder bookingPayload:", bookingPayload);
      console.log("fetchPaymentOrder accessToken:", accessToken);
      // Gọi API
      const response = await fetch(`${API_BASE_URL}/api/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();
      console.log("fetchPaymentOrder response:", data.data);

      return data.data; // Trả về { zpTransToken, appTransId, orderUrl, ... }
    } catch (error) {
      console.error("error from fetchPaymentOrder:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loadingPayment: false,
    error: null,
    paymentData: {
      zpTransToken: "",
      appTransId: "",
      orderUrl: "",
      returnCode: 0,
      returnMessage: "",
    },
    callPayment: false,
  },
  reducers: {
    // Reset paymentData nếu cần
    resetPaymentData(state) {
      state.paymentData = {
        zpTransToken: "",
        appTransId: "",
        orderUrl: "",
        returnCode: 0,
        returnMessage: "",
      };
      state.error = null;
      state.loadingPayment = false;
    },
    updateCallPayment(state, action) {
      state.callPayment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentOrder.pending, (state) => {
        state.loadingPayment = true;
        state.error = null;
      })
      .addCase(fetchPaymentOrder.fulfilled, (state, action) => {
        state.loadingPayment = false;
        state.paymentData = action.payload; // Lưu toàn bộ dữ liệu trả về
      })
      .addCase(fetchPaymentOrder.rejected, (state, action) => {
        state.loadingPayment = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetPaymentData, updateCallPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
