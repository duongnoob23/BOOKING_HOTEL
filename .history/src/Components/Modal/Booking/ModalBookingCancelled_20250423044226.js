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
  policyRoomList, // Nhận mảng từ props
}) => {
  const bookingStatus = useAppSelector((state) => state.booking);
  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");
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
      onClose();
      handleToBookingScreen();
    } catch (error) {
      Alert.alert("Lỗi", `Không thể xử lý hủy phòng: ${error.message}`);
    }
  };

  const renderPolicyItem = (policy, index) => {
    if (!policy?.name || !policy?.description) return null;
    return (
      <View key={policy?.id || `policy-${index}`} style={styles.policyItem}>
        <Ionicons
          name="newspaper-outline"
          size={20}
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
          {policy?.type && (
            <Text style={styles.policyType}>Loại: {policy.type}</Text>
          )}
        </View>
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
          <View style={styles.header}>
            <Text style={styles.headerText}>Chính sách hủy phòng</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.policies}>
            {policyRoomList?.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>Danh sách chính sách</Text>
                {policyRoomList.map((policy, index) =>
                  renderPolicyItem(policy, index)
                )}
              </>
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
                  setError("");
                }}
                multiline
                numberOfLines={4}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  policies: {
    maxHeight: 400,
    paddingVertical: 10,
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
  policyType: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
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
  footer: {
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
