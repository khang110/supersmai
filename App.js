import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import post from "./src/api/postApi";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import store from './Redux.js';
export default function App(props) {
  post.getNewPost().then((res) => {
    console.log(res);
  });
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
      <AppNavigator />
      </View>
    
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
