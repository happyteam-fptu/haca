import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // logout();
    checkLoggedInState();
  }, []);

  const checkLoggedInState = async () => {
    try {
      const AT = await AsyncStorage.getItem("access_token");
      const RT = await AsyncStorage.getItem("refresh_token");
      if (AT !== null && RT !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (e) {
      setLoggedIn(false);
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false, animation: "fade" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                headerShown: false,
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
