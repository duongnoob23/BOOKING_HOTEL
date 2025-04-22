import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome cho icons
const HotelRequestList = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.dealItem}
      onPress={() => navigation.navigate("HotelDetails")}
    >
      <View style={styles.dealImage}>
        <Image
          source={{
            uri: `${item.imageUrl}`,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.dealDetails}>
        <Text style={styles.dealName}>{item.hotelName}</Text>
        <View style={styles.dealReviews}>
          <Icon
            style={styles.iconStart}
            name="star"
            size={24}
            color="#EBA731"
          />
          <Text style={styles.dealPoint}>{item.hotelRating} </Text>
          <Text style={styles.dealReviewsText}>
            Đánh giá ({item.sumReview}){" "}
          </Text>
        </View>
        <Text style={styles.dealDesc}>{item.promotionName}</Text>
        <View style={styles.dealFooter}>
          <Text style={styles.dealSale}>Giảm 25%</Text>
          <Text style={styles.dealPrice}> {item.price}</Text>
          <TouchableOpacity>
            <Text style={styles.dealBooking}>Đặt ngay </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelRequestList;

const styles = StyleSheet.create({
  dealItem: {
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 10,
    width: 250,
    backgroundColor: "#EFEFEF",
  },
  dealImage: {
    width: 250,
    height: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 240,
    height: 140,
    borderRadius: 5,
  },
  dealDetails: {
    marginLeft: 8,
    marginRight: 10,
    width: "100%",
  },
  dealName: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    marginBottom: 5,
    color: "black",
  },
  dealReviews: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  iconStart: {
    marginRight: 10,
  },
  dealPoint: {
    color: "red",
    fontWeight: "400",
    marginRight: 10,
    fontSize: 12,
  },

  dealReact: {
    fontSize: 12,
  },
  dealReviewsText: {
    fontSize: 12,
  },
  dealLocation: {
    color: "black",
    marginRight: 12,
  },
  dealLocationName: {
    fontSize: 12,
  },
  dealFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  dealSale: {
    color: "#EBA731",
    fontWeight: "bold",
    fontSize: 14,
  },
  dealPrice: {
    fontWeight: "600",
    fontSize: 14,
  },
  dealDesc: {
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 5,
  },
  dealBooking: {
    fontSize: 14,
    fontWeight: 400,
    borderRadius: 10,
    backgroundColor: "#00F598",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  dealText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 5,
    textAlign: "center",
  },
});
