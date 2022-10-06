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
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import config from "../global/config";
import Icon from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { CommonActions } from "@react-navigation/native";

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
    // console.log(getStatusBarHeight());

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
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView className="flex-1 bg-[#F99934]" behavior="padding">
        <StatusBar backgroundColor="#f93" barStyle="default" />
        <SafeAreaView className="relative z-10">
          <TouchableOpacity
            className={`absolute right-0 p-2`}
            style={{ top: getStatusBarHeight() }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close-outline" size={45} color="#000" />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.container} className="relative z-0">
          <View>
            <Text style={styles.txt}>Happy Class</Text>
          </View>
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogin()}
            >
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
