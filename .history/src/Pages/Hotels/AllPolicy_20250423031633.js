import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const data = [
  {
    condition: null,
    description:
      "Khách hàng cần check in trong thời gian quy định nếu không sẽ bị tính thêm phụ phí",
    id: 1,
    name: "Check in trong thời gian quy định",
    operator: null,
    type: "CHECKIN",
    value: null,
  },
  {
    condition: null,
    description:
      "Khách hàng cần check out trong thời gian quy định nếu không sẽ bị tính thêm phụ phí",
    id: 2,
    name: "Check out trước thời gian quy định",
    operator: null,
    type: "CHECKOUT",
    value: null,
  },
  {
    condition: "12",
    description: "Không hoàn tiền nếu hủy trong vòng 12 giờ trước check-in",
    id: 9,
    name: "Không hoàn tiền",
    operator: "after",
    type: "CANCEL",
    value: "0%",
  },
  {
    condition: "12",
    description: "Trẻ em dưới 12 tuổi được miễn phí tiền phòng",
    id: 4,
    name: "Person an room",
    operator: "before",
    type: "PERSON",
    value: "0",
  },
  {
    condition: "50%",
    description:
      "Khách hàng cần đặt cọc trước 50% tiền phòng và thanh toán đầy đủ khi nhận phòng",
    id: 13,
    name: "Cọc trước 50%",
    operator: "equals",
    type: "PAYMENT",
    value: "50",
  },
];

const AllPolicy = ({ navigation }) => {
  const getIconName = (type) => {
    switch (type) {
      case "CHECKIN":
        return "log-in-outline";
      case "CHECKOUT":
        return "log-out-outline";
      case "CANCEL":
        return "close-circle-outline";
      case "PERSON":
        return "person-outline";
      case "PAYMENT":
        return "card-outline";
      default:
        return "information-circle-outline";
    }
  };

  const PolicyCard = ({ policy }) => {
    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name={getIconName(policy.type)} size={24} color="#007AFF" />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.policyName}>{policy.name}</Text>
          <Text style={styles.policyDescription}>{policy.description}</Text>
          {(policy.condition || policy.value) && (
            <View style={styles.conditionContainer}>
              {policy.condition && (
                <Text style={styles.conditionText}>
                  Điều kiện: {policy.condition}{" "}
                  {policy.operator === "after"
                    ? "sau"
                    : policy.operator === "before"
                    ? "trước"
                    : policy.operator === "equals"
                    ? ""
                    : ""}
                </Text>
              )}
              {policy.value && (
                <Text style={styles.conditionText}>
                  Giá trị: {policy.value}
                  {policy.type === "PAYMENT" ? "%" : ""}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chính Sách Khách Sạn</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {data.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: "#00F598",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#E6F7F2",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#00F598",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  policyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191D39",
    marginBottom: 5,
  },
  policyDescription: {
    fontSize: 14,
    color: "#424242",
    flexShrink: 1,
    marginBottom: 5,
  },
  conditionContainer: {
    marginTop: 5,
  },
  conditionText: {
    fontSize: 12,
    color: "#007AFF",
    fontStyle: "italic",
  },
});

export default AllPolicy;
