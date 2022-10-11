import React from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
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
      ></ScrollView>
    </>
  );
};

export default HomeScreen;
