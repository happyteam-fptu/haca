import React from "react";
import { Text, View, StyleSheet } from "react-native";

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Welcome to my app</Text>
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
