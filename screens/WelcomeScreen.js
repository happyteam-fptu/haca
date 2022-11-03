import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Linking,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import VersionInfo from "react-native-version-info";

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#E7B181", "#F79122"]} className="flex-1">
      <StatusBar backgroundColor="#E7B181" barStyle="light-content" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-evenly items-center">
          <Text className="text-lg text-center text-white w-[65%] font-medium">
            Giao lưu và giải trí với những người bạn cùng lớp.
          </Text>

          <View
            className="w-40 h-40 rounded-full items-center justify-center shadow-sm relative z-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <View
              className="w-40 h-40 rounded-full items-center justify-center shadow-md absolute scale-150 z-0"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            ></View>
            <Image
              source={require("../assets/logo-app.png")}
              className="aspect-square w-28 h-28 shadow-sm"
            />
          </View>

          <View>
            <Text className="font-extrabold text-yellow-200 text-4xl">
              Happy Class
            </Text>
            <Text className="text-white text-lg text-center ">
              Haca for SE1741
            </Text>
          </View>
        </View>
        <View className="items-center ">
          <TouchableOpacity
            className="mb-4 w-[50%] bg-white h-14 items-center justify-center rounded-full"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="font-bold text-[16px]">Bắt đầu</Text>
          </TouchableOpacity>
        </View>
        <View className="px-4 flex-row justify-center mb-4 opacity-50">
          <Text className="text-black text-xs">
            v{VersionInfo.appVersion} ({VersionInfo.buildVersion})
          </Text>
          <Text className="text-black"> - </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://policies.haca.me/terms")}
          >
            <Text className="text-black text-xs">Điều khoản</Text>
          </TouchableOpacity>
          <Text className="text-black"> - </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://policies.haca.me/privacy")}
          >
            <Text className="text-black text-xs">Quyền riêng tư</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;
