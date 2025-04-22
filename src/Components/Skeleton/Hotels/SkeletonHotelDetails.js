import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { MotiView } from "moti";
import SkeletonPriceScreen from "./SkeletonPriceScreen";

const SkeletonHotelDetails = () => {
  return (
    <View style={styles.container}>
      {/* Skeleton cho phần Header */}
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: "https://dummyimage.com/500x250/CCCED3/CCCED3.png" }} // Placeholder màu trắng nhẹ
          style={styles.header__image}
        >
          {/* Overlay: Nút back, tên khách sạn, nút share */}
          <View style={styles.header__overlay}>
            <MotiView
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#A0A0A0",
                marginRight: 5,
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={{
                width: 80,
                height: 24,
                borderRadius: 4,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <View style={styles.header__icon__start}>
              <MotiView
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "#A0A0A0",
                }}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
          </View>

          {/* Rating và Location */}
          <View style={styles.header__info}>
            <View style={styles.header__rating}>
              <View style={styles.header__rating__group}>
                <MotiView
                  style={{
                    width: 24,
                    height: 24,
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
                    borderRadius: 4,
                    marginLeft: 5,
                    backgroundColor: "#A0A0A0",
                  }}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing", duration: 1000, loop: true }}
                />
              </View>
              <MotiView
                style={{
                  width: 100,
                  height: 14,
                  borderRadius: 4,
                  backgroundColor: "#A0A0A0",
                }}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
            <View style={styles.header__location}>
              <MotiView
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 30,
                  backgroundColor: "#A0A0A0",
                }}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <View style={styles.header__location__text}>
                <MotiView
                  style={{
                    width: 50,
                    height: 24,
                    borderRadius: 4,
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

      {/* Skeleton cho phần Tabs */}
      <View style={styles.header__tabs}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={[styles.header__tab, styles.header__tab__1]}>
            <MotiView
              style={{
                width: 80,
                height: 14,
                borderRadius: 4,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
          <View style={[styles.header__tab]}>
            <MotiView
              style={{
                width: 60,
                height: 14,
                borderRadius: 4,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
          <View style={[styles.header__tab, styles.header__tab__3]}>
            <MotiView
              style={{
                width: 80,
                height: 14,
                borderRadius: 4,
                backgroundColor: "#A0A0A0",
              }}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        </View>
      </View>
      <SkeletonPriceScreen />
    </View>
  );
};

export default SkeletonHotelDetails;

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
    alignItems: "flex-start",
  },
  header__rating__group: {
    flexDirection: "row",
    width: 200,
    alignItems: "center",
    marginBottom: 5,
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
    borderColor: "#CCCED3",
    paddingHorizontal: 15,
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
});
