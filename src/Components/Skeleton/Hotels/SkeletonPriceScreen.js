import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { MotiView } from "moti";

const SkeletonPriceScreen = () => {
  return (
    <ScrollView style={styles.body}>
      {/* Skeleton cho phần mô tả khách sạn */}
      <View style={styles.body__section}>
        <MotiView
          style={styles.skeletonTitle}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
        <MotiView
          style={styles.skeletonDescription}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
      </View>

      {/* Skeleton cho phần tiện ích */}
      <View style={styles.body__section1}>
        <MotiView
          style={styles.skeletonSubtitle}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
        <View style={styles.body__facilities}>
          {[...Array(4)].map((_, index) => (
            <View key={index} style={styles.body__facility}>
              <MotiView
                style={styles.skeletonIcon}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
              <MotiView
                style={styles.skeletonFacilityText}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 1000, loop: true }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Skeleton cho phần thông tin nhận/trả phòng */}
      <View style={styles.body__section}>
        <View style={styles.body__info}>
          <MotiView
            style={styles.skeletonSmallIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonInfoText}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>
        <View style={styles.body__info}>
          <MotiView
            style={styles.skeletonSmallIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonInfoText}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>
        <View style={styles.body__info__view}>
          <View style={styles.body__info}>
            <MotiView
              style={styles.skeletonSmallIcon}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={styles.skeletonInfoText}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
          <View style={styles.body__info}>
            <MotiView
              style={styles.skeletonSmallIcon}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={styles.skeletonInfoText}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        </View>
      </View>

      {/* Skeleton cho phần dịch vụ */}
      <View style={styles.body__section2}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.body__service}>
            <MotiView
              style={styles.skeletonSmallIcon}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={styles.skeletonServiceText}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        ))}
      </View>

      {/* Skeleton cho phần phòng còn trống */}
      <View style={styles.body__section3}>
        <MotiView
          style={styles.skeletonSubtitle}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        />
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.body__dropdown}>
            <MotiView
              style={styles.skeletonSmallIcon}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
            <MotiView
              style={styles.skeletonDropdownText}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 1000, loop: true }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Sử dụng styles từ code gốc của bạn và thêm styles cho skeleton
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body__section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  body__section1: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  body__section2: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  body__section3: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  body__title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body__description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  body__subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body__subtitle3: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body__facilities: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  body__facility: {
    width: "24%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  body__facility__text: {
    marginLeft: 10,
    fontSize: 14,
  },
  body__info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  body__info__view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body__info__text: {
    marginLeft: 10,
    fontSize: 14,
  },
  body__service: {
    width: "33%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  body__service__text: {
    marginLeft: 10,
    fontSize: 14,
  },
  body__dropdown: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  body__dropdown__text: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
  icon__chevron_down: {
    marginLeft: 10,
  },
  footer: {
    padding: 20,
  },
  footer__food: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // Styles cho skeleton
  skeletonTitle: {
    width: 150,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 5,
    marginHorizontal: "auto",
  },
  skeletonDescription: {
    width: "100%",
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  skeletonSubtitle: {
    width: 120,
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  skeletonIcon: {
    width: 44,
    height: 44,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonFacilityText: {
    width: 80,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginLeft: 10,
  },
  skeletonSmallIcon: {
    width: 25,
    height: 25,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  skeletonInfoText: {
    width: 120,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginLeft: 10,
  },
  skeletonServiceText: {
    width: 60,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginLeft: 10,
  },
  skeletonDropdownText: {
    width: 150,
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginLeft: 10,
  },
});

export default SkeletonPriceScreen;
