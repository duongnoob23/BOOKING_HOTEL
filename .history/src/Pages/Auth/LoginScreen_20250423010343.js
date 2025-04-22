import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../../config/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  loginSuccess,
  fetchUserInfo,
  setPrePage,
  clearPrePage,
} from "../../Redux/Slice/authSlice";
import { API_BASE_URL } from "../../Constant/Constant";
import {
  fetchBookingStatus,
  fetchHotelList,
} from "../../Redux/Slice/hotelSlice";
import { CommonActions } from "@react-navigation/native";
import { fetchListNotification } from "../../Redux/Slice/notificationSlice";
import { registerForPushNotificationsAsync } from "../../Utils/notificationsQuan";
import { registerDevice } from "../../Redux/apiQuan";
const LoginScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { prePage } = useAppSelector((state) => state.auth);

  console.log(prePage);
  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/firebase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: idToken }),
      });

      const data = await response.json();
      console.log(">>> data", data);
      if (data?.data?.accessToken) {
        const deviceToken = await registerForPushNotificationsAsync();
        console.log('Device os:', Platform.OS);
        if (deviceToken) {
          await registerDevice(
            deviceToken,
            Platform.OS === 'ios' ? 'IOS' : 'ANDROID'
          );
        }
        dispatch(loginSuccess({
          accessToken: data?.data?.accessToken,
          userId: data?.data?.userId // Giả sử API trả về userId
        }));
        dispatch(fetchHotelList());
        dispatch(fetchBookingStatus());
        dispatch(fetchListNotification());
        dispatch(fetchUserInfo());

        // Xác định màn hình đích dựa trên prePage
        const targetScreen = prePage === "InfoConfirm" ? "InfoConfirm" : "Home";

        // Reset stack để xóa các màn hình đăng nhập
        if (prePage) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Profile" }],
            })
          );
        }

        console.log(targetScreen);

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
      Alert.alert("Lỗi gửi token!", error.message);
      console.log(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      console.log("idToken->", idToken);
      sendTokenToBackend(idToken);
    } catch (error) {
      Alert.alert("Lỗi đăng nhập", error.message);
    }
  };

  const handleToPhoneLogin = () => {
    navigation.navigate("PhoneLogin");
    setEmail("");
    setPassword("");
  };

  const handleToGoogleLogin = () => {
    navigation.navigate("GoogleLogin");
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={undefined}>
      <View style={styles.container}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Đăng nhập với Email</Text>
        </View>
        <View style={styles.whiteFrame}>
          <View style={[styles.inputContainer, styles.inputContainerFirst]}>
            <Ionicons name="mail-outline" size={20} color="#0090FF" />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#0090FF" />
            <TextInput
              placeholder="Mật khẩu"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Quên mật khẩu?
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.textOr}>Hoặc đăng nhập bằng</Text>
          </View>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              onPress={handleToPhoneLogin}
              style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
            >
              <Text style={styles.socialButtonText}>Số Điện Thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleToGoogleLogin}
              style={[styles.socialButton, { backgroundColor: "#db4437" }]}
            >
              <Text style={styles.socialButtonText}>GOOGLE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Chưa có tài khoản? </Text>
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Đăng ký
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

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
    marginBottom: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  inputContainerFirst: {
    marginTop: 60,
    marginBottom: 20,
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
    marginBottom: 40,
    marginTop: 40,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#00F598", // Màu nút giống màu nền
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
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
    //     flex: 1,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  socialButtonText: { color: "#fff" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 80 },
  footerText: { color: "gray", fontSize: 13 },
  footerLink: { color: "#00FF94", textDecorationLine: "underline" },
});

// khi nhập input thì bị đẩy lênn , fix cứng
// Thêm import KeyboardAvoidingView từ react-native.

// Bao bọc toàn bộ giao diện trong <KeyboardAvoidingView> với behavior và keyboardVerticalOffset để điều chỉnh khi bàn phím xuất hiện.
