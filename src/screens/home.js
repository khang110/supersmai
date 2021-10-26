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
} from "react-native";
const heightStatusBar = StatusBar.currentHeight;
import config from "../config/config";
import SearchButton from "../components/search/buttonSearch";
import Gift from "../components/gift/buttonGive";
import ButtonCategory from '../components/gift/buttonCategory';
import { Avatar } from "react-native-elements";
function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundTop}>
        <SearchButton />
      </View>
      <Gift />
      <View style={{backgroundColor: '#FFF', margin: config.margin_2, borderRadius: 20, 
      paddingBottom: config.margin_1,
      paddingTop: config.margin_1}}>
        <Text style={{marginLeft: config.margin_2, marginBottom: config.margin_2, 
          fontWeight: 'bold', color: '#03274D', fontSize: config.fontsize_5}}>Khám phá danh mục</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ButtonCategory/>
          <ButtonCategory/>
          <ButtonCategory/>
          <ButtonCategory/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ButtonCategory/>
          <ButtonCategory/>
          <ButtonCategory/>
          <ButtonCategory/>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: heightStatusBar,
  },
  backgroundTop: {
    backgroundColor: config.main_color,
    height: "20%",
    justifyContent: "flex-end",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});
export default Home;
