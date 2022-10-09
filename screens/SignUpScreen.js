import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

function SignUpScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("W.I.P", "Work in progress")}
      >
        <Text style={styles.txt}>SignUpScreen</Text>
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
  txt: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  button: {
    backgroundColor: "#ff3",
    padding: 12,
    width: "40%",
  },
});

export default SignUpScreen;
