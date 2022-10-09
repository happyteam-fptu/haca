import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import signOut from "../utilities/signOut";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f93" barStyle={"default"} />
      <Image
        className="w-[90%] h-[20%]"
        source={require("../assets/anhbiapage.jpg")}
      />
      <View className="bg-white mt-2 mb-8 w-[90%] ">
        <TouchableOpacity className="flex-row w-[90%] h-[15%]">
          <Image
            source={require("../assets/logo-app.png")}
            className="aspect-square w-[25%] shadow-sm"
          />
          <Text className="mx-2 h-20 text-2xl">hello</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row w-[90%] h-[15%] justify-center align-middle pt-3 bg-green-300">
        <TouchableOpacity className="flex-1 w-[15%] h-[15%]">
          <Image
            className="w-14 h-14"
            source={require("../assets/imgLib.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 w-[15%] h-[15%]">
          <Image className="w-14 h-14" source={require("../assets/list.jpg")} />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 w-[15%] h-[15%]">
          <Image
            className="w-14 h-14 bg-white "
            source={require("../assets/friend.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 w-[15%] h-[15%]">
          <Image
            className="w-14 h-14"
            source={require("../assets/birthday.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 w-[15%] h-[15%]">
          <Image
            className="w-14 h-14"
            source={require("../assets/music.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 w-[15%] h-[15%]">
          <Image
            className="w-14 h-14 bg-white "
            source={require("../assets/calendar.jpg")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => signOut()}>
        <View className="bg-red-500 px-5 py-2 rounded-full">
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f93",
  },
});
export default HomeScreen;
