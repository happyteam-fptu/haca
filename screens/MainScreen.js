import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./main/HomeScreen";
import Octicons from "react-native-vector-icons/Octicons";
import MenuScreen from "./main/MenuScreen";
import ChatScreen from "./main/ChatScreen";
import FeedScreen from "./main/FeedScreen";
import NotificationScreen from "./main/FeedScreen";
import { Text } from "react-native";

const Tab = createMaterialBottomTabNavigator();

function getHeaderTitle(name) {
  const routeName = name ?? "Home";

  switch (routeName) {
    case "Home":
      return "Trang chủ";
    case "Chat":
      return "Chat";
    case "Menu":
      return "Menu";
    case "Notification":
      return "Thông báo";
    case "Feed":
      return "Khám phá";
  }
}

const MainScreen = () => {
  return (
    <Tab.Navigator
      barStyle={{
        maxHeight: 75,
        backgroundColor: "white",
      }}
      initialRouteName="Home"
      activeColor="#F79122"
      inactiveColor="#aaa"
      screenOptions={({ route }) => ({
        tabBarLabel: (
          <Text style={{ lineHeight: 25 }}>{getHeaderTitle(route.name)}</Text>
        ),
      })}
      shifting={true}
      sceneAnimationEnabled={true}
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
        name="Feed"
        component={FeedScreen}
        options={{
          title: "Khám phá",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="telescope" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="comment-discussion" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Thông báo",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="bell" size={25} color={color} />
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
