import { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { app } from "../../../config/firebaseConfig";
import { API_BASE_URL } from "../../Constant/Constant";
WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const auth = getAuth(app);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "481411658885-nrvi6ms35aefa7pt9pg80hd1f2b3dsjc.apps.googleusercontent.com",
    redirectUri: `${API_BASE_URL}/api/auth/firebase`,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    console.log("Google Auth Response:", response);
    if (response?.type === "success") {
      console.log("ID Token:", response.params.id_token);
      const { id_token } = response.params;
      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            Alert.alert(
              "Đăng nhập thành công!",
              `Xin chào ${userCredential.user.displayName}`
            );
          })
          .catch((error) => {
            console.error("Lỗi đăng nhập Google:", error);
            Alert.alert("Đăng nhập thất bại", error.message);
          });
      } else {
        console.error("Lỗi: Không nhận được ID Token!");
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>Đăng nhập với Google</Text>
      </View>
      <View style={styles.whiteFrame}>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: "#db4437" }]}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Text style={styles.socialButtonText}>ĐĂNG NHẬP VỚI GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#00F598", // Màu nền xanh lá cây giống PhoneLogin
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
    justifyContent: "center", // Canh giữa nút trong khung trắng
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
  socialButton: {
    width: "100%", // Nút chiếm toàn bộ chiều rộng
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  socialButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 18,
  },
});
