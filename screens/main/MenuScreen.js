import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import signOut from "../../utilities/signOut";

const MenuScreen = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <View className="p-5 bg-red-500">
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;
