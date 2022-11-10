import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Easing,
  StatusBar,
  LogBox,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as RootNavigation from "./utilities/RootNavigation";

import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MainScreen from "./screens/MainScreen";
import ListenTogether from "./screens/features/ListenTogether";

const Stack = createNativeStackNavigator();

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

LogBox.ignoreLogs([
  "Error evaluating injectedJavaScript: This is possibly due to an unsupported return type. Try adding true to the end of your injectedJavaScript string.",
]);

export default function App() {
  return (
    <AnimatedAppLoader image={require("./assets/logo-only-splash.png")}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false, animation: "fade" }}
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
          <Stack.Screen
            name="Music"
            component={ListenTogether}
            options={{
              headerBackButtonMenuEnabled: false,
              headerTitle: "Nghe nhạc cùng nhau",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromModule(image);
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation0 = useMemo(() => new Animated.Value(1), []);
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation0, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(animation, {
        toValue: 0,
        duration: 800,
        delay: 800,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              position: "relative",
              zIndex: 99,
              opacity: animation0.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [0, 0, 1],
                extrapolate: "clamp",
              }),
            }}
            source={require("./assets/splash.png")}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-700, 0],
                  }),
                },
              ],
              position: "absolute",
              zIndex: -1,
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}
