import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStackNavigator from "./HomeStack";
import PromotionStackNavigator from "./PromoStack";
import BookingStackNavigator from "./BookingStack";
import NotificationStackNavigator from "./NotifiStack";
import AccountStackNavigator from "./AccountStack";

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF0000",
        tabBarInactiveTintColor: "#888888",
        tabBarIconStyle: { size: 24 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Tìm phòng",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "storefront" : "storefront-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="PromotionTab"
        component={PromotionStackNavigator}
        options={{
          title: "Ưu đãi",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "bookmarks" : "bookmarks-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="BookingTab"
        component={BookingStackNavigator}
        options={{
          title: "Đặt phòng",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "medkit" : "medkit-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationStackNavigator}
        options={{
          title: "Thông báo",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "notifications"
              : "notifications-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStackNavigator}
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
