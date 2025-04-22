import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

export const fetchListPromotion = createAsyncThunk(
  "promotion/fetchListPromotion",
  async ({ code = "", totalPrice }, { getState, rejectWithValue }) => {
    try {
      if (typeof totalPrice !== "number" || totalPrice < 0) {
        return rejectWithValue("Tổng giá trị không hợp lệ");
      }

      const state = getState();
      const accessToken = state.auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để lấy danh sách khuyến mãi");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/coupon/get_by_user?&totalPrice=${totalPrice}`,
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
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách khuyến mãi"
        );
      }

      return data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách khuyến mãi"
      );
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
        state.listPromotion = action.payload || [];
      })
      .addCase(fetchListPromotion.rejected, (state, action) => {
        state.loadingPromotion = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default promotionSlice.reducer;
