import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../Constant/Constant";

const initValue = {
  accessToken: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  loadingInfoUser: false,
  userInfor: {
    userId: "0",
    firstName: "Lâm",
    lastName: "Tiến Dưỡng",
    email: "lamtiendung11082002@gmail.com",
    phoneNumber: "0982474802",
    country: "+84",
  },
  infoUser: null,
  inforUserChange: null,
  registerLoading: false,
  registerError: null,
  registerSuccess: false,
  prePage: null,
};

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth;
      if (!accessToken) {
        return rejectWithValue("Không có token để lấy thông tin người dùng");
      }

      const response = await fetch(`${API_BASE_URL}/api/user/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy thông tin người dùng"
        );
      }

      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy thông tin người dùng"
      );
    }
  }
);

export const updateUserInfoJson = createAsyncThunk(
  "auth/updateUserInfoJson",
  async (userInfo, { getState, rejectWithValue }) => {
    try {
      if (!userInfo || typeof userInfo !== "object") {
        return rejectWithValue("Dữ liệu thông tin người dùng không hợp lệ");
      }

      const requiredFields = ["firstName", "lastName", "email", "phoneNumber"];
      const missingFields = requiredFields.filter((field) => !userInfo[field]);
      if (missingFields.length > 0) {
        return rejectWithValue(
          `Thiếu các trường bắt buộc: ${missingFields.join(", ")}`
        );
      }

      const { accessToken } = getState().auth;
      if (!accessToken) {
        return rejectWithValue("Không có token để cập nhật thông tin");
      }

      const response = await fetch(`${API_BASE_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi cập nhật thông tin người dùng"
        );
      }

      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi cập nhật thông tin"
      );
    }
  }
);

export const updateUserInfoFormData = createAsyncThunk(
  "auth/updateUserInfoFormData",
  async (userInfo, { getState, rejectWithValue }) => {
    try {
      if (!userInfo || typeof userInfo !== "object") {
        return rejectWithValue("Dữ liệu thông tin người dùng không hợp lệ");
      }

      const requiredFields = ["firstName", "lastName", "email", "phoneNumber"];
      const missingFields = requiredFields.filter((field) => !userInfo[field]);
      if (missingFields.length > 0) {
        return rejectWithValue(
          `Thiếu các trường bắt buộc: ${missingFields.join(", ")}`
        );
      }

      const { accessToken } = getState().auth;
      if (!accessToken) {
        return rejectWithValue("Không có token để cập nhật thông tin");
      }

      const formData = new FormData();
      formData.append("firstName", userInfo.firstName || "");
      formData.append("lastName", userInfo.lastName || "");
      formData.append("email", userInfo.email || "");
      formData.append("phoneNumber", userInfo.phoneNumber || "");

      const response = await fetch(`${API_BASE_URL}/api/user/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi cập nhật thông tin người dùng"
        );
      }

      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi cập nhật thông tin"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      if (!userData || typeof userData !== "object") {
        return rejectWithValue("Dữ liệu đăng ký không hợp lệ");
      }

      const requiredFields = ["email", "password"];
      const missingFields = requiredFields.filter((field) => !userData[field]);
      if (missingFields.length > 0) {
        return rejectWithValue(
          `Thiếu các trường bắt buộc: ${missingFields.join(", ")}`
        );
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Đăng ký thất bại");
      }

      return data?.data || {};
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi không xác định khi đăng ký");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initValue,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.accessToken = action.payload?.accessToken || null;
      state.userId = action.payload?.userId || null;
      state.isLoggedIn = true;
      state.loading = false;
      AsyncStorage.setItem("accessToken", action.payload?.accessToken || "");
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload || "Đăng nhập thất bại";
    },
    logout(state) {
      state.accessToken = null;
      state.infoUser = null;
      state.inforUserChange = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("accessToken");
    },
    updateInforUserChange(state, action) {
      state.inforUserChange = action.payload || null;
    },
    clearInforUserChange(state) {
      state.inforUserChange = null;
    },
    resetRegisterState(state) {
      state.registerLoading = false;
      state.registerError = null;
      state.registerSuccess = false;
    },
    setPrePage(state, action) {
      state.prePage = action.payload || null;
    },
    clearPrePage(state) {
      state.prePage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loadingInfoUser = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loadingInfoUser = false;
        state.infoUser = action.payload || {};
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loadingInfoUser = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload || action.error.message;
        state.registerSuccess = false;
      })
      .addCase(updateUserInfoJson.pending, (state) => {
        state.loadingInfoUser = true;
        state.error = null;
      })
      .addCase(updateUserInfoJson.fulfilled, (state, action) => {
        state.loadingInfoUser = false;
        state.infoUser = action.payload || {};
      })
      .addCase(updateUserInfoJson.rejected, (state, action) => {
        state.loadingInfoUser = false;
        state.error = action.payload || "Cập nhật thông tin thất bại";
      })
      .addCase(updateUserInfoFormData.pending, (state) => {
        state.loadingInfoUser = true;
        state.error = null;
      })
      .addCase(updateUserInfoFormData.fulfilled, (state, action) => {
        state.loadingInfoUser = false;
        state.infoUser = action.payload || {};
      })
      .addCase(updateUserInfoFormData.rejected, (state, action) => {
        state.loadingInfoUser = false;
        state.error = action.payload || "Cập nhật thông tin thất bại";
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateInforUserChange,
  clearInforUserChange,
  resetRegisterState,
  setPrePage,
  clearPrePage,
} = authSlice.actions;

export default authSlice.reducer;
