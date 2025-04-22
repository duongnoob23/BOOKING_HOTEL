import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

export const fetchPaymentOrder = createAsyncThunk(
  "payment/fetchPaymentOrder",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const bookingPayload = state.hotel.bookingPayload;

      if (!accessToken) {
        return rejectWithValue("Không có token để gọi API");
      }
      if (!bookingPayload) {
        return rejectWithValue("Dữ liệu đặt phòng không được cung cấp");
      }

      console.log("fetchPaymentOrder bookingPayload:", bookingPayload);
      console.log("fetchPaymentOrder accessToken:", accessToken);
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

      if (data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi tạo thanh toán");
      }

      return data.data;
    } catch (error) {
      console.error("error from fetchPaymentOrder:", error.message);
      return rejectWithValue(error.message || "Lỗi không xác định");
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
        state.paymentData = action.payload;
      })
      .addCase(fetchPaymentOrder.rejected, (state, action) => {
        state.loadingPayment = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetPaymentData, updateCallPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
