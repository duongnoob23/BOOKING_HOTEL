import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../Redux/hook";

const RateApp = ({ navigation, route }) => {
  const username = route?.params?.name || "";
  console.log(route.params);
  const { reviewDetailsData, loadingReviewDetails } = useAppSelector(
    (state) => state.hotel
  );
  console.log("reviewDetailsData", reviewDetailsData);

  // State cho đánh giá và nhận xét
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Kiểm tra nếu reviewDetailsData tồn tại và không rỗng
    if (reviewDetailsData) {
      const initRatings = {
        hotel: reviewDetailsData?.hotelPoint || 0,
        room: reviewDetailsData?.roomPoint || 0,
        location: reviewDetailsData?.locationPoint || 0,
        service: reviewDetailsData?.servicePoint || 0,
      };
      setRatings(initRatings);
    }
  }, [reviewDetailsData]);

  console.log("ratings", ratings);

  // Hàm render sao (sửa lỗi: dùng TouchableOpacity thay vì View để có thể nhấn)
  const renderStars = (criterion) => {
    const rating = ratings[criterion];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const stars = [];

    // Thêm sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <TouchableOpacity style={styles.start} key={`full-${i}`}>
          <Ionicons name="star" size={22} color="#FFD700" />
        </TouchableOpacity>
      );
    }

    // Thêm sao rỗng
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <TouchableOpacity style={styles.start} key={`empty-${i}`}>
          <Ionicons name="star-outline" size={22} color="#CCCCCC" />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  const handleTo = () => {
    navigation.goBack();
  };

  if (loadingReviewDetails) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.rateDetail}>
      {/* Header */}
      <View style={styles.rateDetail__header}>
        <TouchableOpacity onPress={handleTo}>
          <Ionicons
            style={styles.iconBed}
            name="chevron-back-outline"
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.rateDetail__headerTitle}>Chi tiết đánh giá</Text>
      </View>
      <View style={styles.rateDetail__criterionTitle}>
        <Text style={styles.rateDetail__headerTitleUser}>
          Bình luận của: {username}
        </Text>
      </View>
      {/* Tiêu chí đánh giá */}
      <View style={styles.rateDetail__criteria}>
        <View style={styles.rateDetail__criterion}>
          <View style={styles.rateDetail__criterionTitle}>
            <Text style={styles.rateDetail__criterionLabel}>
              Đánh giá khách sạn
            </Text>
          </View>
          <View style={styles.rateDetail__stars}>{renderStars("hotel")}</View>
        </View>
        <View style={styles.rateDetail__criterion}>
          <View style={styles.rateDetail__criterionTitle}>
            <Text style={styles.rateDetail__criterionLabel}>
              Đánh giá phòng
            </Text>
          </View>

          <View style={styles.rateDetail__stars}>{renderStars("room")}</View>
        </View>
        <View style={styles.rateDetail__criterion}>
          <View style={styles.rateDetail__criterionTitle}>
            <Text style={styles.rateDetail__criterionLabel}>
              Đánh giá địa điểm
            </Text>
          </View>
          <View style={styles.rateDetail__stars}>
            {renderStars("location")}
          </View>
        </View>
        <View style={styles.rateDetail__criterion}>
          <View style={styles.rateDetail__criterionTitle}>
            <Text style={styles.rateDetail__criterionLabel}>
              Đánh giá dịch vụ
            </Text>
          </View>
          <View style={styles.rateDetail__stars}>{renderStars("service")}</View>
        </View>
      </View>
      {/* Nhận xét */}
      <Text style={styles.rateDetail__commentLabel}>Nhận xét</Text>
      <Text style={styles.rateDetail__commentInput}>
        {reviewDetailsData?.comment || "Chưa có nhận xét"}
      </Text>
      {/* Hình ảnh */}
      <Text style={styles.rateDetail__photosLabel}>Ảnh</Text>
      <View style={styles.rateDetail__photos}>
        {reviewDetailsData?.image?.length > 0 ? (
          reviewDetailsData.image.map((item, index) => (
            <Image
              key={index}
              source={{
                uri: item, // Sử dụng URL từ dữ liệu API
              }}
              style={styles.rateDetail__photo}
            />
          ))
        ) : (
          <Text>Chưa có ảnh</Text>
        )}
      </View>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rateDetail: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
  },
  rateDetail__header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  rateDetail__headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  rateDetail__criteria: {
    marginBottom: 20,
  },
  rateDetail__criterion: {
    flexDirection: "column",
    justifyContent: "space",
    alignItems: "center",
    marginBottom: 5,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  rateDetail__criterionTitle: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  rateDetail__criterionLabel: {
    fontSize: 16,
    color: "#000000",
  },
  rateDetail__stars: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 8,
  },
  rateDetail__commentLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  rateDetail__commentInput: {
    backgroundColor: "#E8ECEF",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "#000000",
    marginBottom: 20,
    minHeight: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rateDetail__photosLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  rateDetail__photos: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rateDetail__photo: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#00F598",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  start: {},
  rateDetail__headerTitleUser: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RateApp;
