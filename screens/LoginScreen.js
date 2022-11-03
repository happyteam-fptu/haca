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
  Image,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import config from "../global/config";
import Icon from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 * TODO:
 * - Connect Forgotten Password API from PHP Backend Server into
 * Forgotten password button
 * - Add delete all button at the end of each TextInput in Login
 * screen for better productivity
 * - Add view or hide password at the end of Password TextInput
 */

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signingIn, setSigningIn] = React.useState(false);
  const [wrongMsg, setWrongMsg] = React.useState(
    "Tên đăng nhập hoặc mật khẩu sai."
  );
  const [wrongPassMsgVisible, setWrongPassMsgVisible] = React.useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = React.useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = React.useState(true);

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const setTokenStorage = async (access_token, refresh_token) => {
    try {
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleLogin = async () => {
    try {
      setSigningIn(true);
      setWrongPassMsgVisible(false);
      let bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);
      const response = await axios.post(
        config.API_URL + "/v1.0/auth/login",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (
        response.data.status == "success" &&
        setTokenStorage(
          response.data.auth_data.access_token,
          response.data.auth_data.refresh_token
        )
      ) {
        // Login thanh cong...
        setSigningIn(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      } else {
        // Login that bai
        setSigningIn(false);
        switch (response.data.status_code) {
          case "wrong_or_missing_params":
            Alert.alert(
              "Đã có lỗi xảy ra...",
              "Thông tin bạn đã nhập không đúng định dạng!"
            );
            break;
          case "user_auth_failed_unknown_user":
            // Alert.alert(response.data.detail);
            setWrongMsg("Không tìm thấy tài khoản.");
            setWrongPassMsgVisible(true);
            break;
          case "user_auth_failed_wrong_pass":
            // Alert.alert(response.data.detail);
            setWrongMsg("Sai mật khẩu.");
            setWrongPassMsgVisible(true);
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
            Alert.alert(
              "Đã có lỗi xảy ra!",
              "Không thể lưu thông tin đăng nhập vào bộ nhớ thiết bị... Thử kiểm tra lại các quyền của ứng dụng."
            );
        }
      }
      return response.data;
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Đã có lỗi xảy ra!",
        err.message == "Network Error" ? "Không có kết nối" : err.message
      );
      setSigningIn(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        <KeyboardAvoidingView
          className="flex-1 bg-white"
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <StatusBar backgroundColor="#f93" barStyle="dark-content" />
          <SafeAreaView className="relative z-10">
            <TouchableOpacity
              className={`absolute right-0 p-2`}
              style={Platform.OS == "ios" && { top: getStatusBarHeight() }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="close-outline" size={45} color="#000" />
            </TouchableOpacity>
          </SafeAreaView>
          <View className="relative z-0 bg-white items-center justify-center flex-1">
            <View className="flex-row items-center gap-x-2 mb-8">
              <Image
                source={require("../assets/logo-app.png")}
                className="aspect-square w-14 shadow-sm"
              />
              <Text className="font-extrabold text-black text-5xl -mb-2.5 shadow-sm">
                Haca
              </Text>
            </View>
            <TextInput
              onChangeText={(val) => {
                val.length > 0
                  ? setIsUsernameEmpty(false)
                  : setIsUsernameEmpty(true);
                setUsername(val);
              }}
              value={username}
              className={`bg-gray-50 w-[90%] p-3.5 mb-3 rounded-md border-[0.5px] ${
                wrongPassMsgVisible && wrongMsg == "Không tìm thấy tài khoản."
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Tên đăng nhập"
              placeholderTextColor={"#707070"}
              ref={usernameRef}
              onSubmitEditing={() => handleLogin()}
            />
            <TextInput
              onChangeText={(val) => {
                val.length > 0
                  ? setIsPasswordEmpty(false)
                  : setIsPasswordEmpty(true);
                setPassword(val);
              }}
              value={password}
              className={`bg-gray-50 w-[90%] p-3.5 mb-3 rounded-md border-[0.5px] ${
                wrongPassMsgVisible && wrongMsg == "Sai mật khẩu."
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Mật khẩu"
              secureTextEntry
              placeholderTextColor={"#707070"}
              ref={passwordRef}
              onSubmitEditing={() => handleLogin()}
            />
            <View className="mt-1 mb-4 flex-row justify-between w-[90%]">
              <Text
                className={`text-right text-xs text-red-500 ${
                  !wrongPassMsgVisible && "opacity-0"
                }`}
              >
                {wrongMsg}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                <Text className="text-right text-xs font-semibold text-[#F79122]">
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleLogin()}
              className={`w-[90%] ${
                isUsernameEmpty || isPasswordEmpty || signingIn
                  ? "bg-[#ffb363]"
                  : "bg-[#F79122]"
              } py-3.5 rounded-md`}
              disabled={isUsernameEmpty || isPasswordEmpty || signingIn}
            >
              {!signingIn ? (
                <Text className="font-semibold text-center text-white leading-5">
                  Đăng nhập
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </TouchableOpacity>
            <View className="flex-row max-w-[90%] my-7">
              <View className="h-[0.5px] flex-1 bg-gray-300 my-1.5"></View>
              <Text className="mx-8 text-center text-gray-600 font-medium text-[11px]">
                HOẶC
              </Text>
              <View className="h-[0.5px] flex-1 bg-gray-300 my-1.5"></View>
            </View>
            <View>
              <TouchableOpacity
                className="flex-row items-center gap-x-2"
                onPress={() =>
                  Alert.alert(
                    "Chức năng chưa phát triển... :v",
                    "Nạp vip để ủng hộ mình nhé :3"
                  )
                }
              >
                <FontAwesome name={"user-secret"} size={20} color={"#F79122"} />
                <Text className="font-medium text-[#F79122]">
                  Tiếp tục với tư cách khách
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <Image
          source={require("../assets/team-art/cover.jpg")}
          className="object-contain w-full h-1/5"
        />
        <View className="h-20 border-t-[0.5px] border-gray-300 justify-center items-center">
          <View className="flex-row">
            <Text className="text-gray-500 text-xs">
              Bạn chưa có tài khoản ư?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://m.me/haca.fptu")}
            >
              <Text className="text-[#F79122] font-semibold text-xs">
                Liên hệ Happy Team.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
