import axios from "axios";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import config from "../global/config";

/**
 * TODO:
 * - Add loading overlay when user click on login button, waiting for
 * server to response...
 * - Add AsyncStorage handling login success logic for keeping
 * logged-in state when user reopen the app... (Save access and
 * refresh to AsyncStorage)
 */

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);
      const response = await axios.post(
        config.API_URL + "/v1.0/auth/login",
        bodyFormData
      );
      if (response.data.status == "success") {
        // Login thanh cong...
        navigation.navigate("Home");
      } else {
        // Login that bai
        switch (response.data.status_code) {
          case "wrong_or_missing_params":
            Alert.alert(
              "Đã có lỗi xảy ra...",
              "Thông tin bạn đã nhập không đúng định dạng!"
            );
            break;
          case "user_auth_failed_unknown_user":
            Alert.alert(response.data.detail);
            break;
          case "user_auth_failed_wrong_pass":
            Alert.alert(response.data.detail);
            break;
          case "user_auth_failed_missing_field":
            if (
              response.data.detail.username &&
              response.data.detail.password
            ) {
              Alert.alert("Vui lòng điền đầy đủ thông tin!");
            } else if (
              response.data.detail.username &&
              !response.data.detail.password
            ) {
              Alert.alert("Vui lòng nhập tên đăng nhập!");
            } else {
              Alert.alert("Vui lòng nhập mật khẩu!");
            }
            break;
          default:
        }
      }
      return response.data;
    } catch (err) {
      console.error(err);
      Alert.alert("Đã có lỗi xảy ra!", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f93" barStyle="default" />

      <Text style={styles.txt}>Happy Class</Text>
      <TextInput
        onChangeText={(val) => setUsername(val)}
        value={username}
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        onChangeText={(val) => setPassword(val)}
        value={password}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.btnTxt}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#ff3",
    padding: 12,
    width: "40%",
  },
  btnTxt: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
