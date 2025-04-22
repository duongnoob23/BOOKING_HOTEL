import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../../Redux/hook";
import { fetchListPromotion } from "../../Redux/Slice/promotionSlice";
import { formatPrice } from "../../Utils/formarPrice";
import {
  fetchBookingRoom,
  updateBookingPayload,
} from "../../Redux/Slice/hotelSlice";
import cloneDeep from "lodash/cloneDeep";

const Discount = ({ navigation, route }) => {
  const prePage = route?.params?.prePage || "";
  console.log(">>> prePage", route.params);
  console.log(">>> prePage", prePage);
  const { listPromotion, loadingPromotion } = useAppSelector(
    (state) => state.promotion
  );
  const { bookingPayload } = useAppSelector((state) => state.hotel);
  const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);
  console.log("21>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", bookingPayload);
  const dispatch = useAppDispatch();

  console.log("24 DS>>>>>>>>>>>>>>>>>>>>>>>>>>>>", listPromotion);

  const handleFetchListPromotion = () => {
    const code = "";
    const totalPrice = 1900000.0;
    dispatch(fetchListPromotion({ code, totalPrice }));
  };
  const discountItems = listPromotion;

  const handleToDiscountHistory = () => {
    navigation.navigate("DiscountHistory");
  };

  const handleChooseSale = (item) => {
    console.log(prePage);
    if (prePage === "OrderConfirm") {
      const bookingPayload_ = cloneDeep(bookingPayload);
      bookingPayload_.couponId = item?.id;
      dispatch(updateBookingPayload(bookingPayload_));
      dispatch(fetchBookingRoom());
      navigation.navigate("OrderConfirm");
      console.log(item);
    } else {
      console.log(item);
    }
  };

  console.log("accessToken isLoggedIn", accessToken, isLoggedIn);

  // Chưa đăng nhập
  if (!accessToken && !isLoggedIn) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="log-in-outline" size={48} color="#6B7280" />
        <Text style={styles.emptyText}>
          Bạn cần đăng nhập để xem mã giảm giá
        </Text>
      </View>
    );
  }

  // Đang tải
  if (loadingPromotion) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Đang tải...</Text>
      </View>
    );
  }

  // Giao diện chính
  return (
    <View style={styles.discountCodes}>
      {discountItems.length > 0 ? (
        discountItems.map((item) => (
          <TouchableOpacity
            key={item?.id}
            style={styles.discountCodes__item}
            onPress={() => handleChooseSale(item)}
          >
            <Ionicons
              name="gift-outline"
              size={45}
              color="#007BFF"
              style={styles.discountCodes__itemIcon}
            />
            <View style={styles.discountCodes__itemContent}>
              <Text style={styles.discountCodes__itemTitle}>
                {item?.description}
              </Text>
              <Text style={styles.discountCodes__itemCode}>{item?.code}</Text>
              <Text style={styles.discountCodes__itemExpiry}>
                Số tiền đặt phòng thấp nhất{" "}
                {formatPrice(item?.minBookingAmount)}
              </Text>
              <Text style={styles.discountCodes__itemExpiry}>
                Hạn sử dụng: {item?.expirationDate}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={50}
            color="#888888"
          />
          <Text style={styles.emptyText}>Bạn chưa có mã giảm giá nào</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  discountCodes: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  discountCodes__item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingVertical: 10,
  },
  discountCodes__itemIcon: {
    marginRight: 10,
  },
  discountCodes__itemContent: {
    flex: 1,
  },
  discountCodes__itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  discountCodes__itemCode: {
    fontSize: 14,
    color: "#007BFF",
    marginBottom: 5,
  },
  discountCodes__itemExpiry: {
    fontSize: 14,
    color: "#888888",
  },
  // Styles mới cho giao diện thông báo
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Discount;
