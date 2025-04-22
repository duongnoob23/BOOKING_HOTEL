import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const rewards = [
  { id: "1", title: "Giảm 15% cho mọi đặt phòng", points: 1000 },
  { id: "2", title: "Giảm 15% cho mọi đặt phòng", points: 1000 },
];

const Points = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Điểm: 2300</Text>
        <TouchableOpacity onPress={() => navigation.navigate("PointsHistory")}>
          <Text style={styles.historyText}>Lịch sử</Text>
        </TouchableOpacity>
      </View>
      {/* Danh sách voucher */}
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rewardItem}>
            <View style={styles.rewardItemGroup}>
              <Icon name="ticket-percent-outline" size={60} color="#007BFF" />
            </View>
            <View style={styles.rewardItemGroup}>
              <Text style={styles.rewardTitle}>{item.title}</Text>
            </View>
            <View style={styles.rewardItemGroup}>
              <Text style={styles.rewardPoints}>{item.points} điểm</Text>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  historyText: {
    fontSize: 20,
    color: "#007BFF",
    fontWeight: "bold",
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  rewardItemGroup: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  rewardTextContainer: {
    marginLeft: 10,
  },
  rewardTitle: {
    fontSize: 16,
  },
  rewardPoints: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Points;
