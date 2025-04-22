import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, navigation } from "react-native";
// Thank You Screen
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
const SuccessPayment = ({ navigation }) => {
  useEffect(() => {
    const timeNavigate = setTimeout(() => {
      navigation.navigate("HotelDetails");
    }, 2500);
    return () => {
      clearTimeout(timeNavigate);
    };
  }, []);
  return (
    <View style={styles.thankYou}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        }} // Thay bằng URL hình nền
        style={styles.thankYou__background}
      />
      <View style={styles.thankYou__overlay}>
        <Ionicons
          style={styles.iconBed}
          name="bed-outline"
          size={150}
          color="white"
        />
        <Text style={styles.thankYou__title}>CẢM ƠN </Text>
        <Text style={styles.thankYou__subtitle1}>BẠN ĐÃ ĐẶT MÓN </Text>
        <Text style={styles.thankYou__subtitle1}>THÀNH CÔNG </Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  thankYou: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thankYou__background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  thankYou__overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 196, 180, 0.5)", // Overlay màu xanh lam nhạt
    width: "100%",
    height: "auto",
  },
  thankYou__item: {
    height: "50%",
  },
  thankYou__icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  thankYou__title: {
    padding: 10,
    marginTop: 20,
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 70,
    marginBottom: 30,
  },

  thankYou__subtitle1: {
    fontSize: 26,
    color: "#FFFFFF",
    lineHeight: 30,
    fontWeight: "bold",
  },
  iconBed: {
    marginBottom: 0,
  },
});

export default SuccessPayment;
