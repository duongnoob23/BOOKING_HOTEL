import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = () => {
    setError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu mới không khớp!");
      return;
    }

    // Giả lập xác thực mật khẩu cũ (thực tế sẽ kiểm tra từ server)
    if (oldPassword !== "123456") {
      // Thay "123456" bằng dữ liệu thực tế từ API
      setError("Mật khẩu cũ không chính xác!");
      return;
    }

    // Gửi API đổi mật khẩu tại đây...

    alert("Mật khẩu đã được cập nhật!");
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Đổi mật khẩu</Text> */}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <Ionicons
          name={showOldPassword ? "lock-open-outline" : "lock-closed-outline"}
          size={24}
          color="#0090FF"
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu cũ"
          secureTextEntry={!showOldPassword}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TouchableOpacity
          onPress={() => setShowOldPassword(!showOldPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showOldPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name={showNewPassword ? "lock-open-outline" : "lock-closed-outline"}
          size={24}
          color="#0090FF"
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowNewPassword(!showNewPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showNewPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name={
            showConfirmPassword ? "lock-open-outline" : "lock-closed-outline"
          }
          size={24}
          color="#0090FF"
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu mới"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}
      >
        <Text style={styles.updateButtonText}>Cập nhật mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
  updateButton: {
    backgroundColor: "#00F598",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
