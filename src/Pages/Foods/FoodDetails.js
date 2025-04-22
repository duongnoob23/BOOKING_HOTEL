import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from "react-native";

import { Ionicons } from "@expo/vector-icons"; // Để hiển thị icon ngôi sao (rating)
import { useEffect } from "react";
const FoodDetails = ({ navigation }) => {
  const handleToOrderFood = () => {
    navigation.navigate("OrderFood");
  };

  const handleToFoodCart = () => {
    navigation.navigate("FoodCart");
  };

  // useEffect(() => {
  //   const actionBack = () => {
  //     navigation.navigate("OrderFood");
  //     return true;
  //   };

  //   const backHanlder = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     actionBack
  //   );

  //   return () => backHanlder.remove();
  // }, []);
  return (
    <View style={styles.container}>
      {/* Hình ảnh món ăn */}
      <ImageBackground
        source={{
          uri: "https://media.istockphoto.com/id/2061716709/fr/photo/burger-de-c%C3%B4tes-grill%C3%A9es.webp?a=1&b=1&s=612x612&w=0&k=20&c=PvlYSm7Q_q7ro2i7tMJ4lnjELvPeBKnWIyzvOObmkEQ=",
        }}
        style={styles.foodImage}
      >
        <Ionicons
          style={styles.iconChevron}
          name="chevron-back-outline"
          size={40}
          color="white"
          onPress={() => handleToOrderFood()}
        />
      </ImageBackground>

      {/* Tiêu đề và đánh giá */}
      <View style={styles.header}>
        <View>
          <Text style={styles.foodName}>Hamburger</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>3.9</Text>
          <Text style={styles.reviewCount}>Đánh giá (200)</Text>
        </View>
      </View>
      {/* Mô tả món ăn */}
      <Text style={styles.description}>
        Một chiếc bánh vòng hạt anh túc được chế biến hoàn hảo, kèm phô mai, mứt
        tây và dưa chua. Sau đó, một lớp thịt được thêm vào, kèm theo một lát cà
        chua, hai nửa lát tây và hai nửa lát pastrami. Hoàn thiện món ăn này chỉ
        mất năm phút và chứa chưa đến 400 calo.
      </Text>
      {/* Giá tiền */}
      <Text style={styles.price}>Giá: 15.000Đ</Text>
      {/* Nút Thêm vào giỏ */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleToFoodCart()}
      >
        <View style={styles.positionButton}>
          <Text style={styles.addButtonText}>THÊM VÀO GIỎ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    // borderRadius: 10,
    // padding: 15,
    // marginVertical: 10,
    // marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // elevation: 3, // Hiệu ứng bóng cho Android
  },
  foodImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    position: "relative",
  },
  iconChevron: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    // paddingVertical: 10,
    paddingHorizontal: 10,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 14,
    color: "#FFD700",
    marginLeft: 5,
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 20,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  addButton: {
    marginTop: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  positionButton: {
    width: "95%",
    backgroundColor: "#00F598", // Màu xanh lam gradient
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
  },
});

export default FoodDetails;
