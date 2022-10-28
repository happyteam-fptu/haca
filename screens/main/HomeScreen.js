import React from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
// import HomeScreenCarousel from "../../components/HomeScreenCarousel";
import SameHeader from "../../components/SameHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
// import axiosInstance from "../../utilities/axiosApi";
import menuData from "../../global/quickMenuData";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import subjectData from "../../data/subjectData";
import notificationData from "../../data/notificationData";
import MaskedView from "@react-native-masked-view/masked-view";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [rightFade, setRightFade] = React.useState(true);

  const birthdayData = [];
  const sponsorsData = [];

  React.useEffect(() => {
    async function test() {
      try {
        // await axiosInstance.post("/v1.0/auth/user");
      } catch (e) {
        console.warn(e);
      }
    }
    test();
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  const ifCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return contentOffset.y == 0;
  };

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <SameHeader
        icon="search"
        action={() => null}
        havingIcon
        className="bg-white"
        title={"Trang chủ"}
        havingBorder
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 1000);
            }}
          />
        }
        contentContainerStyle={{ paddingBottom: 45 }}
      >
        {/* <HomeScreenCarousel /> */}
        <View
          style={{
            backgroundColor: "white",
          }}
          className="shadow-sm"
        >
          <TouchableHighlight
            underlayColor="rgba(0, 0, 0, .2)"
            onPress={() => {
              null;
            }}
          >
            <View
              style={{
                height: 100,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
              }}
            >
              <View>
                {/* <UserAvatar
                  username={username}
                  style={{ height: 50, width: 50, borderRadius: 100 }}
                /> */}
                <Image
                  source={require("../../assets/userdefault.jpeg")}
                  style={{ height: 50, width: 50, borderRadius: 100 }}
                />
              </View>
              <View style={{ marginLeft: 17 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: "700",
                    width: screenWidth - 115,
                    marginBottom: 3,
                  }}
                >
                  Chào Dương Tùng Anh,
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    width: screenWidth - 115,
                  }}
                >
                  Mỗi ngày mới là một cơ hội để thay đổi bản thân bạn.
                </Text>
              </View>
              <View
                style={{
                  // align item right
                  flex: 1,
                  alignItems: "flex-end",
                  marginRight: -10,
                }}
              >
                <Ionicons name="chevron-forward-outline" size={30} />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 15,
          }}
          className="shadow-sm"
        >
          {menuData.map((item, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor="rgba(0, 0, 0, .2)"
                onPress={() => {
                  // this.props.navigation.navigate(item.route);
                  navigation.navigate(item.route);
                }}
                style={{
                  width: screenWidth / 3,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 14,
                    width: "100%",
                    paddingTop: index < 3 ? 25 : 15,
                    paddingBottom: index > 2 ? 25 : 15,
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={item.bgColor}
                    style={styles.linearGradient}
                  >
                    <Ionicons
                      name={item.iconName}
                      size={30}
                      color={"white"}
                      style={
                        item.iconName == "gift"
                          ? { transform: [{ translateX: 1 }] }
                          : null
                      }
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      fontSize: 12,
                      width: 130,
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
        {/* Homework Section */}
        <View className="mt-4 bg-white flex-1 p-5  shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="font-medium text-xl">Bài tập về nhà</Text>
              <View className="bg-red-400 h-5 p-1 rounded-full ml-2 justify-center items-center">
                <Text className="text-[10px] text-white font-bold">
                  4 đã giao
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notifications", {
                  previous_screen: "HomeScreen",
                });
              }}
            >
              <View className="flex-row items-center">
                <Text className="text-gray-500">Xem tất cả</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color={"gray"}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* Render some loading gif... */}
          {notificationData == "" && (
            <>
              {/* <Image
                source={require("../assets/loading.gif")}
                className="h-5 w-16 scale-75 -ml-1.5"
              /> */}
            </>
          )}
          {/* render homework subject images... */}
          <MaskedView
            maskElement={
              <LinearGradient
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: "100%",
                  width: "100%",
                  zIndex: 99,
                }}
                colors={[
                  `rgba(255, 255, 255, 1)`,
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 0)",
                ]}
                locations={[1, 0.95, 0.2, 0]}
                pointerEvents={"none"}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
              />
            }
            style={{ marginHorizontal: -20, marginTop: 5 }}
          >
            <ScrollView
              horizontal
              scrollIndicatorInsets={{ right: 20, left: 20 }}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              {subjectData?.currentSubjects?.map((item, index) => {
                return (
                  <TouchableOpacity activeOpacity={0.5}>
                    {item.homeworks?.length > 0 && (
                      <View
                        className={`absolute bg-gray-400 px-2 py-1 pr-4 z-50 rounded-tl-2xl rounded-br-3xl ${
                          index != 0 ? "top-[0.1px]" : "top-[1.5px]"
                        }`}
                      >
                        <Text className="text-white">
                          {item.homeworks?.length} bài tập
                        </Text>
                      </View>
                    )}
                    <View
                      key={index}
                      className={`${
                        index != subjectData.currentSubjects.length - 1 &&
                        "mr-2"
                      }`}
                    >
                      {/* nice */}
                      {/* Its will render some subjects */}
                      <Image
                        source={item.image}
                        className="w-48 object-contain h-28 rounded-2xl"
                      ></Image>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </MaskedView>
        </View>
        {/* Class Notification section */}
        <View className="mt-4 bg-white flex-1 p-5  shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="font-medium text-xl">Thông báo lớp</Text>
              <View className="bg-red-400 h-5 p-1 rounded-full ml-2 justify-center items-center">
                <Text className="text-[10px] text-white font-bold">1 mới</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notifications", {
                  previous_screen: "HomeScreen",
                });
              }}
            >
              <View className="flex-row items-center">
                <Text className="text-gray-500">Xem tất cả</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color={"gray"}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* render notifications */}
          {notificationData == "" && (
            <>
              {/* <Image
                source={require("../assets/loading.gif")}
                className="h-5 w-16 scale-75 -ml-1.5"
              /> */}
            </>
          )}
          <View className="flex-row">
            <View className="w-0.5 bg-gray-200 h-[3px] absolute left-0 -bottom-4 rounded-sm"></View>
            <View className="w-0.5 bg-gray-300 h-1.5 absolute left-0 -bottom-2 rounded-sm"></View>
            <View className="w-0.5 bg-gray-400 mr-2.5 mt-2.5 mb-0.5 rounded-sm"></View>
            <View>
              {notificationData.results?.map((item, index) => (
                <View key={index} className="flex-row">
                  <View className="w-1.5 h-1.5 bg-gray-400 rounded-full absolute my-2.5 -mx-3.5"></View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 w-[72px] text-xs">
                      {moment(item.date).format("L")}
                    </Text>
                    <TouchableOpacity
                      className="py-[3px]"
                      onPress={() => {
                        navigation.navigate("NotiScreen", {
                          id: item.id,
                          title: item.title,
                          content: item.content,
                          date: item.date,
                          by: item.createdBy,
                          image: item.image,
                        });
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        lineBreakMode={"tail"}
                        className="text-blue-500 relative text-[16px] truncate ml-1"
                        style={{ width: screenWidth - 120 }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* Incoming Birthday section */}
        <View className="mt-4 bg-white flex-1 p-5 shadow-sm">
          <View className="flex-row items-center mb-2 justify-between">
            <Text className="font-medium text-xl">Sinh nhật sắp tới</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("IncomingBirthday")}
            >
              <View className="flex-row items-center">
                <Text className="text-gray-500">Xem tất cả</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color={"gray"}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* render birthdays */}
          {birthdayData == "" && (
            <>
              {/* <Image
                source={require("../assets/loading.gif")}
                className="h-5 w-16 scale-75 -ml-1.5"
              /> */}
            </>
          )}
          {birthdayData?.map((item, index) =>
            item.daysleft == 0 ? (
              <View key={index}>
                <Text className="font-bold text-[14.3px] text-justify leading-5">
                  🎉 Hôm nay là sinh nhật của {item.name}. Đừng quên gửi lời
                  chúc mừng sinh nhật tới{" "}
                  {item.gender == "male" ? "anh ấy!" : "cô ấy!"}
                </Text>
              </View>
            ) : (
              <View key={index} className="mt-1">
                <Text
                  className={`text-[14px]`}
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                >
                  {item.daysleft} ngày nữa sinh nhật {item.name} (
                  {/* splice /2003 from str */}
                  {item.birthday.slice(0, -5)})
                </Text>
              </View>
            )
          )}
        </View>
        {/* Sponsors section */}
        <View className="mt-4 bg-white flex-1 p-5 shadow-sm">
          <View className="flex-row items-center mb-2 justify-between">
            <Text className="font-medium text-xl">Nhà tài trợ</Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-gray-500">Xem tất cả</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color={"gray"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {/* render sponsors */}
            <Text className="mb-3">
              Haca có thể đã không được tồn tại mà không có sự hỗ trợ từ các
              mạnh thường quân sau:
            </Text>
            {sponsorsData == "" && (
              <>
                {/* <Image
                  source={require("../assets/loading.gif")}
                  className="h-5 w-16 scale-75 -ml-1.5"
                /> */}
              </>
            )}
            {sponsorsData?.sponsors?.map((item, index) => (
              <View key={index}>
                <View className="pl-2 text-base flex-row items-center">
                  <Text
                    className="text-[30px] leading-6"
                    style={{ transform: [{ translateY: 2 }] }}
                  >
                    ·
                  </Text>
                  <View className="flex-row">
                    <Text className="text-base"> </Text>
                    <TouchableOpacity
                      disabled={!item.link}
                      onPress={() => {
                        Linking.openURL(item.link);
                      }}
                    >
                      <Text
                        className={`text-sm ${item.link && "text-blue-500"}`}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-sm"> - {item.donated}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Application Changelog section */}
        <View className="mt-4 bg-white flex-1 p-5 shadow-sm">
          <View className="flex-row items-center mb-2 justify-between">
            <Text className="font-medium text-xl">Những thay đổi</Text>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-gray-500">Xem tất cả</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color={"gray"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {/* render changes */}
            <Text className="text-[16px]">Phiên bản 1.0</Text>
            <Text className="font-light text-[14px] mt-1">
              Ngày phát hành: 21/10/2022
            </Text>
            <View className="mt-2.5">
              <View className="pl-2 text-base flex-row">
                <Text className="text-[30px] leading-6">· </Text>
                <Text className="items-center">
                  Ra mắt phiên bản di động của Haca - Happy Class.
                </Text>
              </View>
              <View className="pl-2 text-base flex-row">
                <Text className="text-[30px] leading-6">· </Text>
                <Text className="items-center">
                  Cải thiện hiệu suất và sửa lỗi...
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 18,
    padding: 10,
    width: 50,
    height: 53,
  },
});

export default HomeScreen;
