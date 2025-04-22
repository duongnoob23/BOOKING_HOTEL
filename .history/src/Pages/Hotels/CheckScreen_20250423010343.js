import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppSelector } from "../../Redux/hook";
import MapPriceScreen from "../../Components/Map/MapPriceScreen";
import MapCheckScreen from "../../Components/Map/MapCheckScreen";

const CheckScreen = () => {
  // Dữ liệu giả cho danh sách hoạt động

  const { hotelList, hotelDetail, loading, error } = useAppSelector(
    (state) => state.hotel
  );
  // console.log(">>> 19", hotelDetail?.nearBy?.activityList);

  const activityList = hotelDetail?.nearBy?.activityList?.map(
    (item, index) => ({
      id: index,
      title: item.name,
      description: item.description,
      image:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2940&auto=format&fit=crop",
      rating: item.rating,
      distance: item.distance,
    })
  );
  // console.log(">>> 28 CheckScreen", activityList);

  // Hàm render từng hoạt động
  const renderActivityItem = (item) => (
    <View style={styles.activity} key={item.id}>
      <Image
        source={{ uri: item.image }}
        style={styles.activity__image}
        resizeMode="cover"
      />
      <View style={styles.activity__info}>
        <Text style={styles.activity__title}>{item.title}</Text>
        <Text style={styles.activity__description}>{item.description}</Text>
        <View style={styles.activity__text}>
          <View>
            <Text>Đánh giá {item.reviews}</Text>
          </View>
          <View>
            <Text>Khoảng cách</Text>
          </View>
        </View>
        <View style={styles.activity__icon}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="star" size={18} color="#EBA731" />
            <Text style={styles.activity__ratingText}>{item.rating}</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="car-outline" size={18} color="#EBA731" />
              <Text>{item.distance}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Khối Tổng quan địa điểm */}
      <View style={styles.section}>
        <Text style={styles.section__title}>TỔNG QUAN ĐỊA ĐIỂM</Text>
        <Text style={styles.section__description}>
          Nằm trong khu vườn được thiết kế tinh tế với tầm nhìn ra đầm phá,
          khách sạn cao cấp này nổi bật với nghệ thuật địa phương đương đại và
          những nét chấm phá kiến trúc độc đáo.
        </Text>
      </View>

      {/* Khối Điểm đánh giá vị trí khách sạn */}
      <View style={styles.section}>
        <Text style={styles.section__title}>
          ĐIỂM ĐÁNH GIÁ VỊ TRÍ KHÁCH SẠN
        </Text>
        <View style={styles.rating}>
          <View style={styles.rating__circle}>
            <Text style={styles.rating__score}>
              {hotelDetail && hotelDetail?.nearBy?.ratingLocation}
            </Text>
          </View>
          <Text style={styles.rating__description}>
            {hotelDetail && hotelDetail?.nearBy?.descriptionLocation}
          </Text>
        </View>
        {/* <View style={styles.rating__details}>
          <View style={styles.rating__detailItem}>
            <Ionicons name="walk-outline" size={30} color="#0090FF" />
            <Text style={styles.rating__detailScore}>3.8</Text>
            <Text style={styles.rating__detailText}>
              Tuyệt vời cho các hoạt động gần đó.
            </Text>
          </View>
          <View style={styles.rating__detailItem}>
            <Ionicons name="bus-outline" size={30} color="#0090FF" />
            <Text style={styles.rating__detailScore}>0.0</Text>
            <Text style={styles.rating__detailText}>
              Không có phương tiện giao thông công cộng.
            </Text>
          </View>
          <View style={styles.rating__detailItem}>
            <Ionicons name="airplane-outline" size={30} color="#0090FF" />
            <Text style={styles.rating__detailScore}>2.2</Text>
            <Text style={styles.rating__detailText}>
              Tầm để đi đến chuyến đến sân bay.
            </Text>
          </View>
        </View> */}
        <Text style={styles.rating__note}>
          Điểm số được tính dựa trên dữ liệu từ Google Maps và đánh giá mức độ
          gần của khách sạn với các điểm tham quan, phương tiện giao thông và
          sân bay.
        </Text>
      </View>

      <View style={styles.map}>
        <View style={styles.mapView}>
          <Text style={styles.mapViewTitle}>VỊ TRÍ XUNG QUANH </Text>
        </View>
        <MapCheckScreen />
      </View>

      {/* Khối Hoạt động nên trải nghiệm */}
      <View style={styles.section}>
        <Text style={styles.section__title}>HOẠT ĐỘNG NÊN TRẢI NGHIỆM</Text>
        <ScrollView>
          {activityList?.map((item) => renderActivityItem(item))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  section__title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 10,
    textAlign: "flex-start",
  },
  section__description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rating__circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#00BD6B",
  },
  rating__score: {
    fontSize: 24,
    fontWeight: "400",
    color: "#000",
  },
  rating__description: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  rating__details: {
    marginBottom: 10,
  },
  rating__detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rating__detailScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
    marginRight: 10,
  },
  rating__detailText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  rating__note: {
    fontSize: 14,
    color: "#999",
  },
  activity: {
    flexDirection: "row",
    marginBottom: 15,
  },
  activity__image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  activity__info: {
    flex: 1,
  },
  activity__title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginBottom: 0,
  },
  activity__description: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 10,
  },
  activity__text: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activity__icon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activity__rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  activity__ratingText: {
    fontSize: 12,
    color: "#000",
    marginLeft: 5,
    marginRight: 10,
  },
  activity__distance: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#0090FF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  button__text: {
    fontSize: 14,
    color: "#fff",
  },
});

export default CheckScreen;
//  const activities = [
//    {
//      id: "1",
//      title: "Bà Nà Hills",
//      description:
//        "Trải nghiệm cáp treo, check-in Cầu Vàng và khám phá ngôi làng Pháp.",
//      image:
//        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2940&auto=format&fit=crop",
//      rating: 4.4,
//      reviews: 1649,
//      distance: "6 min",
//    },
//    {
//      id: "2",
//      title: "Bán đảo Sơn Trà",
//      description:
//        "Ngắm cảnh tự nhiên hùng vĩ, chùa Linh Ứng và khám phá thiên nhiên hoang dã.",
//      image:
//        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2940&auto=format&fit=crop",

//      rating: 4.4,
//      reviews: 1649,
//      distance: "27 min",
//    },
//  ];
