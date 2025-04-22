import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppSelector, useAppDispatch } from "../../Redux/hook";
import { addServiceToRoom } from "../../Redux/Slice/hotelSlice";
import { convertToCartItems } from "../../Utils/convertToCartItems";
import { fetchCart } from "../../Redux/Slice/serviceSlice";
import getServiceIconOrderFood from "../../Components/Icon/getServiceIconOrderFood";

const OrderFood = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    type: "",
  });

  useEffect(() => {
    if (categories) {
      setSelectedCategory({
        id: categories[0]?.id,
        type: categories[0]?.name,
      });
    }
  }, [categories]);
  const dispatch = useAppDispatch();

  const [expandedServices, setExpandedServices] = useState({});
  const [serviceQuantities, setServiceQuantities] = useState([]);
  // Dạng: [{ uniqueId: "room1_1", serviceIds: [{ id: 1, quantity: 2, time: "", note: "" }, ...] }, ...]

  const { serviceList, loadingService, categories } = useAppSelector(
    (state) => state.service
  );
  const { bookingPayload } = useAppSelector((state) => state.hotel);
  const listRoom = bookingPayload?.roomRequestList;
  console.log(bookingPayload.roomRequestList);
  console.log(bookingPayload);
  // const categories = Object.keys(serviceList).map((key, index) => ({
  //   id: index + 1,
  //   name: key,
  // }));
  const foodItems = serviceList[`${selectedCategory?.type}`] || [];
  console.log(">>>>>>>>>>> 50 ", serviceQuantities);
  // Khởi tạo serviceQuantities từ bookingPayload khi vào màn hình
  useEffect(() => {
    if (bookingPayload?.roomRequestList) {
      const initialQuantities = bookingPayload.roomRequestList
        .filter((room) => room.serviceList && room.serviceList.length > 0)
        .map((room) => ({
          uniqueId: room.uniqueId,
          serviceIds: room.serviceList.map((service) => ({
            id: service?.id,
            quantity: service.quantity,
            time: service.time || "",
            note: service.note || "",
          })),
        }));
      setServiceQuantities(initialQuantities);
    }
  }, [bookingPayload]);

  const handleToFoodDetails = () => {
    navigation.navigate("FoodDetails");
  };

  const handleBack = () => {
    if (route?.params?.prePage === "OrderConfirm") {
      navigation.navigate("OrderConfirm");
    } else {
      navigation.goBack();
    }
  };

  const handleToggleRoomList = (serviceId) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };
  //  { uniqueId: "room2_1", serviceIds: [{ id: 1, quantity: 2, time: "", note: "" }] }
  // TH1 serviceQuantities [{ uniqueId: "room1_1", serviceIds: [{ id: 1, quantity: 2, time: "", note: "" }] }
  // TH2 ,{ uniqueId: "room2_1", serviceIds: [] }
  // TH3 ,{ uniqueId: "room2_1", serviceIds: [{ id: 1, quantity: 2, time: "", note: "" }] }]

  const printServiceQuantities = (serviceQuantities) => {
    if (!serviceQuantities || serviceQuantities.length === 0) {
      console.log("serviceQuantities is empty or undefined");
      return;
    }

    console.log("=== serviceQuantities ===");
    serviceQuantities.forEach((room, roomIndex) => {
      console.log(`Room ${roomIndex + 1} (uniqueId: ${room.uniqueId}):`);

      if (!room.serviceIds || room.serviceIds.length === 0) {
        console.log("  No services available");
      } else {
        room.serviceIds.forEach((service, serviceIndex) => {
          console.log(
            `  Service ${serviceIndex + 1}: id=${service?.id}, quantity=${
              service.quantity
            }, time="${service.time}", note="${service.note}"`
          );
        });
      }
      console.log(
        "---------------------------------------------------------------------------------"
      );
    });
  };

  // printServiceQuantities(serviceQuantities);
  // Xử lý thêm dịch vụ với time và note mặc định
  const handleAdd = (uniqueId, serviceId) => {
    setServiceQuantities((prev) => {
      const existRoom = prev.find((r) => r.uniqueId === uniqueId);
      if (existRoom) {
        const existService = existRoom.serviceIds.find(
          (s) => s?.id === serviceId
        );
        if (existService) {
          return prev.map((r) =>
            r.uniqueId === uniqueId
              ? {
                  ...r,
                  serviceIds: r.serviceIds.map((s) =>
                    s?.id === serviceId ? { ...s, quantity: s.quantity + 1 } : s
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
          uniqueId: uniqueId,
          serviceIds: [{ id: serviceId, quantity: 1, time: "", note: "" }],
        },
      ];
    });
  };

  // khi giảm đến 0 thì logic nhảy lên số lớn nhất vì lucs đó serviceQUantities ko còn quản lí nũa mà bị BookingPayload quản lí
  const handleDecreaseQuantity = (uniqueId, serviceId) => {
    setServiceQuantities((prev) => {
      const existingRoom = prev.find((item) => item.uniqueId === uniqueId);
      if (existingRoom) {
        const existingService = existingRoom.serviceIds.find(
          (s) => s?.id === serviceId
        );
        if (existingService) {
          if (existingService.quantity <= 1) {
            // Xóa dịch vụ nếu quantity về 0
            const updatedServiceIds = existingRoom.serviceIds.filter(
              (s) => s?.id !== serviceId
            );
            if (updatedServiceIds.length === 0) {
              // Xóa phòng nếu không còn dịch vụ
              console.log(
                `Xóa phòng ${uniqueId} khỏi serviceQuantities vì không còn dịch vụ`
              );
              return prev.filter((item) => item.uniqueId !== uniqueId);
            }
            console.log(
              `Xóa dịch vụ ${serviceId} khỏi phòng ${uniqueId}, còn lại: `,
              updatedServiceIds
            );
            return prev.map((item) =>
              item.uniqueId === uniqueId
                ? { ...item, serviceIds: updatedServiceIds }
                : item
            );
          }
          // Giảm quantity
          console.log(
            `Giảm số lượng dịch vụ ${serviceId} trong phòng ${uniqueId} từ ${
              existingService.quantity
            } xuống ${existingService.quantity - 1}`
          );
          return prev.map((item) =>
            item.uniqueId === uniqueId
              ? {
                  ...item,
                  serviceIds: item.serviceIds.map((s) =>
                    s?.id === serviceId ? { ...s, quantity: s.quantity - 1 } : s
                  ),
                }
              : item
          );
        }
      }
      console.log(`Không tìm thấy phòng ${uniqueId} hoặc dịch vụ ${serviceId}`);
      return prev;
    });
  };

  // Xử lý cập nhật time và note
  // const handleUpdateServiceDetails = (uniqueId, serviceId, field, value) => {
  //   setServiceQuantities((prev) =>
  //     prev.map((item) =>
  //       item.uniqueId === uniqueId
  //         ? {
  //             ...item,
  //             serviceIds: item.serviceIds.map((s) =>
  //               s.id === serviceId ? { ...s, [field]: value } : s
  //             ),
  //           }
  //         : item
  //     )
  //   );
  // };

  // Xử lý xác nhận đơn hàng
  const handleConfirmOrder = () => {
    dispatch(addServiceToRoom(serviceQuantities));
    setServiceQuantities([]);
    setExpandedServices({});
  };

  const handleShopCart = () => {
    if (bookingPayload?.roomRequestList) {
      const { cartItems, roomMapping } = convertToCartItems(
        bookingPayload.roomRequestList
      );
      console.log(">>> 282 >>>", cartItems);

      dispatch(fetchCart({ cartItems, roomMapping }));
      navigation.navigate("FoodCart", { roomMapping });
    }
  };

  const imageTest =
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop";

  // nếu bây giờ khởi tạo giá trị cho quantities bằng bookingPayload

  // ban đầu bookingPayload = 0 thì quantiteis cũng = 0 nếu tăng quan tities thì bookingPayload chưa cập nhật,
  // chỉ cập nhật quantities ,sau khi ấn xác nhận thì cập nhật bookingPayload

  // khi mở lại  lại quantities vẫn đúng vì lấy giá trị của bookingPayload

  // trong renderRoomItem chỉ lấy giá trị của

  // Render phòng
  const renderRoomItem = ({ item }, serviceId) => {
    const roomQuantities = serviceQuantities.find(
      (q) => q.uniqueId === item.uniqueId
    );
    const service = roomQuantities?.serviceIds.find((s) => s?.id === serviceId);

    // Lấy số lượng từ serviceQuantities, nếu không có thì lấy từ bookingPayload
    let quantity = service?.quantity || 0;
    let time = service?.time || "";
    let note = service?.note || "";

    console.log(item);
    return (
      <View style={styles.roomWrapper}>
        <View style={styles.roomInfo}>
          <Text style={styles.roomLabel}>Tên Phòng</Text>
          <Text style={styles.roomValue}>{item.roomName}</Text>
        </View>
        <View style={styles.roomInfo}>
          <Text style={styles.roomLabel}>Số lượng</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleDecreaseQuantity(item.uniqueId, serviceId)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleAdd(item.uniqueId, serviceId)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.roomInfo}>
          <Text style={styles.roomLabel}>Thời gian</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập thời gian"
            value={time}
            onChangeText={(value) =>
              handleUpdateServiceDetails(
                item.uniqueId,
                serviceId,
                "time",
                value
              )
            }
          />
        </View> */}
        {/* <View style={styles.roomInfo}>
          <Text style={styles.roomLabel}>Ghi chú</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập ghi chú"
            value={note}
            onChangeText={(value) =>
              handleUpdateServiceDetails(
                item.uniqueId,
                serviceId,
                "note",
                value
              )
            }
          />
        </View> */}
      </View>
    );
  };

  const renderFoodItem = ({ item }) => {
    // Lọc listRoom dựa trên roomChoseServiceList
    const allowedRooms =
      listRoom?.filter((room) =>
        item.roomChoseServiceList?.some(
          (serviceRoom) => serviceRoom.roomId === parseInt(room.roomId)
        )
      ) || [];

    return (
      <View style={styles.foodItemContainer}>
        <TouchableOpacity
          style={styles.foodItem}
          onPress={() => handleToFoodDetails()}
        >
          <Image source={{ uri: imageTest }} style={styles.foodImage} />
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.priceContainer}>
              <Ionicons name={"cash-outline"} size={20} />
              <Text style={styles.price}>{item.price} </Text>
              <Text>VNĐ</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleToggleRoomList(item?.id)}
          >
            <Text style={styles.addButtonText}>
              {expandedServices[item?.id] ? "Thu gọn" : "Thêm"}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        {expandedServices[item?.id] && (
          <FlatList
            data={allowedRooms}
            renderItem={(props) => renderRoomItem(props, item?.id)}
            keyExtractor={(item) => item.uniqueId}
            style={styles.roomList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };
  if (loadingService) {
    return (
      <View>
        <Text>loading....</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodySection1}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.list}>
            {categories?.map((item) => (
              <TouchableOpacity
                key={item?.id}
                style={styles.item}
                onPress={() =>
                  setSelectedCategory({ id: item?.id, type: item.name })
                }
              >
                <View
                  style={[
                    styles.itemIcon,
                    selectedCategory?.id === item?.id ? styles.selectFood : "",
                  ]}
                >
                  {getServiceIconOrderFood(
                    item.name,
                    28,
                    selectedCategory?.id === item?.id ? "white" : "#B7C9D4"
                  )}
                </View>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={foodItems}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item?.id}
        style={styles.foodList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          {/* <Ionicons name="checkbox-outline" size={30} color="white" /> */}
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={handleShopCart}>
          {/* <Ionicons name="cart-outline" size={30} color="white" /> */}

          <Text style={styles.cartButtonText}>Giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  bodySection1: {
    paddingVertical: 10,
  },
  list: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  item: {
    alignItems: "center",
    marginRight: 15,
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  selectFood: {
    backgroundColor: "#00F598",
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  foodList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  foodItemContainer: {
    marginBottom: 15,
  },
  foodItem: {
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginVertical: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  addButton: {
    width: "25%",
    backgroundColor: "#00F598",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerCount: {
    fontSize: 14,
    color: "#333",
  },
  footerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cartButton: {
    backgroundColor: "#00F598",
    padding: 10,
    width: "50%",
    borderRadius: 10,
    marginLeft: "5",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#00F598",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  roomList: {
    // maxHeight: 200,
    marginVertical: 10,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    padding: 10,
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
    backgroundColor: "#00F598",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  confirmButtonText: {
    color: "white",
    paddingVertical: "2",
  },
  cartButtonText: {
    color: "white",
    paddingVertical: "2",
  },
});

export default OrderFood;
