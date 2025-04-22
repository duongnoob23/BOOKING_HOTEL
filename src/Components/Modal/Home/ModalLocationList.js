import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppSelector } from "../../../Redux/hook";

const ModalLocationList = ({ position, onClose, onSelect }) => {
  //   const locations = [
  //     { description: "Đà Nẵng rất đẹp", id: 1, name: "Đà Nẵng", rating: 4.5 },
  //     { description: "Lạng Sơn rất đẹp", id: 2, name: "Lạng Sơn", rating: 4.5 },
  //     { description: "Lạng Sơn rất đẹp", id: 3, name: "Lạng Sơn1", rating: 4.5 },
  //     { description: "Lạng Sơn rất đẹp", id: 4, name: "Lạng Sơn2", rating: 4.5 },
  //     { description: "Lạng Sơn rất đẹp", id: 5, name: "Lạng Sơn3", rating: 4.5 },
  //   ];

  const { hotelList, locationList, hotelDetail, loading, error } =
    useAppSelector((state) => state.hotel);

  return (
    <View
      style={[
        styles.container,
        {
          top: position.top,
          left: position.left,
          width: position.width,
        },
      ]}
    >
      <Text style={styles.modalTitle}>Chọn địa điểm</Text>

      <ScrollView style={styles.scrollView}>
        {locationList &&
          locationList?.map((item) => (
            <TouchableOpacity
              key={item.id.toString()}
              style={styles.locationItem}
              onPress={() => {
                onSelect(item.id.toString());
                onClose();
              }}
            >
              <Icon name="map-marker" size={24} color="#0090FF" />
              <Text style={styles.locationText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Đóng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalLocationList;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  scrollView: {
    maxHeight: 200, // Giới hạn chiều cao để cuộn
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  locationText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#0090FF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
