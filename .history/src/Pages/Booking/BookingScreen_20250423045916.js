import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Dùng icon từ Expo
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PriceScreen from "../Hotels/PriceScreen";
import { useState } from "react";
import RoomCancelled from "./RoomCancelled";
import RoomBooking from "./RoomBooking";
import RoomBooked from "./RoomBooked";
import RoomCheckedOut from "./RoomCheckedOut";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { fetchBookingStatus } from "../../Redux/Slice/hotelSlice";

const BookingScreen = ({ navigation }) => {
  const { bookingStatus, loadingBookingStatus } = useAppSelector(
    (state) => state.hotel
  );
  const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const Tab = createMaterialTopTabNavigator();
  const [css, setCss] = useState(1);
  const bookings = [
    {
      id: "1",
      image:
        "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
      name: "Heden golf",
      rating: 3.9,
      reviews: 200,
      date: "23 - 7 - 2019",
      discount: "25% OFF",
      price: 127,
    },
  ];

  // Chỉ gọi API khi người dùng đã đăng nhập
  useEffect(() => {
    if (accessToken && isLoggedIn) {
      dispatch(fetchBookingStatus());
    }
    // Thêm sự kiện focus
    const unsubscribe = navigation.addListener("focus", () => {
      if (accessToken && isLoggedIn) {
        dispatch(fetchBookingStatus());
      }
    });
    // Cleanup listener khi component unmount
    return unsubscribe;
  }, [dispatch, accessToken, isLoggedIn, navigation]); // Thêm accessToken và isLoggedIn vào dependency array để gọi lại API nếu trạng thái đăng nhập thay đổi

  // Kiểm tra chưa đăng nhập
  if (!accessToken && !isLoggedIn) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="log-in-outline" size={48} color="#6B7280" />
        <Text style={styles.emptyText}>Đăng nhập để sử dụng tính năng này</Text>
      </View>
    );
  }

  // Kiểm tra dữ liệu đang tải hoặc chưa có
  if (loadingBookingStatus || !bookingStatus) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Đang tải...</Text>
      </View>
    );
  }

  // Phần còn lại giữ nguyên
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.header__tabs}>
        <TouchableOpacity
          style={[
            styles.header__tab,
            styles.header__tab__1,
            state.index === 0 && styles.active,
          ]}
          onPress={() => {
            navigation.navigate("Booked");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              state.index === 0 && styles.activeText,
            ]}
          >
            Đã đặt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.header__tab, state.index === 1 && styles.active]}
          onPress={() => {
            navigation.navigate("Booking");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              state.index === 1 && styles.activeText,
            ]}
          >
            Đang ở
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.header__tab, state.index === 2 && styles.active]}
          onPress={() => {
            navigation.navigate("CheckedOut");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              state.index === 2 && styles.activeText,
            ]}
          >
            Đã trả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header__tab,
            styles.header__tab__3,
            state.index === 3 && styles.active,
          ]}
          onPress={() => {
            navigation.navigate("Cancelled");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              state.index === 3 && styles.activeText,
            ]}
          >
            Đã hủy
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.bookingHistoryScreen}>
      <View style={styles.bookingHistoryScreen__searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#0090FF"
          style={styles.bookingHistoryScreen__searchIcon}
        />
        <TextInput
          style={styles.bookingHistoryScreen__searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Ionicons
            name="close"
            size={20}
            color="#999"
            style={styles.bookingHistoryScreen__clearIcon}
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="Booked"
      >
        <Tab.Screen
          name="Booked"
          component={RoomBooked}
          options={{ tabBarLabel: "Đang đặt " }}
        />
        <Tab.Screen
          name="Booking"
          component={RoomBooking}
          options={{ tabBarLabel: "Đã đặt " }}
        />
        <Tab.Screen
          name="CheckedOut"
          component={RoomCheckedOut}
          options={{ tabBarLabel: "Đã đặt " }}
        />
        <Tab.Screen
          name="Cancelled"
          component={RoomCancelled}
          options={{ tabBarLabel: "Đã hủy " }}
        />
      </Tab.Navigator>
    </View>
  );
};

// Styles giữ nguyên, đã có emptyContainer và emptyText
const styles = StyleSheet.create({
  bookingHistoryScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  bookingHistoryScreen__searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  bookingHistoryScreen__searchIcon: {
    marginRight: 10,
  },
  bookingHistoryScreen__searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
  },
  bookingHistoryScreen__clearIcon: {
    marginLeft: 10,
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
    paddingHorizontal: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default BookingScreen;
