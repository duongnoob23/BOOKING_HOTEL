import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../Constant/Constant";
// isLoggedIn: false,

export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        throw new Error("Không có token để gọi API");
      }

      console.log("id", id);
      console.log("accessToken", accessToken);
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
      console.log("data ", data);
      console.log("getBookingDetail", data.data);
      return data.data;
    } catch (error) {
      console.log("error in getBookingDetails error", error);
      throw error;
    }
  }
);

export const fetchConfirmBookingCancelled = createAsyncThunk(
  "booking/fetchConfirmBookingCancelled",
  async (value, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        throw new Error("Không có token để gọi API");
      }
      console.log("value fetchConfirmBookingCancelled ", value);
      console.log("accessToken", accessToken);
      const response = await fetch(`${API_BASE_URL}/api/booking/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      console.log("---------------------------------- ", data);
      // console.log("fetchConfirmBookingCancelled", data.data);
    } catch (error) {
      console.log("error in fetchConfirmBookingCancelled error", error);
      throw error;
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
  name: "auth",
  initialState: initValue,
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý fetchUserInfo
    builder
      .addCase(getBookingDetails.pending, (state) => {
        state.loadingBookingDetail = true;
        state.error = null;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        console.log(">>> 78 AS >>>", action.payload);
        state.loadingBookingDetail = false;
        state.bookingDetailData = action.payload;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loadingBookingDetail = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
