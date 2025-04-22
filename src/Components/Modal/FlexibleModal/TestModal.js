import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import ReusableModal from "./ReusableModal"; // Đường dẫn đến file ReusableModal.js

const TestModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("confirm");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Hàm kích hoạt Modal với type, title, message
  const showModal = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Nút để mở Confirm Modal */}
      <Button
        title="Show Confirm Modal"
        onPress={() =>
          showModal(
            "confirm",
            "Xác nhận hành động",
            "Bạn có chắc chắn muốn thực hiện hành động này không?"
          )
        }
        color="#007AFF"
      />

      {/* Nút để mở Loading Modal */}
      <Button
        title="Show Loading Modal"
        onPress={() =>
          showModal("loading", "Đang xử lý", "Vui lòng chờ trong giây lát...")
        }
        color="#00F598"
      />

      {/* Nút để mở Success Modal */}
      <Button
        title="Show Success Modal"
        onPress={() =>
          showModal(
            "success",
            "Thành công!",
            "Hành động đã hoàn tất thành công."
          )
        }
        color="#34C759"
      />

      {/* Nút để mở Error Modal */}
      <Button
        title="Show Error Modal"
        onPress={() =>
          showModal("error", "Lỗi!", "Đã có lỗi xảy ra. Vui lòng thử lại.")
        }
        color="#FF3B30"
      />

      {/* Component ReusableModal */}
      <ReusableModal
        visible={modalVisible}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        confirmText={modalType === "confirm" ? "Xác nhận" : "OK"}
        cancelText="Hủy"
        onConfirm={() => {
          setModalVisible(false);
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
    gap: 20, // Khoảng cách giữa các nút
    padding: 20,
  },
});

export default TestModal;
