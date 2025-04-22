import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

export const fetchListPromotion = createAsyncThunk(
  "promotion/fetchListPromotion",
  async ({ code, totalPrice }, { getState, rejectWithValue }) => {
    try {
      if (totalPrice === undefined) {
        return rejectWithValue("Tổng giá không được cung cấp");
      }

      const state = getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để gọi API");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/coupon/get_by_user?&totalPrice=${totalPrice}&currentCouponId=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("fetchListPromotion response:", data.data);

      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách mã giảm giá"
        );
      }

      return data.data;
    } catch (error) {
      console.error("error in fetchListPromotion:", error.message);
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    loadingPromotion: false,
    error: null,
    listPromotion: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListPromotion.pending, (state) => {
        state.loadingPromotion = true;
        state.error = null;
      })
      .addCase(fetchListPromotion.fulfilled, (state, action) => {
        state.loadingPromotion = false;
        state.listPromotion = action.payload;
      })
      .addCase(fetchListPromotion.rejected, (state, action) => {
        state.loadingPromotion = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default promotionSlice.reducer;
