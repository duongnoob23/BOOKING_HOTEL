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
const ModalFilter = ({ onClose }) => {
  const { inforFilter, filterList, tempFilter } = useAppSelector(
    (state) => state.hotel
  );

  const serviceData = filterList;

  const dispatch = useAppDispatch();

  const [selectedService, setSelectService] = useState(
    tempFilter.serviceIds || []
  );

  const toggleService = (id) => {
    let updateService;
    if (selectedService.includes(id)) {
      updateService = selectedService.filter((serviceId) => serviceId !== id);
    } else {
      updateService = [...selectedService, id];
    }

    setSelectService(updateService);
    dispatch(updateTempFilter({ serviceIds: updateService }));
  };

  const handleApply = () => {
    dispatch(applyFilter());
    //  dispatch(updateFilter({ ...inforFilter, serviceIds: selectedService }));
    //  console.log(inforFilter.serviceIds);
    onClose();
    // try {
    //   dispatch(applyFilter());
    //   onClose();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getIconForAmenity = (amenity) => {
    const { name } = amenity;

    // Ánh xạ từng name với một icon khác nhau
    const nameIcons = {
      "Nhìn ra thành phố": "eye-outline",
      "Phòng tắm riêng": "water-outline",
      "Đồ vệ sinh cá nhân miễn phí": "brush-outline",
      "Két an toàn": "lock-closed-outline",
      "Nhà vệ sinh": "water-outline",
      "Lò sưởi": "flame-outline",
      "Bồn tắm hoặc Vòi sen": "water-outline",
      "Khăn tắm": "bandage-outline",
      "Ra trải giường": "bed-outline",
      "Ổ điện gần giường": "cube-outline",
      "Sàn lát gạch/đá cẩm thạch": "cube-outline",
      "Bàn làm việc": "cube-outline",
      "Ghế cao dành cho trẻ em": "accessibility-outline",
      "Khu vực tiếp khách": "accessibility-outline",
      TV: "tv-outline",
      Dép: "footsteps-outline",
      "Tủ lạnh": "snow-outline",
      "Máy pha trà/cà phê": "cafe-outline",
      "Máy sấy tóc": "cube-outline",
      "Dịch vụ báo thức": "alarm-outline",
      "Ấm đun nước điện": "flash-outline",
      "Truyền hình cáp": "videocam-outline",
      "Két an toàn cỡ laptop": "laptop-outline",
      "Tủ hoặc phòng để quần áo": "shirt-outline",
      "Các tầng trên chỉ lên được bằng cầu thang": "cube-outline",
      "Giấy vệ sinh": "document-outline",
      "Máy điều hòa độc lập cho từng phòng": "snow-outline",
      "Bánh mì trứng": "egg-outline",
      "Phở bò": "egg-outline",
      "Bún riêu": "fish-outline",
      "Cháo gà": "nutrition-outline",
      "Bánh cuốn": "leaf-outline",
      "Cơm tấm sườn bì chả": "fast-food-outline",
      "Canh chua cá lóc": "fish-outline",
      "Gà kho gừng": "nutrition-outline",
      "Cá kho tộ": "fish-outline",
      "Bò xào lúc lắc": "flame-outline",
      "Lẩu hải sản": "fish-outline",
      "Tôm nướng muối ớt": "flame-outline",
      "Bò bít tết": "flame-outline",
      "Cua rang me": "fish-outline",
      "Mực xào sa tế": "fish-outline",
      "Salad cá ngừ": "nutrition-outline",
      "Sushi cá hồi": "fish-outline",
      "Hàu nướng phô mai": "fish-outline",
      "Sườn BBQ": "flame-outline",
      "Gỏi cuốn": "leaf-outline",
      Massage: "hand-right-outline",
      "Xông hơi": "thermometer-outline",
      "Phòng gym": "barbell-outline",
      "Đưa đón sân bay": "airplane-outline",
      "Thuê xe": "car-sport-outline",
      Taxi: "car-outline",
      "Dọn phòng": "brush-outline",
      "Giặt ủi": "shirt-outline",
      "Trang trí phòng đặc biệt": "sparkles-outline",
    };
    // Trả về icon theo name, nếu không tìm thấy thì dùng icon mặc định
    return nameIcons[name] || "ellipse-outline";
  };

  return (
    <View style={styles.modalContent}>
      {/* Kiểm tra dữ liệu trước khi render */}
      {!serviceData || serviceData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Không có tiện nghi nào</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.amenitiesContainer}>
            {serviceData.map((amenity) => {
              const isSelected = selectedService.includes(amenity.id);
              return (
                <TouchableOpacity
                  key={amenity.id}
                  style={[
                    styles.amenityButton,
                    isSelected && styles.amenityButtonSelected,
                  ]}
                  onPress={() => toggleService(amenity.id)}
                >
                  <Ionicons
                    name={getIconForAmenity(amenity)} // Truyền toàn bộ đối tượng amenity
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
export default ModalFilter;
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
