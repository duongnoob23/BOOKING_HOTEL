import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DiscountHistoryExpired = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("expired");

  const historyItems = [
    {
      id: "1",
      title: "Giảm 20% cho các đặt phòng trên 1500K",
      code: "Mã: STAY20",
      expiry: "Hạn sử dụng: 15/03/2025",
    },
    {
      id: "2",
      title: "Giảm 20% cho các đặt phòng trên 1500K",
      code: "Mã: STAY20",
      expiry: "Hạn sử dụng: 15/03/2025",
    },
  ];

  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);
  return (
    <View style={styles.discountHistory}>
      {/* Danh sách mã giảm giá */}
      {historyItems.map((item) => (
        <View key={item.id} style={styles.discountHistory__item}>
          <Ionicons
            name="gift-outline"
            size={45}
            color="#888888"
            style={styles.discountHistory__itemIcon}
          />
          <View style={styles.discountHistory__itemContent}>
            <Text style={styles.discountHistory__itemTitle}>{item.title}</Text>
            <Text style={styles.discountHistory__itemCode}>{item.code}</Text>
            <Text style={styles.discountHistory__itemExpiry}>
              {item.expiry}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  discountHistory: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  discountHistory__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  discountHistory__headerBack: {},
  discountHistory__headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  discountHistory__headerPlaceholder: {
    width: 24, // Để cân bằng với nút back
  },
  discountHistory__tabs: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginBottom: 20,
    padding: 5,
  },
  discountHistory__tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 15,
  },
  discountHistory__tabActive: {
    backgroundColor: "#007BFF",
  },
  discountHistory__tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888888",
  },
  discountHistory__tabTextActive: {
    color: "#FFFFFF",
  },
  discountHistory__item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingVertical: 10,
    borderTopColor: "#d3d3d3",
    borderTopWidth: 1,
  },
  discountHistory__itemIcon: {
    marginRight: 10,
  },
  discountHistory__itemContent: {
    flex: 1,
  },
  discountHistory__itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888888",
    marginBottom: 5,
  },
  discountHistory__itemCode: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 5,
  },
  discountHistory__itemExpiry: {
    fontSize: 12,
    color: "#888888",
  },
});

export default DiscountHistoryExpired;
