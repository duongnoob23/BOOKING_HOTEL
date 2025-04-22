// const test = {
//   images: [
//     "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729242714/Room/luanwjwaiavziqz94mqu.jpg",
//     "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729241122/Room/nipyn0qgyoyhtgkadlyi.jpg",
//   ],
//   nearBy: {
//     activityList: [[Object], [Object], [Object], [Object], [Object]],
//     descriptionLocation: "Đà Nẵng rất đẹp",
//     ratingLocation: "4.5",
//   },
//   priceMin: 800000,
//   review: {
//     amenities: [[Object], [Object]],
//     description:
//       "Tọa lạc trong khu vườn được chăm chút kỹ lưỡng với tầm nhìn ra đầm phá Ébrié, khách sạn cao cấp này mang phong cách nghệ thuật địa phương đương đại và các nét chấm phá kiến trúc tinh tế. Nơi đây cách Nhà thờ Hồi giáo Riviéra 3 km và Công viên Quốc gia Banco 17 km.",
//     feedback: {
//       comments: [Array],
//       fiveStar: 25,
//       fourStar: 50,
//       oneStar: 0,
//       ratingHotel: 5,
//       ratingLocation: 3,
//       ratingRoom: 4,
//       ratingService: 4,
//       threeStar: 25,
//       twoStar: 0,
//     },
//     location: "Đà Nẵng",
//     phoneNumber: "123456789",
//     rating: 3.9,
//     sumReview: 85,
//   },
// };

// const test1 = [
//   {
//     comment: "rất tốt",
//     rating: 5,
//     urlAvatar:
//       "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729235498/Room/samsipzu3uyuhyr7vdbl.jpg",
//     username: "admin@gmail.com",
//   },
//   {
//     id: "1",
//     name: "Duy",
//     time: "20 mins ago",
//     content: "Khách sạn đẹp, đồ ăn tuyệt vời",
//     score: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
//   },
// ];

// const ratingPercentages = [
//   {
//     star: 5,
//     percentage: hotelDetail?.review?.feedback?.fiveStar || 0,
//     color: "#007AFF",
//   }, // Xanh dương
//   {
//     star: 4,
//     percentage: hotelDetail?.review?.feedback?.fourStar || 0,
//     color: "#00C853",
//   }, // Xanh lá
//   {
//     star: 3,
//     percentage: hotelDetail?.review?.feedback?.threeStar || 0,
//     color: "#FFD700",
//   }, // Vàng
//   {
//     star: 2,
//     percentage: hotelDetail?.review?.feedback?.twoStar || 0,
//     color: "#FF8C00",
//   }, // Cam
//   {
//     star: 1,
//     percentage: hotelDetail?.review?.feedback?.oneStar || 0,
//     color: "#FF0000",
//   }, // Đỏ
// ];

// const test3 = {
//   checkIn: "16-04-2025 14:20:00",
//   checkOut: "17-04-2025 12:20:00",
//   couponCode: "SUMMER25",
//   finalPrice: "1788750.0",
//   hotelAddress: "Đà Nẵng",
//   hotelId: 2,
//   hotelName: "Onomo",
//   priceCoupon: "596250.0",
//   roomBookedList: [
//     {
//       adults: 1,
//       policyBooked: [Array],
//       priceRoom: 1080000,
//       priceService: 340000,
//       roomId: 2,
//       roomName: "Phòng Deluxe Gia đình VIP",
//       serviceSelect: [Array],
//       uniqueId: "room2_1",
//     },
//     {
//       adults: 1,
//       policyBooked: [Array],
//       priceRoom: 855000,
//       priceService: 110000,
//       roomId: 4,
//       roomName: "Phòng tiêu chuẩn",
//       serviceSelect: [Array],
//       uniqueId: "room4_1",
//     },
//   ],
//   totalAdults: 2,
//   totalPriceRoom: "1935000.0",
//   totalPriceService: "450000.0",
// };

// const a = {
//   checkInDate: "2025-04-18",
//   checkOutDate: "2025-04-19",
//   couponId: 0,
//   hotelId: 1,
//   roomRequestList: [
//     {
//       adults: 1,
//       children: 0,
//       price: 900000,
//       roomId: 1,
//       serviceList: [Array],
//       uniqueId: "room1_1",
//     },
//     {
//       adults: 1,
//       children: 0,
//       price: 720000,
//       roomId: 3,
//       serviceList: [Array],
//       uniqueId: "room3_1",
//     },
//   ],
// };

// const b = {
//   checkIn: "18-04-2025 14:00:00",
//   checkOut: "19-04-2025 12:00:00",
//   couponCode: "SUMMER25",
//   finalPrice: "1380000.0",
//   hotelAddress: "Đà Nẵng",
//   hotelId: 1,
//   hotelName: "Heden Golf",
//   priceCoupon: "460000.0",
//   roomBookedList: [
//     {
//       adults: 1,
//       policyBooked: [Array],
//       priceRoom: 900000,
//       priceService: 100000,
//       roomId: 1,
//       roomName: "Phòng Deluxe Gia đình",
//       serviceSelect: [Array],
//       uniqueId: "room1_1",
//     },
//     {
//       adults: 1,
//       policyBooked: [Array],
//       priceRoom: 720000,
//       priceService: 120000,
//       roomId: 3,
//       roomName: "Phòng Deluxe nhỏ",
//       serviceSelect: [Array],
//       uniqueId: "room3_1",
//     },
//   ],
//   totalAdults: 2,
//   totalPriceRoom: "1620000.0",
//   totalPriceService: "220000.0",
// };

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import Ionicons from "react-native-vector-icons/Ionicons";
import getServiceIcon from "../../Components/Icon/getServiceIcon";
import { fetchBookingRoom } from "../../Redux/Slice/hotelSlice";
import SkeletonListHotelByLocation from "../../Components/Skeleton/Home/SkeletonListHotelByLocation";
import SkeletonOrderConfirm from "../../Components/Skeleton/Hotels/SkeletonOrderConfirm";
import { formatPrice } from "../../Utils/formarPrice";
import { fetchListPromotion } from "../../Redux/Slice/promotionSlice";
import { fetchPaymentOrder } from "../../Redux/Slice/paymentSlice";

const OrderConfirmScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);
  const [paymentMethod, setPaymentMethod] = useState("ZaloPay");

  const test = {
    country: "+84",
    email: "lamtiendung11082002@gmail.com",
    firstName: "Lâm",
    lastName: "Tiến Dưỡng ",
    phoneNumber: "0982474802",
    userId: "0",
  };
  const test2 = {
    checkInDate: "2025-04-14",
    checkOutDate: "2025-04-15",
    hotelId: 2,
    roomRequestList: [
      {
        adults: 0,
        children: 0,
        price: 1080000,
        roomId: 2,
        serviceIdList: [Array],
        uniqueId: "room2_1",
      },
    ],
  };
  const { userInfor, inforUserChange } = useAppSelector((state) => state.auth);
  const { serviceList } = useAppSelector((state) => state.service);
  const {
    bookingData,
    bookingPayload,
    listUniqueIdBookingRoom,
    loadingBookingRoom,
    roomNumberFake, // là roomQuantities được tạo thành từ roomNumber ở bên HotelRoomList và lưu vào redux
  } = useAppSelector((state) => state.hotel);

  const { paymentData } = useAppSelector((state) => state.payment);
  // bookingPayload?.roomRequestList?.forEach((item) => {
  //   console.log("BPL từ redux OCS", item?.serviceIdList);
  // });
  // bookingData?.roomBookedList?.forEach((item) => {
  //   console.log("BPL từ redux OCS", item?.serviceSelect);
  // });

  useEffect(() => {
    console.log("payment data in orderConfirm:", paymentData);
  }, [paymentData]);
  const dispatch = useAppDispatch();

  const listRoom = bookingData?.roomBookedList;
  const listRoom1 = bookingPayload?.roomRequestList;

  // console.log("listROom", listRoom);
  // console.log("listRoom1", listRoom1);

  useEffect(() => {
    // console.log("bookingData updated:", bookingData);
  }, [bookingData]);

  useEffect(() => {
    dispatch(fetchBookingRoom(bookingPayload));
  }, [bookingPayload?.roomRequestList, dispatch]);
  const getUniqueServiceTypes = (serviceSelect) => {
    const serviceTypes = new Set(
      serviceSelect?.map((service) => service.serviceType) || []
    );
    return Array.from(serviceTypes);
  };

  const handleToOrderFood = () => {
    // console.log("OCS 87 >>>>>>>>>>>>>>>>>>>>>>>>>>>>", roomNumberFake);
    // dispatch(fetchServicesByCategory(roomNumberFake));
    navigation.navigate("OrderFood");
  };

  const handleToSale = () => {
    const totalPrice =
      +bookingData?.totalPriceRoom + +bookingData?.totalPriceService;
    const code = "";
    // console.log(totalPrice);

    // console.log(bookingData?.totalPriceRoom);
    dispatch(fetchListPromotion({ code, totalPrice }));
    navigation.navigate("Discount", { prePage: "OrderConfirm" });
  };
  // Sửa renderListRoom để dùng với ScrollView
  const renderListRoom = (item) => (
    <View style={styles.roomWrapper}>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Tên Phòng </Text>
        <Text style={styles.roomValue}>{item?.roomName}</Text>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Loại phòng</Text>
        <Text style={styles.roomValue}>{item?.roomType}</Text>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Số khách </Text>
        <Text style={styles.roomValue}>{item?.adults} người </Text>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Giá</Text>
        <Text style={styles.roomValue}>{formatPrice(item?.priceRoom)}</Text>
      </View>
      <View style={styles.roomInfoService}>
        <View style={styles.roomInfoServiceText}>
          <Text style={styles.roomLabel}>Dịch vụ</Text>
        </View>
        <View style={styles.serviceIcons}>
          {item?.serviceSelect?.length > 0 ? (
            getUniqueServiceTypes(item.serviceSelect).map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.iconWrapper}
                onPress={() => handleToOrderFood()}
              >
                {getServiceIcon(type)}
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("OrderFood", { prePage: "OrderConfirm" })
              }
            >
              <Ionicons name="add-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Điều kiện</Text>
        <TouchableOpacity
          style={[styles.roomValue, { fontWeight: "bold", color: "#007AFF" }]}
        >
          <View>
            <Text style={[{ fontWeight: "bold", color: "#007AFF" }]}>
              Xem thêm{" "}
            </Text>
          </View>
          <View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#007AFF"
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.br}></View> */}
    </View>
  );
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> 158 OCS", bookingData);
  if (loadingBookingRoom) {
    return <SkeletonOrderConfirm />;
  }

  const handlePayment = () => {
    console.log(bookingPayload);
    console.log("hello");
    dispatch(fetchPaymentOrder());
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Phần đầu: Thông tin khách hàng (cố định) */}
        {/* {[
          styles.listContainer,
          hasSelectedRooms && styles.listContainerPlus,
        ]} */}
        <View style={styles.headerSection}>
          <Text style={(styles.title, styles.titleCenter)}>
            Thông tin khách hàng{" "}
          </Text>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tên</Text>
              <Text style={styles.infoValue}>
                {(inforUserChange && inforUserChange.lastName) ||
                  userInfor.lastName}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                {(inforUserChange && inforUserChange.email) || userInfor.email}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Số điện thoại</Text>
              <Text style={styles.infoValue}>
                {userInfor.country}{" "}
                {(inforUserChange && inforUserChange.phoneNumber) ||
                  userInfor.phoneNumber}
              </Text>
            </View>
          </View>
          <View style={styles.br}></View>
        </View>
        {/* "hotelName": "Onomo", "hotelAddress": "Đà Nẵng", "totalAdults": 0,
        "checkIn": "14-04-2025 14:20:00", "checkOut": "15-04-2025 12:20:00", */}
        <View style={styles.headerSection}>
          <Text style={(styles.title, styles.titleCenter)}>
            Thông tin khách sạn
          </Text>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tên khách sạn</Text>
              <Text style={styles.infoValue}>{bookingData?.hotelName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Vị trí khách sạn</Text>
              <Text style={styles.infoValue}>{bookingData.hotelAddress}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tổng người lớn</Text>
              <Text style={styles.infoValue}>{bookingData.totalAdults}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>CheckIn</Text>
              <Text style={styles.infoValue}>{bookingData.checkIn}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>CheckOut</Text>
              <Text style={styles.infoValue}>{bookingData.checkOut}</Text>
            </View>
          </View>
          <View style={styles.br}></View>
        </View>
        {/* Phần giữa: Danh sách phòng (cuộn) */}
        <View style={styles.roomsSection}>
          <Text style={styles.subTitle}>Phòng đặt</Text>
          {/* <View key={item?.uniqueId}>{renderListRoom(item)}</View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {listRoom?.map((item, index) => (
              <View key={item.uniqueId}>{renderListRoom(item)}</View>
            ))}
          </ScrollView>
          <View style={styles.br}></View>
        </View>
        {/* Phần cuối: Mã giảm giá, Phương thức thanh toán, Nút xác nhận (cố định) */}

        <View style={styles.headerSection}>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Mã giảm giá </Text>
              <TouchableOpacity
                style={styles.wrapperInfoValueSale}
                onPress={() => handleToSale()}
              >
                <Ionicons name="bookmark-outline" size={18} color="#007AFF" />
                <Text style={styles.infoValueSale}>couponCode</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.headerSection}>
          <Text style={(styles.title, styles.titleCenter)}>Hóa đơn </Text>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Giá tiền phòng</Text>
              <Text style={styles.infoValue}>
                {formatPrice(bookingData && bookingData?.totalPriceRoom)}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabelSale}>Giá tiền dịch vụ</Text>
              <Text style={styles.infoValue}>
                {formatPrice(bookingData && bookingData?.totalPriceService)}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Mã giảm giá</Text>
              <Text style={styles.infoValue}>
                {formatPrice(bookingData && bookingData?.priceCoupon)}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Giá cuối cùng</Text>
              <Text style={styles.infoValue}>
                {formatPrice(bookingData && bookingData?.finalPrice)}
              </Text>
            </View>
          </View>
          <View style={styles.br}></View>
        </View>
        <View style={styles.footerSection}>
          <View style={styles.br}></View>

          <Text style={styles.subTitle}>Phương thức thanh toán</Text>
          <View style={styles.infoSectionLast}>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentMethod("ZaloPay")}
            >
              <View style={styles.radioCircle}>
                {paymentMethod === "ZaloPay" && (
                  <View style={styles.selectedRadio} />
                )}
              </View>
              <Text style={styles.paymentText}>ZaloPay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentMethod("ATM")}
            >
              <View style={styles.radioCircle}>
                {paymentMethod === "ATM" && (
                  <View style={styles.selectedRadio} />
                )}
              </View>
              <Text style={styles.paymentText}>ATM</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePayment()}
          >
            <Text style={styles.buttonText}>Xác nhận đặt phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OrderConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headerSection: {
    // Phần đầu cố định, không cần flex cụ thể vì sẽ chiếm không gian tự nhiên
  },
  roomsSection: {
    flex: 1, // Chiếm không gian còn lại để ScrollView có thể cuộn
    // marginVertical: 10,
  },
  footerSection: {
    // Phần cuối cố định, không cần flex cụ thể vì sẽ chiếm không gian tự nhiên
  },
  title: {
    fontWeight: "400",
    color: "#000",
    marginBottom: 5,
    textAligin: "center",
  },
  titleCenter: {
    textAlign: "center",
    fontSize: 17,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    marginBottom: 5,
    textAlign: "center",
  },
  infoSection: {
    // marginBottom: 10,
    // flexDirection: "row",
    // justifyContent:"center"
  },
  infoSectionSale: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoSectionLast: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#000",
    marginBottom: 2,
  },
  roomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  roomInfoService: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    flexWrap: "wrap",
  },
  roomInfoServiceText: {
    width: "20%",
  },
  roomLabel: {
    fontSize: 14,
    color: "#666",
  },
  roomValue: {
    fontSize: 14,
    color: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  paymentText: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#00F598",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  br: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  roomWrapper: {
    // marginVertical: 20,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  serviceIcons: {
    width: "76%",
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  iconWrapper: {
    marginLeft: 3,
  },
  infoValueSale: {
    padding: 3,
    color: "#007AFF",
    fontSize: 12,
    marginBottom: 2,
    padding: 2,
    textAlign: "",
  },
  wrapperInfoValueSale: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
  },
});
