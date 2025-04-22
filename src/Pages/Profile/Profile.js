import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { fetchUserInfo, logout, setPrePage } from "../../Redux/Slice/authSlice";

const Profile = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, infoUser } = useAppSelector((state) => state.auth);
  console.log(infoUser);
  const anonymousData = {
    name: "Ẩn danh",
    email: "email@anonym.com",
    phone: "+123456789",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2F8DoZLvVpkbPZs1z1dBzXKLvgRNwgUrstA&s",
  };

  // Avatar fallback nếu chưa có từ API
  const defaultAvatar =
    "https://media.istockphoto.com/id/1587604256/vi/anh/ch%C3%A2n-dung-lu%E1%BA%ADt-s%C6%B0-v%C3%A0-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-da-%C4%91en-v%E1%BB%9Bi-m%C3%A1y-t%C3%ADnh-b%E1%BA%A3ng-n%E1%BB%A5-c%C6%B0%E1%BB%9Di-v%C3%A0-h%E1%BA%A1nh-ph%C3%BAc-t%E1%BA%A1i-n%C6%A1i-l%C3%A0m.jpg?s=612x612&w=0&k=20&c=0hnV6JuSMy8XAV25oJFzQeHPYysYe8cfHUyhgZlQYQc=";

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [isLoggedIn, dispatch]);
  const displayData = isLoggedIn
    ? {
        firstName: infoUser?.firstName || "No name",
        lastName: infoUser?.lastName || "",
        email: infoUser?.email || "No email",
        phone: infoUser?.phone || "No phone",
        image: infoUser?.image || defaultAvatar,
      }
    : anonymousData;

  const handleToEditProfile = () => {
    navigation.navigate("EditProfile", { userData: displayData });
  };

  const handleToRewardMember = () => {
    navigation.navigate("RewardMember");
  };

  const handleToSettingsScreen = () => {
    navigation.navigate("SettingsScreen");
  };

  const handleToPersonalVoucher = () => {
    navigation.navigate("PersonalVoucher");
  };

  const handleLogin = () => {
    dispatch(setPrePage("Profile"));
    navigation.navigate("LoginScreen");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: displayData.image }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.profileCard}>
        {isLoggedIn && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleToEditProfile}
          >
            <Ionicons name="pencil" size={26} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.userName}>
          {displayData.firstName} {displayData.lastName}
        </Text>
        <Text style={styles.userEmail}>{displayData.email}</Text>
        <Text style={styles.userPhone}>{displayData.phone}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {isLoggedIn ? (
          <>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={handleToSettingsScreen}
            >
              <Text style={styles.optionText}>Cài đặt</Text>
              <Ionicons name="chevron-forward" size={20} color="#0090FF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={handleToRewardMember}
            >
              <Text style={styles.optionText}>Phần thưởng và Thành viên</Text>
              <Ionicons name="chevron-forward" size={20} color="#0090FF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={handleToPersonalVoucher}
            >
              <Text style={styles.optionText}>Voucher của bạn</Text>
              <Ionicons name="chevron-forward" size={20} color="#0090FF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogout()}
            >
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    height: "50%",
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileCard: {
    position: "relative",
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: -50,
  },
  editButton: {
    width: 50,
    height: 50,
    position: "absolute",
    top: -20,
    right: -20,
    backgroundColor: "#00C853",
    padding: 8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
  },
  userPhone: {
    fontSize: 16,
    color: "#555",
  },
  optionsContainer: {
    padding: 20,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    width: "95%",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#00F598",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  loginButton: {
    marginTop: 80,
    backgroundColor: "#00F598",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    paddingHorizontal: 120,
  },
  loginText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
