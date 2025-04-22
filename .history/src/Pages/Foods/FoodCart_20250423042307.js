import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "../../Redux/hook";
import { addServiceToRoom } from "../../Redux/Slice/hotelSlice";
import { fetchCart } from "../../Redux/Slice/serviceSlice";
import { convertToCartItems } from "../../Utils/convertToCartItems";

const ShopCart = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { cart, loadingService, error } = useAppSelector(
    (state) => state.service
  );
  const { bookingPayload, navigateFoodCart } = useAppSelector(
    (state) => state.hotel
  );
  const [serviceQuantities, setServiceQuantities] = useState([]);
  const [expandedServices, setExpandedServices] = useState({});
  const roomMapping = route.params?.roomMapping || {};

  useEffect(() => {
    if (bookingPayload?.roomRequestList) {
      const initialQuantities = bookingPayload.roomRequestList
        .filter((room) => room.serviceList && room.serviceList.length > 0)
        .map((room) => ({
          uniqueId: room.uniqueId,
          serviceIds: room.serviceList.map((service) => ({
            id: service.id,
            quantity: service.quantity,
            time: service.time || "",
            note: service.note || "",
          })),
        }));
      setServiceQuantities(initialQuantities);
    }
  }, [bookingPayload]);
  // Xử lý tăng số lượng
  const handleAdd = (serviceId, uniqueId) => {
    if (!uniqueId) return;

    setServiceQuantities((prev) => {
      const existRoom = prev.find((r) => r.uniqueId === uniqueId);
      if (existRoom) {
        const existService = existRoom.serviceIds.find(
          (s) => s.id === serviceId
        );
        if (existService) {
          return prev.map((r) =>
            r.uniqueId === uniqueId
              ? {
                  ...r,
                  serviceIds: r.serviceIds.map((s) =>
                    s.id === serviceId ? { ...s, quantity: s.quantity + 1 } : s
                  ),
                }
              : r
          );
        }
        return prev.map((r) =>
          r.uniqueId === uniqueId
            ? {
                ...r,
                serviceIds: [
                  ...r.serviceIds,
                  { id: serviceId, quantity: 1, time: "", note: "" },
                ],
              }
            : r
        );
      }
      return [
        ...prev,
        {
          uniqueId,
          serviceIds: [{ id: serviceId, quantity: 1, time: "", note: "" }],
        },
      ];
    });
  };

  // Xử lý giảm số lượng
  const handleDecreaseQuantity = (serviceId, uniqueId) => {
    if (!uniqueId) return;

    setServiceQuantities((prev) => {
      return prev
        .map((r) =>
          r.uniqueId === uniqueId
            ? {
                ...r,
                serviceIds: r.serviceIds
                  .map((s) =>
                    s.id === serviceId && s.quantity > 0
                      ? { ...s, quantity: s.quantity - 1 }
                      : s
                  )
                  .filter((s) => s.quantity > 0),
              }
            : r
        )
        .filter((r) => r.serviceIds.length > 0);
    });
  };

  const handleUpdateNote = (serviceId, uniqueId, newNote) => {
    if (!uniqueId) return;

    setServiceQuantities((prev) => {
      const existRoom = prev.find((r) => r.uniqueId === uniqueId);
      if (existRoom) {
        const existService = existRoom.serviceIds.find(
          (s) => s.id === serviceId
        );
        if (existService) {
          return prev.map((r) =>
            r.uniqueId === uniqueId
              ? {
                  ...r,
                  serviceIds: r.serviceIds.map((s) =>
                    s.id === serviceId ? { ...s, note: newNote } : s
                  ),
                }
              : r
          );
        }
        return prev.map((r) =>
          r.uniqueId === uniqueId
            ? {
                ...r,
                serviceIds: [
                  ...r.serviceIds,
                  { id: serviceId, quantity: 0, time: "", note: newNote },
                ],
              }
            : r
        );
      }
      return [
        ...prev,
        {
          uniqueId,
          serviceIds: [{ id: serviceId, quantity: 0, time: "", note: newNote }],
        },
      ];
    });
  };

  // Xử lý xác nhận cho dịch vụ
  const handleConfirmService = () => {
    dispatch(addServiceToRoom(serviceQuantities));

    setExpandedServices([]);
  };

  // Xử lý xác nhận toàn bộ (thanh toán)

  console.log(">>>>>>> 150 ", serviceQuantities);

  const handleConfirmOrder = () => {
    dispatch(addServiceToRoom(serviceQuantities));

    setExpandedServices([]);
    const targetScreen =
      navigateFoodCart === "InfoConfirm" ? "InfoConfirm" : "OrderConfirm";
    navigation.navigate(`${targetScreen}`);
  };

  // Toggle mở rộng/thu gọn dịch vụ
  const toggleExpandService = (serviceId) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  // Tính giá tạm thời
  const calculateTempPrices = () => {
    const tempPriceServiceList = serviceQuantities.reduce((acc, room) => {
      room.serviceIds.forEach((service) => {
        const cartService = cart?.serviceBookingList?.find(
          (s) => s.serviceId === service.id
        );
        const priceService = cart?.priceServiceList?.find(
          (p) => p.serviceName === cartService?.serviceName
        );
        if (priceService) {
          const existing = acc.find(
            (p) => p.serviceName === priceService.serviceName
          );
          if (existing) {
            existing.totalQuantity += service.quantity;
            existing.totalPrice = existing.price * existing.totalQuantity;
          } else {
            acc.push({
              serviceName: priceService.serviceName,
              price: priceService.price,
              totalQuantity: service.quantity,
              totalPrice: priceService.price * service.quantity,
            });
          }
        }
      });
      return acc;
    }, []);

    const tempTotalPrice = tempPriceServiceList.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    return { tempPriceServiceList, tempTotalPrice };
  };

  const { tempPriceServiceList, tempTotalPrice } = calculateTempPrices();

  const renderRoomItem = ({ item: room }, serviceId) => {
    if (!room.uniqueId) {
      console.warn(
        `Skipping render room with no uniqueId: ${JSON.stringify(room)}`
      );
      return null;
    }

    const uniqueId = room.uniqueId;
    const roomQuantities = serviceQuantities.find(
      (q) => q.uniqueId === uniqueId
    );
    const service = roomQuantities?.serviceIds.find((s) => s.id === serviceId);
    const quantity = service?.quantity || 0;
    const time = service?.time || "";
    const note = service?.note || "";

    return (
      <View style={styles.roomWrapper}>
        {/* Phòng */}
        <View style={styles.roomInfo}>
          <Text style={styles.roomLabel}>Phòng</Text>
          <Text style={styles.roomValue}>{room?.roomName}</Text>
        </View>
        {/* Số lượng */}
        <View style={styles.roomInfo}>
          <Text style={styles.roomLabel}>Số lượng</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 0 && styles.quantityButtonDisabled,
              ]}
              onPress={() => handleDecreaseQuantity(serviceId, uniqueId)}
              disabled={quantity === 0}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleAdd(serviceId, uniqueId)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Render dịch vụ
  const renderServiceItem = ({ item }) => {
    if (!item?.serviceId) return null;

    return (
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceName}>
            {item.serviceName || "Dịch vụ không xác định"}
          </Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => toggleExpandService(item.serviceId)}
          >
            <Text style={styles.toggleButtonText}>
              {expandedServices[item.serviceId] ? "Thu gọn" : "Thêm"}
            </Text>
          </TouchableOpacity>
        </View>
        {expandedServices[item.serviceId] && (
          <View>
            <FlatList
              data={item.bookingRoomResponseList || []}
              renderItem={(props) => renderRoomItem(props, item.serviceId)}
              keyExtractor={(room) =>
                `room_${room.uniqueId || room.roomId}_${item.serviceId}`
              }
              style={styles.roomList}
              showsVerticalScrollIndicator={false}
            />
            {/* <TouchableOpacity
              style={styles.confirmServiceButton}
              onPress={() => handleConfirmService(item.serviceId)}
            >
              <Text style={styles.confirmServiceButtonText}>Xác nhận</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    );
  };

  // Render giá
  const renderPriceItem = ({ item }) => (
    <View style={styles.priceItem}>
      <Text style={styles.priceServiceName}>{item.serviceName}</Text>
      <Text style={styles.priceText}>
        {item.price.toLocaleString()} VNĐ x {item.totalQuantity} ={" "}
        {item.totalPrice.toLocaleString()} VNĐ
      </Text>
    </View>
  );

  // Xử lý loading và lỗi
  if (loadingService) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            const roomRequestList = bookingPayload?.roomRequestList || [];
            const { cartItems } = convertToCartItems(roomRequestList);
            dispatch(fetchCart({ cartItems, roomMapping }));
          }}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart?.serviceBookingList || []}
        renderItem={renderServiceItem}
        keyExtractor={(item) => `service_${item.serviceId}`}
        style={styles.serviceList}
        showsVerticalScrollIndicator={false}
      />

      {/* Danh sách giá */}
      <View style={styles.priceSection}>
        <Text style={styles.priceSectionTitle}>Chi tiết giá</Text>
        <FlatList
          data={tempPriceServiceList.length > 0 ? tempPriceServiceList : 0}
          renderItem={renderPriceItem}
          keyExtractor={(item) => `price_${item.serviceName}`}
          style={styles.priceList}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceLabel}>Tổng tiền:</Text>
          <Text style={styles.totalPriceValue}>
            {(tempPriceServiceList.length > 0
              ? tempTotalPrice
              : 0
            ).toLocaleString()}{" "}
            VNĐ
          </Text>
        </View>
      </View>

      {/* Nút thanh toán */}
      <View style={styles.groupButton}>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => handleConfirmService()}
        >
          <Text style={styles.proceedButtonText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.proceedButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ShopCart;
// sau khi OF đặt số lượng , FC giảm số lượng về 0 rồi lại đặt , OF lại đặt thì bị lỗi hiển thị
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  serviceList: {
    flexGrow: 0,
    paddingVertical: 10,
    // minHeight: "450",
    // maxHeight: "450",
  },
  serviceItemContainer: {
    marginBottom: 15,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  toggleButton: {
    backgroundColor: "#00F598",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  roomList: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
  },
  roomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  roomInfo: {
    flex: 1,
    alignItems: "center",
  },
  roomLabel: {
    fontSize: 12,
    color: "#666",
  },
  roomValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00F598",
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmServiceButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  confirmServiceButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  priceSection: {
    marginTop: "auto",
    padding: 15,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
  },
  priceSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  priceList: {
    marginBottom: 10,
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  priceServiceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  priceText: {
    fontSize: 14,
    color: "#666",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00F598",
  },
  proceedButton: {
    backgroundColor: "#00F598",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
    width: "49.5%",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: "#00F598",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  groupButton: {
    // marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomInfo: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  roomLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  roomValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
  },
});
