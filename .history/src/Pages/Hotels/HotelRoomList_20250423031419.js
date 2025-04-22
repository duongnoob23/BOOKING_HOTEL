import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppSelector, useAppDispatch } from "../../Redux/hook";
import Icon from "react-native-vector-icons/FontAwesome";
import SkeletonHotelRoomList from "../../Components/Skeleton/Hotels/SkeletonHotelRoomList";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import {
  fetchBookingRoom,
  update,
  updateBookingPayload,
  updateRoomNumber,
  uppdateListUniqueIdBookingRoom,
} from "../../Redux/Slice/hotelSlice";
import { fetchServicesByCategory } from "../../Redux/Slice/serviceSlice";

// lỗi hotelRoomList ko có giá trị, 1 kiểm tra redux, kiểm tra trang gọi api cho data trang này,kiểm tra lại api room/get_list
// console.log("-------- 22 hotelRoom hotelRoomList:", hotelRoomList);
const HotelRoomList = ({ navigation, route }) => {
  const item = route?.params?.item;
  const {
    hotelRoomList,
    hotelDetail,
    loadingHotelRoomList,
    inforFilter,
    bookingData,
    bookingPayload,
  } = useAppSelector((state) => state.hotel);
  const { serviceList, categories } = useAppSelector((state) => state.service);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [roomNumber, setRoomNumber] = useState({});
  const initialRoomNumber = () => {
    const newRooms = {};
    if (hotelRoomList && hotelRoomList.length > 0) {
      hotelRoomList.forEach((room) => {
        newRooms[`room${room.roomId}`] = 0;
      });
    }
    // console.log("done");
    return newRooms;
  };

  // console.log(hotelRoomList);

  useEffect(() => {
    if (hotelRoomList && hotelRoomList.length > 0) {
      // Chỉ cập nhật roomNumber nếu nó chưa được khởi tạo (tránh reset giá trị người dùng đã chọn)
      setRoomNumber((prevRoomNumber) => {
        if (Object.keys(prevRoomNumber).length === 0) {
          // Nếu roomNumber còn rỗng, khởi tạo nó
          return initialRoomNumber(hotelRoomList);
        }
        // Nếu roomNumber đã có dữ liệu, chỉ thêm các room mới (nếu có) mà không reset giá trị cũ
        const updatedRoomNumber = { ...prevRoomNumber };
        hotelRoomList.forEach((room) => {
          const roomKey = `room${room.roomId}`;
          if (!(roomKey in updatedRoomNumber)) {
            updatedRoomNumber[roomKey] = 0;
          }
        });
        return updatedRoomNumber;
      });
    }
  }, [hotelRoomList]);

  // console.log(">>> 51 HTL >>>", hotelRoomList);
  // console.log(">>> 52 HTL >>>", roomNumber);
  // console.log(">>> 40 HTL >>>", bookingPayload);

  const updateDateRoomNumber = (name, type, quantity) => {
    // console.log(quantity);
    setRoomNumber((prevRoomNumber) => {
      const newRoomNumber = { ...prevRoomNumber };
      if (type === "add" && newRoomNumber[name] < quantity) {
        newRoomNumber[name] += 1;
      } else if (type === "sub" && newRoomNumber[name] > 0) {
        newRoomNumber[name] -= 1;
      }
      return newRoomNumber;
    });
  };

  useEffect(() => {
    const roomRequestList = Object.keys(roomNumber)
      .filter((key) => +roomNumber[key] > 0)
      .flatMap((key) => {
        const roomId = parseInt(key.replace("room", ""), 10);
        const room = hotelRoomList.find((r) => r.roomId === roomId);
        return Array(roomNumber[key])
          .fill()
          .map((_, index) => {
            const uniqueId = `room${roomId}_${index + 1}`;
            const existingRoom = bookingPayload.roomRequestList?.find(
              (r) => r.uniqueId === uniqueId
            );
            return {
              uniqueId: uniqueId,
              roomId: roomId,
              adults: inforFilter.adults,
              children: inforFilter.children,
              price: room ? room.price : 0,
              serviceList: existingRoom ? existingRoom.serviceList : [],
              roomName: room.roomName,
            };
          });
      });
    // serviceIdList;
    const bookingPayload_ = {
      ...bookingPayload,
      roomRequestList: roomRequestList,
    };

    dispatch(updateBookingPayload(bookingPayload_));
  }, [roomNumber]);
  const hasSelectedRooms = Object.values(roomNumber).some((count) => count > 0);

  const handleToInfoConfirm = () => {
    // console.log(">>> 105 HTL  >>> bookingPayload:", bookingPayload);
    const roomQuantities = Object.keys(roomNumber).reduce((acc, key) => {
      const roomId = parseInt(key.replace("room", ""));
      acc.push({
        roomId: roomId,
        quantity: roomNumber[key],
      });
      return acc;
    }, []);
    // dispatch(updateRoomNumber(roomQuantities));

    dispatch(fetchServicesByCategory(roomQuantities));
    navigation.navigate("InfoConfirm");
  };

  const handleToOrderFood = () => {
    // const roomQuantities =
    // console.log(
    //   "-------------------------------------------------------------"
    // );
    const roomQuantities = Object.keys(roomNumber).reduce((acc, key) => {
      const roomId = parseInt(key.replace("room", ""));
      acc.push({
        roomId: roomId,
        quantity: roomNumber[key],
      });
      return acc;
    }, []);
    // console.log(roomQuantities);
    // console.log(
    //   "-------------------------------------------------------------"
    // );

    // dispatch(updateRoomNumber(roomQuantities));
    dispatch(fetchServicesByCategory(roomQuantities));
    navigation.navigate("OrderFood");
  };

  if (loadingHotelRoomList) {
    return <SkeletonHotelRoomList />;
  }

  console.log(">>> full ảnh", item);

  const RoomItem = ({ room }) => {
    // console.log(room.serviceEntityList);
    return (
      <View style={styles.card}>
        {/* Hình ảnh phòng */}
        <Image source={{ uri: `${item.imageUrl}` }} style={styles.roomImage} />
        {/* Tiêu đề và số lượng phòng */}
        <View style={styles.header}>
          <Text style={styles.roomName}>{room.roomName}</Text>
          <Text style={styles.roomQuantity}>Còn {room.roomQuantity} phòng</Text>
        </View>
        {/* Thông tin cơ bản */}
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Ionicons
              name="expand-outline"
              size={15}
              color="#191D39"
              style={styles.iconItem}
            />
            <Text style={styles.infoText}>Diện tích {room.area} m²</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="bed-outline"
              size={15}
              color="#191D39"
              style={styles.iconItem}
            />
            <Text style={styles.infoText}>Giường: {room.bed}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="calendar-number-outline"
              size={15}
              color="#191D39"
              style={styles.iconItem}
            />
            <Text style={styles.infoText}>
              Số ngày chọn: {room.roomQuantity}
            </Text>
          </View>
        </View>
        {/* Dịch vụ */}
        <View style={styles.services}>
          {room?.serviceEntityList?.map((service) => (
            <View key={service.id} style={styles.serviceItem}>
              <Ionicons name="checkmark-circle" size={15} color="#4DD0E1" />
              <Text style={styles.serviceText}>{service.name}</Text>
            </View>
          ))}
        </View>
        {/* •  */}
        <View style={styles.policies}>
          {room?.policyRoomList?.map((policy) => (
            <View key={policy.policyId} style={styles.policyItem}>
              <Ionicons
                name="newspaper-outline"
                size={15}
                color="#191D39"
                style={styles.iconPolicy}
              />
              <Text style={styles.policyText}>
                {policy.policyName}: {policy.policyDescription}
              </Text>
            </View>
          ))}
        </View>
        {/* Khuyến mãi */}
        <View style={styles.groupPromotion}>
          <View style={styles.promotion}>
            <View style={styles.promotionView}>
              <Ionicons
                name="bookmarks-outline"
                size={15}
                color="#191D39"
                style={styles.iconPolicy}
              />
              <Text style={styles.promotionText}>{room.promotion.name}</Text>
            </View>
          </View>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              Giảm {room.promotion.discountValue}
            </Text>
          </View>
        </View>

        <View style={styles.br}></View>
        {/* Giá */}
        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <View style={styles.discountedPriceView}>
              <Text style={styles.discountedPrice}>
                {room.price.toLocaleString()}đ
              </Text>
              <Text style={styles.originalPrice}>
                {room.promotionPrice.toLocaleString()}đ
              </Text>
            </View>
          </View>
        </View>
        {/* Nút Chọn và tùy chỉnh */}
        {roomNumber[`room${room.roomId}`] === 0 ? (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() =>
              updateDateRoomNumber(
                `room${room.roomId}`,
                "add",
                room.roomQuantity
              )
            }
          >
            <Text style={styles.selectButtonText}>Chọn </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.groupButton}>
            <TouchableOpacity
              style={styles.decreaseButton}
              onPress={() =>
                updateDateRoomNumber(
                  `room${room.roomId}`,
                  "sub",
                  room.roomQuantity
                )
              }
            >
              <Text style={styles.decreaseButtonText}> - </Text>
              {/* <Ionicons name="remove-circle-outline" size={24} color="#fff" /> */}
            </TouchableOpacity>
            <View style={styles.valueButton}>
              <Text style={styles.valueButtonText}>
                {roomNumber[`room${room.roomId}`]}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.increaseButton}
              onPress={() =>
                updateDateRoomNumber(
                  `room${room.roomId}`,
                  "add",
                  room.roomQuantity
                )
              }
            >
              <Text style={styles.increaseButtonText}> + </Text>
              {/* <Ionicons name="add-circle-outline" size={24} color="#fff" /> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  // khi mình bấm vào nút chọn thì dữ liệu sẽ nhảy thành 3 nút, - giá trị +
  // mỗi một item đều có một nút chọn riêng
  // chỉ cần 1 phòng có nút chọn khác 1 thì sẽ hiện nút đặt ngay lênlên
  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.listContainer,
          hasSelectedRooms && styles.listContainerPlus,
        ]}
      >
        <View style={styles.header__overlay}>
          <View style={styles.header__overlay__image}>
            <Image
              source={{
                uri: `${item.imageUrl}`,
              }}
              style={styles.rateDetail__photo}
            />
          </View>
          <View style={styles.header__overlay__content}>
            <View>
              <Text style={styles.header__title}>{item.hotelName}</Text>
            </View>
            <View style={styles.header__label}>
              <Text style={styles.header__desc}>
                {hotelDetail && hotelDetail.review.rating}
              </Text>
              <Text style={styles.header__desc}>
                {hotelDetail && hotelDetail.review.location}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.header}></View>
        {hotelRoomList?.map((room) => (
          <RoomItem key={room.roomId} room={room} />
        ))}
      </ScrollView>

      {hasSelectedRooms && (
        <View style={styles.bookNowButton} onPress={() => {}}>
          <TouchableOpacity
            style={styles.bookNowButtonTextWapper}
            onPress={() => handleToOrderFood()}
          >
            <Text style={styles.bookNowButtonText}>Đặt dịch vụ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookNowButtonTextWapper}
            onPress={() => handleToInfoConfirm()}
          >
            <Text style={styles.bookNowButtonText}>Đặt phòng ngay</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default HotelRoomList;
const styles = StyleSheet.create({
  listContainer: {
    padding: 0,
    backgroundColor: "#E0E0E0", // Nền xanh lam nhạt
    // marginBottom: 50,
  },
  listContainerPlus: {
    // paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF", // Thẻ trắng
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // Shadow cho Android
  },
  roomImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  roomName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  roomQuantity: {
    fontSize: 10,
    color: "#B0BEC5", // Xám nhạt
  },
  info: {
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconItem: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#424242", // Xám đậm
    marginBottom: 2,
  },
  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 10,
    color: "#424242", // Xám đậm
    marginLeft: 4,
  },
  policies: {
    marginBottom: 8,
  },
  iconPolicy: {
    marginRight: 5,
  },
  policyItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 4, // Thêm khoảng cách giữa các policy
  },
  policyText: {
    fontSize: 10,
    color: "#424242",
    marginBottom: 2,
    flexShrink: 1, // Cho phép Text co lại để xuống dòng
  },
  groupPromotion: {
    flexDirection: "row",
  },
  promotion: {
    marginBottom: 8,
    backgroundColor: "#FCDB36",
    alignSelf: "flex-start",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  promotionView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  promotionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#181E3C", // Xanh lam đậm
  },
  br: {
    marginTop: 5,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  priceContainer: {
    marginBottom: 8,
  },
  priceWrapper: {
    //     alignItems: "flex-end",
  },
  discountedPriceView: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 5,
  },
  discountedPrice: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000000", // Màu đen
    textAlign: "center",
  },
  originalPriceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  originalPrice: {
    fontSize: 16,
    color: "black", // Màu đỏ
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: "#00F598", // Xanh lá
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  discountText: {
    fontSize: 14,
    color: "#FFFFFF", // Chữ trắng
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 12,
    color: "#000000", // Màu đen
    marginTop: 4,
  },
  roomAvailability: {
    fontSize: 12,
    color: "#D32F2F", // Màu đỏ
    marginTop: 4,
  },
  selectButton: {
    backgroundColor: "#00F598", // Xanh dương
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    width: "60%", // Full width
    alignSelf: "center",
    marginTop: 5,
  },
  selectButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#fff",
  },
  header__image: {
    width: "100%",
    height: 250,
    justifyContent: "space-between",
  },
  iconBack: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  header__overlay: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    //     padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#DFDFDF",
  },
  header__icon__start: {
    marginLeft: "auto",
  },
  header__label: {
    flexDirection: "row",
  },
  header__title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginLeft: 0,
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 5,
  },
  header__desc: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    marginLeft: 5,
  },
  header__info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "flex-end",
  },
  header__rating: {
    flexDirection: "column",
    alignItems: "flex-star",
  },
  header__rating__group: {
    flexDirection: "row",
    width: 200,
    alignItems: "center",
    // justifyContent: "space-between",
  },
  header__rating__score: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginLeft: 5,
  },
  iconStart: {
    fontSize: 16,
  },
  header__rating__text: {
    fontSize: 14,
    color: "white",
  },
  header__location: {
    fontSize: 14,
    color: "white",
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  header__location__text: {
    marginLeft: 5,
  },
  groupButton: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
  },
  decreaseButton: {
    backgroundColor: "#00F598", // Xanh dương
    borderRadius: 8,
    padding: 12,
    // width: "10%",
  },
  decreaseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  valueButton: {
    backgroundColor: "#00F598", // Xanh dương
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    flex: 1,
  },
  valueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  increaseButton: {
    backgroundColor: "#00F598", // Xanh dương
    borderRadius: 8,
    padding: 12,
  },
  increaseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    // width: "10%",
  },
  marginForBookNowButton: {
    marginBottom: 80,
  },
  bookNowButton: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    // left: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "white", // Màu nổi bật, bạn có thể thay đổi
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 6,
    elevation: 5, // Đổ bóng cho Android
    shadowColor: "#000", // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  bookNowButtonTextWapper: {
    width: "49%",
    backgroundColor: "#00F598",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bookNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  backR: {
    backgroundColor: "red",
  },
  rateDetail__photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  header__overlay__content: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
