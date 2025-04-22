import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, app } from "../../../config/firebaseConfig";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { API_BASE_URL } from "../../Constant/Constant";
import {
  loginSuccess,
  setPrePage,
  clearPrePage,
} from "../../Redux/Slice/authSlice";
import {
  fetchBookingStatus,
  fetchHotelList,
} from "../../Redux/Slice/hotelSlice";
import { fetchListNotification } from "../../Redux/Slice/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { CommonActions } from "@react-navigation/native";

const PhoneLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const recaptchaVerifier = useRef(null);
  const dispatch = useAppDispatch();
  const { prePage } = useAppSelector((state) => state.auth);

  // Gửi OTP
  const sendOTP = async () => {
    try {
      if (!phoneNumber.startsWith("+")) {
        Alert.alert(
          "Lỗi",
          "Số điện thoại phải bắt đầu bằng mã quốc gia (ví dụ: +84)"
        );
        return;
      }

      console.log(">>> check phone ", phoneNumber);
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current
      );
      console.log(">>> confirmation", confirmation);
      setConfirm(confirmation);
      Alert.alert("OTP đã được gửi!");
    } catch (error) {
      Alert.alert("Lỗi gửi OTP: " + error.message);
    }
  };

  // Xác thực OTP và gửi ID Token đến backend
  const verifyOTP = async () => {
    try {
      if (!confirm) {
        Alert.alert("Lỗi", "Không có dữ liệu xác nhận OTP. Vui lòng thử lại!");
        return;
      }

      const userCredential = await confirm.confirm(code);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/api/auth/firebase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: idToken }),
      });

      const data = await response.json();
      console.log(">>> data", data);
      if (data.data && data.data.accessToken) {
        dispatch(loginSuccess(data.data.accessToken));
        dispatch(fetchHotelList());
        dispatch(fetchBookingStatus());
        dispatch(fetchListNotification());

        // Xác định màn hình đích dựa trên prePage
        const targetScreen = prePage === "InfoConfirm" ? "InfoConfirm" : "Home";

        // Reset stack để xóa các màn hình đăng nhập
        if (prePage === "Profile") {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Profile" }],
            })
          );
        }
        navigation.navigate(`${targetScreen}`);
        // Xóa prePage sau khi điều hướng
        dispatch(clearPrePage());

        Alert.alert("Đăng nhập thành công!");
      } else {
        Alert.alert(
          "Lỗi xác thực với backend!",
          data.message || "Không nhận được token"
        );
      }
    } catch (error) {
      Alert.alert("OTP không đúng, thử lại!", error.message);
    }
  };

  const handleToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />

      <View style={styles.wrapTitle}>
        <Text style={styles.title}>Đăng nhập với số điện thoại</Text>
      </View>
      <View style={styles.whiteFrame}>
        {!confirm ? (
          <>
            <View style={[styles.inputContainer, styles.inputContainerFirst]}>
              <Ionicons name="call-outline" size={20} color="#0090FF" />
              <TextInput
                placeholder="+84..."
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={sendOTP}>
              <Text style={styles.buttonText}>Gửi OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={[styles.inputContainer, styles.inputContainerFirst]}>
              <Ionicons name="call-outline" size={20} color="#0090FF" />
              <TextInput
                placeholder="OTP"
                style={styles.input}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={verifyOTP}>
              <Text style={styles.buttonText}>Xác Thực OTP</Text>
            </TouchableOpacity>
          </>
        )}

        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Quên mật khẩu?
        </Text>
        <View>
          <Text style={styles.textOr}>Hoặc đăng nhập bằng</Text>
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            onPress={handleToLogin}
            style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
          >
            <Text style={styles.socialButtonText}>EMAIL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#db4437" }]}
          >
            <Text style={styles.socialButtonText}>GOOGLE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Chưa có tài khoản? </Text>
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Đăng ký
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  inputContainerFirst: {
    marginTop: 60,
    marginBottom: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  forgotPassword: {
    color: "#FF8C00",
    textAlign: "center",
    marginBottom: 60,
    marginTop: 20,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#00F598", // Màu nút giống màu nền
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 18,
  },
  textOr: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
    marginTop: 90,
    marginBottom: 0,
    fontSize: 13,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialButton: {
    width: "48%",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  socialButtonText: { color: "#fff" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 80 },
  footerText: { color: "gray", fontSize: 13 },
  footerLink: { color: "#00FF94", textDecorationLine: "underline" },
});

export default PhoneLogin;
