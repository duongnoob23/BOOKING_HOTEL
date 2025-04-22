import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

// export const fetch = createAsyncThunk("service/fetchListService", async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/service/get_list`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();
//     if (data.statusCode !== 200) {
//       throw new Error(data.message || "Failed to fetch service list");
//     }
//     return data.data;
//   } catch (error) {
//     console.log("error in fetchListService:", error);
//     throw error;
//   }
// });

export const fetchListPromotion = createAsyncThunk(
  "promotion/fetchListPromotion",
  async ({ code = "", totalPrice }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;

      // Kiểm tra accessToken

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
      console.log("fetchListPromotion response:", data.data);

      return data.data;
    } catch (error) {
      console.error("error in fetchListPromotion:", error.message);
      return rejectWithValue(error.message);
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
        state.error = action.error.message;
      });
  },
});

export default promotionSlice.reducer;
