import { View, Text } from "react-native";
import React from "react";
import ProgressHUD from "../components/ProgressHUD";
import { CommonActions } from "@react-navigation/native";

const LoadingScreen = ({ route, navigation }) => {
  React.useEffect(() => {
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
    }, 1300);
  });

  return (
    <View class="flex-1 bg-white">
      <ProgressHUD loadText="Đang tải..." visible={true} noBackground={true} />
    </View>
  );
};

export default LoadingScreen;
