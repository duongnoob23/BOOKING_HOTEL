import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

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
      const headers = accessToken
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        : { "Content-Type": "application/json" };

      const response = await fetch(`${API_BASE_URL}/api/hotel/home`, {
        method: "GET",
        headers,
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách khách sạn"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách khách sạn"
      );
    }
  }
);

export const fetchHotelById = createAsyncThunk(
  "hotel/fetchHotelById",
  async (hotelId, { rejectWithValue }) => {
    try {
      if (!hotelId) {
        return rejectWithValue("Thiếu ID khách sạn");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/hotel/hotel_detail/${hotelId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy chi tiết khách sạn"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy chi tiết khách sạn"
      );
    }
  }
);

export const fetchLocationList = createAsyncThunk(
  "hotel/fetchLocationList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/location/get_list`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách địa điểm"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách địa điểm"
      );
    }
  }
);

export const fetchAmenityList = createAsyncThunk(
  "hotel/fetchAmenityList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/amenity/get_list`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy danh sách tiện nghi"
        );
      }

      return data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách tiện nghi"
      );
    }
  }
);

export const fetchHotelByLocation = createAsyncThunk(
  "hotel/fetchHotelByLocation",
  async (value, { getState, rejectWithValue }) => {
    try {
      if (!value) {
        return rejectWithValue("Thiếu dữ liệu lọc khách sạn");
      }

      const state = getState();
      const accessToken = state.auth?.accessToken;
      const sortId = state.hotel.inforFilter?.sortById;
      const sortItem = state.hotel.sortList?.find((item) => item.id === sortId);
      const sortBy = sortItem?.key || "price";
      const sortValue = sortItem?.value || "asc";

      const headers = accessToken
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        : { "Content-Type": "application/json" };

      const response = await fetch(
        `${API_BASE_URL}/api/hotel/filter?sortBy=${sortBy}&sort=${sortValue}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(value),
        }
      );

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lọc khách sạn theo địa điểm"
        );
      }

      return data.data?.content || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lọc khách sạn theo địa điểm"
      );
    }
  }
);

export const fetchHotelRoomList = createAsyncThunk(
  "hotel/fetchHotelRoomList",
  async (value, { rejectWithValue }) => {
    try {
      if (!value) {
        return rejectWithValue("Thiếu dữ liệu yêu cầu phòng");
      }

      const response = await fetch(`${API_BASE_URL}/api/room/select_room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy danh sách phòng");
      }

      return data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách phòng"
      );
    }
  }
);

export const fetchBookingRoom = createAsyncThunk(
  "hotel/fetchBookingRoom",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { bookingPayload } = getState().hotel;
      const { accessToken } = getState().auth;

      if (!accessToken) {
        return rejectWithValue("Thiếu token để đặt phòng");
      }

      if (!bookingPayload || !bookingPayload.roomRequestList) {
        return rejectWithValue("Thiếu dữ liệu đặt phòng");
      }

      const response = await fetch(`${API_BASE_URL}/api/booking/get_booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi đặt phòng");
      }

      const updatedData = data.data.roomBookedList.map((room, index) => {
        const originalRoom = bookingPayload.roomRequestList[index];
        return {
          ...room,
          uniqueId: originalRoom?.uniqueId || "",
        };
      });

      return {
        ...data.data,
        roomBookedList: updatedData,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi đặt phòng"
      );
    }
  }
);

export const fetchServiceList = createAsyncThunk(
  "hotel/fetchServiceList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/service/get_list`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy danh sách dịch vụ");
      }

      return data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách dịch vụ"
      );
    }
  }
);

export const fetchBookingStatus = createAsyncThunk(
  "hotel/fetchBookingStatus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth?.accessToken;

      if (!accessToken) {
        return rejectWithValue("Thiếu token để lấy trạng thái đặt phòng");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/booking/history_booking`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy trạng thái đặt phòng"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy trạng thái đặt phòng"
      );
    }
  }
);

export const getReviewDetails = createAsyncThunk(
  "hotel/getReviewDetails",
  async (reviewId, { getState, rejectWithValue }) => {
    try {
      if (!reviewId) {
        return rejectWithValue("Thiếu ID đánh giá");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/hotel/review/${reviewId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lấy chi tiết đánh giá thất bại"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy chi tiết đánh giá"
      );
    }
  }
);

export const sendReview = createAsyncThunk(
  "hotel/sendReview",
  async (reviewData, { getState, rejectWithValue }) => {
    try {
      if (!reviewData) {
        return rejectWithValue("Thiếu dữ liệu đánh giá");
      }

      const requiredFields = [
        "hotelId",
        "bookingId",
        "hotelPoint",
        "roomPoint",
        "locationPoint",
        "servicePoint",
        "comment",
      ];
      const missingFields = requiredFields.filter(
        (field) => reviewData[field] === undefined || reviewData[field] === null
      );
      if (missingFields.length > 0) {
        return rejectWithValue(
          `Thiếu các trường bắt buộc: ${missingFields.join(", ")}`
        );
      }

      const state = getState();
      const accessToken = state.auth?.accessToken;
      if (!accessToken) {
        return rejectWithValue("Thiếu token để gửi đánh giá");
      }

      const formData = new FormData();
      formData.append("hotelId", reviewData.hotelId.toString());
      formData.append("bookingId", reviewData.bookingId.toString());
      formData.append("hotelPoint", reviewData.hotelPoint.toString());
      formData.append("roomPoint", reviewData.roomPoint.toString());
      formData.append("locationPoint", reviewData.locationPoint.toString());
      formData.append("servicePoint", reviewData.servicePoint.toString());
      formData.append("comment", reviewData.comment);

      if (reviewData.image && Array.isArray(reviewData.image)) {
        reviewData.image.forEach((file, index) => {
          if (file?.uri) {
            const fileType =
              file.type === "image" ? "image/jpeg" : file.type || "image/jpeg";
            formData.append("image", {
              uri: file.uri,
              type: fileType,
              name: file.name || `image_${index + 1}.jpg`,
            });
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/api/hotel/send_review`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        return rejectWithValue(data.message || "Gửi đánh giá thất bại");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi gửi đánh giá"
      );
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
    hotelList: [],
    locationList: [],
    hotelDetail: null,
    hotelDetailId: "",
    hotelByLocation: [],
    hotelRoomList: [],
    hotelHistorySearch: [],
    bookingData: [],
    bookingPayload: [],
    listUniqueIdBookingRoom: [],
    listBookingRoom: [],
    loading: false,
    loadingListHotel: false,
    loadingHotelRoomList: false,
    loadingBookingRoom: false,
    loadingBookingStatus: false,
    map: false,
    roomNumbeFaker: [],
    error: null,
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
      state.tempFilter = { ...state.tempFilter, ...(action.payload || {}) };
    },
    applyFilter(state) {
      state.inforFilter = {
        ...state.inforFilter,
        amenityIds: state.tempFilter?.amenityIds || [],
        serviceIds: state.tempFilter?.serviceIds || [],
        sortById: state.tempFilter?.sortById || 1,
      };
    },
    resetTempFilter(state) {
      state.tempFilter = {
        amenityIds: state.inforFilter?.amenityIds || [],
        serviceIds: state.inforFilter?.serviceIds || [],
        sortById: state.inforFilter?.sortById || 1,
      };
    },
    clearHotelDetail(state) {
      state.hotelDetail = null;
    },
    skeletonLoading(state) {
      state.loading = true;
    },
    updateFilter(state, action) {
      state.inforFilter = { ...state.inforFilter, ...(action.payload || {}) };
    },
    mapOpenClose(state, action) {
      state.map = action.payload ?? false;
    },
    updateHotelDetailId(state, action) {
      state.hotelDetailId = action.payload || "";
    },
    uppdateListUniqueIdBookingRoom(state, action) {
      state.listUniqueIdBookingRoom = action.payload || [];
    },
    updateRoomNumber(state, action) {
      state.roomNumbeFaker = action.payload || [];
    },
    updateBookingPayload(state, action) {
      state.bookingPayload = action.payload || [];
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
        const serviceData = action.payload || [];
        if (!state.bookingPayload || !state.bookingPayload.roomRequestList) {
          return;
        }

        const updatedRoomRequestList = state.bookingPayload.roomRequestList.map(
          (item) => {
            const matchingRoom = serviceData.find(
              (data) => data?.uniqueId === item?.uniqueId
            );
            if (matchingRoom) {
              const updatedServiceIdList =
                matchingRoom.serviceIds?.length > 0
                  ? matchingRoom.serviceIds.map((service) => ({
                      id: service?.id || "",
                      quantity: service?.quantity || 0,
                      time: service?.time || "",
                      note: service?.note || "",
                    }))
                  : [];

              return {
                ...item,
                serviceList: updatedServiceIdList,
              };
            }

            return {
              ...item,
              serviceList: [],
            };
          }
        );

        state.bookingPayload = {
          ...state.bookingPayload,
          roomRequestList: updatedRoomRequestList,
        };
      } catch (error) {
        console.error("Lỗi trong addServiceToRoom:", error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelList.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelList = action.payload?.[0]?.hotelRequestList || [];
        state.hotelHistorySearch = action.payload?.[0]?.historySearchList || [];
      })
      .addCase(fetchHotelList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelDetail = action.payload || null;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchLocationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationList.fulfilled, (state, action) => {
        state.loading = false;
        state.locationList = action.payload || [];
      })
      .addCase(fetchLocationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchHotelByLocation.pending, (state) => {
        state.loadingListHotel = true;
        state.error = null;
      })
      .addCase(fetchHotelByLocation.fulfilled, (state, action) => {
        state.loadingListHotel = false;
        state.hotelByLocation = action.payload || [];
      })
      .addCase(fetchHotelByLocation.rejected, (state, action) => {
        state.loadingListHotel = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAmenityList.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAmenityList.fulfilled, (state, action) => {
        state.amenityList = action.payload || [];
      })
      .addCase(fetchAmenityList.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchHotelRoomList.pending, (state) => {
        state.loadingHotelRoomList = true;
        state.error = null;
      })
      .addCase(fetchHotelRoomList.fulfilled, (state, action) => {
        state.loadingHotelRoomList = false;
        state.hotelRoomList = action.payload || [];
      })
      .addCase(fetchHotelRoomList.rejected, (state, action) => {
        state.loadingHotelRoomList = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchBookingRoom.pending, (state) => {
        state.loadingBookingRoom = true;
        state.error = null;
      })
      .addCase(fetchBookingRoom.fulfilled, (state, action) => {
        state.loadingBookingRoom = false;
        state.bookingData = action.payload || [];
      })
      .addCase(fetchBookingRoom.rejected, (state, action) => {
        state.loadingBookingRoom = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchServiceList.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchServiceList.fulfilled, (state, action) => {
        state.filterList = action.payload || [];
      })
      .addCase(fetchServiceList.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchBookingStatus.pending, (state) => {
        state.loadingBookingStatus = true;
        state.error = null;
      })
      .addCase(fetchBookingStatus.fulfilled, (state, action) => {
        state.loadingBookingStatus = false;
        state.bookingStatus.BOOKED =
          action.payload?.[0]?.hotelBookingList || [];
        state.bookingStatus.CHECKIN =
          action.payload?.[1]?.hotelBookingList || [];
        state.bookingStatus.CHECKOUT =
          action.payload?.[2]?.hotelBookingList || [];
        state.bookingStatus.CANCELED =
          action.payload?.[3]?.hotelBookingList || [];
      })
      .addCase(fetchBookingStatus.rejected, (state, action) => {
        state.loadingBookingStatus = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getReviewDetails.pending, (state) => {
        state.loadingReviewDetails = true;
        state.reviewDetailsError = null;
      })
      .addCase(getReviewDetails.fulfilled, (state, action) => {
        state.loadingReviewDetails = false;
        state.reviewDetailsData = action.payload || [];
      })
      .addCase(getReviewDetails.rejected, (state, action) => {
        state.loadingReviewDetails = false;
        state.reviewDetailsError = action.payload;
      })
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
        state.sendReviewError = action.payload;
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
