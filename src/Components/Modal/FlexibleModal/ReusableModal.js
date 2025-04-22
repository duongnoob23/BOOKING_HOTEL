import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReusableModal = ({
  visible,
  type = "confirm", // confirm, loading, success, error, warning
  title = "",
  message = "",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
  confirmButtonStyle,
  cancelButtonStyle,
}) => {
  // Hàm render biểu tượng hoặc ActivityIndicator dựa trên type
  const renderIcon = () => {
    switch (type) {
      case "loading":
        return <ActivityIndicator size="large" color="#00F598" />;
      case "success":
        return <Ionicons name="checkmark-circle" size={50} color="#00F598" />;
      case "error":
        return <Ionicons name="close-circle" size={50} color="#FF3B30" />;
      case "warning":
        return <Ionicons name="warning" size={50} color="#FF9500" />;
      case "confirm":
      default:
        return <Ionicons name="help-circle" size={50} color="#007AFF" />;
    }
  };

  // Hàm render nội dung Modal
  const renderContent = () => {
    return (
      <>
        {renderIcon()}
        <Text style={styles.modalTitle}>
          {title ||
            (type === "loading"
              ? "Đang xử lý"
              : type === "success"
              ? "Thành công!"
              : type === "error"
              ? "Lỗi!"
              : type === "warning"
              ? "Cảnh báo!"
              : "Xác nhận")}
        </Text>
        <Text style={styles.modalText}>
          {message ||
            (type === "loading"
              ? "Vui lòng chờ trong giây lát..."
              : type === "success"
              ? "Thao tác đã hoàn tất."
              : type === "error"
              ? "Đã có lỗi xảy ra."
              : type === "warning"
              ? "Hãy kiểm tra lại trước khi tiếp tục."
              : "Bạn có chắc chắn muốn tiếp tục?")}
        </Text>
      </>
    );
  };

  // Hàm render các nút
  const renderButtons = () => {
    if (type === "loading") return null;
    return (
      <View style={styles.buttonContainer}>
        {type === "confirm" && (
          <TouchableOpacity
            style={[styles.cancelButton, cancelButtonStyle]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>{cancelText}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.confirmButton, confirmButtonStyle]}
          onPress={onConfirm}
        >
          <Text style={styles.buttonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {renderContent()}
          {renderButtons()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#00F598",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReusableModal;
