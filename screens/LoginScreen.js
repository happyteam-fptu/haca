import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SignUpScreen from "./SignUpScreen";

function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Happy Class</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.button} onPress={() => alert("WIP")}>
          <Text style={styles.btntxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert("WIP")}>
          <Text style={styles.btntxt}>Signup</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
  },
  btncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#ff3",
    padding: 12,
    width: "40%",
  },
  btntxt: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
