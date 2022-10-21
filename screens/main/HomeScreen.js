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
import HomeScreenCarousel from "../../components/HomeScreenCarousel";
import SameHeader from "../../components/SameHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
// import axiosInstance from "../../utilities/axiosApi";
import menuData from "../../global/quickMenuData";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const notificationData = {
    total: 8,
    results: [
      {
        id: 19,
        title: "Tiết MAD ngày 6/10 nghỉ học do cô bị ốm",
        content: "ạoidháohjđạoạláljáđậo",
        createdBy: "TANH đzzai hihi^^",
        image: [
          {
            img_id: 1,
            url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Yen_Bai_-_dogs_-_P1390010.JPG",
          },
          {
            img_id: 2,
            url: "https://petizen.vn/wp-content/uploads/2019/03/9-giong-cho-canh-duoc-yeu-thich-nhat.jpg",
          },
        ],
        date: "2022-05-10 17:31:01",
      },
      {
        id: 18,
        title: "Nhắc đi họp lớp chiều mùng 3/9",
        content:
          "Hmm hello anh em :))) để test thử khả năng truyền tải thông báo lớp qua app của tui thì nay tui nhắc luôn mn chiều hôm nay (03/09/2022) lúc 3h anh em tập trung tại cổng trường để đi cafe tại Monolic nkaaaa 😘",
        createdBy: "Dương Tùng Anh",
        image: [
          { img_id: 1, url: "https://c4k60.com/assets/images/cafe_hong.jpeg" },
        ],
        date: "2022-09-03 10:46:19",
      },
      {
        id: 14,
        title: "Tùng Anh đẹp trai vcl",
        content: "Nhỉ?? :)))) ai cũng phải công nhận",
        createdBy: "Admin C4K60",
        image: [
          {
            img_id: 1,
            url: "https://c4k60.com/anhvavideo/media/original/%E1%BA%A2nh%20k%E1%BB%B7%20y%E1%BA%BFu/217707980348167410533151108516773PHQ_2379-min.jpg",
          },
        ],
        date: "2021-12-11 21:24:23",
      },
      {
        id: 12,
        title: "Thu quần áo thuê chụp",
        content:
          "Ra chơi tiết 1 ngày mai t sẽ thu từng người từng bộ qao cmay thuê để chiều mai ship trả cho studio, ai thiếu đồ gì sẽ phải đền bù cho bên đó nhé",
        createdBy: "Ngô Phương Anh",
        image: [{ img_id: 1, url: "no" }],
        date: "2021-01-23 21:02:51",
      },
      {
        id: 11,
        title: "Lịch trình buổi chụp ",
        content:
          "7-10h chụp ở trường\n10h-12h mng tự túc ăn trưa và nghỉ ngơi\n12h15 lên xe di chuyển đến vườn nhãn Long Biên\n14h-16h15 chụp tại vườn nhãn\n16h30 lên xe về Phủ Lý\n19h chụp party night tại Vinpearl\nMng đọc để nắm lịch và xin phép bố mẹ nhé",
        createdBy: "Ngô Phương Anh",
        image: [{ img_id: 1, url: "no" }],
        date: "2021-01-23 20:58:59",
      },
    ],
    otherNotifications: 6,
  };
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
        <View className="mt-4 bg-white flex-1 p-5  shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="font-medium text-xl">Bài tập về nhà</Text>
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
