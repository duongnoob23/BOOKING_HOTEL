import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Để hiển thị icon ngôi sao (rating)
const RateReviews = ({ navigation }) => {
  const handleToRateDetails = () => {
    // navigation.navigate("RateDetails");
    navigation.navigate("SuccessPayment");
    console.log(">>>");
  };
  const ratingsData = [
    {
      id: "1",
      name: "Duy",
      time: "20 mins ago",
      content: "Khách sạn đẹp, đồ ăn tuyệt vời",
      score: 4.5,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80",
    },
    {
      id: "2",
      name: "Hương",
      time: "2 days ago",
      content: "Không thể quên được. Rất thích nơi này!",
      score: 5,
      image:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Quân",
      time: "2 days ago",
      content: "Đẹp, thích vui",
      score: 4.5,
      image: "",
    },
  ];

  return (
    <View style={styles.ratings}>
      {/* <View style={styles.ratings__header}>
        <TouchableOpacity onPress={() => handleTo()}>
          <Ionicons
            style={styles.iconBed}
            name="chevron-back-outline"
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.ratings__headerTitle}>Đánh giá</Text>
      </View>

      <View style={styles.ratings__search}>
        <Ionicons
          style={styles.iconBed}
          name="search"
          size={15}
          color="#0D94F6"
          backgroundColor="white"
          marginLeft="10"
        />
        <TextInput
          style={styles.ratings__search__Input}
          placeholder="Tìm đánh giá"
          placeholderTextColor="#666666"
        />
        <Ionicons
          style={styles.iconBed}
          name="close"
          size={15}
          color="black"
          backgroundColor="white"
          marginRight="10"
        />
      </View> */}

      {/* Nút viết đánh giá */}
      <TouchableOpacity style={styles.ratings__writeButton}>
        <Text style={[styles.ratings__writeButtonText, { color: "black" }]}>
          Tóm tắt đánh giá{" "}
        </Text>
        <Text style={styles.ratings__writeButtonText}> + VIẾT ĐÁNH GIÁ</Text>
      </TouchableOpacity>

      {/* Thống kê đánh giá */}
      <View style={styles.ratings__stats}>
        <View style={styles.ratings__statsBars}>
          <View style={styles.ratings__statsBar}>
            <View style={[styles.ratings__statsBarFill, { width: "30%" }]} />
          </View>
          <View style={styles.ratings__statsBar}>
            <View style={[styles.ratings__statsBarFill, { width: "40%" }]} />
          </View>
          <View style={styles.ratings__statsBar}>
            <View style={[styles.ratings__statsBarFill, { width: "20%" }]} />
          </View>
          <View style={styles.ratings__statsBar}>
            <View style={[styles.ratings__statsBarFill, { width: "7%" }]} />
          </View>
          <View style={styles.ratings__statsBar}>
            <View style={[styles.ratings__statsBarFill, { width: "1%" }]} />
          </View>
        </View>
      </View>
      <View style={styles.ratings__option}>
        <View style={styles.ratings__optionList}>
          <View style={styles.ratings__optionItem}>
            <Text style={styles.ratings__label}>Phòng </Text>
            <Text style={styles.ratings__text}>4.5</Text>
          </View>
          <View style={styles.ratings__optionItem}>
            <Text style={styles.ratings__label}>Địa điểm </Text>
            <Text style={styles.ratings__text}>4.8</Text>
          </View>
          <View style={styles.ratings__optionItem}>
            <Text style={styles.ratings__label}>Dịch vụ</Text>
            <Text style={styles.ratings__text}>4.4</Text>
          </View>
        </View>
      </View>

      <View style={styles.ratings__statsScore}>
        <Text style={styles.ratings__statsScoreValue}>4.4</Text>
        <View style={styles.ratings__statsScoreLabel}>
          <Text>Rất tốt</Text>
          <View style={styles.start}>
            <Ionicons
              style={styles.iconBed}
              name="star"
              size={15}
              color="orange"
            />
            <Ionicons
              style={styles.iconBed}
              name="star"
              size={15}
              color="orange"
            />
            <Ionicons
              style={styles.iconBed}
              name="star"
              size={15}
              color="orange"
            />
            <Ionicons
              style={styles.iconBed}
              name="star"
              size={15}
              color="orange"
            />
            <Ionicons
              style={styles.iconBed}
              name="star-half"
              size={15}
              color="orange"
            />
          </View>
        </View>
      </View>
      {/* Danh sách đánh giá */}
      {ratingsData.map((item) => (
        <TouchableOpacity key={item.id} style={styles.ratings__item}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
            }}
            style={styles.ratings__itemAvatar}
          />
          <View style={styles.ratings__itemContent}>
            <View style={styles.ratings__itemHeader}>
              <Text style={styles.ratings__itemName}>{item.name}</Text>
              <Text style={styles.ratings__itemScore}>{item.score}</Text>
            </View>
            <Text style={styles.ratings__itemTime}>{item.time}</Text>
            <Text style={styles.ratings__itemText}>{item.content}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RateReviews;
const styles = StyleSheet.create({
  ratings: {
    flex: 1,
    // backgroundColor: "#F5F5F5",
    backgroundColor: "white",
    paddingHorizontal: 20,
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
    //     marginBottom: 10,
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
    marginBottom: 20,
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
    //     justifyContent: "space-around",
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
    textAlign: "center",
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
});
