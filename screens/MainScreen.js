import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./main/HomeScreen";
import Octicons from "react-native-vector-icons/Octicons";
import MenuScreen from "./main/MenuScreen";
import ChatScreen from "./main/ChatScreen";
import { Text } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      barStyle={{
        maxHeight: 75,
        backgroundColor: "white",
      }}
      initialRouteName="Feed"
      activeColor="#F79122"
      inactiveColor="#aaa"
      screenOptions={({ route }) => ({
        tabBarLabel: <Text style={{ lineHeight: 25 }}>{route.name}</Text>,
      })}
    >
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
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="inbox" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="three-bars" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
