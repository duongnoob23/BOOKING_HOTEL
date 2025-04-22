import React, { useState } from "react";
import {
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppSelector } from "../../Redux/hook";

// Lấy chiều rộng màn hình để tính toán kích thước ảnh
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// Tính toán kích thước và khoảng cách
const NUM_COLUMNS = 3; // Số cột
const SPACING = SCREEN_WIDTH * 0.05; // Khoảng cách giữa các ảnh (5% chiều rộng màn hình)
const TOTAL_SPACING = (NUM_COLUMNS + 1) * SPACING; // Tổng khoảng cách (giữa các ảnh và hai bên lề)
const IMAGE_SIZE = (SCREEN_WIDTH - TOTAL_SPACING) / NUM_COLUMNS; // Chiều rộng mỗi ảnh

const PhotoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ số ảnh hiện tại

  const { hotelDetail } = useAppSelector((state) => state.hotel);

  // Dữ liệu mẫu hoặc từ hotelDetail
  const photoList2 =
    hotelDetail?.images?.map((item, index) => ({
      id: index,
      url: item,
    })) || [];

  // Hàm render từng ảnh
  const RenderPhotoItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedPhoto(item.url);
          setCurrentIndex(index); // Lưu chỉ số của ảnh được chọn
          setModalVisible(true);
        }}
        style={styles.photoItem}
      >
        <Image
          source={{ uri: item.url }}
          style={styles.photoImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  // Xử lý chuyển sang ảnh trước
  const handlePrePhoto = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedPhoto(photoList2[newIndex].url);
    }
  };

  // Xử lý chuyển sang ảnh tiếp theo
  const handleNextPhoto = () => {
    if (currentIndex < photoList2.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedPhoto(photoList2[newIndex].url);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photoList2}
        renderItem={RenderPhotoItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.photoList}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Nút Previous */}
            {currentIndex > 0 && (
              <TouchableOpacity
                style={styles.preButton}
                onPress={handlePrePhoto}
              >
                <Ionicons name="chevron-back-outline" size={30} color="#fff" />
              </TouchableOpacity>
            )}

            {/* Nút Next */}
            {currentIndex < photoList2.length - 1 && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextPhoto}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: -10,
  },
  photoList: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  photoItem: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginHorizontal: SPACING / 2,
    marginVertical: SPACING / 2,
  },
  photoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
  },
  preButton: {
    position: "absolute",
    top: "50%",
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
  },
});

export default PhotoScreen;
