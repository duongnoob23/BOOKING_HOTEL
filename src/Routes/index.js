import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Thay đổi ở đây
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";
import { useAppSelector, useAppDispatch } from "../Redux/hook";
import { View, Text } from "react-native";
import Loading from "../Pages/Loading/Loading";
const Stack = createNativeStackNavigator(); // Thay đổi ở đây

const Navigation = () => {
  const auth = useAppSelector((state) => state.auth);
  // const checkLogin = auth.isLoggedIn;
  // const checkLogin = false;
  const loading = auth.loading;
  // console.log(">>> auth", auth);
  // const count = useAppSelector((state) => state.count.count);
  // console.log(">>> count", count);
  // const loginn = useAppSelector((state) => state.text);
  // console.log(">>> text", loginn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <>
            <Stack.Screen name="Load" component={Loading} />
          </>
        ) : (
          <>
            {/* {checkLogin ? (
              <Stack.Screen name="Main" component={MainTab} />
            ) : (
              <Stack.Screen name="Auth" component={AuthStack} />
            )} */}
            <Stack.Screen name="Main" component={MainTab} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
