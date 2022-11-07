import { View, Text, StatusBar } from "react-native";
import React from "react";

const ForgotPasswordScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <Text>
        Tính năng đang phát triển! Hãy cùng đón chờ ở phiên bản sau nhé...{"\n"}
        Bạn chưa có tài khoản? Hãy tìm file spreadsheet thông tin đăng nhập cho
        các thành viên lớp tại group chat của lớp SE1741 trên Messenger nhé!
      </Text>
    </View>
  );
};

export default ForgotPasswordScreen;
