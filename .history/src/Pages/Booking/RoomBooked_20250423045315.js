import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { fetchConfirmBookingCancelled } from "../../../Redux/Slice/bookingSlice";
import { fetchBookingStatus } from "../../../Redux/Slice/hotelSlice";

const ModalBookingCancelled = ({
  visible,
  onClose,
  onConfirm,
  bookingId,
  navigation,
  handleToBookingScreen,
  policyRoomList = [], // Nhận mảng từ props, mặc định là mảng rỗng
  roomList = [], // Danh sách phòng, giả sử từ props
}) => {
  const bookingStatus = useAppSelector((state) => state.booking);
  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null); // Phòng được chọn để xem chi tiết
  const dispatch = useAppDispatch();

  const handleConfirmCancelled = () => {
    try {
      if (!cancelReason?.trim()) {
        setError("Vui lòng nhập lý do hủy phòng.");
        return;
      }

      const value = {
        bookingId: bookingId,
        reason: cancelReason,
      };

      console.log("bookingId", bookingId);
      console.log("Xác nhận hủy phòng với lý do:", cancelReason);

      dispatch(fetchConfirmBookingCancelled(value))
        .unwrap()
        .catch((error) => {
          Alert.alert("Lỗi", `Không thể hủy đặt phòng: ${error.message}`);
        });

      dispatch(fetchBookingStatus())
        .unwrap()
        .catch((error) => {
          Alert.alert(
            "Lỗi",
            `Không thể cập nhật trạng thái đặt phòng: ${error.message}`
          );
        });

      setError("");
      setCancelReason("");
      setSelectedRoom(null); // Đóng chi tiết phòng
      onClose();
      handleToBookingScreen();
    } catch (error) {
      Alert.alert("Lỗi", `Không thể xử lý hủy phòng: ${error.message}`);
    }
  };

  const handleRoomPress = (room) => {
    try {
      setSelectedRoom(room); // Mở chi tiết phòng
      navigation.navigate("BookingHistoryDetails", {
        room,
        function: room?.status, // Truyền trạng thái phòng (booked, checkedIn, v.v.)
      });
    } catch (error) {
      Alert.alert("Lỗi", `Không thể xem chi tiết phòng: ${error.message}`);
    }
  };

  const renderRoomItem = (room, index) => {
    if (!room?.name || !room?.status) return null;
    const statusConfig = {
      booked: {
        text: "Đã đặt",
        button: "Hủy",
        color: "#FF3B30",
        icon: "close-circle-outline",
      },
      checkedIn: {
        text: "Đang ở",
        button: "CheckOut",
        color: "#007AFF",
        icon: "log-out-outline",
      },
      checkedOut: {
        text: "Đã trả",
        button: "Đánh giá",
        color: "#34C759",
        icon: "star-outline",
      },
      cancelled: {
        text: "Đã hủy",
        button: "Đã hoàn tiền",
        color: "#666",
        icon: "cash-outline",
      },
    };

    const config = statusConfig[room.status] || {
      text: "Không xác định",
      button: "",
      color: "#666",
    };

    return (
      <TouchableOpacity
        key={room?.id || `room-${index}`}
        style={styles.roomItem}
        onPress={() => handleRoomPress(room)}
      >
        <View style={styles.roomContent}>
          <Text style={styles.roomName}>{room.name}</Text>
          <Text style={styles.roomStatus}>Trạng thái: {config.text}</Text>
          {room?.bookingDate && (
            <Text style={styles.roomDetails}>Ngày đặt: {room.bookingDate}</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: config.color }]}
          onPress={() => handleRoomPress(room)}
        >
          <Ionicons
            name={config.icon}
            size={20}
            color="#FFF"
            style={styles.actionIcon}
          />
          <Text style={styles.actionButtonText}>{config.button}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderPolicyItem = (policy, index) => {
    if (!policy?.name || !policy?.description) return null;
    return (
      <View key={policy?.id || `policy-${index}`} style={styles.policyItem}>
        <Ionicons
          name="newspaper-outline"
          size={2020}
          color="#191D39"
          style={styles.iconPolicy}
        />
        <View style={styles.policyContent}>
          <Text style={styles.policyName}>{policy.name}</Text>
          <Text style={styles.policyDescription}>{policy.description}</Text>
          {policy?.condition && policy?.value && (
            <Text style={styles.policyDetails}>
              Điều kiện: {policy.condition} giờ, Hoàn tiền: {policy.value}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderRoomDetails = () => {
    if (!selectedRoom) return null;
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailHeaderText}>{selectedRoom?.name}</Text>
          <TouchableOpacity onPress={() => setSelectedRoom(null)}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.detailContent}>
          <Text style={styles.detailStatus}>
            Trạng thái: {selectedRoom?.status}
          </Text>
          {selectedRoom?.bookingDate && (
            <Text style={styles.detailInfo}>
              Ngày đặt: {selectedRoom.bookingDate}
            </Text>
          )}
          {policyRoomList?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Chính sách hủy phòng</Text>
              {policyRoomList.map((policy, index) =>
                renderPolicyItem(policy, index)
              )}
            </>
          )}
          {selectedRoom?.status === "booked" && (
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonLabel}>Lý do hủy phòng</Text>
              <TextInput
                style={[styles.reasonInput, error ? styles.inputError : null]}
                placeholder="Nhập lý do hủy phòng..."
                placeholderTextColor="#999"
                value={cancelReason}
                onChangeText={(text) => {
                  setCancelReason(text);
                  setError("");
                }}
                multiline
                numberOfLines={4}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          )}
        </ScrollView>
        {selectedRoom?.status === "booked" && (
          <View style={styles.detailFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectedRoom(null)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleConfirmCancelled}
            >
              <Text style={styles.applyButtonText}>Xác nhận hủy</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
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
          {selectedRoom ? (
            renderRoomDetails()
          ) : (
            <>
              <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách phòng</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.roomList}>
                {roomList?.length > 0 ? (
                  roomList.map((room, index) => renderRoomItem(room, index))
                ) : (
                  <Text style={styles.emptyText}>Không có phòng nào.</Text>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalBookingCancelled;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
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
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  roomList: {
    maxHeight: 400,
    paddingVertical: 10,
  },
  roomItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    marginBottom: 8,
  },
  roomContent: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191D39",
    marginBottom: 4,
  },
  roomStatus: {
    fontSize: 14,
    color: "#555",
  },
  roomDetails: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "500",
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  detailHeaderText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  detailContent: {
    maxHeight: 400,
    paddingVertical: 10,
  },
  detailStatus: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191D39",
    marginBottom: 8,
  },
  detailInfo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  policyItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconPolicy: {
    marginRight: 12,
    marginTop: 5,
  },
  policyContent: {
    flex: 1,
  },
  policyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191D39",
    marginBottom: 4,
  },
  policyDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  policyDetails: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    padding: 20,
  },
  reasonContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  reasonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#F9F9F9",
    textAlignVertical: "top",
    minHeight: 100,
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    fontSize: 12,
    color: "#FF0000",
    marginTop: 5,
  },
  detailFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  cancelButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  applyButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
  },
});
