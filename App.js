import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import post from "./src/api/postApi";
import axios from "axios";

export default function App() {
  const getData = async () => {
    await axios({
      method: "get",
      url: "http://localhost:5000/post/getNewPost",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  post.getNewPost().then((res) => {
    console.log("test 132");
    console.log(res);
  });
  useEffect(() => {});

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
