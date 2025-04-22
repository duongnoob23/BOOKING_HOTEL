// src/screens/DetailScreen.js
import React from "react";
import { View, Button, Text } from "react-native";

const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detail Screen</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailScreen;
