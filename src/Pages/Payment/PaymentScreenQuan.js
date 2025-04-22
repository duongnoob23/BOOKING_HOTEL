import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import paymentApi from "./paymentApi";
import PaymentButton from "./PaymentButton";
import ReusableModal from "../../Components/Modal/FlexibleModal/ReusableModal";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  fetchPaymentOrder,
  resetPaymentData,
} from "../../Redux/Slice/paymentSlice";

const PaymentScreenQuan = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("confirm");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const { bookingPayload } = useAppSelector((state) => state.hotel);
  const { paymentData, loadingPayment } = useAppSelector(
    (state) => state.payment
  );
  const dispatch = useAppDispatch();

  // const a = {
  //   checkInDate: "2025-04-21",
  //   checkOutDate: "2025-04-22",
  //   couponId: 0,
  //   hotelId: 1,
  //   roomRequestList: [
  //     {
  //       adults: 1,
  //       children: 0,
  //       price: 900000,
  //       roomId: 1,
  //       roomName: "Phòng Deluxe Gia đình",
  //       serviceList: [Array],
  //       uniqueId: "room1_1",
  //     },
  //   ],
  //   };

  //   const b = {
  //     hotelId: 1,
  //     checkInDate: "2025-04-21",
  //     checkOutDate: "2025-04-22",
  //     couponId: 0,
  //     roomRequestList: [
  //       {
  //         roomId: 1,
  //         adults: 1,
  //         children: 0,
  //         price: 900000,
  //         serviceList: [
  //           {
  //             id: 29,
  //             quantity: 1,
  //             time: "2025-04-19T17:57:24.031Z",
  //             note: "string",
  //           },
  //         ],
  //       },
  //     ],
  //   };

  useEffect(() => {
    if (
      paymentData &&
      paymentData.orderUrl !== "" &&
      paymentData.appTransId !== ""
    ) {
      console.log("Dữ liệu API trả về:", paymentData);
      setIsLoading(false);
      navigation.navigate("PaymentWebViewScreenQuan", {
        orderUrl: paymentData.orderUrl,
      });
    }
  }, [paymentData]);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      dispatch(fetchPaymentOrder(bookingPayload));
      console.log(
        "KKKKKKKKKKKKKKKKKKKKKKKKKKKK dữ liệu gửi lên api",
        bookingPayload
      );
      console.log("KKKKKKKKKKKKKK dữ liệu api trả về", paymentData);
      console.log(">>> run dispatch");

      // navigation.navigate("PaymentWebViewScreenQuan", {
      //   orderUrl: paymentData.orderUrl,
      // });
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Lỗi", error.message || "Lỗi tạo thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00C4B4" />
      ) : (
        <PaymentButton
          onPress={() =>
            showModal(
              "confirm",
              "Xác nhận ",
              "Bạn có chắc chắn muốn thanh toán với ZaloPay?"
            )
          }
          disabled={isLoading}
        />
      )}
      <ReusableModal
        visible={modalVisible}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        confirmText={modalType === "confirm" ? "Xác nhận" : "OK"}
        cancelText="Hủy"
        onConfirm={() => {
          setModalVisible(false);
          handlePayment();
          console.log(`${modalType} confirmed!`);
        }}
        onCancel={() => {
          setModalVisible(false);
          console.log("Canceled!");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});

export default PaymentScreenQuan;
