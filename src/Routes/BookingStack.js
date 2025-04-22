import BookingHistoryDetails from "../Pages/Booking/BookingHistoryDetails";
import BookingScreen from "../Pages/Booking/BookingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const BookingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Lịch sử đặt phòng  ",
        }}
      />
      <Stack.Screen
        name="BookingHistoryDetails"
        component={BookingHistoryDetails}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Chi tiết đặt phòng  ",
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingStackNavigator;
