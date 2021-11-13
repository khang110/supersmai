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
  Alert,
} from "react-native";
import color from "../config/color";
import { connect } from "react-redux";
import fontSize from "../config/fontsize";
import config from "../config/config";
import axios from "axios";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import FilterAddress from "../components/Modal/FIlterAddress";
import GiveRows from '../components/rows/giveRows';

function GiveGroups(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [datafilter, setDataFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [typeAuthor, settypeAuthor] = useState(props.route.params.typeAuthor);
  const addr = props.dataFilter.addressFilter;

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const apiURL = `https://api.smai.com.vn/post/getPostByTypeAuthor?typeauthor=${typeAuthor}`;
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
    if (text == "") setData(datafilter);
    else {
      const data = datafilter.filter((pr) => {
        if (
          pr.NameAuthor.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
          pr.title.toLowerCase().indexOf(text.toLowerCase()) != -1
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
    return <GiveRows data={item} onPress={() => pressRow(item)} />;
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm"
        onChangeText={(text) => handleSearch(text)}
        value={query}
        style={{ marginTop: '2%', marginLeft: '2%', marginRight: '2%'}}
      />
      <View style={{ padding: "2%", flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.wrapFilterButton}
          activeOpacity={0.5}
          onPress={() => pressFilter()}
        >
          <Text style={styles.wrapFilterCate}>Danh mục</Text>
          <AntDesign
            name="appstore-o"
            size={config.screen_width * 0.05}
            color="#909090"
            style={{ position: "absolute", right: "5%" }}
          />
        </TouchableOpacity>
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
  wrapFilterButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "60%",
    maxWidth: "60%",
    padding: '2%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: 'center'
  },
  wrapFilterCate: {
    fontSize: fontSize.fontsize_5,
    color: color.gray_2,
    textAlign: "center",

  },
});

export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    dataFilter: state.dataFilter,
  };
})(GiveGroups);
