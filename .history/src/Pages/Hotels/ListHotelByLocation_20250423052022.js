import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome"; // Sử dụng FontAwesome cho biểu tượng
import Ionicons from "react-native-vector-icons/Ionicons";
import SkeletonListHotelByLocation from "../../Components/Skeleton/Home/SkeletonListHotelByLocation";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import ModalAmenity from "../../Components/Modal/Home/ModalAmenity";
import ModalSort from "../../Components/Modal/Home/ModalSort";
import {
  fetchHotelById,
  fetchHotelByLocation,
  fetchHotelList,
} from "../../Redux/Slice/hotelSlice";
import ModalFilter from "../../Components/Modal/Home/ModalFilter";
const ListHotelByLocation = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const {
    hotelList,
    locationList,
    hotelDetail,
    hotelByLocation,
    loading,
    loadingListHotel,
    error,
    inforFilter,
  } = useAppSelector((state) => state.hotel);

  const modalDefault = {
    Amenity: false,
    FilterBy: false,
    SortBy: false,
  };

  console.log(hotelByLocation);
  const [modalVisible, setModalVisible] = useState({
    modalDefault,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotelList());
    dispatch(fetchHotelByLocation(inforFilter));
  }, [
    inforFilter.amenityIds,
    inforFilter.sortById,
    inforFilter.serviceIds,
    dispatch,
  ]);

  // console.log(">>> 51 listByHotel", hotelByLocation);

  if (loadingListHotel) {
    return <SkeletonListHotelByLocation />;
  }

  //   console.log(">>> 123 ListLocationi", hotelByLocation);

  const handleToHotelDetails = (item) => {
    const id = item?.hotelId;
    dispatch(fetchHotelById(id));
    navigation.navigate("HotelDetails", { item });
    // console.log(item?.hotelId);
  };

  const test = [
    {
      hotelId: 10,
      hotelLocation: "Hà Nội",
      hotelName: "Old Quarter Inn",
      hotelRating: 4.3,
      imageUrl: null,
      price: 875000,
      promotionName: "Ưu đãi đầu năm 2025",
      sumReview: 300,
    },
    {
      hotelId: 2,
      hotelLocation: "Hà Nội",
      hotelName: "Onomo",
      hotelRating: 4.3,
      imageUrl:
        "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729241122/Room/nipyn0qgyoyhtgkadlyi.jpg",
      price: 950000,
      promotionName: "Ưu đãi đầu năm 2025",
      sumReview: 150,
    },
    {
      hotelId: 11,
      hotelLocation: "Hà Nội",
      hotelName: "Lotus Blossom Resort",
      hotelRating: 4.1,
      imageUrl: null,
      price: 1000000,
      promotionName: null,
      sumReview: 250,
    },
    {
      hotelId: 13,
      hotelLocation: "Hà Nội",
      hotelName: "Tràng An Plaza",
      hotelRating: 4.4,
      imageUrl: null,
      price: 1125000,
      promotionName: "Giảm giá mùa hè",
      sumReview: 320,
    },
    {
      hotelId: 12,
      hotelLocation: "Hà Nội",
      hotelName: "Skyline Hotel",
      hotelRating: 4.6,
      imageUrl: null,
      price: 1250000,
      promotionName: "Ưu đãi cuối tuần",
      sumReview: 380,
    },
  ];
  const HotelItem1 = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.hotelItem1}
        onPress={() => handleToHotelDetails(item)}
      >
        {/* Hình ảnh khách sạn */}
        <View style={styles.image1}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.hotelImage1}
            resizeMode="cover"
          />
        </View>

        {/* Thông tin khách sạn */}
        <View style={styles.hotelDetails1}>
          {/* Tên khách sạn và đánh giá */}
          <View style={styles.hotelHeader1}>
            <Text style={styles.hotelName1}>{item.hotelName}</Text>
            <View style={styles.ratingContainer1}>
              <Icon
                name="star"
                size={16}
                color="#EBA731"
                style={styles.starIcon1}
              />
              <Text style={styles.ratingText1}>{item.hotelRating}</Text>
              <Text style={styles.reviewText1}>
                Đánh giá ({item.sumReview})
              </Text>
            </View>
          </View>

          {/* Mô tả */}
          <Text style={styles.description1}>
            Nằm trong khu vực khách quan...
          </Text>
          {item.promotionName && (
            <View style={styles.promotion1}>
              <Text style={styles.promotionText1}>{item.promotionName}</Text>
            </View>
          )}
          {/* Khuyến mãi và giá */}
          <View style={styles.footer1}>
            <Text style={styles.price1}>${item.price}</Text>
            <TouchableOpacity style={styles.bookButton1}>
              <Text style={styles.bookButtonText1}>Đặt ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const HotelItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.hotelItem}
        onPress={() => handleToHotelDetails(item)}
      >
        {/* Container chính với flexDirection: row */}
        <View style={styles.hotelContainer}>
          {/* Phần ảnh bên trái */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.hotelImageMain}
              resizeMode="cover"
            />
            <View style={styles.imageRow}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.hotelImageSmall1}
                resizeMode="cover"
              />
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.hotelImageSmall}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Phần thông tin bên phải */}
          <View style={styles.hotelDetails}>
            {/* Tên khách sạn */}
            <Text style={styles.hotelName}>{item?.hotelName}</Text>

            {/* Mô tả */}
            <Text style={styles.description}>
              Nằm trong khu vực khách quan...
            </Text>

            {/* Đánh giá và số nhận xét */}
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingText}>{item?.hotelRating}</Text>
              </View>
              <View style={styles.ratingBox2}>
                <Text style={styles.reviewCount}>
                  {item?.sumReview} nhận xét
                </Text>
              </View>
            </View>

            {/* Khuyến mãi */}
            {item.promotionName && (
              <View style={styles.promotion}>
                <Text style={styles.promotionText}>{item?.promotionName}</Text>
              </View>
            )}

            {/* Giá và nút đặt ngay */}
            <View style={styles.footer}>
              <View style={styles.priceContainer}>
                <View>
                  <Text style={styles.oldPrice}>
                    {/* {Math.round(item.price * 2).toLocaleString()} đ */}
                    {item?.price?.toLocaleString()} đ
                  </Text>
                </View>
                <View>
                  <Text style={styles.price}>
                    {item?.price?.toLocaleString()} đ
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.bookView}>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleToHotelDetails(item)}
              >
                <Text style={styles.bookButtonText}>Đặt ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  console.log(modalVisible);
  return (
    <SafeAreaView style={styles.container}>
      {/* Tiêu đề và số lượng khách sạn */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerNavi}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color="black"
            style={[styles.searchIcon]}
          />
          <Text style={styles.title}>Khách sạn</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>{hotelByLocation?.length} khách sạn</Text>
      </View>

      {/* Thanh tìm kiếm và bộ lọc */}
      <View style={styles.filterContainer}>
        {/* Thanh tìm kiếm */}
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={20}
              color="#0090FF"
              style={[styles.searchIcon]}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.searchText}
            placeholder="Tìm kiếm"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity>
            <Ionicons
              name="close-outline"
              size={20}
              color="black"
              style={[styles.searchIcon]}
            />
          </TouchableOpacity>
        </View>

        {/* Bộ lọc */}
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() =>
              setModalVisible({
                ...modalDefault,
                Amenity: !modalVisible.Amenity,
              })
            }
          >
            <Text style={styles.filterButtonText}>Tiện nghi</Text>
            <Icon name="angle-down" size={25} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() =>
              setModalVisible({
                ...modalDefault,
                FilterBy: !modalVisible.FilterBy,
              })
            }
          >
            <Text style={styles.filterButtonText}>Bộ lọc</Text>
            <Icon name="angle-down" size={25} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() =>
              setModalVisible({
                ...modalDefault,
                SortBy: !modalVisible.SortBy,
              })
            }
          >
            <Text style={styles.filterButtonText}>Sắp xếp</Text>
            <Icon name="angle-down" size={25} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách khách sạn */}
      {/* ) : modalVisible.FilterBy ? (
        <ModalFilter
          onClose={() => setModalVisible({ ...modalVisible, FilterBy: false })}
          onApply={handleApplyFilter} // Giả sử bạn có hàm này
        /> */}
      {modalVisible.Amenity ? (
        <ModalAmenity
          onClose={() => setModalVisible({ ...modalVisible, Amenity: false })}
        />
      ) : modalVisible.SortBy ? (
        <ModalSort
          onClose={() => setModalVisible({ ...modalVisible, SortBy: false })}
        />
      ) : modalVisible.FilterBy ? (
        <ModalFilter
          onClose={() => setModalVisible({ ...modalVisible, FilterBy: false })}
        />
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* {hotelByLocation &&
            hotelByLocation?.map((item, index) => (
              <HotelItem1 key={index} item={item} />
            ))} */}
          {hotelByLocation &&
            hotelByLocation?.map((item, index) => (
              <HotelItem key={index} item={item} />
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ListHotelByLocation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerNavi: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginTop: 5,
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    //     padding: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
    fontWeight: "800",
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: "#666666",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  hotelItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 3, // Bóng cho Android
    shadowColor: "#000", // Bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 280,
    padding: 5,
  },
  hotelContainer: {
    flexDirection: "row", // Ảnh bên trái, thông tin bên phải
    // padding: 10,
  },
  imageContainer: {
    width: "35%", // Ảnh chiếm 40% chiều rộng
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  hotelImageMain: {
    width: "100%",
    height: "65%", // Chiều cao ảnh lớn
    // borderRadius: 5,
    borderTopLeftRadius: 12,
    marginBottom: 5,
  },
  imageRow: {
    height: "33%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hotelImageSmall1: {
    width: "48%", // Chiếm 48% để có khoảng cách giữa 2 ảnh
    borderBottomLeftRadius: 12,
    // borderRadius: 12,
  },
  hotelImageSmall: {
    width: "48%", // Chiếm 48% để có khoảng cách giữa 2 ảnh
  },
  hotelDetails: {
    flex: 1, // Thông tin chiếm phần còn lại
    justifyContent: "flex-start",
    padding: 10,
    paddingLeft: 0,
    flexDirection: "column",
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#191E38",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#2B2F38",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingBox: {
    backgroundColor: "#24784E", // Màu xanh giống trong hình
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 5,
  },
  ratingBox2: {
    flexDirection: "column",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF", // Chữ trắng trong ô xanh
  },
  reviewText: {
    fontSize: 14,
    color: "#191E38", // Màu xanh giống "Ngoại hạng"
    marginRight: 5,
    fontWeight: "bold",
  },
  reviewCount: {
    fontSize: 14,
    color: "#2B2F38",
  },
  promotion: {
    backgroundColor: "#FEDB39", // Màu cam giống trong hình
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
    marignRight: 10,
  },
  promotionText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  footer: {
    // flexDirection: "row",
    // alignItems: "flex-end",
    // justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  oldPrice: {
    fontSize: 12,
    color: "#666666",
    textDecorationLine: "line-through", // Gạch ngang giá cũ
    marginBottom: 2,
  },
  price: {
    fontSize: 24,
    fontWeight: "900",
    color: "#2A2317", // Màu cam giống trong hình
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 10,
    color: "#666666",
  },
  bookView: {
    marginTop: "auto",
    width: "80%",
    marginHorizontal: "auto",
    textAlign: "center",
  },
  bookButton: {
    backgroundColor: "#24784E", // Màu xanh của nút "Đặt ngay"
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  bookButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },

  //-------------------------------------------
  hotelItem1: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 3, // Bóng cho Android
    shadowColor: "#000", // Bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image1: {
    width: "100%",
    height: "200",
    justifyContent: "center",
    alignItems: "center",
  },
  hotelImage1: {
    width: "95%",
    height: "90%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
  },
  hotelDetails1: {
    padding: 10,
  },
  hotelHeader1: {
    marginBottom: 5,
  },
  hotelName1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  ratingContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  starIcon1: {
    marginRight: 5,
  },
  ratingText1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 5,
  },
  reviewText1: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 40,
  },
  description1: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  footer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promotion1: {
    backgroundColor: "#F8D146",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  promotionText1: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  price1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 20,
  },
  bookButton1: {
    backgroundColor: "#00F598", // Màu xanh theo yêu cầu
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  bookButtonText1: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "400",
  },
});
