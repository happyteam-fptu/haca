import React from "react";
<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
=======
import { Text, View, StyleSheet } from "react-native";
>>>>>>> bd40dc5fd69c3caa207f369af47b2eaddd05ec44

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
