import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { fetchConfirmBookingCancelled } from "../../../Redux/Slice/bookingSlice";
import { fetchBookingStatus } from "../../../Redux/Slice/hotelSlice";

const ModalBookingCancelled = ({
  visible,
  onClose,
  onConfirm,
  bookingId,
  navigation,
  handleToBookingScreen,
}) => {
  const bookingStatus = useAppSelector((state) => state.booking);

  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const policyRoomList = [
    {
      policyId: 4,
      policyName: "PERSON",
      policyDescription: "Trẻ em dưới 12 tuổi được miễn phí tiền phòng",
    },
    {
      policyId: 12,
      policyName: "PAYMENT",
      policyDescription: "Yêu cầu thanh toán đủ 100% trước khi nhận phòng",
    },
    {
      policyId: 1,
      policyName: "CHECKIN",
      policyDescription:
        "Khách hàng cần check in trong thời gian quy định nếu không sẽ bị tính thêm phụ phí",
    },
    {
      policyId: 3,
      policyName: "CANCEL",
      policyDescription: "Hoàn tiền 30% nếu hủy phòng trước 24 giờ",
    },
    {
      policyId: 2,
      policyName: "CHECKOUT",
      policyDescription:
        "Khách hàng cần check out trong thời gian quy định nếu không sẽ bị tính thêm phụ phí",
    },
  ];

  const handleConfirmCancelled = () => {
    if (!cancelReason.trim()) {
      setError("Vui lòng nhập lý do hủy phòng.");
      return;
    }
    const value = {
      bookingId: bookingId,
      reason: cancelReason,
    };

    console.log("bookingId", bookingId);
    console.log("Xác nhận hủy phòng với lý do:", cancelReason);

    dispatch(fetchConfirmBookingCancelled(value));
    dispatch(fetchBookingStatus());
    setError(""); // Xóa lỗi nếu đã nhập lý do
    setCancelReason(""); // Reset TextInput
    onClose(); // Đóng modal
    handleToBookingScreen();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Chính sách hủy phòng</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.policies}>
            {policyRoomList.length > 0 ? (
              policyRoomList.map((policy) => (
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
              ))
            ) : (
              <Text style={styles.emptyText}>Không có chính sách nào.</Text>
            )}
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonLabel}>Lý do hủy phòng</Text>
              <TextInput
                style={[styles.reasonInput, error ? styles.inputError : null]}
                placeholder="Nhập lý do hủy phòng..."
                placeholderTextColor="#999"
                value={cancelReason}
                onChangeText={(text) => {
                  setCancelReason(text);
                  setError(""); // Xóa lỗi khi người dùng bắt đầu nhập
                }}
                multiline
                numberOfLines={4}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleConfirmCancelled}
            >
              <Text style={styles.applyButtonText}>Xác nhận hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBookingCancelled;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%", // Giới hạn chiều cao
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  policies: {
    maxHeight: 400, // Giới hạn chiều cao của ScrollView
    paddingVertical: 10,
  },
  policyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconPolicy: {
    marginRight: 10,
  },
  policyText: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    padding: 20,
  },
  reasonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  reasonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#F9F9F9",
    textAlignVertical: "top", // Cho multiline
    minHeight: 80, // Đảm bảo chiều cao phù hợp
  },
  inputError: {
    borderColor: "red", // Viền đỏ khi có lỗi
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  cancelButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#000",
  },
  applyButton: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
