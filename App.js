import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as RootNavigation from "./utilities/RootNavigation";

import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./screens/LoadingScreen";
import MainScreen from "./screens/MainScreen";

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    checkLoggedInState();
  }, []);

  const checkLoggedInState = async () => {
    // console.log("Checking logged in state...");
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true"); // No need to wait for `setItem` to finish, although you might want to handle errors
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Welcome" }],
        });
        RootNavigation.navigate("Welcome");
        // console.log("App is never launched before");
      } else {
        // console.log("App is already launched before");
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Main" }],
        });
      }
    });
    try {
      // console.log("Try executing");
      const AT = await AsyncStorage.getItem("access_token");
      const RT = await AsyncStorage.getItem("refresh_token");
      if (AT !== null || RT !== null) {
        // console.log("AT or RT detected");
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Main" }],
        });
      } else {
        // console.log("Not detect AT or RT");
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Welcome" }],
        });
      }
    } catch (e) {
      RootNavigation.dispatch({
        index: 1,
        routes: [{ name: "Welcome" }],
      });
      console.log(e);
    }
    // console.log("Done checking logged in state.");
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
          name="Main"
          component={MainScreen}
          options={{
            animation: "fade",
            headerShown: false,
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
