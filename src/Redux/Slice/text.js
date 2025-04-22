import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initText = [
  {
    accessToken: null,
    user: null,
    isLogged: false,
    loading: false,
    error: null,
  },
];

const textSlice = createSlice({
  name: "text",
  initialState: {
    accessToken: null,
    user: null,
    isLogged: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLogged = true;
      state.loading = false;
      AsyncStorage.setItem("accessToken", action.payload.accessToken);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.isLogged = false;
      AsyncStorage.removeItem("accessToken");
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, logout } =
  textSlice.actions;

export default textSlice.reducer;

const discountItems = [
  {
    id: "1",
    title: "Giảm 20% cho các đặt phòng trên 1500K",
    code: "Mã: STAY20",
    expiry: "Hạn sử dụng: 15/03/2025",
  },
  {
    id: "2",
    title: "Giảm 100K cho lần đặt phòng đầu tiên",
    code: "Mã: 15FT",
    expiry: "Hạn sử dụng: 12/03/2025",
  },
  {
    id: "3",
    title: "Giảm 50K khi thanh toán bằng Mastercard",
    code: "Mã: MT3",
    expiry: "Hạn sử dụng: 13/03/2025",
  },
];

const test = [
  {
    code: "SUMMER25",
    description: "Giảm giá 25% với những hóa đơn trên 2 triệu đồng.",
    discountValue: 25,
    expirationDate: "30-04-2025 17:40:08",
    id: 1,
    minBookingAmount: 200000,
    validFromDate: "04-04-2025 17:40:54",
  },
  {
    code: "WELCOME100",
    description: "Giảm ngay 100.000đ với hóa đơn đầu tiên",
    discountValue: 100000,
    expirationDate: "27-04-2025 17:42:36",
    id: 2,
    minBookingAmount: 0,
    validFromDate: "04-04-2025 17:43:01",
  },
];

//  import React, { useState } from 'react';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file); // 'file' là tên field mà backend mong đợi

//     try {
//       const response = await fetch('http://localhost:8080/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();
//       console.log('Upload thành công:', result);
//     } catch (error) {
//       console.error('Upload thất bại:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default FileUpload;
