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
        return rejectWithValue("Không có token để gọi API");
      }

      const response = await fetch(`${API_BASE_URL}/api/user/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log("fetchUserInfo", data.data);

      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy thông tin người dùng"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

export const updateUserInfoJson = createAsyncThunk(
  "auth/updateUserInfoJson",
  async (userInfo, { getState, rejectWithValue }) => {
    try {
      if (!userInfo) {
        return rejectWithValue("Thông tin người dùng không được cung cấp");
      }

      const { accessToken } = getState().auth;
      if (!accessToken) {
        return rejectWithValue("Không có token để gọi API");
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

      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi cập nhật thông tin người dùng"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

export const updateUserInfoFormData = createAsyncThunk(
  "auth/updateUserInfoFormData",
  async (userInfo, { getState, rejectWithValue }) => {
    try {
      if (!userInfo) {
        return rejectWithValue("Thông tin người dùng không được cung cấp");
      }

      const { accessToken } = getState().auth;
      if (!accessToken) {
        return rejectWithValue("Không có token để gọi API");
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

      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi cập nhật thông tin người dùng"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      if (!userData) {
        return rejectWithValue("Dữ liệu đăng ký không được cung cấp");
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi đăng ký");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi không xác định");
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
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.loading = false;
      AsyncStorage.setItem("accessToken", action.payload.accessToken);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.infoUser = null;
      state.inforUserChange = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("accessToken");
    },
    updateInforUserChange(state, action) {
      state.inforUserChange = action.payload;
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
      state.prePage = action.payload;
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
        console.log(">>> fetchUserInfo fulfilled >>>", action.payload);
        state.loadingInfoUser = false;
        state.infoUser = action.payload;
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
      .addCase(updateUserInfoJson.fulfilled, (state, action) => {
        state.infoUser = action.payload;
      })
      .addCase(updateUserInfoJson.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserInfoFormData.fulfilled, (state, action) => {
        state.infoUser = action.payload;
      })
      .addCase(updateUserInfoFormData.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
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
