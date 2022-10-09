import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import signOut from "../utilities/signOut";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f93" barStyle={"default"} />
      <Image
        className="p-5 m-10 w-[90%] h-[20%] "
        source={require("../assets/anhbiapage.jpg")}
      />
      <TouchableOpacity onPress={() => signOut()}>
        <View className="bg-red-500 px-5 py-2 rounded-full">
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
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
