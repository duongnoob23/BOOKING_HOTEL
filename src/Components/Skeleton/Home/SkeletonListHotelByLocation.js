import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";

const SkeletonListHotelByLocation = () => {
  const skeletonItems = [1, 2, 3]; // Giả sử hiển thị 3 skeleton items cho danh sách khách sạn

  return (
    <View style={styles.container}>
      {/* Skeleton cho Header */}
      <View style={styles.header}>
        <View style={styles.headerNavi}>
          <MotiView
            style={styles.skeletonBackButton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonTitle}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>
        <MotiView
          style={styles.skeletonSubtitle}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
      </View>

      {/* Skeleton cho Thanh tìm kiếm và Bộ lọc */}
      <View style={styles.filterContainer}>
        {/* Thanh tìm kiếm */}
        <View style={styles.searchBar}>
          <MotiView
            style={styles.skeletonSearchIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonSearchInput}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonSearchIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>

        {/* Bộ lọc */}
        <View style={styles.filterButtons}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={styles.filterButton}>
              <MotiView
                style={styles.skeletonFilterText}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <MotiView
                style={styles.skeletonFilterIcon}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Skeleton cho Danh sách khách sạn */}
      <View style={styles.scrollView}>
        {skeletonItems.map((_, index) => (
          <View key={index} style={styles.hotelItem}>
            {/* Hình ảnh */}
            <MotiView
              style={styles.skeletonImage}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />

            {/* Thông tin khách sạn */}
            <View style={styles.hotelDetails}>
              {/* Tên khách sạn */}
              <MotiView
                style={styles.skeletonHotelName}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />

              {/* Đánh giá */}
              <View style={styles.ratingContainer}>
                <MotiView
                  style={styles.skeletonStar}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
                <MotiView
                  style={styles.skeletonRatingText}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
                <MotiView
                  style={styles.skeletonReviewText}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
              </View>

              {/* Mô tả */}
              <MotiView
                style={styles.skeletonDescription}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />

              {/* Khuyến mãi */}
              <MotiView
                style={styles.skeletonPromotion}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />

              {/* Giá và nút "Đặt ngay" */}
              <View style={styles.footer}>
                <MotiView
                  style={styles.skeletonPrice}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
                <MotiView
                  style={styles.skeletonBookButton}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

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
  skeletonBackButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
  },
  skeletonTitle: {
    width: 100,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#A0A0A0",
  },
  skeletonSubtitle: {
    width: 80,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#A0A0A0",
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
    paddingLeft: 10,
    marginBottom: 10,
  },
  skeletonSearchIcon: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
  },
  skeletonSearchInput: {
    flex: 1,
    height: 30,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
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
  skeletonFilterText: {
    width: 50,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
  },
  skeletonFilterIcon: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: "#A0A0A0",
  },
  scrollView: {
    flex: 1,
  },
  hotelItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  skeletonImage: {
    width: "95%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
    alignSelf: "center",
    marginTop: 10,
  },
  hotelDetails: {
    padding: 10,
  },
  skeletonHotelName: {
    width: 150,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  skeletonStar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginRight: 5,
  },
  skeletonRatingText: {
    width: 30,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginRight: 5,
  },
  skeletonReviewText: {
    width: 80,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginLeft: 40,
  },
  skeletonDescription: {
    width: "90%",
    height: 14,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 10,
  },
  skeletonPromotion: {
    width: 100,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skeletonPrice: {
    width: 60,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginLeft: 20,
  },
  skeletonBookButton: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
  },
});

export default SkeletonListHotelByLocation;
