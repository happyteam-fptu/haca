import { View, Text } from "react-native";
import React from "react";
import ProgressHUD from "../components/ProgressHUD";

const LoadingScreen = ({ route, navigation }) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setVisible(true);

    setTimeout(() => {
      route?.params?.toScreen &&
        navigation.navigate(
          route.params.toScreen,
          route.params.params ? route.params.params : null
        );
    }, 1300);

    const unsubscribe = navigation.addListener("blur", () => {
      // do something
      setTimeout(() => {
        setVisible(false);
      }, 1300);
    });

    return unsubscribe;
  });

  return (
    <View class="flex-1 bg-white">
      <ProgressHUD
        loadText="Đang tải..."
        visible={visible}
        noBackground={true}
      />
    </View>
  );
};

export default LoadingScreen;
