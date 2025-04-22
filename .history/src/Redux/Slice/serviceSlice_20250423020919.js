import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../Constant/Constant";

export const fetchListService = createAsyncThunk(
  "service/fetchListService",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/service/get_list`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy danh sách dịch vụ");
      }

      return data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy danh sách dịch vụ"
      );
    }
  }
);

export const fetchServicesByCategory = createAsyncThunk(
  "service/fetchServicesByCategory",
  async (roomQuantities, { getState, rejectWithValue }) => {
    try {
      if (!roomQuantities || typeof roomQuantities !== "object") {
        return rejectWithValue("Dữ liệu số lượng phòng không hợp lệ");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/service/get_by_category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomQuantities),
        }
      );

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(
          data.message || "Lỗi khi lấy dịch vụ theo danh mục"
        );
      }

      return data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy dịch vụ theo danh mục"
      );
    }
  }
);

export const fetchCart = createAsyncThunk(
  "service/fetchCart",
  async ({ cartItems, roomMapping }, { rejectWithValue }) => {
    try {
      if (
        !cartItems ||
        !Array.isArray(cartItems) ||
        !roomMapping ||
        typeof roomMapping !== "object"
      ) {
        return rejectWithValue(
          "Dữ liệu giỏ hàng hoặc ánh xạ phòng không hợp lệ"
        );
      }

      const response = await fetch(`${API_BASE_URL}/api/service/get_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json();
      if (!response.ok || data.statusCode !== 200) {
        return rejectWithValue(data.message || "Lỗi khi lấy giỏ hàng");
      }

      return { ...data?.data, roomMapping };
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi không xác định khi lấy giỏ hàng"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    loadingService: false,
    error: null,
    serviceList: {},
    categories: [],
    cart: {
      serviceBookingList: [],
      priceServiceList: [],
      totalPrice: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListService.pending, (state) => {
        state.loadingService = true;
        state.error = null;
      })
      .addCase(fetchListService.fulfilled, (state, action) => {
        state.loadingService = false;
        const groupedServices = (action.payload || []).reduce(
          (acc, service) => {
            const { serviceType } = service || {};
            if (!acc[serviceType]) {
              acc[serviceType] = [];
            }
            acc[serviceType].push(service);
            return acc;
          },
          {}
        );
        state.serviceList = groupedServices;
        state.categories = Object.keys(groupedServices).map((key, index) => ({
          id: index + 1,
          name: key,
        }));
      })
      .addCase(fetchListService.rejected, (state, action) => {
        state.loadingService = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchServicesByCategory.pending, (state) => {
        state.loadingService = true;
        state.error = null;
      })
      .addCase(fetchServicesByCategory.fulfilled, (state, action) => {
        state.loadingService = false;
        const groupedServices = (action.payload || []).reduce((acc, item) => {
          acc[item?.serviceType] =
            item?.serviceRoomList?.map((service) => ({
              id: service?.id,
              name: service?.name,
              description: service?.description,
              image: service?.image,
              price: parseFloat(service?.price?.replace(/,/g, "") || 0),
              serviceType: item?.serviceType,
              roomChoseServiceList: service?.roomChoseServiceList || [],
            })) || [];
          return acc;
        }, {});
        state.serviceList = groupedServices;
        state.categories = (action.payload || [])
          .filter((item) => item?.serviceRoomList?.length > 0)
          .map((item, index) => ({
            id: index + 1,
            name: item?.serviceType,
          }));
      })
      .addCase(fetchServicesByCategory.rejected, (state, action) => {
        state.loadingService = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loadingService = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loadingService = false;
        const {
          serviceBookingList = [],
          priceServiceList = [],
          totalPrice = 0,
          roomMapping = {},
        } = action.payload || {};

        state.cart = {
          serviceBookingList: serviceBookingList.map((item) => {
            const tempMapping = Object.keys(roomMapping).reduce((acc, key) => {
              acc[key] = [...(roomMapping[key] || [])];
              return acc;
            }, {});

            return {
              serviceId: item?.serviceId,
              serviceName: item?.serviceName,
              bookingRoomResponseList: (
                item?.bookingRoomResponseList || []
              ).map((room) => {
                const uniqueId = tempMapping[room?.roomId]?.[0];
                if (uniqueId) {
                  tempMapping[room?.roomId]?.shift();
                } else {
                  console.warn(
                    `No uniqueId available for roomId ${room?.roomId}`
                  );
                }

                return {
                  uniqueId: uniqueId || "",
                  roomId: room?.roomId || "",
                  roomName: room?.roomName || "",
                  quantity: room?.quantity || 0,
                  time: room?.time || "",
                  note: room?.note || "",
                };
              }),
            };
          }),
          priceServiceList: priceServiceList.map((item) => ({
            serviceName: item?.serviceName || "",
            price: parseFloat(item?.price?.replace(/,/g, "") || 0),
            totalPrice: parseFloat(item?.totalPrice?.replace(/,/g, "") || 0),
            totalQuantity: item?.totalQuantity || 0,
          })),
          totalPrice: parseFloat(totalPrice?.replace(/,/g, "") || 0),
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loadingService = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default serviceSlice.reducer;
