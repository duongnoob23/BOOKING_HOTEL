import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  navigation,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  //   const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);
  const handleToChangePassword = () => {
    navigation.navigate("ChangePasswordScreen");
  };
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={[styles.settingCard, { marginBottom: 50 }, { padding: 5 }]}>
        <View style={styles.optionItem}>
          <Text style={styles.optionText}>Thông báo</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={(value) => setIsNotificationsEnabled(value)}
          />
        </View>
      </View>
      <View style={styles.settingCard}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          <Text style={styles.optionText}>Chính sách quyền riêng tư</Text>
          <Ionicons name="chevron-forward" size={20} color="#0090FF" />
        </TouchableOpacity>
      </View>
      <View style={[styles.settingCard, { marginBottom: 50 }]}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("TermsConditions")}
        >
          <Text style={styles.optionText}>Điều khoản & Điều kiện</Text>
          <Ionicons name="chevron-forward" size={20} color="#0090FF" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingCard}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Tìm hiểu thêm về ứng dụng</Text>
          <Ionicons name="chevron-forward" size={20} color="#0090FF" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingCard}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Hỗ trợ</Text>
          <Ionicons name="chevron-forward" size={20} color="#0090FF" />
        </TouchableOpacity>
      </View>
      <View style={[styles.settingCard, { marginBottom: 50 }]}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Đánh giá ứng dụng</Text>
          <Ionicons name="chevron-forward" size={20} color="#0090FF" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingCard}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handleToChangePassword()}
        >
          <Text style={styles.optionText}>Đổi mật khẩu</Text>
          <Ionicons name="chevron-forward" size={20} color="#0090FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF3F6",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  settingCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SettingsScreen;
