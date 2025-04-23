// src/Pages/HotelDetails/HotelDetails.js
import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  navigation,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome cho
import cloneDeep from "lodash/cloneDeep";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useAppSelector, useAppDispatch } from "../../Redux/hook";
import SkeletonPriceScreen from "../../Components/Skeleton/Hotels/SkeletonPriceScreen";
import RateReviews from "../Reviews/RateReviews";
import MapPriceScreen from "../../Components/Map/MapPriceScreen";
import * as Progress from "react-native-progress";
import ModalCheckIn from "../../Components/Modal/Home/ModalCheckIn";
import ModalCheckOut from "../../Components/Modal/Home/ModalCheckOut";
import ModalGuestsAndRooms from "../../Components/Modal/Home/ModalGuestsAndRooms";
import { getReviewDetails, updateFilter } from "../../Redux/Slice/hotelSlice";

const PriceScreen = ({ navigation, route }) => {
  const {
    hotelList,
    hotelDetail,
    loading,
    error,
    locationList,
    hotelByLocation,
    inforFilter,
  } = useAppSelector((state) => state.hotel);

  const [open, setOpen] = useState({
    Modal_1: true,
    Modal_CheckIn: false,
    Modal_CheckOut: false,
    Modal_GuestsAndRooms: false,
  });

  const handleOrderFood = () => {
    navigation.navigate("OrderFood");
  };

  const handleToFoodDetail = () => {
    navigation.navigate("FoodDetails");
  };
  const dispatch = useAppDispatch();
  const ratingPercentages = [
    {
      star: 5,
      percentage: (hotelDetail && hotelDetail?.review?.feedback?.fiveStar) || 0,
      color: "#007AFF",
    }, // Xanh dương
    {
      star: 4,
      percentage: (hotelDetail && hotelDetail?.review?.feedback?.fourStar) || 0,
      color: "#00C853",
    }, // Xanh lá
    {
      star: 3,
      percentage:
        (hotelDetail && hotelDetail?.review?.feedback?.threeStar) || 0,
      color: "#FFD700",
    }, // Vàng
    {
      star: 2,
      percentage: (hotelDetail && hotelDetail?.review?.feedback?.twoStar) || 0,
      color: "#FF8C00",
    }, // Cam
    {
      star: 1,
      percentage: (hotelDetail && hotelDetail?.review?.feedback?.oneStar) || 0,
      color: "#FF0000",
    }, // Đỏ
  ];

  console.log(">>>>>>>>>>>>>>>>>>>>>>>", hotelDetail);
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons
          key={`full-${i}`}
          style={styles.iconBed}
          name="star"
          size={15}
          color="orange"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Ionicons
          key="half"
          style={styles.iconBed}
          name="star-half"
          size={15}
          color="orange"
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          style={styles.iconBed}
          name="star-outline"
          size={15}
          color="orange"
        />
      );
    }
    return stars;
  };

  const [selectDay, setSelectDay] = useState({
    day: 4,
    month: 4,
    year: 2025,
  });
  const formatToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleOpenModal = (name) => {
    const open_ = cloneDeep(open);
    open_[name] = true;
    setOpen(open_);
  };

  const handleCloseModal = (name) => {
    const open_ = cloneDeep(open);
    open_[name] = false;
    setOpen(open_);
  };

  const handleModalCheck = (name, value) => {
    const open_ = cloneDeep(open);
    open_[name] = value;

    if (name === "Modal_CheckIn" || name === "Modal_CheckOut") {
      const day =
        inforFilter[name === "Modal_CheckIn" ? "checkin" : "checkout"];
      setSelectDay({
        day: +day.split("-")[2],
        month: +day.split("-")[1],
        year: +day.split("-")[0],
      });
    }

    setOpen(open_);
  };

  const handleConfirmDate = (name) => {
    const formattedDate = `${selectDay.year}-${String(selectDay.month).padStart(
      2,
      "0"
    )}-${String(selectDay.day).padStart(2, "0")}`;

    console.log(selectDay);
    if (name === "checkin") {
      const today = new Date();

      const dateToday = formatToYYYYMMDD(today);
      const date1 = new Date(dateToday);
      const date2 = new Date(formattedDate);
      if (date2 < date1) {
        Alert.alert("Ngày CheckIn phải lớn hơn ngày hiện tại");
        return;
      }
    } else {
      const date1 = new Date(inforFilter.checkin);
      const date2 = new Date(formattedDate);
      // console.log(date1, date2);
      if (date2 <= date1) {
        Alert.alert("Ngày CheckOut phải lớn hơn ngày CheckIn");
        return;
      }
    }
    // setInforFilter({
    //   ...inforFilter,
    //   [name]: formattedDate,
    // });
    dispatch(updateFilter({ ...inforFilter, [name]: formattedDate }));
    const nameModal = name === "checkin" ? "Modal_CheckIn" : "Modal_CheckOut";
    handleModalCheck(nameModal, false);
  };

  const handleToRateDetails = (item) => {
    console.log(item.reviewId);
    dispatch(getReviewDetails(item.reviewId));
    navigation.navigate("RateDetails", { name: item.username });
  };

  const ratingsData =
    (hotelDetail && hotelDetail?.review?.feedback?.comments) || [];

  const handleViewAllComments = () => {
    navigation.navigate("AllComments", { comments: ratingsData });
  };
  console.log(">>>>>>>>>>>>>>>", hotelDetail);
  return (
    <ScrollView style={styles.body}>
      {/* Title and description */}
      <View style={styles.body__section}>
        <Text style={styles.body__title}>MÔ TẢ KHÁCH SẠN</Text>
        <Text style={styles.body__description}>
          {hotelDetail && hotelDetail?.review?.description}
          {/* {hotelDetail && hotelDetail.review.} */}
        </Text>
      </View>
      {/* Facilities */}
      <View style={styles.body__section1}>
        <Text style={styles.body__subtitle}>TIỆN ÍCH</Text>
        <View style={styles.body__facilities}>
          <View style={styles.body__facility}>
            <Ionicons name="wifi-outline" size={44} color="#007AFF" />
            <Text style={styles.body__facility__text}>WiFi</Text>
          </View>
          <View style={styles.body__facility}>
            <Ionicons name="barbell-outline" size={44} color="#007AFF" />
            <Text style={styles.body__facility__text}>Phòng Gym</Text>
          </View>
          <View style={styles.body__facility}>
            <Ionicons name="restaurant-outline" size={44} color="#007AFF" />
            <Text style={styles.body__facility__text}>Bữa sáng miễn phí</Text>
          </View>
          <View style={styles.body__facility}>
            <Ionicons name="happy-outline" size={44} color="#007AFF" />
            <Text style={styles.body__facility__text}>Phích hợp trẻ em</Text>
          </View>
        </View>
      </View>
      {/* Check-in/out info */}
      <View style={styles.body__section}>
        <View style={styles.body__info}>
          <Ionicons name="location-outline" size={25} color="#007AFF" />
          <Text style={styles.body__info__text}>
            {hotelDetail && hotelDetail?.review?.location}
          </Text>
        </View>
        <View style={styles.body__info}>
          <Ionicons name="call-outline" size={25} color="#007AFF" />
          <Text style={styles.body__info__text}>
            {hotelDetail && hotelDetail?.review?.phoneNumber}
          </Text>
        </View>
        <View style={styles.body__info__view}>
          <View style={styles.body__info}>
            <Ionicons name="calendar-outline" size={25} color="#007AFF" />
            <Text style={styles.body__info__text}>Nhận phòng: 12:00</Text>
          </View>
          <View style={styles.body__info}>
            <Ionicons name="calendar-outline" size={25} color="#007AFF" />
            <Text style={styles.body__info__text}>Trả phòng: 14:00</Text>
          </View>
        </View>
      </View>
      <View style={styles.body__section2}>
        <View style={styles.body__service}>
          <Ionicons name="fast-food-outline" size={25} color="#007AFF" />
          <Text style={styles.body__service__text}>Bữa tối</Text>
        </View>
        <View style={styles.body__service}>
          <Ionicons name="logo-octocat" size={25} color="#007AFF" />
          <Text style={styles.body__service__text}>Thú cưng</Text>
        </View>
        <View style={styles.body__service}>
          <Ionicons name="business-outline" size={25} color="#007AFF" />
          <Text style={styles.body__service__text}>Phòng vip</Text>
        </View>
        <View style={styles.body__service}>
          <Ionicons name="pizza-outline" size={25} color="#007AFF" />
          <Text style={styles.body__service__text}>Bữa sáng</Text>
        </View>
        <View style={styles.body__service}>
          <Ionicons name="water-outline" size={25} color="#007AFF" />
          <Text style={styles.body__service__text}>Bể bơi</Text>
        </View>
        <View style={styles.body__service}>
          <Ionicons name="diamond-outline" size={25} color="#007AFF" />
          <Text style={styles.body__service__text}>Dịch vụ cao cấp</Text>
        </View>
      </View>
      {/* Room info */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => handleModalCheck("Modal_CheckIn", true)}
      >
        <Ionicons name="calendar-outline" size={25} color="#007AFF" />
        <Text style={styles.inputText}>{inforFilter.checkin}</Text>
        <Icon
          name="angle-down"
          size={20}
          color="#0090FF"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => handleModalCheck("Modal_CheckOut", true)}
      >
        <Ionicons name="calendar-outline" size={25} color="#007AFF" />
        <Text style={styles.inputText}>{inforFilter.checkout}</Text>
        <Icon
          name="angle-down"
          size={20}
          color="#0090FF"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <ModalCheckIn
        visible={open.Modal_CheckIn}
        onClose={handleModalCheck}
        selectDay={selectDay}
        setSelectDay={setSelectDay}
        confirm={handleConfirmDate}
      />
      <ModalCheckOut
        visible={open.Modal_CheckOut}
        onClose={handleModalCheck}
        selectDay={selectDay}
        setSelectDay={setSelectDay}
        confirm={handleConfirmDate}
      />
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => handleModalCheck("Modal_GuestsAndRooms", true)}
      >
        <Ionicons name="business-outline" size={25} color="#007AFF" />
        <Text style={styles.inputText}>
          {inforFilter.adults} Người lớn, {inforFilter.children} Trẻ em,{" "}
          {inforFilter.roomNumber} Phòng
        </Text>
        <Icon
          name="angle-down"
          size={20}
          color="#0090FF"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <ModalGuestsAndRooms
        visible={open.Modal_GuestsAndRooms}
        onClose={handleModalCheck}
      />

      <View style={styles.map}>
        <View style={styles.mapView}>
          <Text style={styles.mapViewTitle}>VỊ TRÍ KHÁCH SẠN</Text>
        </View>
        <MapPriceScreen data={hotelDetail?.review?.ll} />
      </View>
      {/* <RateReviews /> */}
      <View style={styles.ratings}>
        <View style={styles.ratingsTitle}>
          <Text style={styles.ratingsTitleText}>XẾP HẠNG ĐÁNH GIÁ</Text>
        </View>
        <View style={styles.ratings__writeButton}>
          <Text style={[styles.ratings__writeButtonText, { color: "black" }]}>
            Tóm tắt đánh giá
          </Text>
          <Text style={styles.ratings__writeButtonText}> + VIẾT ĐÁNH GIÁ</Text>
        </View>
        <View style={styles.ratings__stats}>
          {ratingPercentages.map((item) => (
            <View key={item.star} style={styles.ratings__stats1}>
              {/* Vòng tròn tiến độ */}
              <Progress.Circle
                size={65}
                progress={+(parseInt(item?.percentage) / 100)}
                thickness={6}
                color={`${item.color}`}
                unfilledColor={"#e0e0e0"}
                borderWidth={0}
                showsText={false} // Tắt văn bản mặc định
              />
              {/* Văn bản và icon tùy chỉnh chồng lên */}
              <View style={styles.overlay}>
                <View style={styles.topRow}>
                  <Text style={styles.scoreText}>{item.star}</Text>
                  <Ionicons
                    style={styles.iconBed}
                    name="star"
                    size={15}
                    color="orange"
                  />
                </View>
                <Text style={styles.percentText}>{item?.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.ratings__option}>
          <View style={styles.ratings__optionList}>
            <View style={styles.ratings__optionItem}>
              <Text style={styles.ratings__label}>Phòng </Text>

              <View style={styles.ratings__text}>
                <Text>
                  {hotelDetail && hotelDetail?.review?.feedback?.ratingRoom}
                </Text>
                <Ionicons
                  style={styles.iconBed}
                  name="star"
                  size={15}
                  color="orange"
                />
              </View>
            </View>
            <View style={styles.ratings__optionItem}>
              <Text style={styles.ratings__label}>Địa điểm </Text>
              <View style={styles.ratings__text}>
                <Text>
                  {hotelDetail && hotelDetail?.review?.feedback?.ratingLocation}
                </Text>
                <Ionicons
                  style={styles.iconBed}
                  name="star"
                  size={15}
                  color="orange"
                />
              </View>
            </View>
            <View style={styles.ratings__optionItem}>
              <Text style={styles.ratings__label}>Dịch vụ</Text>
              <View style={styles.ratings__text}>
                <Text>
                  {hotelDetail && hotelDetail?.review?.feedback?.ratingService}
                </Text>
                <Ionicons
                  style={styles.iconBed}
                  name="star"
                  size={15}
                  color="orange"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ratings__statsScore}>
          <Text style={styles.ratings__statsScoreValue}>
            {hotelDetail && hotelDetail?.review?.feedback?.ratingHotel}
          </Text>
          <View style={styles.ratings__statsScoreLabel}>
            <Text>Rất tốt</Text>
            <View style={styles.start}>
              {renderStars(
                (hotelDetail && hotelDetail?.review?.feedback?.ratingHotel) || 0
              )}
            </View>
          </View>
        </View>

        {/* {ratingsData?.map((item, index) => (
          <TouchableOpacity
            key={item.reviewId}
            style={styles.ratings__item}
            onPress={() => handleToRateDetails(item)}
          >
            <Image
              source={{
               
                uri: `${item.urlAvatar}`,
              }}
              style={styles.ratings__itemAvatar}
            />
            <View style={styles.ratings__itemContent}>
              <View style={styles.ratings__itemHeader}>
                <Text style={styles.ratings__itemName}>{item.username}</Text>
                <Text style={styles.ratings__itemScore}>{item.rating}/5</Text>
              </View>
             
              <Text style={styles.ratings__itemText}>{item.comment}</Text>
            </View>
          </TouchableOpacity>
        ))} */}
        <View style={styles.commentsSection}>
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Nhận xét</Text>
            {ratingsData?.length > 5 && (
              <TouchableOpacity onPress={handleViewAllComments}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            )}
          </View>
          {ratingsData?.length > 0 ? (
            ratingsData.slice(-5).map((item, index) => (
              <TouchableOpacity
                key={item.reviewId}
                style={styles.ratings__item}
                onPress={() => handleToRateDetails(item)}
              >
                <Image
                  source={{ uri: `${item.urlAvatar}` }}
                  style={styles.ratings__itemAvatar}
                />
                <View style={styles.ratings__itemContent}>
                  <View style={styles.ratings__itemHeader}>
                    <Text style={styles.ratings__itemName}>
                      {item.username}
                    </Text>
                    <Text style={styles.ratings__itemScore}>
                      {item.rating}/5
                    </Text>
                  </View>
                  <Text style={styles.ratings__itemText}>{item.comment}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCommentsText}>Chưa có nhận xét nào.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PriceScreen;

const styles = StyleSheet.create({
  // Block: body
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  body__section1: {
    // backgroundColor: "#EFF3F5",
    backgroundColor: "white",
  },
  body__section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  body__title: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "center",
  },
  body__description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    textAlign: "center",
  },
  body__subtitle: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "center",
  },
  body__facilities: {
    flexDirection: "row",
  },
  body__facility: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    marginBottom: 10,
  },
  body__facility__text: {
    fontSize: 12,
    marginLeft: 5,
    color: "#555",
    textAlign: "center",
  },
  body__info__view: {
    flexDirection: "row",
  },
  body__info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginRight: 40,
  },
  body__info__text: {
    fontSize: 14,
    marginLeft: 5,
    color: "#555",
  },
  body__section3: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  body__subtitle3: {
    fontSize: 20,
    fontWeight: 400,
    paddingBottom: 10,
  },
  body__dropdown: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  body__dropdown__text: {
    paddingLeft: 10,
    fontSize: 14,
    color: "black",
  },
  icon__chevron_down: {
    marginLeft: "auto",
  },
  body__section2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#EFF3F5",
    backgroundColor: "white",
  },
  body__service: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    marginVertical: 10,
  },
  body__service__text: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },

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
    flexDirection: "row",
    justifyContent: "space-between",
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
  map: {
    backgroundColor: "white",
    marginVertical: 40,
  },
  mapView: {
    marginLeft: 20,
  },
  mapViewTitle: {
    fontSize: 20,
    fontWeight: 400,
    paddingBottom: 10,
  },
  ratings: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  ratingsTitle: {},
  ratingsTitleText: {
    fontSize: 20,
    fontWeight: 400,
    paddingBottom: 10,
  },
  ratings__header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  ratings__headerBack: {
    fontSize: 24,
    color: "#00C4B4",
    marginRight: 10,
  },
  ratings__headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 10,
  },
  ratings__search: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 15,
  },
  ratings__search__Input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  ratings__writeButton: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratings__writeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0090FF",
  },
  ratings__stats: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  ratings__statsScore: {
    marginRight: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  ratings__statsScoreValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 10,
  },
  ratings__statsScoreLabel: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 20,
  },
  start: {
    flexDirection: "row",
  },
  ratings__statsBars: {
    flex: 1,
  },
  ratings__statsBar: {
    backgroundColor: "#E0E0E0",
    height: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  ratings__statsBarFill: {
    backgroundColor: "#FFC107",
    height: 10,
    borderRadius: 5,
  },
  ratings__option: {
    marginBottom: 20,
  },
  ratings__optionList: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratings__optionItem: {
    width: "33%",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "gray",
    borderRightWidth: 1,
  },
  ratings__text: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ratings__statsLabels: {
    marginLeft: 10,
  },
  ratings__statsLabel: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 5,
  },
  ratings__item: {
    flexDirection: "row",
    marginBottom: 15,
  },
  ratings__itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ratings__itemContent: {
    flex: 1,
  },
  ratings__itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratings__itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  ratings__itemScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  ratings__itemTime: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 5,
  },
  ratings__itemText: {
    fontSize: 14,
    color: "#000000",
  },
  progressCircleContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircle: {
    borderRadius: 999,
    position: "absolute",
  },
  progressCircleFill: {
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  progressCircleTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  progressCircleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  progressCirclePercentage: {
    fontSize: 12,
    color: "#666",
  },

  ratings__stats1: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  icon__chevron_down: {
    marginLeft: 2,
  },
  percentText: {
    fontSize: 12,
    color: "black",
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    position: "relative",
    marginHorizontal: 15,
    padding: 10,
    marginBottom: 10,
    marginTop: 8,
  },
  inputText: {
    flex: 1,
    marginLeft: 15,
    color: "black",
    fontWeight: "400",
    fontSize: 18,
  },

  commentsSection: {
    paddingVertical: 10,
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  noCommentsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
