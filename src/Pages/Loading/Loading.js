import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={sytles.loading}>
      <Text style={sytles.loading_text}>LOADINGGGG</Text>
    </View>
  );
};

const sytles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading_text: {
    fontSize: 40,
  },
});

export default Loading;
