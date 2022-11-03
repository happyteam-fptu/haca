import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import signOut from "../../utilities/signOut";

const MenuScreen = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => signOut()}>
        <View className="p-5 bg-red-500">
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MenuScreen;
