import React, { useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
// import { getStatusBarHeight } from "react-native-status-bar-height";
import * as RootNavigation from "../utilities/RootNavigation";
var { height, width } = Dimensions.get("window");

const statusBarHeight = 0;
// const statusBarHeight = Platform.OS == "ios" ? getStatusBarHeight() : 0;

const SameHeader = ({
  title,
  icon,
  action,
  havingBorder,
  havingIcon,
  havingBackground,
  defaultStyle,
  havingBackButton,
  backAction,
  style,
}) => {
  if (havingBackground) {
    return (
      <View style={style}>
        <View
          style={{
            width: "100%",
            paddingTop: 8,
            height: statusBarHeight + 55,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {havingIcon ? (
            <TouchableOpacity style={{ marginTop: statusBarHeight }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Image
                  className="aspect-square w-10"
                  source={require("../assets/logo-app.png")}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "left",
                marginTop: statusBarHeight,
                marginLeft: 15,
              }}
            >
              {title}
            </Text>
          )}
          <TouchableOpacity
            onPress={action}
            style={{ marginTop: statusBarHeight }}
          >
            <View
              style={{
                marginRight: 13,
                backgroundColor: "rgba(0,0,0,0.10)",
                padding: 5,
                paddingLeft: 6,
                paddingRight: 6,
                borderRadius: 100,
                marginBottom: 5,
              }}
            >
              <Ionicons name={icon} size={23} color={"black"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (defaultStyle) {
    return (
      <View style={style} className="bg-white">
        <SafeAreaView>
          <View
            className={`${
              havingBorder && "border-b-[1px] border-gray-300"
            } py-1.5 px-4 bg-white flex-row justify-between items-center h-14`}
          >
            {havingBackButton && (
              <TouchableOpacity
                className="relative z-50 w-5"
                onPress={
                  !backAction ? () => RootNavigation.goBack() : backAction
                }
              >
                <View>
                  <Octicons
                    name="chevron-left"
                    color="black"
                    size={30}
                    style={{ top: 1 }}
                  />
                </View>
              </TouchableOpacity>
            )}
            <Text className="text-center font-medium text-lg absolute m-auto left-0 right-0 py-1.5 leading-8">
              {title}
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <>
        <SafeAreaView style={style}>
          <View
            style={[
              havingBorder
                ? {
                    width: "100%",
                    paddingTop: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderBottomWidth: 0.4,
                    borderColor: "rgba(0,0,0,0.2)",
                  }
                : {
                    width: "100%",
                    paddingTop: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                  },
              { height: 56, alignItems: "center", paddingBottom: 4 },
            ]}
          >
            {havingIcon ? (
              <TouchableOpacity style={{ marginTop: statusBarHeight }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10,
                    marginTop: 1.8,
                  }}
                >
                  <Image
                    className="aspect-square w-10"
                    source={require("../assets/logo-app.png")}
                    resizeMode="contain"
                  />
                  <Text className="font-extrabold text-[#202020] text-3xl -mb-0.5 ml-1">
                    Haca
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginTop: statusBarHeight,
                  marginLeft: 15,
                }}
              >
                {title}
              </Text>
            )}
            <TouchableOpacity
              onPress={action}
              style={{ marginTop: statusBarHeight }}
            >
              <View
                style={{
                  marginRight: 13,
                  backgroundColor: "rgba(0,0,0,0.10)",
                  padding: 5,
                  paddingLeft: 6,
                  paddingRight: 6,
                  borderRadius: 100,
                  marginBottom: 5,
                }}
              >
                <Ionicons name={icon} size={23} color={"black"} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

export default SameHeader;
