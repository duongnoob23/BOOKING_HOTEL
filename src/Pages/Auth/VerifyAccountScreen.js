import React, { useState, useRef } from "react"; // Thêm useState và useRef
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
const VerifyAccountScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Ref để quản lý focus của từng ô input
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  // Hàm xử lý khi nhập OTP
  const handleOtpChange = (text, index) => {
    // Chỉ cho phép nhập 1 ký tự số
    const oldText = otp[index];
    if (text.length > 1 || (text && !/^\d$/.test(text))) return;

    // Cập nhật giá trị OTP
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Tự động chuyển focus sang ô tiếp theo nếu đã nhập 1 số
    if (text && index < 5) {
      inputRefs.current[index + 1].current?.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && index > 0) {
      // Nếu ô hiện tại rỗng hoặc có giá trị, nhảy về ô trước
      const newOtp = [...otp];
      newOtp[index] = ""; // Đảm bảo ô hiện tại bị xóa
      setOtp(newOtp);
      inputRefs.current[index - 1].current?.focus();
    }
  };
  // Hàm xử lý khi nhấn nút "Đổi điện thoại"
  const handleChangePhone = () => {
    console.log("Đổi điện thoại");
    // Logic để đổi số điện thoại
  };

  // Hàm xử lý khi nhấn nút "Gửi lại sau 30s"
  const handleResend = () => {
    console.log("Gửi lại OTP");
    // Logic gửi lại OTP
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.wrapTitleText}>Xác thực tài khoản</Text>
      </View>
      <View style={styles.whiteFrame}>
        {/* Tiêu đề */}
        <Text style={styles.title}>XÁC THỰC SỐ ĐIỆN THOẠI</Text>
        <Text style={styles.desc}>
          OTP đã được gửi đến điện thoại của bạn, kiểm tra và điền xuống dưới
        </Text>

        <View></View>
        {/* Ô input Email */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs.current[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad" // Bàn phím chỉ hiện số
              maxLength={1} // Chỉ cho phép nhập 1 ký tự
              textAlign="center"
              selectionColor="#000"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.notReceiveOTP}>
          <Text style={styles.notReceiveOTPtext}>Không nhận được mã OTP ?</Text>
        </TouchableOpacity>

        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#00BD6B" }]}
          >
            <Text style={styles.socialButtonText}>Gửi lại sau 30s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#0090FF" }]}
          >
            <Text
              style={styles.socialButtonText}
              onPress={() => navigation.navigate("Register")}
            >
              Đổi số điện thoại
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Text chuyển sang Đăng ký */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#00F598", // Màu nền xanh lá cây
  },
  whiteFrame: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    width: 340,
    height: 646,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  wrapTitle: {
    width: "80%",
    textAlign: "left",
    display: "flex",
    alignItems: "flex-start",
  },
  wrapTitleText: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    marginBottom: 10,
    marginTop: 40,
  },
  desc: {
    color: "gray",
  },
  notReceiveOTP: {
    textAlign: "center",
  },
  notReceiveOTPtext: {
    color: "gray",
    textAlign: "center",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 8,
    fontSize: 24,
    color: "#000",
    backgroundColor: "white",
  },

  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialButton: {
    width: "48%",
    //     flex: 1,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  socialButtonText: { color: "#fff" },
});

export default VerifyAccountScreen;
