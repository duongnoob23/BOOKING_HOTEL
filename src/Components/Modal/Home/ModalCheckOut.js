import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ModalCheckOut = ({
  visible,
  onClose,
  selectDay,
  setSelectDay,
  confirm,
}) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => 2025 + i);
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.modalTitle}>Chọn ngày trả phòng</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectDay.day}
              onValueChange={(value) =>
                setSelectDay({ ...selectDay, day: value })
              }
            >
              {days.map((day) => (
                <Picker.Item key={day} label={`${day}`} value={day} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={selectDay.month}
              onValueChange={(value) =>
                setSelectDay({ ...selectDay, month: value })
              }
            >
              {months.map((month) => (
                <Picker.Item key={month} label={`${month}`} value={month} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={selectDay.year}
              onValueChange={(value) =>
                setSelectDay({ ...selectDay, year: value })
              }
            >
              {years.map((year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              ))}
            </Picker>
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => onClose("Modal_CheckOut", "false")}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => confirm("checkout")}
            >
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalCheckOut;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flex: 1,
    height: 150,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#0090FF",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
