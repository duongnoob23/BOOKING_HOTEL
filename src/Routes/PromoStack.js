import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Discount from "../Pages/Promotion/Discount";
import DiscountHistory from "../Pages/Promotion/DiscountHistory ";
import DiscountHistoryExpired from "../Pages/Promotion/DiscountHistoryExpired";
import DiscountHistoryUse from "../Pages/Promotion/DiscountHistoryUse";

import { TouchableOpacity, Text } from "react-native";
import Promotion from "../Pages/Promotion/PromotionScreen";

const Stack = createNativeStackNavigator();

const PromotionStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Promotion"
        component={Promotion}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Mã giảm giá ",
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
        name="DiscountHistory"
        component={DiscountHistory}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Lịch sử ",
        }}
      />
      <Stack.Screen
        name="DiscountHistoryUse"
        component={DiscountHistoryUse}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Lịch sử ",
        }}
      />
      <Stack.Screen
        name="DiscountHistoryExpired"
        component={DiscountHistoryExpired}
        options={{
          headerShown: true,
          tabBarVisible: false, // Ẩn thanh tab dưới cùng
          title: "Lịch sử ",
        }}
      />
    </Stack.Navigator>
  );
};

export default PromotionStackNavigator;
