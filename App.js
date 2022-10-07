import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as RootNavigation from "./utilities/RootNavigation";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./screens/LoadingScreen";

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    checkLoggedInState();
  }, []);

  const checkLoggedInState = async () => {
    try {
      const AT = await AsyncStorage.getItem("access_token");
      const RT = await AsyncStorage.getItem("refresh_token");
      if (AT !== null && RT !== null) {
        RootNavigation.navigate("Home");
      } else {
        RootNavigation.navigate("Welcome");
      }
    } catch (e) {
      RootNavigation.navigate("Welcome");
      console.log(e);
    }
  };

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
            animationDuration: 330,
          }}
        />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
