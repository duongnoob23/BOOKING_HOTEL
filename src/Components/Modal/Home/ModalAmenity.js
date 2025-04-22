import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  applyFilter,
  updateFilter,
  updateTempFilter,
} from "../../../Redux/Slice/hotelSlice";
const ModalAmenity = ({ onClose }) => {
  const { amenityList, tempFilter } = useAppSelector((state) => state.hotel);
  const amenitiesData = amenityList;
  const dispatch = useAppDispatch();

  const [selectedAmenities, setSelectedAmenities] = useState(
    tempFilter.amenityIds || []
  );

  // console.log(">>> 22 Modalamenity inforFilter:", inforFilter);
  // console.log(">>> 22 Modalamenity inforFilter:", inforFilter.amenityIds);

  const toggleAmenity = (id) => {
    let updatedAmenities;
    if (selectedAmenities.includes(id)) {
      updatedAmenities = selectedAmenities.filter(
        (amenityId) => amenityId !== id
      );
    } else {
      updatedAmenities = [...selectedAmenities, id];
    }
    setSelectedAmenities(updatedAmenities);
    dispatch(updateTempFilter({ amenityIds: updatedAmenities }));
  };

  const handleApply = () => {
    // dispatch(updateFilter({ ...inforFilter, amenityIds: selectedAmenities }));

    // console.log(inforFilter.amenityIds);
    // onClose();

    dispatch(applyFilter()); // Copy tempFilter vào inforFilter
    onClose();
    // try {
    //   dispatch(applyFilter());
    //   onClose();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getIconForAmenity = (name) => {
    switch (name) {
      case "Wi-fi miễn phí":
        return "wifi-outline";
      case "Phòng gym":
        return "barbell-outline";
      case "Thích hợp trẻ em":
        return "happy-outline";
      case "Bữa sáng miễn phí":
        return "restaurant-outline";
      default:
        return "ellipse-outline";
    }
  };

  // Log để debug
  // console.log("amenitiesData:", amenitiesData);

  // Nếu không hiển thị thì trả về null

  return (
    <View style={styles.modalContent}>
      {/* Kiểm tra dữ liệu trước khi render */}
      {!amenitiesData || amenitiesData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Không có tiện nghi nào</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.amenitiesContainer}>
            {amenitiesData.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity.id);
              return (
                <TouchableOpacity
                  key={amenity.id}
                  style={[
                    styles.amenityButton,
                    isSelected && styles.amenityButtonSelected,
                  ]}
                  onPress={() => toggleAmenity(amenity.id)}
                >
                  <Ionicons
                    name={getIconForAmenity(amenity.name)}
                    size={40}
                    color={isSelected ? "#FFF" : "#0090FF"}
                    style={styles.amenityIcon}
                  />
                  <Text
                    style={[
                      styles.amenityText,
                      isSelected && styles.amenityTextSelected,
                    ]}
                  >
                    {amenity.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Nút Áp dụng */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ModalAmenity;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#FFF",
    marginHorizontal: 0,
    marginVertical: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  scrollView: {
    maxHeight: 400,
    minHeight: 400,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 15,
  },
  amenityButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#0090FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    width: "47%", // 2 cột
  },
  amenityButtonSelected: {
    backgroundColor: "#0090FF",
    borderColor: "#0090FF",
  },
  amenityIcon: {
    marginBottom: 5, // Khoảng cách giữa icon và text
  },
  amenityText: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  amenityTextSelected: {
    color: "#FFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
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
    backgroundColor: "#00F598",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
