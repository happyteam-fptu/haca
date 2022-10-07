import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";

const ProgressHUD = ({ visible, loadText, noBackground = false }) => {
  return (
    <>
      <Modal
        animationType="fade"
        onRequestClose={() => null}
        visible={visible}
        transparent={true}
      >
        <View
          className={`flex-1 w-full h-full z-50 absolute items-center justify-center ${
            !noBackground && "bg-black/20"
          }`}
        >
          <View className="rounded-lg p-2 bg-black/[.85] shadow-white shadow-sm justify-center items-center">
            <ActivityIndicator
              size={"large"}
              color="rgba(255,255,255,0.8)"
              className="mt-2"
            />
            <Text className="text-white mt-2">{loadText}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProgressHUD;
