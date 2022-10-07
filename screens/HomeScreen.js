import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import signOut from "../utilities/signOut";

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Welcome to my app</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <View className="bg-red-500 px-5 py-2 rounded-full">
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f93",
  },
});
export default HomeScreen;
