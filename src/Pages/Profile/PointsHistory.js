import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const historyData = {
  received: [
    { id: "1", title: "Nhận 432 điểm từ đơn hàng", date: "14/03/2025" },
    { id: "2", title: "Nhận 200 điểm từ khuyến mãi", date: "10/02/2025" },
  ],
  used: [
    { id: "3", title: "Dùng 1000 điểm cho giảm giá 15%", date: "05/03/2025" },
    { id: "4", title: "Dùng 500 điểm cho giảm giá 10%", date: "01/02/2025" },
  ],
};

const PointsHistory = () => {
  const [selectedTab, setSelectedTab] = useState("received");

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "received" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("received")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "received" && styles.activeTabText,
            ]}
          >
            Đã nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "used" && styles.activeTab]}
          onPress={() => setSelectedTab("used")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "used" && styles.activeTabText,
            ]}
          >
            Đã dùng
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách lịch sử */}
      <FlatList
        data={historyData[selectedTab]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Icon
              name={
                selectedTab === "received"
                  ? "checkbox-marked-circle"
                  : "star-circle-outline"
              }
              size={40}
              color={selectedTab === "received" ? "#4CAF50" : "#FF9800"} // Màu xanh lá cho "Đã nhận", cam cho "Đã dùng"
            />
            <View style={styles.historyTextContainer}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyDate}>Ngày: {item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    padding: 2,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  historyTextContainer: {
    marginLeft: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  historyDate: {
    fontSize: 14,
    color: "#777",
  },
});

export default PointsHistory;
