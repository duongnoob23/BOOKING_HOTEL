// src/Slice/hotelSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";
import { useAppSelector } from "../hook";

const formatToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const checkinDate = formatToYYYYMMDD(today);
const checkoutDate = formatToYYYYMMDD(tomorrow);

export const fetchHotelList = createAsyncThunk(
  "hotel/fetchHotelList",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state?.auth?.accessToken;
      if (accessToken) {
        const response = await fetch(`${API_BASE_URL}/api/hotel/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        return data.data;
      } else {
        const response = await fetch(`${API_BASE_URL}/api/hotel/home`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        // console.log("HistorySearchList, HotelRequestList", data.data);
        return data.data;
      }
    } catch (error) {
      // console.error("Error in fetchHotelList:", error);
      throw error; // Thông báo lỗi cho Redux
    }
  }
);

export const fetchHotelById = createAsyncThunk(
  "hotel/fetchHotelById",
  async (hotelId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hotel/hotel_detail/${hotelId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      // console.log(data.data);
      return data.data;
    } catch (error) {
      // console.error("Error in fetchHoteById:", error);
      throw error;
    }
  }
);

export const fetchLocationList = createAsyncThunk(
  "hotel/fetchLocationList",
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/location/get_list`, {
        method: "GET",
        headers: { "content-Type": "application/json" },
      });
      const data = await response.json();
      // console.log(">>> 53 hotelSlice data", data.data);
      return data.data;
    } catch (error) {
      // console.error("error in fetch location list:", error);
      throw error;
    }
  }
);

export const fetchAmenityList = createAsyncThunk(
  "hotel/fetchAmenityList",
  async () => {
    const response = await fetch(`${API_BASE_URL}/api/amenity/get_list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // console.log(data);
    return data?.data;
  }
);

export const fetchHotelByLocation = createAsyncThunk(
  "hotel/fetchHotelByLocation",
  async (value, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;

      const sortId = state.hotel.inforFilter.sortById;
      console.log("sortId", sortId);
      const sortItem = state.hotel.sortList.find((item) => item.id === sortId);
      const sortBy = sortItem?.key; // Lấy key (ví dụ: "price")
      const sortValue = sortItem?.value; // Lấy value (ví dụ: "asc")
      console.log("sortBy:", sortBy);
      console.log("sortValue:", sortValue);

      console.log("1111111111111111111111", state.hotel.inforFilter.amenityIds);

      if (accessToken) {
        console.log("----------- run1");
        console.log("check acessToekn fetchHotelByLocation", accessToken);

        const response = await fetch(
          `${API_BASE_URL}/api/hotel/filter?sortBy=${sortBy}&sort=${sortValue}`,
          // `${API_BASE_URL}/api/hotel/filter`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(value),
          }
        );
        const data = await response.json();
        console.log("check data >>>>> run1", data.data);

        return data?.data?.content;
      } else {
        console.log("----------- run2");

        const response = await fetch(
          // `${API_BASE_URL}/api/hotel/filter?sortBy=${}&sort=${}`,
          `${API_BASE_URL}/api/hotel/filter?sortBy=${sortBy}&sort=${sortValue}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
          }
        );
        const data = await response.json();
        return data?.data?.content;
      }
    } catch (error) {
      console.log("error in fetch hotel location:", error);
      throw error;
    }
  }
);

export const fetchHotelRoomList = createAsyncThunk(
  "hotel/fetchHotelRoomList",
  async (value) => {
    try {
      // console.log("---------------", value);
      const response = await fetch(`${API_BASE_URL}/api/room/select_room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      // console.log("-------------- 125 hotelSlice data:", data.data);
      return data.data;
    } catch (error) {
      // console.log("error in fetchHotelRoomList:", error);
      throw error;
    }
  }
);

export const fetchBookingRoom = createAsyncThunk(
  "hotel/fetchBookingRoom",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { bookingPayload } = getState().hotel;
      const { accessToken } = getState().auth;
      // console.log(accessToken);

      const response = await fetch(`${API_BASE_URL}/api/booking/get_booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      // console.log("-------- 170 hotelSL", data.data);

      const updatedData = data.data.roomBookedList?.map((room, index) => {
        const originalRoom = bookingPayload.roomRequestList[index];
        return {
          ...room,
          uniqueId: originalRoom?.uniqueId,
        };
      });

      // console.log(">>> 180 HS", updatedData);

      data.data.roomBookedList = updatedData;
      return {
        ...data.data,
        roomBookedList: updatedData,
      };
      // return data.data;
    } catch (error) {
      // console.log("error in fetchBookingRoom:", error);
      throw error;
    }
  }
);

export const fetchServiceList = createAsyncThunk(
  "hotel/fetchServiceList",
  async () => {
    const response = await fetch(`${API_BASE_URL}/api/service/get_list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log("272 HS >>>>>>>>>>>>>>>>>>>> filterList", data.data);
    return data.data;
  }
);

export const fetchBookingStatus = createAsyncThunk(
  "hotel/fetchBookingStatus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      // console.log("accessToken", accessToken);
      const res = await fetch(`${API_BASE_URL}/api/booking/history_booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      // console.log("fetchBookingStatus ", data.data);
      return data.data;
    } catch (error) {
      // console.log("error in fetchBookingStatus :", error);
      throw error;
    }
  }
);

export const getReviewDetails = createAsyncThunk(
  "hotel/getReviewDetails",
  async (reviewId, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hotel/review/${reviewId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("getReviewDetails", data.data);
      console.log();
      if (!response.ok) {
        return rejectWithValue(data.message || "Lấy chi tiết review thất bại");
      }

      return data.data;
    } catch (error) {
      console.log("error in getReviewDetails", error);
      return rejectWithValue(
        error.message || "Có lỗi xảy ra khi lấy chi tiết review"
      );
    }
  }
);

// export const sendReview = createAsyncThunk(
//   "hotel/sendReview",
//   async (reviewData, { getState, rejectWithValue }) => {
//     try {
//       // const reviewData = {
//       //   bookingId: "101",
//       //   comment: "g",
//       //   hotelId: "1",
//       //   hotelPoint: "4",
//       //   image: [
//       //     {
//       //       name: "sample-image.jpg",
//       //       type: "image/jpeg",
//       //       uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       //     },
//       //   ],
//       //   locationPoint: "4",
//       //   roomPoint: "4",
//       //   servicePoint: "4",
//       // };
//       // reviewData = {
//       //   ...reviewData,
//       //   image: [
//       //     {
//       //       name: "sample-image.jpg",
//       //       type: "image/jpeg",
//       //       uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       //     },
//       //   ],
//       // };

//       console.log("reveiew data >>>", reviewData);
//       const state = getState();
//       const accessToken = state.auth.accessToken;
//       if (!accessToken) {
//         return rejectWithValue("Không có token để gọi API");
//       }

//       // Tạo FormData từ dữ liệu review
//       const formData = new FormData();
//       formData.append("hotelId", reviewData.hotelId);
//       formData.append("bookingId", reviewData.bookingId);
//       formData.append("hotelPoint", reviewData.hotelPoint);
//       formData.append("roomPoint", reviewData.roomPoint);
//       formData.append("locationPoint", reviewData.locationPoint);
//       formData.append("servicePoint", reviewData.servicePoint);
//       formData.append("comment", reviewData.comment);

//       // Thêm hình ảnh nếu có (giả sử reviewData.image là một mảng các file)
//       if (reviewData.image && reviewData.image.length > 0) {
//         reviewData.image.forEach((file, index) => {
//           formData.append("image", {
//             uri: file.uri,
//             type: file.type || "image/jpeg",
//             name: file.name || `image_${index}.jpg`,
//           });
//         });
//       }

//       console.log("00000000000000000000000", formData.image);

//       console.log("formData", formData);

//       const response = await fetch(`${API_BASE_URL}/api/hotel/send_review`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("sendReview data", data);

//       if (!response.ok) {
//         return rejectWithValue(data.message || "Gửi review thất bại");
//       }
//       console.log("ĐÃ LƯU THÀNH CÔNG COMMENT VÀO CƠ SỞ DỮ LIỆU");
//       return data;
//     } catch (error) {
//       console.log("error in sendReview", error);
//       return rejectWithValue(error.message || "Có lỗi xảy ra khi gửi review");
//     }
//   }
// );
export const sendReview = createAsyncThunk(
  "hotel/sendReview",
  async (reviewData, { getState, rejectWithValue }) => {
    try {
      console.log("review data >>>", reviewData);
      const state = getState();
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        return rejectWithValue("Không có token để gọi API");
      }

      // Tạo FormData từ dữ liệu review
      const formData = new FormData();
      formData.append("hotelId", reviewData.hotelId.toString()); // Chuyển thành chuỗi
      formData.append("bookingId", reviewData.bookingId.toString()); // Chuyển thành chuỗi
      formData.append("hotelPoint", reviewData.hotelPoint.toString());
      formData.append("roomPoint", reviewData.roomPoint.toString());
      formData.append("locationPoint", reviewData.locationPoint.toString());
      formData.append("servicePoint", reviewData.servicePoint.toString());
      formData.append("comment", reviewData.comment);

      // Thêm hình ảnh nếu có
      if (reviewData.image && reviewData.image.length > 0) {
        reviewData.image.forEach((file, index) => {
          // Sửa type nếu không hợp lệ
          const fileType =
            file.type === "image" ? "image/jpeg" : file.type || "image/jpeg";
          formData.append("image", {
            uri: file.uri,
            type: fileType,
            name: file.name || `image_${index + 1}.jpg`,
          });
        });
      }

      // Không thể log trực tiếp FormData, thay vào đó log reviewData.image để kiểm tra
      console.log("Images to be sent:", reviewData.image);

      const response = await fetch(`${API_BASE_URL}/api/hotel/send_review`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("sendReview response data:", data);

      if (!response.ok) {
        console.log("API error:", data);
        return rejectWithValue(data.message || "Gửi review thất bại");
      }

      console.log("ĐÃ LƯU THÀNH CÔNG COMMENT VÀO CƠ SỞ DỮ LIỆU");
      return data;
    } catch (error) {
      console.log("Error in sendReview:", error);
      return rejectWithValue(error.message || "Có lỗi xảy ra khi gửi review");
    }
  }
);
const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    sortList: [
      { id: 1, name: "Giá tăng dần", key: "price", value: "asc" },
      { id: 2, name: "Giá giảm dần", key: "price", value: "desc" },
      { id: 3, name: "Đánh giá tăng dần", key: "review", value: "asc" },
      { id: 4, name: "Đánh giá giảm dần", key: "review", value: "desc" },
    ],

    amenityList: [],

    filterList: [],
    hotelList: [], // Danh sách khách sạn (Ưu đãi cuối tuần)
    locationList: [], // Danh sach Dia Diem
    hotelDetail: null, // Chi tiết khách
    hotelDetailId: "",
    hotelByLocation: [], // Danh sach Khach san theo dia diem
    hotelRoomList: [],
    hotelHistorySearch: [],
    bookingData: [], // lưu data danh sách các phòng trả về sau khi gọi api booking/get_booking
    bookingPayload: [], // lưu data ngày sau khi ấn đặt ngay ở hotelRoomList, đợi xác nhận thông tin, có accessToken sẽ gửi lênlên
    listUniqueIdBookingRoom: [], // lưu uniqueId key

    listBookingRoom: [],
    loading: false, // Đang tải hay không
    loadingListHotel: false,
    loadingHotelRoomList: false,
    loadingBookingRoom: false,
    loadingBookingStatus: false,
    map: false,
    roomNumbeFaker: [],
    error: null, // Lỗi nếu có
    inforFilter: {
      locationId: "0",
      checkin: checkinDate,
      checkout: checkoutDate,
      adults: 1,
      children: 0,
      roomNumber: 1,
      amenityIds: [],
      serviceIds: [],
      sortById: 1,
    },

    bookingStatus: {
      BOOKED: [],
      CHECKIN: [],
      CHECKOUT: [],
      CANCELED: [],
    },

    loadingNotification: false,
    notificationList: [],

    tempFilter: {
      // Lưu trữ tạm thời các lựa chọn
      amenityIds: [],
      serviceIds: [],
      sortById: 1,
    },

    loadingReviewDetails: false,
    reviewDetailsData: [],
    reviewDetailsError: null,

    loadingSendReview: false,
    sendReviewError: null,
    sendReviewSuccess: false,
  },
  reducers: {
    updateTempFilter(state, action) {
      // console.log("run 1");
      state.tempFilter = { ...state.tempFilter, ...action.payload };
    },
    applyFilter(state) {
      // console.log("run 2");
      // Copy tempFilter vào inforFilter khi nhấn "Áp dụng"
      state.inforFilter = {
        ...state.inforFilter,
        amenityIds: state.tempFilter.amenityIds,
        serviceIds: state.tempFilter.serviceIds,
        sortById: state.tempFilter.sortById,
      };
    },
    resetTempFilter(state) {
      // Reset tempFilter về giá trị ban đầu hoặc đồng bộ với inforFilter
      state.tempFilter = {
        amenityIds: state.inforFilter.amenityIds,
        serviceIds: state.inforFilter.serviceIds,
        sortById: state.inforFilter.sortById,
      };
    },
    clearHotelDetail(state) {
      state.hotelDetail = null; // Xóa chi tiết khi cần
    },
    skeletonLoading(state) {
      state.loading = true;
    },
    updateFilter(state, action) {
      // console.log(">>> 224 HS run");
      state.inforFilter = { ...state.inforFilter, ...action.payload };
    },
    mapOpenClose(state, action) {
      state.map = action.payload;
    },
    updateHotelDetailId(state, action) {
      state.hotelDetailId = action.payload;
    },
    uppdateListUniqueIdBookingRoom(state, action) {
      // console.log("233 HS check", action.payload);
      state.listUniqueIdBookingRoom = [...action.payload];
    },
    updateRoomNumber(state, action) {
      state.roomNumbeFaker = action.payload;
    },
    updateBookingPayload(state, action) {
      // console.log(action.payload);
      state.bookingPayload = action.payload;
    },
    resetSendReviewState: (state) => {
      state.loadingSendReview = false;
      state.sendReviewError = null;
      state.sendReviewSuccess = false;
    },
    updateLoadingSendReview: (state) => {
      state.loadingSendReview = true;
      state.sendReviewError = null;
    },

    addServiceToRoom(state, action) {
      try {
        const serviceData = action.payload;
        // console.log(">>> addServiceToRoom serviceData >>>", serviceData);

        if (state.bookingPayload && state.bookingPayload.roomRequestList) {
          const updatedRoomRequestList =
            state.bookingPayload.roomRequestList.map((item) => {
              const matchingRoom = serviceData.find(
                (data) => data.uniqueId === item.uniqueId
              );
              if (matchingRoom) {
                // Nếu matchingRoom tồn tại, thay thế serviceList bằng serviceIds
                const updatedServiceIdList =
                  matchingRoom.serviceIds.length > 0
                    ? matchingRoom.serviceIds.map((service) => ({
                        id: service.id,
                        quantity: service.quantity,
                        time: service.time || "",
                        note: service.note || "",
                      }))
                    : []; // Nếu serviceIds rỗng, đặt serviceList thành mảng rỗng

                return {
                  ...item,
                  serviceList: updatedServiceIdList,
                };
              }
              // Nếu không có matchingRoom, đặt serviceList thành mảng rỗng
              return {
                ...item,
                serviceList: [],
              };
            });

          // Cập nhật bookingPayload
          state.bookingPayload = {
            ...state.bookingPayload,
            roomRequestList: updatedRoomRequestList,
          };
        }
      } catch (error) {
        // console.log("error in addServiceToRoom", error);
      }
    },
  },
  extraReducers: (builder) => {
    // Xử lý fetchHotelList
    builder
      .addCase(fetchHotelList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelList.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelList = action.payload[0].hotelRequestList;
        state.hotelHistorySearch = action.payload[0].historySearchList;
      })
      .addCase(fetchHotelList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý fetchHotelById
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelDetail = action.payload;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý fetchLocationList
      .addCase(fetchLocationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationList.fulfilled, (state, action) => {
        state.loading = false;
        state.locationList = action.payload;
      })
      .addCase(fetchLocationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý fetchHotelByLocation
      .addCase(fetchHotelByLocation.pending, (state) => {
        state.loadingListHotel = true;
        state.error = null;
      })
      .addCase(fetchHotelByLocation.fulfilled, (state, action) => {
        state.loadingListHotel = false;
        state.hotelByLocation = action.payload;
      })
      .addCase(fetchHotelByLocation.rejected, (state, action) => {
        state.loadingListHotel = false;
        state.error = action.error.message;
      })
      // Xử lý fetchAmenityList
      .addCase(fetchAmenityList.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAmenityList.fulfilled, (state, action) => {
        state.amenityList = action.payload;
      })
      .addCase(fetchAmenityList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Xử lý fetchHotelRoomList
      .addCase(fetchHotelRoomList.pending, (state) => {
        state.loadingHotelRoomList = true;
        state.error = null;
      })
      .addCase(fetchHotelRoomList.fulfilled, (state, action) => {
        state.loadingHotelRoomList = false;
        state.hotelRoomList = action.payload;
      })
      .addCase(fetchHotelRoomList.rejected, (state, action) => {
        state.loadingHotelRoomList = false;
        state.error = action.error.message;
      })
      // Xu ly fetchBookingRoom
      .addCase(fetchBookingRoom.pending, (state) => {
        state.loadingBookingRoom = true;
        state.error = null;
      })
      .addCase(fetchBookingRoom.fulfilled, (state, action) => {
        // console.log(" >>> 326 HS", action.payload);
        state.loadingBookingRoom = false;
        state.bookingData = action.payload;
      })
      .addCase(fetchBookingRoom.rejected, (state, action) => {
        state.loadingBookingRoom = false;
        state.error = action.error.message;
      })

      // Xu ly fetchServiceList
      .addCase(fetchServiceList.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchServiceList.fulfilled, (state, action) => {
        state.filterList = action.payload;
      })
      .addCase(fetchServiceList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Xu ly fetchServiceList
      .addCase(fetchBookingStatus.pending, (state) => {
        state.loadingBookingStatus = true;
        state.error = null;
      })
      .addCase(fetchBookingStatus.fulfilled, (state, action) => {
        state.loadingBookingStatus = false;

        state.bookingStatus.BOOKED = action.payload[0].hotelBookingList;
        state.bookingStatus.CHECKIN = action.payload[1].hotelBookingList;
        state.bookingStatus.CHECKOUT = action.payload[2].hotelBookingList;
        state.bookingStatus.CANCELED = action.payload[3].hotelBookingList;
      })
      .addCase(fetchBookingStatus.rejected, (state, action) => {
        state.loadingBookingStatus = false;
        state.error = action.error.message;
      })
      // xử lý getReviewDetails
      .addCase(getReviewDetails.pending, (state) => {
        state.loadingReviewDetails = true;
        state.reviewDetailsError = null;
      })
      .addCase(getReviewDetails.fulfilled, (state, action) => {
        state.loadingReviewDetails = false;
        state.reviewDetailsData = action.payload;
      })
      .addCase(getReviewDetails.rejected, (state, action) => {
        state.loadingReviewDetails = false;
        state.reviewDetailsError = action.payload;
      })

      // XỬ LÝ SEND_REVIEW
      .addCase(sendReview.pending, (state) => {
        state.loadingSendReview = true;
        state.sendReviewError = null;
        state.sendReviewSuccess = false;
      })
      .addCase(sendReview.fulfilled, (state) => {
        state.loadingSendReview = false;
        state.sendReviewSuccess = true;
      })
      .addCase(sendReview.rejected, (state, action) => {
        state.loadingSendReview = false;
        state.sendReviewError = action.payload.message;
        state.sendReviewSuccess = false;
      });
  },
});

export const {
  clearHotelDetail,
  skeletonLoading,
  updateFilter,
  mapOpenClose,
  updateHotelDetailId,
  updateRoomNumber,
  uppdateListUniqueIdBookingRoom,
  addServiceToRoom,
  updateBookingPayload,
  updateTempFilter,
  applyFilter,
  resetTempFilter,
  resetSendReviewState,
  updateLoadingSendReview,
} = hotelSlice.actions;
export default hotelSlice.reducer;

// state.listUniqueIdBookingRoom = state.listUniqueIdBookingRoom.map(
//   (item) => {
//     const matchingRoom = serviceData.find(
//       (data) => data.uniqueId === item.uniqueId
//     );
//     if (matchingRoom) {
//       return {
//         ...item,
//         serviceIdList: [
//           ...new Set([...item.serviceIdList, ...matchingRoom.serviceIds]), // Loại bỏ trùng lặp
//         ],
//       };
//     }
//     return item;
//   }
// );
