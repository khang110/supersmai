import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
const heightStatusBar = StatusBar.currentHeight;
import config from "../config/config";
import SearchButton from "../components/search/buttonSearch";
import Gift from "../components/groupButton/groupGive";
import GroupCategory from "../components/groupButton/groupCategory";

function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundTop}>
        <Text style={styles.textSayHi}>Hi, Nguyễn Duy Phú Lợn</Text>
        <SearchButton />
      </View>
      <Gift />
      <View style={styles.discoverCategory}>
        <Text style={styles.textDisCate}>Khám phá danh mục</Text>
        <GroupCategory />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: heightStatusBar,
  },
  backgroundTop: {
    backgroundColor: config.main_color,
    height: "20%",
    justifyContent: "space-between",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  textSayHi: {
    color: config.white,
    fontWeight: "bold",
    fontSize: config.fontsize_3,
    marginLeft: config.margin_2,
    marginTop: config.margin_3,
  },
  discoverCategory: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingBottom: config.margin_1,
    paddingTop: config.margin_1,
    marginLeft: config.margin_2,
    marginRight: config.margin_2,
  },
  textDisCate: {
    marginLeft: config.margin_2,
    marginBottom: config.margin_2,
    fontWeight: "bold",
    color: "#03274D",
    fontSize: config.fontsize_4,
  },
});
export default Home;
