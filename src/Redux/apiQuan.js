import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../Constant/Constant";

// Hàm authenticateWithFirebase (đã dùng fetch từ trước, giữ nguyên)
export const authenticateWithFirebase = async (idToken) => {
  return fetch(`${API_BASE_URL}/api/auth/firebase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokenId: idToken }),
  });
};

// Hàm registerDevice chuyển từ axios sang fetch
export const registerDevice = async (deviceToken, deviceType) => {
  const jwtToken = await AsyncStorage.getItem("jwtToken");

  return fetch(`${API_BASE_URL}/api/devices/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({ deviceToken, deviceType }),
  });
};

// Hàm fetchNotifications chuyển từ axios sang fetch
export const fetchNotifications = async (page = 0, size = 20) => {
  const state = getState();
  const accessToken = state.auth.accessToken;
  console.log("jwtToken", accessToken);
  // Tạo URL với query params (page và size)
  const url = new URL(`${API_BASE_URL}/api/notifications/user`);
  url.searchParams.append("page", page);
  url.searchParams.append("size", size);

  return fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
