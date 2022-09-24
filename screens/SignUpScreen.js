import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LoginScreen from "./LoginScreen";

function SignUpScreen(props) {
  return (
    <View style={styles.container}>
      <Text>SignUpScreen</Text>
      <Button title="Click here" onPress={() => alert("Button Clicked")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUpScreen;
