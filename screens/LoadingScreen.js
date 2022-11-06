import { View, Text, StatusBar } from "react-native";
import React from "react";
import ProgressHUD from "../components/ProgressHUD";
import { CommonActions } from "@react-navigation/native";
import * as RootNavigation from "../utilities/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = ({ route, navigation }) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (route.params === undefined) {
      console.log("route.params is undefined");
      checkLoggedInState();
      setTimeout(() => {
        setLoading(false);
      }, 1300);
    } else {
      setLoading(true);
      setTimeout(() => {
        route?.params?.toScreen &&
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: route.params.toScreen,
                  params: route.params?.params ? route.params.params : null,
                },
              ],
            })
          );
        setLoading(false);
      }, 1300);
    }
  });

  const checkLoggedInState = async () => {
    try {
      console.log("Try executing");
      const AT = await AsyncStorage.getItem("access_token");
      const RT = await AsyncStorage.getItem("refresh_token");
      if (AT !== null || RT !== null) {
        console.log("AT or RT detected");
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Main" }],
        });
      } else {
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Welcome" }],
        });
      }
    } catch (e) {
      // console.log("error encountered");
      RootNavigation.dispatch({
        index: 1,
        routes: [{ name: "Welcome" }],
      });
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View class="flex-1">
        <ProgressHUD
          loadText="Đang tải..."
          visible={loading}
          noBackground={true}
        />
      </View>
    </>
  );
};

export default LoadingScreen;
