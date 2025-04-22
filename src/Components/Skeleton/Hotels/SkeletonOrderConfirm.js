import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { MotiView } from "moti";

const SkeletonOrderConfirmScreen = () => {
  const skeletonRooms = [1, 2]; // Giả sử hiển thị 2 phòng skeleton

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Phần đầu: Thông tin khách hàng */}
        <View style={styles.headerSection}>
          <MotiView
            style={styles.skeletonTitle}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <View style={styles.infoSection}>
            {/* Tên */}
            <View style={styles.infoItem}>
              <MotiView
                style={styles.skeletonInfoLabel}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <MotiView
                style={styles.skeletonInfoValueShort}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
            {/* Email */}
            <View style={styles.infoItem}>
              <MotiView
                style={styles.skeletonInfoLabel}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <MotiView
                style={styles.skeletonInfoValueLong}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
            {/* Số điện thoại */}
            <View style={styles.infoItem}>
              <MotiView
                style={styles.skeletonInfoLabel}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <MotiView
                style={styles.skeletonInfoValueMedium}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
          </View>
          <View style={styles.br} />
        </View>

        {/* Phần giữa: Danh sách phòng */}
        <View style={styles.roomsSection}>
          <MotiView
            style={styles.skeletonSubTitle}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {skeletonRooms.map((_, index) => (
              <View key={index} style={styles.roomWrapper}>
                {/* Tên phòng */}
                <View style={styles.roomInfo}>
                  <MotiView
                    style={styles.skeletonRoomLabel}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                  <MotiView
                    style={styles.skeletonRoomValueLong}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                </View>
                {/* Loại phòng */}
                <View style={styles.roomInfo}>
                  <MotiView
                    style={styles.skeletonRoomLabel}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                  <MotiView
                    style={styles.skeletonRoomValueShort}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                </View>
                {/* Số khách */}
                <View style={styles.roomInfo}>
                  <MotiView
                    style={styles.skeletonRoomLabel}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                  <MotiView
                    style={styles.skeletonRoomValueShort}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                </View>
                {/* Giá */}
                <View style={styles.roomInfo}>
                  <MotiView
                    style={styles.skeletonRoomLabel}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                  <MotiView
                    style={styles.skeletonRoomValueMedium}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                </View>
                {/* Dịch vụ */}
                <View style={styles.roomInfo}>
                  <MotiView
                    style={styles.skeletonRoomLabel}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                  <View style={styles.serviceIcons}>
                    <MotiView
                      style={styles.skeletonIcon}
                      from={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "timing",
                        duration: 1000,
                        loop: true,
                      }}
                    />
                  </View>
                </View>
                {/* Điều kiện */}
                <View style={styles.roomInfo}>
                  <MotiView
                    style={styles.skeletonRoomLabel}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                  <MotiView
                    style={styles.skeletonRoomValueShort}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 1000, loop: true }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.br} />
        </View>

        {/* Phần cuối: Mã giảm giá, Phương thức thanh toán, Nút xác nhận */}
        <View style={styles.footerSection}>
          <View style={styles.infoSection}>
            <MotiView
              style={styles.skeletonSubTitle}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={styles.skeletonCoupon}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
          <View style={styles.br} />

          <MotiView
            style={styles.skeletonSubTitle}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <View style={styles.infoSectionLast}>
            {[...Array(2)].map((_, index) => (
              <View key={index} style={styles.paymentOption}>
                <MotiView
                  style={styles.skeletonRadioCircle}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
                <MotiView
                  style={styles.skeletonPaymentText}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
              </View>
            ))}
          </View>

          <MotiView
            style={styles.skeletonButton}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerSection: {
    // Phần đầu cố định
  },
  roomsSection: {
    flex: 1, // Chiếm không gian để ScrollView có thể cuộn
  },
  footerSection: {
    // Phần cuối cố định
  },
  infoSection: {
    marginBottom: 15, // Tăng khoảng cách giữa các mục thông tin
  },
  infoSectionLast: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 15, // Tăng khoảng cách trên dưới
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // Tăng khoảng cách giữa các hàng
  },
  roomWrapper: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingVertical: 25, // Tăng padding trên dưới
  },
  roomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // Tăng khoảng cách giữa các hàng trong phòng
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceIcons: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  br: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginVertical: 10, // Tăng khoảng cách trên dưới của đường phân cách
  },
  // Skeleton styles
  skeletonTitle: {
    width: 180,
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 15,
  },
  skeletonSubTitle: {
    width: 120,
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 10,
    alignSelf: "center",
  },
  skeletonInfoLabel: {
    width: 60,
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonInfoValueShort: {
    width: 80, // Ngắn hơn (Tên: "Tiến Dưỡng")
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonInfoValueMedium: {
    width: 120, // Trung bình (Số điện thoại: "+84 0982474802")
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonInfoValueLong: {
    width: 200, // Dài hơn (Email: "lamtiendung11082002@gmail.com")
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonRoomLabel: {
    width: 70,
    height: 14, // Giảm 2px từ 16
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonRoomValueShort: {
    width: 50, // Ngắn (Số khách: "0 người", Điều kiện: trống)
    height: 14, // Giảm 2px từ 16
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonRoomValueMedium: {
    width: 90, // Trung bình (Giá: "1080000")
    height: 14, // Giảm 2px từ 16
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonRoomValueLong: {
    width: 150, // Dài (Tên phòng: "Phòng Deluxe Gia đình VIP")
    height: 14, // Giảm 2px từ 16
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
    marginLeft: 8,
  },
  skeletonCoupon: {
    width: 60,
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonRadioCircle: {
    width: 20,
    height: 20, // Không thay đổi vì là hình tròn
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
  },
  skeletonPaymentText: {
    width: 70,
    height: 18, // Giảm 2px từ 20
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
  },
  skeletonButton: {
    width: "100%",
    height: 42, // Giảm 2px từ 44
    borderRadius: 14,
    backgroundColor: "#A0A0A0",
    marginTop: 15,
  },
});

export default SkeletonOrderConfirmScreen;
