import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiscountHistoryUse from "./DiscountHistoryUse";
import DiscountHistoryExpired from "./DiscountHistoryExpired";

const DiscountHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("expired");
  const Tab = createMaterialTopTabNavigator();

  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.header__tabs}>
        <TouchableOpacity
          style={[
            styles.header__tab,
            styles.header__tab__1,
            // css === 1 && styles.active,
            state.index === 0 && styles.active,
          ]}
          onPress={() => {
            // setCss(1);
            navigation.navigate("DiscountHistoryExpired");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              // css === 1 && styles.activeText,
              state.index === 0 && styles.activeText,
            ]}
          >
            Hết hạn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header__tab,
            styles.header__tab__3,
            // css === 2 && styles.active,
            state.index === 1 && styles.active,
          ]}
          onPress={() => {
            // setCss(2);
            navigation.navigate("DiscountHistoryUse");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              // css === 2 && styles.activeText,
              state.index === 1 && styles.activeText,
            ]}
          >
            Đã dùng
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.discountHistory}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="DiscountHistoryExpired"
      >
        <Tab.Screen
          name="DiscountHistoryExpired"
          component={DiscountHistoryExpired}
          options={{ tabBarLabel: "Bảng giá (106)" }}
        />
        <Tab.Screen
          name="DiscountHistoryUse"
          component={DiscountHistoryUse}
          options={{ tabBarLabel: "Ảnh (10)" }}
        />
      </Tab.Navigator>
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
  header__tabs: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  header__tab: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#0090FF",
    paddingHorizontal: 50,
  },
  header__tab__1: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },

  header__tab__3: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  header__tab__text: {
    fontSize: 14,
    color: "#007AFF",
  },
  active: {
    backgroundColor: "#0090FF",
  },
  activeText: {
    color: "white",
  },
});

export default DiscountHistory;
