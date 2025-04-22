import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../Pages/Profile/EditProfile";
import Points from "../Pages/Profile/Points";
import PointsHistory from "../Pages/Profile/PointsHistory";
import Profile from "../Pages/Profile/Profile";
import RewardMember from "../Pages/Profile/RewardMember";
import ChangePasswordScreen from "../Pages/Setting/ChangePasswordScreen";
import SettingsScreen from "../Pages/Setting/SettingsScreen";
import PersonalVoucher from "../Pages/Profile/PersonalVoucher";
import VoucherDetail from "../Pages/Profile/VoucherDetail";
import LoginScreen from "../Pages/Auth/LoginScreen";
import PhoneLogin from "../Pages/Auth/PhoneLogin";
import RegisterScreen from "../Pages/Auth/RegisterScreen";
import GoogleLogin from "../Pages/Auth/GoogleLogin";

const Stack = createNativeStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: true,
          tabBarVisible: false,
          title: "Cài đặt ", // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Đổi mật khẩu",
        }}
      />
      <Stack.Screen
        name="RewardMember"
        component={RewardMember}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Phần thưởng & Thành viên ",
        }}
      />
      <Stack.Screen
        name="Points"
        component={Points}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Điểm thưởng ",
        }}
      />
      <Stack.Screen
        name="PointsHistory"
        component={PointsHistory}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Lịch sử điểm thưởng",
        }}
      />
      <Stack.Screen
        name="PersonalVoucher"
        component={PersonalVoucher}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Voucher của bạn",
        }}
      />
      <Stack.Screen
        name="VoucherDetail"
        component={VoucherDetail}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Chi tiết Voucher",
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Chi tiết Voucher",
        }}
      />
      <Stack.Screen
        name="PhoneLogin"
        component={PhoneLogin}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Chi tiết Voucher",
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Chi tiết Voucher",
        }}
      />
      <Stack.Screen
        name="GoogleLogin"
        component={GoogleLogin}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Chi tiết Voucher",
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
