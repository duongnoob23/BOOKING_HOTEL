import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

export const fetchSystemVouchers = createAsyncThunk(
  "voucher/fetchSystemVouchers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken, userName } = getState().auth;
      if (!accessToken) {
        return rejectWithValue("Không có token để lấy voucher hệ thống");
      }

      const res = await fetch(`${API_BASE_URL}/api/coupon/member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy voucher hệ thống");
      }

      return {
        couponList: (data?.data?.couponList || []).map((item) => ({
          id: String(item?.id || ""),
          code: item?.code || "",
          description: item?.description || "",
          expirationDate: item?.expirationDate || "",
          iconBackground: "#00A4E8",
        })),
        user: {
          name: userName || "Guest",
          Orders: data?.data?.currentTotalBooking || 0,
          Spend: parseFloat(data?.data?.currentTotalSpent || 0),
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy voucher hệ thống"
      );
    }
  }
);

export const fetchMyVouchers = createAsyncThunk(
  "voucher/fetchMyVouchers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để lấy voucher của bạn");
      }

      const res = await fetch(`${API_BASE_URL}/api/coupon/my_coupon`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy voucher của bạn");
      }

      const statusMap = {
        CAN_USE: "unused",
        USED: "used",
        EXPIRY_DATE: "expired",
      };

      const colorMap = {
        unused: "#00A4E8",
        used: "#EE4D2D",
        expired: "#EE4D2D",
      };

      const formattedVouchers = {
        unused: [],
        used: [],
        expired: [],
      };

      (data?.data || []).forEach((statusGroup) => {
        const localStatus = statusMap[statusGroup?.couponStatus] || "unused";
        const bgColor = colorMap[localStatus];

        (statusGroup?.couponList || []).forEach((item) => {
          formattedVouchers[localStatus].push({
            id: String(item?.id || ""),
            title: item?.code || "",
            condition: item?.description || "",
            expiry: `HSD: ${item?.expirationDate || ""}`,
            status: localStatus,
            iconBackground: bgColor,
          });
        });
      });

      return formattedVouchers;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy voucher của bạn"
      );
    }
  }
);

export const saveVoucher = createAsyncThunk(
  "voucher/saveVoucher",
  async (voucherId, { getState, rejectWithValue, dispatch }) => {
    try {
      if (!voucherId || typeof voucherId !== "string") {
        return rejectWithValue("ID voucher không hợp lệ");
      }

      const accessToken = getState().auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để lưu voucher");
      }

      const res = await fetch(
        `${API_BASE_URL}/api/coupon/user_save/${voucherId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lưu voucher");
      }

      dispatch(fetchMyVouchers());
      return data?.message || "Lưu voucher thành công";
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lưu voucher"
      );
    }
  }
);

export const fetchRanks = createAsyncThunk(
  "voucher/fetchRanks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/coupon/rank`);
      const data = await res.json();

      if (!res.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách xếp hạng"
        );
      }

      const ranks = (data?.data || []).map((rank) => ({
        name: rank?.name || "",
        description: rank?.description || "",
        minOrders: rank?.minTotalBooking || 0,
        minSpending: parseFloat(rank?.minTotalSpent || 0),
        color:
          {
            Đồng: "#d3a652",
            Bạc: "#677486",
            Vàng: "#f3b238d6",
            "Bạch Kim": "#6fd1d6",
            "Kim Cương": "#67e5cb",
          }[rank?.name] || "#ccc",
      }));

      return ranks;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách xếp hạng"
      );
    }
  }
);

export const fetchEventVouchers = createAsyncThunk(
  "voucher/fetchEventVouchers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để lấy voucher sự kiện");
      }

      const res = await fetch(`${API_BASE_URL}/api/coupon/event`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy voucher sự kiện");
      }

      return (data?.data || []).map((item) => ({
        id: String(item?.id || ""),
        code: item?.code || "",
        description: item?.description || "",
        expirationDate: item?.expirationDate || "",
        iconBackground: "#FF6347",
      }));
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy voucher sự kiện"
      );
    }
  }
);

const initialState = {
  error: null,
  loading: false,
  systemVouchers: [],
  myVouchers: {
    unused: [],
    used: [],
    expired: [],
  },
  eventVouchers: [],
  ranks: [],
  user: { name: "Guest", Orders: 0, Spend: 0 },
  successSave: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    clearVoucherStatus: (state) => {
      state.successSave = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.systemVouchers = action.payload?.couponList || [];
        state.user = action.payload?.user || {
          name: "Guest",
          Orders: 0,
          Spend: 0,
        };
      })
      .addCase(fetchSystemVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMyVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.myVouchers = action.payload || {
          unused: [],
          used: [],
          expired: [],
        };
      })
      .addCase(fetchMyVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(saveVoucher.pending, (state) => {
        state.loading = true;
        state.successSave = null;
        state.error = null;
      })
      .addCase(saveVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.successSave = action.payload || "Lưu voucher thành công";
      })
      .addCase(saveVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchRanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRanks.fulfilled, (state, action) => {
        state.loading = false;
        state.ranks = action.payload || [];
      })
      .addCase(fetchRanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchEventVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.eventVouchers = action.payload || [];
      })
      .addCase(fetchEventVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearVoucherStatus } = voucherSlice.actions;
export default voucherSlice.reducer;
