import React from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import HomeScreenCarousel from "../../components/HomeScreenCarousel";
import SameHeader from "../../components/SameHeader";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

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
      >
        <HomeScreenCarousel />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
