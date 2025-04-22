import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  navigation,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
// Payment Methods Screen
const OrderPayment = ({ navigation }) => {
  const handleToFoodCart = () => {
    navigation.navigate("FoodCart");
  };
  const handleToSuccessPayment = () => {
    navigation.navigate("SuccessPayment");
  };
  return (
    <View style={styles.paymentMethods}>
      {/* Header */}
      <View style={styles.paymentMethods__header}>
        <TouchableOpacity onPress={() => handleToFoodCart()}>
          <Ionicons
            style={styles.iconBed}
            name="chevron-back-outline"
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.paymentMethods__headerTitle}>
          Phương thức thanh toán
        </Text>
        <TouchableOpacity>
          <Text style={styles.paymentMethods__headerMenu}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách phương thức thanh toán */}
      <View style={styles.paymentMethods__options}>
        <Image
          source={{ uri: "https://via.placeholder.com/50x30" }} // Thay bằng URL logo MTN Mobile Money
          style={styles.paymentMethods__optionLogo}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/50x30" }} // Thay bằng URL logo MoMo
          style={styles.paymentMethods__optionLogo}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/50x30" }} // Thay bằng URL logo VISA
          style={styles.paymentMethods__optionLogo}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/50x30" }} // Thay bằng URL logo Orange Money
          style={styles.paymentMethods__optionLogo}
        />
      </View>

      {/* Thẻ tín dụng */}
      <View style={styles.paymentMethods__card}>
        <Image
          source={{ uri: "https://via.placeholder.com/50x30" }} // Thay bằng URL logo VISA
          style={styles.paymentMethods__cardLogo}
        />
        <View style={styles.paymentMethods__cardDetail}>
          <Text style={styles.paymentMethods__cardLabel}>Card Number</Text>
          <Text style={styles.paymentMethods__cardValue}>
            0085 7789 2236 3685
          </Text>
        </View>
        <View style={styles.paymentMethods__cardDetail}>
          <Text style={styles.paymentMethods__cardLabel}>Card Holder Name</Text>
          <Text style={styles.paymentMethods__cardValue}>John Smith</Text>
        </View>
        <View style={styles.paymentMethods__cardRow}>
          <View style={styles.paymentMethods__cardDetail}>
            <Text style={styles.paymentMethods__cardLabel}>Expiry date</Text>
            <Text style={styles.paymentMethods__cardValue}>06/22</Text>
          </View>
          <View style={styles.paymentMethods__cardDetail}>
            <Text style={styles.paymentMethods__cardLabel}>CVV</Text>
            <Text style={styles.paymentMethods__cardValue}>321</Text>
          </View>
        </View>
      </View>

      {/* Nút Finish Order */}
      <TouchableOpacity
        style={styles.paymentMethods__finishButton}
        onPress={() => handleToSuccessPayment()}
      >
        <Text style={styles.paymentMethods__finishButtonText}>
          Hoàn thành đơn hàng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  paymentMethods: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  paymentMethods__header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
  },
  paymentMethods__headerBack: {
    fontSize: 24,
    color: "#00C4B4",
  },
  paymentMethods__headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  paymentMethods__headerMenu: {
    fontSize: 24,
    color: "#00C4B4",
  },
  paymentMethods__options: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethods__optionLogo: {
    width: 50,
    height: 30,
  },
  paymentMethods__card: {
    backgroundColor: "#00F598",
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Shadow cho Android
    shadowColor: "#000", // Shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  paymentMethods__cardLogo: {
    width: 50,
    height: 30,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  paymentMethods__cardDetail: {
    marginBottom: 10,
    borderBottomColor: "white",
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  paymentMethods__cardLabel: {
    fontSize: 14,
    color: "white",
    lineHeight: 21,
  },
  paymentMethods__cardValue: {
    fontSize: 14,
    color: "white",
    lineHeight: 21,
  },
  paymentMethods__cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethods__finishButton: {
    backgroundColor: "#00F598",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  paymentMethods__finishButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
});

export default OrderPayment;
