import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

export const fetchListNotification = createAsyncThunk(
  "notification/fetchListNotification",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để gọi API");
      }

      const response = await fetch(`${API_BASE_URL}/api/notifications/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log("fetchListNotification response:", data);

      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách thông báo"
        );
      }

      return data.data;
    } catch (error) {
      console.error("error in fetchListNotification:", error.message);
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    loadingNotification: false,
    error: null,
    listNotification: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.listNotification.unshift(action.payload);
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

export const { addNotification, markNotificationAsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
