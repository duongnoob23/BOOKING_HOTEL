import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useAppSelector, useAppDispatch } from "../../../Redux/hook";
import { updateFilter } from "../../../Redux/Slice/hotelSlice";

const ModalGuestsAndRooms = ({
  visible,
  onClose,
  // inforFilter,
  // setInforFilter,
}) => {
  const {
    hotelList,
    locationList,
    hotelDetail,
    hotelByLocation,
    loading,
    error,
    inforFilter,
  } = useAppSelector((state) => state.hotel);

  const dispatch = useAppDispatch();
  const [tempValues, setTempValues] = useState({});

  useEffect(() => {
    const initValue = {
      adults: inforFilter.adults || 1,
      children: inforFilter.children || 0,
      roomNumber: inforFilter.roomNumber || 1,
    };
    setTempValues(initValue);
  }, []);

  // console.log("temValue", tempValues);
  // console.log("infoFilter", inforFilter);

  const increaseValue = (key) => {
    setTempValues((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  const decreaseValue = (key) => {
    setTempValues((prev) => {
      if (key === "roomNumber" && prev[key] <= 0) return prev;
      if (prev[key] <= 0) return prev;
      return {
        ...prev,
        [key]: prev[key] - 1,
      };
    });
  };

  const handleConfirm = () => {
    // setInforFilter((prev) => ({
    //   ...prev,
    //   adults: tempValues.adults,
    //   children: tempValues.children,
    //   roomNumber: tempValues.roomNumber,
    // }));

    dispatch(
      updateFilter({
        ...inforFilter,
        adults: tempValues.adults,
        children: tempValues.children,
        roomNumber: tempValues.roomNumber,
      })
    );
    onClose("Modal_GuestsAndRooms", false);
  };

  const handleCloseModal = () => {
    const initValue = {
      adults: inforFilter.adults || 1,
      children: inforFilter.children || 0,
      roomNumber: inforFilter.roomNumber || 1,
    };
    setTempValues(initValue);
    onClose("Modal_GuestsAndRooms", false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn phòng và khách</Text>

          {/* Số phòng */}
          <View style={styles.row}>
            <Text style={styles.label}>Phòng</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => decreaseValue("roomNumber")}
              >
                <Text style={styles.buttonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{tempValues.roomNumber}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => increaseValue("roomNumber")}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Số người lớn */}
          <View style={styles.row}>
            <Text style={styles.label}>Người lớn</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => decreaseValue("adults")}
              >
                <Text style={styles.buttonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{tempValues.adults}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => increaseValue("adults")}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Số trẻ em */}
          <View style={styles.row}>
            <Text style={styles.label}>Trẻ em</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => decreaseValue("children")}
              >
                <Text style={styles.buttonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.value}>{tempValues.children}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => increaseValue("children")}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nút Hủy và Xác nhận */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleCloseModal()}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalGuestsAndRooms;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
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
