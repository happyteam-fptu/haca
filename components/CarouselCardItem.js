import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 15 * 2);

const CarouselCardItem = ({ item, index }) => {
  return (
    <>
      <View style={styles.container} key={index}>
        <Image source={item.imgUrl} style={styles.image} />
        <Image
          source={require("../assets/home-slider/black-fade.png")}
          style={styles.blackFade}
        />
        <View style={styles.outer}>
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: ITEM_WIDTH,
    flex: 1,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  image: {
    width: ITEM_WIDTH,
    height: 180,
    borderRadius: 15,
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  body: {
    color: "white",
    fontSize: 15,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  outer: {
    position: "absolute",
    padding: 15,
  },
  blackFade: {
    position: "absolute",
    width: ITEM_WIDTH,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default CarouselCardItem;
