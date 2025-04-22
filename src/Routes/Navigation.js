// // src/route/navigation.js
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";

// import { TouchableOpacity, Text } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useState } from "react";
// // Giả sử có SettingsScreen
// import HomeScreen from "../Pages/Home/HomeScreen";
// import DetailScreen from "../Pages/Detail/DetailScreen";
// import Profile from "../Pages/Profile/Profile";
// import AccountScreen from "../Pages/Account/AccountScreen";
// import NotificationScreen from "../Pages/Notification/NotificationScreen";
// import BookingScreen from "../Pages/Booking/BookingScreen";
// import PromotionScreen from "../Pages/Promotion/PromotionScreen";

// import FontAwesome from "react-native-vector-icons/FontAwesome"; // Bộ FontAwesome
// import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Bộ MaterialIcons
// import Ionicons from "react-native-vector-icons/Ionicons"; // Bộ Ionicons
// import Feather from "react-native-vector-icons/Feather"; // Bộ Feather
// import LoginScreen from "../Pages/Auth/LoginScreen";
// import RegisterScreen from "../Pages/Auth/RegisterScreen";
// import VerifyAccountScreen from "../Pages/Auth/VerifyAccountScreen";
// import ForgotPasswordScreen from "../Pages/Auth/ForgotPasswordScreen";
// import TermScreen from "../Pages/Auth/TermScreen";
// import HotelDetails from "../Pages/Hotels/HotelDetails";
// import PhotoScreen from "../Pages/Hotels/PhotoScreen";
// import PriceScreen from "../Pages/Hotels/PriceScreen";
// import CheckScreen from "../Pages/Hotels/CheckScreen";
// import OrderFood from "../Pages/Foods/OrderFood";
// import FoodDetails from "../Pages/Foods/FoodDetails";
// import FoodCart from "../Pages/Foods/FoodCart";
// import OrderPayment from "../Pages/Payment/OrderPayment";
// import SuccessPayment from "../Pages/Payment/SuccessPayment";
// import RateReviews from "../Pages/Reviews/RateReviews";
// import RateDetails from "../Pages/Reviews/RateDetails";
// import RateApp from "../Pages/Reviews/RateApp";
// import EditProfile from "../Pages/Profile/EditProfile";
// import SettingsScreen from "../Pages/Setting/SettingsScreen";
// import ChangePasswordScreen from "../Pages/Setting/ChangePasswordScreen";
// import PointsHistory from "../Pages/Profile/PointsHistory";
// import Points from "../Pages/Profile/Points";
// import RewardMember from "../Pages/Profile/RewardMember";
// import Discount from "../Pages/Promotion/Discount";
// import DiscountHistory from "../Pages/Promotion/DiscountHistory ";
// import NotificationsScreen from "../Pages/Notification/NotificationScreen";
// import DiscountHistoryUse from "../Pages/Promotion/DiscountHistoryUse";
// import DiscountHistoryExpired from "../Pages/Promotion/DiscountHistoryExpired";
// import PhoneLogin from "../Pages/Auth/PhoneLogin";
// import GoogleLogin from "../Pages/Auth/GoogleLogin";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // stack cho home option

// // Stack cho phần Home
// const HomeStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//         title: "Trang chủ ",
//       }}
//     >
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Detail" component={DetailScreen} />
//       <Stack.Screen
//         name="HotelDetails"
//         component={HotelDetails}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="OrderFood"
//         component={OrderFood}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="FoodDetails"
//         component={FoodDetails}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="FoodCart"
//         component={FoodCart}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="OrderPayment"
//         component={OrderPayment}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="SuccessPayment"
//         component={SuccessPayment}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="RateReviews"
//         component={RateReviews}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="RateDetails"
//         component={RateDetails}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="RateApp"
//         component={RateApp}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// // stack cho phần Account
// const AccountStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//       }}
//     >
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="EditProfile"
//         component={EditProfile}
//         options={{
//           headerShown: false,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="SettingsScreen"
//         component={SettingsScreen}
//         options={{
//           headerShown: true,
//           tabBarVisible: false,
//           title: "Cài đặt ", // Ẩn thanh tab dưới cùng
//         }}
//       />
//       <Stack.Screen
//         name="ChangePasswordScreen"
//         component={ChangePasswordScreen}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Đổi mật khẩu",
//         }}
//       />
//       <Stack.Screen
//         name="RewardMember"
//         component={RewardMember}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Phần thươngr & Thành viên ",
//         }}
//       />
//       <Stack.Screen
//         name="Points"
//         component={Points}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Điểm thưởng ",
//         }}
//       />
//       <Stack.Screen
//         name="PointsHistory"
//         component={PointsHistory}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Lịch sử điểm thưởng",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// //stack cho phần Booking
// const BookingStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//       }}
//     >
//       <Stack.Screen
//         name="BookingScreen"
//         component={BookingScreen}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Lịch sử đặt phòng  ",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// //stack cho phần Notification
// const NotificationStackNavigator = ({ navigation }) => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//       }}
//     >
//       <Stack.Screen
//         name="Notification"
//         component={NotificationsScreen}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Thông báo",
//           headerRight: () => (
//             <TouchableOpacity
//               onPress={() => navigation.navigate("DiscountHistory")}
//               style={{ marginRight: 10 }}
//             >
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "400",
//                   color: "#007BFF",
//                   // backgroundColor: "red",
//                 }}
//               >
//                 Xóa
//               </Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// //stack cho phần Promotion
// const PromotionStackNavigator = ({ navigation }) => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//       }}
//     >
//       <Stack.Screen
//         name="Discount"
//         component={Discount}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Mã giảm giá ",
//           headerRight: () => (
//             <TouchableOpacity
//               onPress={() => navigation.navigate("DiscountHistory")}
//               style={{ marginRight: 10 }}
//             >
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "400",
//                   color: "#007BFF",
//                   // backgroundColor: "red",
//                 }}
//               >
//                 Lịch sử
//               </Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="DiscountHistory"
//         component={DiscountHistory}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Lịch sử ",
//         }}
//       />
//       <Stack.Screen
//         name="DiscountHistoryUse"
//         component={DiscountHistoryUse}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Lịch sử ",
//         }}
//       />
//       <Stack.Screen
//         name="DiscountHistoryExpired"
//         component={DiscountHistoryExpired}
//         options={{
//           headerShown: true,
//           tabBarVisible: false, // Ẩn thanh tab dưới cùng
//           title: "Lịch sử ",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// // Bottom Tab Navigator

// const AuthNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
//       <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="VerifyAccount" component={VerifyAccountScreen} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//       <Stack.Screen name="Term" component={TermScreen} />
//     </Stack.Navigator>
//   );
// };

// const MainNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#FF0000",
//         tabBarInactiveTintColor: "#888888",
//         tabBarIconStyle: { size: 24 },
//       }}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeStackNavigator}
//         options={{
//           title: "Room",
//           tabBarIcon: ({ focused, color, size }) => {
//             const iconName = focused ? "storefront" : "storefront-outline";
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="PromotionTab"
//         component={PromotionStackNavigator}
//         options={{
//           title: "Promotion",
//           tabBarIcon: ({ focused, color, size }) => {
//             const iconName = focused ? "bookmarks" : "bookmarks-outline";
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="BookingTab"
//         component={BookingStackNavigator}
//         options={{
//           title: "Booking",
//           tabBarIcon: ({ focused, color, size }) => {
//             const iconName = focused ? "medkit" : "medkit-outline";
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="NotificationTab"
//         component={NotificationStackNavigator}
//         options={{
//           title: "Notification",
//           tabBarIcon: ({ focused, color, size }) => {
//             const iconName = focused
//               ? "notifications"
//               : "notifications-outline";
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="AccountTab"
//         component={AccountStackNavigator}
//         options={{
//           title: "Account",
//           tabBarIcon: ({ focused, color, size }) => {
//             const iconName = focused ? "person" : "person-outline";
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const Navigation = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
//       {/* <MainNavigator /> */}
//     </NavigationContainer>
//   );
// };

// export default Navigation;

// // bạn hãy xem kĩ 2 giao diện này và code lại cho tôi , đúng đến từng chi tiết margin pixel padding , lineheight, color ko cần linear gradient giống nhất có thể cho tôi, sử dụng styleSheet với react-native và đặt tên css chuẩn  Bemm, hay code và tự test lại giao diện, đánh giấ xem giống yêu cầu bao nhiêu phần trăm
