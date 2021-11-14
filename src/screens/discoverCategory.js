import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert, TouchableWithoutFeedback, Keyboard
} from "react-native";
import color from "../config/color";
import { connect } from "react-redux";
import fontSize from "../config/fontsize";
import config from "../config/config";
import axios from "axios";
import NewsRow from "../components/rows/newsRow";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import FilterAddress from "../components/Modal/FIlterAddress";
const apiURL = `https://api.smai.com.vn/post/getPostByTypeAuthor?typeauthor=tangcongdong`;
function DiscoverCategory(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const addr = props.dataFilter.addressFilter;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "RESET_FILTER_ADDRESS" });
            navigation.goBack();
          }}
          style={{ marginLeft: "10%" }}
        >
          <Entypo name="chevron-thin-left" size={25} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const filterAddressFunc = (address, list) => {
    const listTemp = list.filter((pr) => {
      if (pr.address.indexOf(address) != -1) {
        return true;
      } else return false;
    });
    setData(listTemp);
  };
  useEffect(() => {
    if (addr != "") {
      filterAddressFunc(addr, dataFilter)
    }
    if (addr =="") {
      setData(dataFilter)
    }
  }, [addr]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(apiURL)
      .then((resjson) => {
        setData(resjson.data);
        setDataFilter(resjson.data);
    
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (text == "") setData(dataFilter);
    else {
      const data = dataFilter.filter((pr) => {
        if (
          pr.NameAuthor.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
          pr.title.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
          pr.address.toLowerCase().indexOf(text.toLowerCase()) != -1 
        )
          return true;
        else return false;
      });
      setData(data);
    }
  };
 
  
  const pressRow = (dataPost) => {
    navigation.navigate("DetailPost", { data: dataPost });
  };
  const renderItem = ({ item }) => {
    return <NewsRow data={item} onPress={() => pressRow(item)} />;
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <View style={{ padding: "2%", flexDirection: "row" }}>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={(text) => handleSearch(text)}
          value={query}
          style={{ borderRadius: 10, width: "60%" }}
        />
        <TouchableOpacity
          style={styles.wrapFilterAddr}
          onPress={() => setShowModalAddress(true)}
        >
          <Text style={{ color: "#616161", fontSize: fontSize.fontsize_5 }}>
            Tỉnh/thành phố
          </Text>
          <AntDesign name="caretdown" size={10} color="#BDBDBDBD" />
        </TouchableOpacity>
      </View>
      <FilterAddress
        modalVisible={showModalAddress}
        closeModal={() => setShowModalAddress(false)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapFilterAddr: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
  },
});

export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    dataFilter: state.dataFilter,
  };
})(DiscoverCategory);
