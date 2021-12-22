import React, { useEffect, useState } from "react";
import { View,TextInput, Text, StyleSheet, Image, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Feather,Entypo } from "@expo/vector-icons";
import config from "../config/config";
import color from "../config/color";
import fontSize from "../config/fontsize";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NewsRow from "../components/rows/newsRow";

import {
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
const heightStatusBar = getStatusBarHeight()//Chiều cao status bar
import { Platform } from "react-native";
export default function (props) {
   const { navigation } = props;
  const [allPost, setAllPost] = useState([]);
  const [resultSearch, setResult] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  useEffect(() => {
    const getData = async () => {
      let temp = await axios({
        method: "get",
        url: "https://app-super-smai.herokuapp.com/post/getFullPost",
      });
      setAllPost(temp.data);
      setResult(temp.data)
      // dispatch({ type: 'UPDATE', data: temp.data })
    };
    getData();
  }, []);
  const getResult =async (value) => {
    setKeySearch(value);
    if (keySearch == "") {
      await setResult(allPost);
    } else {
      const data = allPost.filter((pr) => {
        if (
          pr.NameAuthor.toLowerCase().indexOf(keySearch.toLowerCase()) != -1 ||
          pr.title.toLowerCase().indexOf(keySearch.toLowerCase()) != -1
        )
          return true;
        else return false;
      });
      setResult(data);
    }
  };
  
 
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };

  const pressRow = (dataPost) => {
    navigation.navigate("DetailPost", { data: dataPost });
  };
  const renderItem = ({ item }) => {
    return (
        <NewsRow data={item} onPress={() => pressRow(item)} />    );
  };
 

  return (
    <SafeAreaView style={{flex:1, paddingTop: heightStatusBar}}>
    
      <View style={style.wrapHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-thin-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <View style={style.wrapSearch}>
          <EvilIcons name="search" size={30} color="#BDBDBD" />
          <TextInput
            placeholder="Nhập tìm kiếm..."
            onChangeText={async (value) => getResult(value)}
            value={keySearch}
            lightTheme="true"
            autoFocus={true}
            color="black"
            style={style.searchText}
          />
        </View>
      </View>
      <FlatList
        data={resultSearch}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} 
        ItemSeparatorComponent={ItemSeparatorView}
        
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  // constainer: {
  //   backgroundColor: config.color_header_background,
  // },
  wrapHeader: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.main_color,
    marginBottom: '2%'
  },
  wrapSearch: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "85%",
    maxWidth: "85%",
    height: "70%",
    paddingLeft: "1%",
    marginLeft: "4%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
  },
  searchText: {
    backgroundColor: "#fff",
    fontSize: 18,
    marginLeft: "3%",
    maxWidth: "85%",
    width: "85%",
  },
  wrapCategory: {
    padding: 15,
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlePost: {
    fontSize: fontSize.fontsize_2,
    
  },
  wrapTime: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    fontSize: fontSize.fontsize_3,
    marginLeft: 5,
    color: "black",
   
  },
  price: {
    color: "green",
    fontSize: fontSize.fontsize_3,
   
  },
  type: {
    fontSize: fontSize.fontsize_3,
    color: "gray",
   
  },
  address: {
    color: "black",
    fontSize: fontSize.fontsize_3,
   
  },
});