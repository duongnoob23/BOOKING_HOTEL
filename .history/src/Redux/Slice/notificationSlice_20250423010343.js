import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

// Thunk để lấy danh sách thông báo
export const fetchListNotification = createAsyncThunk(
  "notification/fetchListNotification",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;

      const response = await fetch(`${API_BASE_URL}/api/notifications/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log("fetchListNotification response:", data);
      return data;
    } catch (error) {
      console.error("error in fetchListNotification:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const notificationSlice = createSlice({
  name: "notification", // ✅ Đặt đúng tên
  initialState: {
    loadingNotification: false,
    error: null,
    listNotification: [],
  },
  reducers: {
    // ✅ Reducer thêm một thông báo mới
    addNotification: (state, action) => {
      state.listNotification.unshift(action.payload); // Thêm vào đầu danh sách
    },
    markNotificationAsRead(state, action) {
      const notificationId = action.payload;
      const notification = state.listNotification.find(
        (noti) => noti.id === notificationId
      );
      if (notification) {
        notification.is_read = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListNotification.pending, (state) => {
        state.loadingNotification = true;
        state.error = null;
      })
      .addCase(fetchListNotification.fulfilled, (state, action) => {
        state.loadingNotification = false;
        state.listNotification = action.payload;
      })
      .addCase(fetchListNotification.rejected, (state, action) => {
        state.loadingNotification = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Export actions và reducer
export const { addNotification, markNotificationAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
