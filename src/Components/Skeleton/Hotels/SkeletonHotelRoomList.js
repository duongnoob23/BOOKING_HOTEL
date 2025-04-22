import React from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { MotiView } from "moti";

const SkeletonHotelRoomList = () => {
  const RoomItemSkeleton = () => (
    <View style={styles.card}>
      {/* Hình ảnh phòng */}
      <MotiView
        style={styles.roomImage}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 1000, loop: true }}
      />
      {/* Tiêu đề và số lượng phòng */}
      <View style={styles.header}>
        <MotiView
          style={{
            width: 150,
            height: 15,
            borderRadius: 8,
            backgroundColor: "#A0A0A0",
            marginBottom: 5,
          }}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
        <MotiView
          style={{
            width: 80,
            height: 15,
            borderRadius: 8,
            backgroundColor: "#A0A0A0",
            marginBottom: 5,
          }}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
      </View>
      {/* Thông tin cơ bản */}
      <View style={styles.info}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.infoItem}>
            <MotiView
              style={{
                width: 15,
                height: 15,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={{
                width: 100,
                height: 15,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
                marginLeft: 5,
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        ))}
      </View>
      {/* Dịch vụ */}
      <View style={styles.services}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.serviceItem}>
            <MotiView
              style={{
                width: 15,
                height: 15,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={{
                width: 80,
                height: 15,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
                marginLeft: 4,
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        ))}
      </View>
      {/* Chính sách */}
      <View style={styles.policies}>
        {[...Array(2)].map((_, index) => (
          <View key={index} style={styles.policyItem}>
            <MotiView
              style={{
                width: 15,
                height: 15,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={{
                width: 200,
                height: 15,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
                marginLeft: 5,
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        ))}
      </View>
      {/* Khuyến mãi */}
      <View style={styles.promotion}>
        <View style={styles.promotionView}>
          <MotiView
            style={{
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: "#A0A0A0",
            }}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={{
              width: 120,
              height: 15,
              borderRadius: 8,
              backgroundColor: "#A0A0A0",
              marginLeft: 5,
            }}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>
      </View>
      <View style={styles.br}></View>
      {/* Giá */}
      <View style={styles.priceContainer}>
        <View style={styles.priceWrapper}>
          <MotiView
            style={styles.discountBadge}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <View style={styles.discountedPriceView}>
            <MotiView
              style={{
                width: 100,
                height: 20,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={{
                width: 80,
                height: 20,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
                marginLeft: 8,
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        </View>
      </View>
      {/* Nút Chọn */}
      <MotiView
        style={styles.selectButton}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 1000, loop: true }}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {/* Skeleton cho phần Header */}
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: "https://dummyimage.com/500x250/CCCED3/CCCED3.png" }}
          style={styles.header__image}
        >
          <View style={styles.header__overlay}>
            <MotiView
              style={{
                width: 20,
                height: 20,
                borderRadius: 12,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={{
                width: 100,
                height: 20,
                borderRadius: 8,
                backgroundColor: "#A0A0A0",
                marginLeft: 10,
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <View style={styles.header__icon__start}>
              <MotiView
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 12,
                  backgroundColor: "#A0A0A0",
                  marginRight: 10,
                }}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
          </View>
          <View style={styles.header__info}>
            <View style={styles.header__rating}>
              <View style={styles.header__rating__group}>
                <MotiView
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 12,
                    backgroundColor: "#A0A0A0",
                  }}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
                <MotiView
                  style={{
                    width: 40,
                    height: 20,
                    borderRadius: 8,
                    backgroundColor: "#A0A0A0",
                    marginLeft: 5,
                  }}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
              </View>
              <MotiView
                style={{
                  width: 150,
                  height: 20,
                  borderRadius: 8,
                  backgroundColor: "#A0A0A0",
                  marginTop: 5,
                }}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
            <View style={styles.header__location}>
              <MotiView
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 12,
                  backgroundColor: "#A0A0A0",
                }}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <View style={styles.header__location__text}>
                <MotiView
                  style={{
                    width: 40,
                    height: 20,
                    borderRadius: 8,
                    backgroundColor: "#A0A0A0",
                  }}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* Skeleton cho danh sách phòng */}
      {[...Array(1)].map((_, index) => (
        <RoomItemSkeleton key={index} />
      ))}
    </ScrollView>
  );
};

export default SkeletonHotelRoomList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 0,
    backgroundColor: "#E0E0E0",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  roomImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#A0A0A0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  info: {
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 2,
  },
  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  policies: {
    marginBottom: 8,
  },
  policyItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 2,
  },
  promotion: {
    marginBottom: 8,
    backgroundColor: "#E0E0E0",
    alignSelf: "flex-start",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  promotionView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  br: {
    marginTop: 5,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  priceContainer: {
    marginBottom: 8,
  },
  priceWrapper: {},
  discountedPriceView: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 5,
  },
  discountBadge: {
    backgroundColor: "#A0A0A0",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  selectButton: {
    backgroundColor: "#A0A0A0",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 30,
  },
  header__icon__start: {
    marginLeft: "auto",
  },
  header__info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "flex-end",
  },
  header__rating: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  header__rating__group: {
    flexDirection: "row",
    width: 200,
    alignItems: "center",
  },
  header__location: {
    fontSize: 14,
    color: "white",
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header__location__text: {
    marginLeft: 5,
  },
});
