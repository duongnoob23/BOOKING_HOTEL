import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { MotiView } from "moti";

const SkeletonInfoConfirm = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Tiêu đề */}
      <MotiView
        style={styles.skeletonTitle}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 1000, loop: true }}
      />

      {/* Các trường nhập liệu */}
      <View style={styles.inputSection}>
        {/* Trường Họ */}
        <View style={styles.inputContainer}>
          <MotiView
            style={styles.skeletonIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonInput}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>

        {/* Trường Tên */}
        <View style={styles.inputContainer}>
          <MotiView
            style={styles.skeletonIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonInput}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>

        {/* Trường Email */}
        <View style={styles.inputContainer}>
          <MotiView
            style={styles.skeletonIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonInput}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>

        {/* Trường Số điện thoại */}
        <View style={styles.inputContainer}>
          <MotiView
            style={styles.skeletonIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonCountry}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />

          <MotiView
            style={styles.skeletonInputPhone}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
          <MotiView
            style={styles.skeletonCheckIcon}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, loop: true }}
          />
        </View>
      </View>

      {/* Nút xác nhận */}
      <MotiView
        style={styles.skeletonButton}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 1000, loop: true }}
      />

      {/* Nút đăng nhập */}
      <MotiView
        style={styles.skeletonLoginButton}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 1000, loop: true }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputSection: {
    // flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
  },
  // Skeleton styles
  skeletonTitle: {
    width: 200,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginTop: 30,
    marginBottom: 50,
    alignSelf: "center",
  },
  skeletonIcon: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
    marginBottom: 10,
  },
  skeletonCountry: {
    width: 45,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
    marginBottom: 10,
  },
  skeletonInput: {
    flex: 1,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 10,
  },
  skeletonPhoneCode: {
    width: 20,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginRight: 10,
  },
  skeletonInputPhone: {
    flex: 1,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#A0A0A0",
    marginBottom: 10,
  },
  skeletonCheckIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#A0A0A0",
    marginLeft: 10,
  },
  skeletonButton: {
    width: "100%",
    height: 44,
    borderRadius: 14,
    backgroundColor: "#A0A0A0",
    marginTop: 50,
    marginBottom: 10,
  },
  skeletonLoginButton: {
    width: "100%",
    height: 44,
    borderRadius: 14,
    backgroundColor: "#A0A0A0",
    marginBottom: 20,
  },
});

export default SkeletonInfoConfirm;
