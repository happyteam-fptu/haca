import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import Octicons from "react-native-vector-icons/Octicons";

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator barStyle={{ maxHeight: 75 }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="home" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
