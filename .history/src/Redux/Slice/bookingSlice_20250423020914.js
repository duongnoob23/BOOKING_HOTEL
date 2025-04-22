import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../Constant/Constant";

export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      if (!id || typeof id !== "string") {
        return rejectWithValue("ID đặt phòng không hợp lệ");
      }

      const state = getState();
      const accessToken = state.auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để lấy chi tiết đặt phòng");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/booking/history_detail/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy chi tiết đặt phòng"
        );
      }

      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy chi tiết đặt phòng"
      );
    }
  }
);

export const fetchConfirmBookingCancelled = createAsyncThunk(
  "booking/fetchConfirmBookingCancelled",
  async (value, { getState, rejectWithValue }) => {
    try {
      if (!value || typeof value !== "object") {
        return rejectWithValue("Dữ liệu hủy đặt phòng không hợp lệ");
      }

      const state = getState();
      const accessToken = state.auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để hủy đặt phòng");
      }

      const response = await fetch(`${API_BASE_URL}/api/booking/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi hủy đặt phòng");
      }

      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi hủy đặt phòng"
      );
    }
  }
);

const initValue = {
  error: null,
  loadingBookingDetail: false,
  bookingDetailData: [],
  loadingCancel: false,
  loadingSaveVoucher: false,
  myVoucherData: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookingDetails.pending, (state) => {
        state.loadingBookingDetail = true;
        state.error = null;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.loadingBookingDetail = false;
        state.bookingDetailData = action.payload || [];
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loadingBookingDetail = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchConfirmBookingCancelled.pending, (state) => {
        state.loadingCancel = true;
        state.error = null;
      })
      .addCase(fetchConfirmBookingCancelled.fulfilled, (state, action) => {
        state.loadingCancel = false;
      })
      .addCase(fetchConfirmBookingCancelled.rejected, (state, action) => {
        state.loadingCancel = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default bookingSlice.reducer;
