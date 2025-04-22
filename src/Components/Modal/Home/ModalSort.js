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
  updateFilter,
  updateTempFilter,
  applyFilter,
} from "../../../Redux/Slice/hotelSlice";
const ModalSort = ({ onClose }) => {
  const { sortList, inforFilter, tempFilter } = useAppSelector(
    (state) => state.hotel
  );
  const sortData = sortList;
  //   console.log(sortList);

  const dispatch = useAppDispatch();

  const [selectedSorts, setSelectedSorts] = useState(tempFilter.sortById);

  //   console.log(">>> 22 Modalamenity inforFilter:", inforFilter);
  //   console.log(">>> 22 Modalamenity inforFilter:", inforFilter.sortById);

  const toggleSort = (id) => {
    setSelectedSorts(id);
    dispatch(updateTempFilter({ sortById: id }));
  };

  const getIconForSort = (name) => {
    switch (name) {
      case "Giá tăng dần":
        return "cash-outline";
      case "Giá giảm dần":
        return "cash-outline";
      case "Đánh giá tăng dần":
        return "chatbox-ellipses-outline";
      case "Đánh giá giảm dần":
        return "chatbox-ellipses-outline";
      default:
        return "menu-outline";
    }
  };

  const handleApply = () => {
    // try {
    dispatch(applyFilter());
    // dispatch(updateFilter({ ...inforFilter, sortById: selectedSorts }));
    // console.log(inforFilter.sortById);
    onClose();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={styles.modalContent}>
      {/* Header của View */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Tiện nghi</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View> */}

      {/* Kiểm tra dữ liệu trước khi render */}
      {!sortData || sortData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Không có tiện nghi nào</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.amenitiesContainer}>
            {sortData.map((item) => {
              {
                /* const isSelected = selectedAmenities.includes(item.id); */
              }
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.amenityButton,
                    item.id === selectedSorts && styles.amenityButtonSelected,
                  ]}
                  onPress={() => toggleSort(item.id)}
                >
                  <Ionicons
                    name={getIconForSort(item.name)}
                    size={40}
                    color={item.id === selectedSorts ? "#FFF" : "#0090FF"}
                    style={styles.amenityIcon}
                  />
                  <Text
                    style={[
                      styles.amenityText,
                      item.id === selectedSorts && styles.amenityTextSelected,
                    ]}
                  >
                    {item.name}
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
export default ModalSort;

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
