import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Pages/Auth/LoginScreen";
import RegisterScreen from "../Pages/Auth/RegisterScreen";
import GoogleLogin from "../Pages/Auth/GoogleLogin";
import PhoneLogin from "../Pages/Auth/PhoneLogin";
import VerifyAccountScreen from "../Pages/Auth/VerifyAccountScreen";
import ForgotPasswordScreen from "../Pages/Auth/ForgotPasswordScreen";
import TermScreen from "../Pages/Auth/TermScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
    <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="VerifyAccount" component={VerifyAccountScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Term" component={TermScreen} />
    <Stack.Screen name="Count" component={CounterComponent} />
  </Stack.Navigator>
);

export default AuthStack;
