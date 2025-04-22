import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Pages/Home/HomeScreen";
import DetailScreen from "../Pages/Detail/DetailScreen";
import HotelDetails from "../Pages/Hotels/HotelDetails";
import OrderFood from "../Pages/Foods/OrderFood";
import FoodDetails from "../Pages/Foods/FoodDetails";
import FoodCart from "../Pages/Foods/FoodCart";
import OrderPayment from "../Pages/Payment/OrderPayment";
import SuccessPayment from "../Pages/Payment/SuccessPayment";
import RateReviews from "../Pages/Reviews/RateReviews";
import RateDetails from "../Pages/Reviews/RateDetails";
import RateApp from "../Pages/Reviews/RateApp";
import ListHotelByLocation from "../Pages/Hotels/ListHotelByLocation";
import HotelRoomList from "../Pages/Hotels/HotelRoomList";
import InfoConfirmScreen from "../Pages/Hotels/InfoConfirmScreen";
import OrderConfirmScreen from "../Pages/Hotels/OrderConfirmScreen";
import LoginScreen from "../Pages/Auth/LoginScreen";
import RegisterScreen from "../Pages/Auth/RegisterScreen";
import Discount from "../Pages/Promotion/Discount";

import PaymentResultScreenQuan from "../Pages/Payment/PaymentResultScreenQuan";
import PaymentWebViewScreenQuan from "../Pages/Payment/PaymentWebViewScreenQuan";
import PaymentScreenQuan from "../Pages/Payment/PaymentScreenQuan";
import TestModal from "../Components/Modal/FlexibleModal/TestModal";
import AllComments from "../Pages/Hotels/AllComment";
import PhoneLogin from "../Pages/Auth/PhoneLogin";
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        title: "Trang chủ ",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetails}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="OrderFood"
        component={OrderFood}
        options={{
          headerShown: true,
          title: "Dịch vụ",
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={{
          headerShown: true,
          title: "Chi tiết món ăn",
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="FoodCart"
        component={FoodCart}
        options={{
          headerShown: true,
          title: "Giỏ hàng ",
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="OrderPayment"
        component={OrderPayment}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="SuccessPayment"
        component={SuccessPayment}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="RateReviews"
        component={RateReviews}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="RateDetails"
        component={RateDetails}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="RateApp"
        component={RateApp}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="ListHotelLocation"
        component={ListHotelByLocation}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="HotelRoomList"
        component={HotelRoomList}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Danh sách phòng",
        }}
      />

      <Stack.Screen
        name="InfoConfirm"
        component={InfoConfirmScreen}
        options={{
          title: "Thông Tin",
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="OrderConfirm"
        component={OrderConfirmScreen}
        options={{
          title: " Chi tiết đơn đặt ",
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
        }}
      />
      <Stack.Screen
        name="Discount"
        component={Discount}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Mã giảm giá ",
        }}
      />

      <Stack.Screen
        name="PaymentResultScreenQuan"
        component={PaymentResultScreenQuan}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới
          title: "Kết quả thanh toán",
        }}
      />
      <Stack.Screen
        name="PaymentWebViewScreenQuan"
        component={PaymentWebViewScreenQuan}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Web view zalo",
        }}
      />
      <Stack.Screen
        name="PaymentScreenQuan"
        component={PaymentScreenQuan}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Web view zalo",
        }}
      />
      <Stack.Screen
        name="TestModal"
        component={TestModal}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Test Modal",
        }}
      />
      <Stack.Screen
        name="AllComments"
        component={AllComments}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Test Modal",
        }}
      />
      <Stack.Screen
        name="PhoneLogin"
        component={PhoneLogin}
        options={{
          headerShown: false,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Test Modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
