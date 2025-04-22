import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.wrapTitleText}>Quên mật khẩu?</Text>
      </View>
      <View style={styles.whiteFrame}>
        {/* Tiêu đề */}
        <View style={styles.title}>
          <Text style={styles.titleText}>Hãy điền mail đăng ký của bạn</Text>
        </View>
        {/* Ô input Email */}
        <View style={[styles.inputContainer, styles.inputContainerFirst]}>
          <Ionicons name="mail-outline" size={20} color="#0090FF" />
          <TextInput placeholder="Email" style={styles.input} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gửi</Text>
        </TouchableOpacity>
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
    marginTop: 50,
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
  },
  titleText: {
    textAlign: "center",
    color: "gray",
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
    marginTop: 20,
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

export default ForgotPasswordScreen;
