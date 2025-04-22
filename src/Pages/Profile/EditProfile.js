import React, { useState, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useDispatch } from "react-redux";
import { updateUserInfo, fetchUserInfo } from "../../Redux/Slice/authSlice";

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { userData } = route.params;
  console.log(userData);
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [avatar, setAvatar] = useState(
    userData.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const phoneInputRef = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!validateFields(firstName, lastName, phone)) return;
    const updatedInfo = {
      firstName,
      lastName,
      email,
      phone,
      // image: avatar,
    };

    try {
      const result = await dispatch(updateUserInfo(updatedInfo)).unwrap();
      await dispatch(fetchUserInfo());
      Alert.alert("Thành công", "Cập nhật thông tin thành công!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.");
    }
  };
  const validateFields = (firstName, lastName, phone) => {
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/; // chấp nhận tiếng Việt + space
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(firstName)) {
      Alert.alert("Lỗi", "Họ chỉ được chứa chữ cái và khoảng trắng.");
      return false;
    }

    if (!nameRegex.test(lastName)) {
      Alert.alert("Lỗi", "Tên chỉ được chứa chữ cái và khoảng trắng.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại phải gồm đúng 10 chữ số.");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <Text style={styles.headerText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
          <Ionicons name="camera-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* First name */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Họ</Text>
        <View style={styles.inputText}>
          <Ionicons name="person-outline" size={20} color="#0090FF" />
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Nhập họ"
          />
        </View>
      </View>

      {/* Last name */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tên</Text>
        <View style={styles.inputText}>
          <Ionicons name="person-circle-outline" size={20} color="#0090FF" />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Nhập tên"
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputText}>
          <Ionicons name="mail-outline" size={20} color="#0090FF" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Email"
          />
        </View>
      </View>

      {/* Phone */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Số điện thoại</Text>
        <View style={styles.inputText}>
          <Ionicons name="call-outline" size={20} color="#0090FF" />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="email-address"
            placeholder="Phone"
          />
        </View>
      </View>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  avatarContainer: {
    alignSelf: "center",
    position: "relative",
    marginBottom: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#00C853",
    padding: 6,
    borderRadius: 20,
  },
  inputContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  inputLabel: { fontSize: 12, marginBottom: 5 },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  input: { flex: 1, paddingLeft: 8 },
  saveButton: {
    backgroundColor: "#00F598",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
  },
  textContainer: {
    backgroundColor: "transparent",
  },
});

export default EditProfile;
