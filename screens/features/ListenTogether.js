import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  Easing,
  TouchableOpacity,
} from "react-native";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import io from "socket.io-client";
import axios from "axios";
import config from "../../global/config";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextTicker from "react-native-text-ticker";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";

const serverURL =
  config.LIVE_MUSIC_SERVER_URL + ":" + config.LIVE_MUSIC_SERVER_PORT;
const windowWidth = Dimensions.get("window").width;

const ListenTogether = () => {
  const player = React.useRef();
  const fadeAnim = React.useRef(new Animated.Value(0.65)).current;

  const [video, setVideo] = React.useState("");
  const [playing, setPlaying] = React.useState(true);
  const [currentLiveData, setCurrentLiveData] = React.useState("abc");
  const [started, setStarted] = React.useState(false);
  const [currentProgress, setProgress] = React.useState(0);

  React.useEffect(() => {
    syncWithServer();
    watchingAnimation();
    getData();
    const socket = io("ws://103.81.85.224:10070/");
    socket.connect();
    socket.on("connect", () => {
      console.log("DemoGuest" + " connected to socket server");
      socket.emit("conn", "DemoGuest");
      getData();
    });
    socket.on("refresh", () => {
      console.log("Received refresh signal from server! Now restarting...");
      syncWithServer();
      getData();
    });
    socket.on("play", () => {
      console.log("Received play signal from server! Now playing video...");
      setPlaying(true);
      getData();
    });
    socket.on("views", () => {
      console.log(
        "Received reload views count signal from server! Now reloading views count..."
      );
      getData();
    });
    return () => {
      socket.emit("discon", "DemoGuest");
      setPlaying(false);
      console.log("User exited");
    };
  }, []);

  React.useEffect(() => {
    var refresh = setInterval(() => {
      player.current
        .getCurrentTime()
        .then((currentTime) => {
          player.current
            .getDuration()
            .then((duration) => {
              setProgress(currentTime / duration);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }, 1000);
    return () => {
      clearInterval(refresh);
    };
  }, []);

  const syncWithServer = async () => {
    await axios
      .get("https://" + serverURL + "/live")
      .then((res) => {
        const position = res.data.video_in_queue.findIndex(
          (data) => data.position == res.data.now_playing_position
        );
        const videoToPlay = res.data.video_in_queue[position].video_id;
        const elapsed = res?.data?.elapsed_time;
        setVideo(videoToPlay);
        console.log("Server timestamp: " + elapsed);
        setTimeout(() => {
          player.current.seekTo(elapsed, true);
        }, 1000);
      })
      .catch((error) => {
        console.error(error.message);
        // setSnackbarShow(true);
        // setErrMsg(error.message);
        // setMsg("Không thể kết nối đến máy chủ!" + "\nMã lỗi: " + error.message);
        // Alert.alert(error.message);
      });
  };

  const getData = async () => {
    const response = await axios
      .get("https://" + serverURL + "/live")
      .catch((error) => {
        console.log(error.message);
        // setSnackbarShow(true);
        // setErrMsg(error.message);
        // setMsg("Không thể kết nối đến máy chủ!" + "\nMã lỗi: " + error.message);
      });
    setCurrentLiveData(response.data);
    return response.data;
  };

  const RenderYoutube = () => {
    return (
      <YoutubePlayer
        width={windowWidth}
        height={windowWidth / (16 / 9)}
        ref={player}
        videoId={video}
        play={playing}
        initialPlayerParams={{
          controls: false,
          rel: 0,
          showClosedCaptions: true,
          start: 100,
          cc_lang_pref: "vi",
        }}
        style={{ alignItems: "center" }}
        onChangeState={(event) => {
          if (event == "unstarted") {
            console.log(
              "The player hasn't started yet. Now syncing duration time with server..."
            );
            syncWithServer();
          }
          if (event == "ended") {
            console.log("Video is ended, now loading next song...");
            syncWithServer();
            setPlaying(true);
            getData();
          }
          if (event == "paused") {
            console.log("Video is paused...");
            setPlaying(false);
            console.log("Is playing: " + playing);
          }
          if (event == "playing") {
            watchingAnimation();
            setStarted(true);
          }
        }}
      />
    );
  };

  const watchingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.65,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const title = () => {
    if (currentLiveData != "abc" && currentLiveData.now_playing_video_info) {
      return currentLiveData.now_playing_video_info.video_title;
    } else {
      return "Đang tải...";
    }
  };

  const song_img = (setting) => {
    if (currentLiveData != "abc" && currentLiveData.now_playing_video_info) {
      return {
        uri: currentLiveData.now_playing_video_info.video_thumbnail,
      };
    } else {
      if (setting == "bg") {
        return require("../../assets/listen-together/gray_load.png");
      } else {
        return require("../../assets/listen-together/song_load.jpeg");
      }
    }
  };

  const channel = (setting) => {
    if (currentLiveData != "abc" && currentLiveData.now_playing_video_info) {
      if (setting == "request") {
        return currentLiveData.now_playing_video_info.requested_by;
      }
      return currentLiveData.now_playing_video_info.uploaded_by;
    } else {
      return "";
    }
  };

  return (
    <>
      <View className="bg-black items-center" pointerEvents="none">
        <View style={style.liveBadge_container}>
          <Animated.View
            style={
              playing
                ? {
                    backgroundColor: "red",
                    padding: 5,
                    borderRadius: 5,
                    opacity: fadeAnim,
                  }
                : {
                    backgroundColor: "#7F7F7F",
                    padding: 5,
                    borderRadius: 5,
                    opacity: 1,
                  }
            }
          >
            <Text style={style.liveBadge_text}>Trực tiếp</Text>
          </Animated.View>
          <View style={style.liveBadge_watching}>
            <View style={{ paddingLeft: 3, paddingRight: 6 }}>
              <Ionicons name={"eye"} size={16} color={"white"} />
            </View>
            <Text style={style.liveBadge_watching_text}>
              {currentLiveData.users_watching}
            </Text>
          </View>
        </View>
        {RenderYoutube()}
      </View>
      <View style={style.nowPlayingBox}>
        <ImageBackground
          source={song_img("bg")}
          style={style.nowPlayingBox_coverBg}
          blurRadius={4.5}
        >
          <ProgressBar
            indeterminate={!started}
            progress={
              isNaN(currentProgress) || !isFinite(currentProgress)
                ? 0
                : currentProgress
            }
            color={"#fff"}
          />
          <View style={style.nowPlayingBox_upperContainer}>
            <View style={style.nowPlayingBox_songImg}>
              <Image
                source={song_img()}
                style={{
                  width: 85,
                  height: 45,
                }}
              ></Image>
            </View>
            <MaskedView
              maskElement={
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    "rgba(0,0,0,0)",
                    "rgba(0,0,0,1)",
                    "rgba(0,0,0,1)",
                    "rgba(0,0,0,0)",
                  ]}
                  locations={[0, 0.05, 0.95, 1]}
                  style={{
                    width: "97%",
                    marginLeft: 3,
                    height: 40,
                    position: "absolute",
                    zIndex: 10,
                  }}
                ></LinearGradient>
              }
              style={style.nowPlayingBox_middle}
              pointerEvents="none"
            >
              <TextTicker
                bounce
                bounceDelay={1500}
                easing={Easing.linear}
                animationType={"bounce"}
                bounceSpeed={50}
                marqueeDelay={750}
                bouncePadding={{ left: 0, right: 10 }}
                style={style.textTicker}
                shouldAnimateTreshold={5}
              >
                {title()}
              </TextTicker>
              <TextTicker
                bounce
                bounceDelay={1500}
                easing={Easing.linear}
                animationType={"bounce"}
                bounceSpeed={50}
                marqueeDelay={750}
                style={{
                  color: "white",
                  fontSize: 13,
                  lineHeight: 20,
                  paddingLeft: 10,
                }}
                bouncePadding={{ left: 0, right: 10 }}
                shouldAnimateTreshold={5}
              >
                {channel()}
              </TextTicker>
            </MaskedView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  getData();
                  syncWithServer();
                }}
              >
                <Ionicons
                  name={"reload-outline"}
                  size={30}
                  color={"white"}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPlaying(!playing);
                  if (!playing) {
                    getData();
                    syncWithServer();
                  }
                }}
              >
                {playing ? (
                  <Ionicons
                    name={"pause-outline"}
                    size={30}
                    color={"white"}
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <Ionicons
                    name={"play"}
                    size={30}
                    color={"white"}
                    style={{ marginRight: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  YTrender: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
  },
  nowPlayingBox: {
    backgroundColor: "white",
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: -1,
  },
  nowPlayingBox_coverBg: {
    width: windowWidth,
    height: 60,
    flex: 1,
    resizeMode: "cover",
  },
  nowPlayingBox_upperContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)",
    padding: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nowPlayingBox_songImg: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  nowPlayingBox_middle: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    maxWidth: windowWidth - 165,
    marginLeft: -10,
    marginRight: 20,
  },
  textTicker: {
    fontWeight: "700",
    fontSize: 16,
    color: "white",
    paddingLeft: 10,
  },
  liveBadge_container: {
    position: "absolute",
    zIndex: 10,
    left: 10,
    top: 10,
    display: "flex",
    flexDirection: "row",
  },
  liveBadge: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  liveBadge_offsync: {
    backgroundColor: "#7F7F7F",
    padding: 5,
    borderRadius: 5,
  },
  liveBadge_text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  liveBadge_watching: {
    marginLeft: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  liveBadge_watching_text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "500",
    paddingRight: 2,
  },
});

export default ListenTogether;
