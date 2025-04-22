import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import getServiceIcon from "../../Components/Icon/getServiceIcon";
import { fetchBookingRoom } from "../../Redux/Slice/hotelSlice";
import SkeletonOrderConfirm from "../../Components/Skeleton/Hotels/SkeletonOrderConfirm";
import { formatPrice } from "../../Utils/formarPrice";
import { fetchListPromotion } from "../../Redux/Slice/promotionSlice";
import {
  fetchPaymentOrder,
  resetPaymentData,
} from "../../Redux/Slice/paymentSlice";
import ModalBookingCancelled from "../../Components/Modal/Booking/ModalBookingCancelled";

const BookingHistoryDetails = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { bookingDetailData, loadingBookingDetail } = useAppSelector(
    (state) => state.booking
  );

  const [openModal, setOpenModal] = useState(false);

  const listRoom = bookingDetailData?.roomBookedList;

  const getUniqueServiceTypes = (serviceSelect) => {
    const serviceTypes = new Set(
      serviceSelect?.map((service) => service.serviceType) || []
    );
    return Array.from(serviceTypes);
  };

  const handleToSale = () => {
    const totalPrice =
      +bookingDetailData?.totalPriceRoom +
      +bookingDetailData?.totalPriceService;
    const code = "";
    dispatch(fetchListPromotion({ code, totalPrice }));
    navigation.navigate("Discount", { prePage: "OrderConfirm" });
  };

  const renderListRoom = (item) => (
    <View style={styles.roomWrapper}>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Tên Phòng</Text>
        <Text style={styles.roomValue}>{item?.roomName}</Text>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomLabel}>Số khách</Text>
        <Text style={styles.roomValue}>{item?.adults} người</Text>
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
              <TouchableOpacity key={type} style={styles.iconWrapper}>
                {getServiceIcon(type)}
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity>
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
            <Text style={{ fontWeight: "bold", color: "#007AFF" }}>
              Xem thêm
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
    </View>
  );

  if (loadingBookingDetail) {
    return <SkeletonOrderConfirm />;
  }

  const handleConfirmCancelled = () => {
    console.log("heelo");
  };

  const handleToBookingScreen = () => {
    navigation.navigate("BookingScreen");
  };
  console.log("BBBBBBBBBBBBBBBBBBBBBBB", bookingDetailData);
  const test = {
    bookingId: 198,
    bookingStatus: "BOOKED",
    checkIn: "22-09-2025 14:20:00",
    checkOut: "23-09-2025 12:20:00",
    finalPrice: "1060000.00",
    hotelAddress: "Hà Nội",
    hotelId: 2,
    hotelName: "Onomo",
    paymentDeposit: "530000.00",
    policyList: [
      {
        condition: "12",
        description: "Không hoàn tiền nếu hủy trong vòng 12 giờ trước check-in",
        id: 9,
        name: "Không hoàn tiền",
        operator: "after",
        type: "CANCEL",
        value: "0%",
      },
      {
        condition: "13",
        description: "Không hoàn tiền nếu hủy trong vòng 12 giờ trước check-in",
        id: 9,
        name: "Không hoàn tiền",
        operator: "after",
        type: "CANCEL",
        value: "0%",
      },
      {
        condition: "14",
        description: "Không hoàn tiền nếu hủy trong vòng 12 giờ trước check-in",
        id: 9,
        name: "Không hoàn tiền",
        operator: "after",
        type: "CANCEL",
        value: "0%",
      },
    ],
    priceCoupon: "20000.00",
    roomBookedList: [
      {
        adults: 1,
        priceRoom: 1080000,
        priceService: 70000,
        roomId: 2,
        roomName: "Phòng Deluxe Gia đình VIP",
        serviceSelect: [Array],
      },
    ],
    totalAdults: 1,
    totalPriceRoom: "1080000.00",
    totalPriceService: "70000.00",
  };
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headerSection}>
            <Text style={[styles.title, styles.titleCenter]}>
              Thông tin khách sạn
            </Text>
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Tên khách sạn</Text>
                <Text style={styles.infoValue}>
                  {bookingDetailData && bookingDetailData?.hotelName}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Vị trí khách sạn</Text>
                <Text style={styles.infoValue}>
                  {bookingDetailData && bookingDetailData?.hotelAddress}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Tổng người lớn</Text>
                <Text style={styles.infoValue}>
                  {bookingDetailData && bookingDetailData?.totalAdults}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>CheckIn</Text>
                <Text style={styles.infoValue}>
                  {bookingDetailData && bookingDetailData?.checkIn}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>CheckOut</Text>
                <Text style={styles.infoValue}>
                  {bookingDetailData && bookingDetailData?.checkOut}
                </Text>
              </View>
            </View>
            <View style={styles.br} />
          </View>

          <View style={styles.roomsSection}>
            <Text style={styles.subTitle}>Phòng đặt</Text>
            <View>
              {listRoom?.map((item, index) => (
                <View key={index}>{renderListRoom(item)}</View>
              ))}
            </View>
            <View style={styles.br} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.headerSection}>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mã giảm giá</Text>
            <TouchableOpacity
              style={styles.wrapperInfoValueSale}
              onPress={handleToSale}
            >
              <Ionicons name="bookmark-outline" size={18} color="#007AFF" />
              <Text style={styles.infoValueSale}>couponCode</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.headerSection2}>
        <Text style={[styles.title, styles.titleCenter]}>Hóa đơn</Text>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Giá tiền phòng</Text>
            <Text style={styles.infoValue}>
              {formatPrice(
                bookingDetailData && bookingDetailData?.totalPriceRoom
              )}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabelSale}>Giá tiền dịch vụ</Text>
            <Text style={styles.infoValue}>
              {formatPrice(
                bookingDetailData && bookingDetailData?.totalPriceService
              )}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mã giảm giá</Text>
            <Text style={styles.infoValue}>
              {formatPrice(bookingDetailData && bookingDetailData?.priceCoupon)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Giá tiền cọc</Text>
            <Text style={styles.infoValue}>
              {formatPrice(
                bookingDetailData && bookingDetailData?.paymentDeposit
              )}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Giá cuối cùng</Text>
            <Text style={styles.infoValue}>
              {formatPrice(bookingDetailData && bookingDetailData?.finalPrice)}
            </Text>
          </View>
        </View>
        <View style={styles.br} />
      </View>
      <View style={styles.footerSection}>
        <View style={styles.br} />
        <Text style={styles.subTitle}>Phương thức hủy phòng</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setOpenModal(true)}
        >
          <Text style={styles.buttonText}>Xác nhận hủy phòng</Text>
        </TouchableOpacity>
      </View>
      {/* {openModal && <ModalBookingCancelled onClose={setOpenModal(false)} />} */}
      <ModalBookingCancelled
        visible={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmCancelled}
        bookingId={bookingDetailData?.bookingId}
        handleToBookingScreen={handleToBookingScreen}
        // policyRoomList={bookingDetailData?.policyList}
        policyRoomList={test.policyList}
      />
    </View>
  );
};

export default BookingHistoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "column",
    height: "100%",
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 10,
    // Phần đầu cố định, không cần flex cụ thể vì sẽ chiếm không gian tự nhiên
  },
  headerSection2: {
    marginTop: "auto",
    paddingHorizontal: 10,
  },
  roomsSection: {
    // Chiếm không gian còn lại để ScrollView có thể cuộn
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
    backgroundColor: "red",
    paddingVertical: 12,
    marginHorizontal: 10,
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
