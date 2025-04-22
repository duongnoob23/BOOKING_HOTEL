import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PriceScreen from "./PriceScreen";
import PhotoScreen from "./PhotoScreen";
import CheckScreen from "./CheckScreen";
import InfoConfirmScreen from "./InfoConfirmScreen";
import OrderConfirmScreen from "./OrderConfirmScreen";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { API_BASE_URL } from "../../Constant/Constant";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  fetchHotelById,
  fetchHotelRoomList,
  mapOpenClose,
  updateBookingPayload,
  updateHotelDetailId,
} from "../../Redux/Slice/hotelSlice";
import SkeletonHotelDetails from "../../Components/Skeleton/Hotels/SkeletonHotelDetails";
import _ from "lodash";

const HotelDetails = ({ navigation, route }) => {
  const hotelId = route?.params?.item?.hotelId;
  const item = route?.params?.item;

  const [css, setCss] = useState(1);
  const Tab = createMaterialTopTabNavigator();

  const [data, setData] = useState();
  const [openMap, setOpenMap] = useState(true);
  const dispatch = useAppDispatch();
  const { hotelList, hotelDetail, loading, error, inforFilter } =
    useAppSelector((state) => state.hotel);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..", hotelDetail);
  // console.log(">>> 48 HD >>>", hotelDetail?.review?.feedback?.comments);

  useEffect(() => {
    const routeName = navigation.getState()?.routes[0]?.state?.routes[0]?.name;
    if (routeName === "Price") setCss(1);
    else if (routeName === "Photo") setCss(2);
    else if (routeName === "Check") setCss(3);
  }, [navigation]);

  const handleInfoConfirm = () => {
    const inforFilter_ = {
      hotelId: hotelId,
      checkInDate: inforFilter.checkin,
      checkOutDate: inforFilter.checkout,
      roomNumber: inforFilter.roomNumber,
      adults: inforFilter.adults,
      children: inforFilter.children,
    };
    // console.log(inforFilter_);

    const bookingPayload = {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      hotelId: hotelId,
      checkInDate: inforFilter.checkin,
      checkOutDate: inforFilter.checkout,
      couponId: 0,
      roomRequestList: [],
    };

    dispatch(updateBookingPayload(bookingPayload));

    // console.log("id", hotelId);
    dispatch(updateHotelDetailId(hotelId));
    dispatch(fetchHotelRoomList(inforFilter_));

    navigation.navigate("HotelRoomList", { item });
  };

  const handleOrderConfirm = () => {
    setShowInfoConfirm(false);
    setShowOrderConfirm(true);
  };

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
            navigation.navigate("Price");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              // css === 1 && styles.activeText,
              state.index === 0 && styles.activeText,
            ]}
          >
            Bảng giá
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header__tab,
            // css === 2 && styles.active,
            state.index === 1 && styles.active,
          ]}
          onPress={() => {
            // setCss(2);
            navigation.navigate("Photo");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              // css === 2 && styles.activeText,
              state.index === 1 && styles.activeText,
            ]}
          >
            Ảnh
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header__tab,
            styles.header__tab__3,
            // css === 3 && styles.active,
            state.index === 2 && styles.active,
          ]}
          onPress={() => {
            // setCss(3);
            navigation.navigate("Check");
          }}
        >
          <Text
            style={[
              styles.header__tab__text,
              // css === 3 && styles.activeText,
              state.index === 2 && styles.activeText,
            ]}
          >
            Lần check
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleMapLocation = () => {
    dispatch(mapOpenClose(true));
  };

  if (loading) {
    return <SkeletonHotelDetails />;
  }

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ImageBackground
            source={{
              uri: `${item?.imageUrl}`,
            }}
            style={styles.header__image}
          >
            <View style={styles.header__overlay}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.header__title}>{item?.hotelName}</Text>
              {/* <TouchableOpacity style={styles.header__icon__start}>
                <Ionicons name="share-outline" size={24} color="#fff" />
              </TouchableOpacity> */}
            </View>

            <View style={styles.header__info}>
              <View style={styles.header__rating}>
                <View style={styles.header__rating__group}>
                  <View>
                    <Icon
                      style={styles.iconStart}
                      name="star"
                      size={24}
                      color="#EBA731"
                    />
                  </View>
                  <View>
                    <Text style={styles.header__rating__score}>
                      {hotelDetail && hotelDetail?.review.rating}
                    </Text>
                  </View>
                </View>
                <Text style={styles.header__rating__text}>
                  {hotelDetail && hotelDetail?.review?.sumReview} Người đã thích
                </Text>
              </View>
              <TouchableOpacity
                style={styles.header__location}
                onPress={() => handleMapLocation()}
              >
                <View>
                  <Icon name="map-marker" size={16} color="white" />
                </View>
                <View style={styles.header__location__text}>
                  <Text style={{ color: "white" }}>
                    {hotelDetail && hotelDetail?.review?.location}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Tab Navigator với tabBar tùy chỉnh */}

        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          initialRouteName="Price"
        >
          <Tab.Screen
            name="Price"
            component={PriceScreen}
            options={{ tabBarLabel: "Bảng giá" }}
          />
          <Tab.Screen
            name="Photo"
            component={PhotoScreen}
            options={{ tabBarLabel: "Ảnh" }}
          />
          <Tab.Screen
            name="Check"
            component={CheckScreen}
            options={{ tabBarLabel: "Lần check" }}
          />
        </Tab.Navigator>

        <View style={styles.footer__action}>
          <Text style={styles.footer__price}>
            <Text>{hotelDetail && hotelDetail.priceMin}</Text>
            <Text style={styles.footer__price__text}>TB/ĐÊM</Text>
          </Text>
          <TouchableOpacity
            style={styles.footer__button}
            onPress={() => handleInfoConfirm()}
          >
            <Text style={styles.footer__button__text}>ĐẶT NGAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default HotelDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Block: header
  header: {
    backgroundColor: "#fff",
  },
  header__image: {
    width: "100%",
    height: 250,
    justifyContent: "space-between",
  },
  header__overlay: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  header__icon__start: {
    marginLeft: "auto",
  },
  header__title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    padding: 15,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  header__info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "flex-end",
  },
  header__rating: {
    flexDirection: "column",
    alignItems: "flex-star",
  },
  header__rating__group: {
    flexDirection: "row",
    width: 200,
    alignItems: "center",
    // justifyContent: "space-between",
  },
  header__rating__score: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginLeft: 5,
  },
  iconStart: {
    fontSize: 16,
  },
  header__rating__text: {
    fontSize: 14,
    color: "white",
  },
  header__location: {
    fontSize: 14,
    color: "white",
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  header__location__text: {
    marginLeft: 5,
  },
  // E4E6EB
  // CCCED3
  header__tabs: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header__tab: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#0090FF",
    paddingHorizontal: 30,
    // paddingVertical: 15,
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
  // footerfooter: body
  footer: {
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  footer__food: {
    marginBottom: 15,
  },
  footer__food__title: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer__food__text: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer__food__items: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer__food__item: {
    width: 120,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  footer__item__text: {
    textAlign: "center",
    fontWeight: "300",
  },
  footer__food__more: {
    fontSize: 14,
    color: "#007AFF",
  },
  footer__map: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  footer__action: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  footer__price: {
    flexDirection: "column",

    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    width: "50%",
  },
  footer__price__text: {
    fontSize: 16,
    fontWeight: "300",
  },
  footer__button: {
    width: "50%",
    backgroundColor: "#00F598",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  footer__button__text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  skeletonStar: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  skeletonRatingScore: {
    width: 40,
    height: 20,
    marginLeft: 5,
    borderRadius: 4,
  },
  skeletonRatingText: {
    width: 150,
    height: 16,
    marginTop: 5,
    borderRadius: 4,
  },
  skeletonIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  skeletonLocationText: {
    width: 200,
    height: 16,
    marginLeft: 5,
    borderRadius: 4,
  },
  skeletonPrice: {
    width: 100,
    height: 20,
    borderRadius: 4,
  },
});

// const getDetailHotelById = async () => {
//   try {
//     setLoading(true);
//     let response = await fetch(
//       `${API_BASE_URL}/api/hotel/hotel_detail/${hotelId}?checkInDate=2025-04-02&checkOutDate=2025-04-05`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (response.ok) {
//       const result = await response.json();
//       setData(result.data);
//     }
//   } catch (error) {
//     console.error("Error fetching hotel details:", error);
//   } finally {
//     setLoading(false);
//   }
// };
