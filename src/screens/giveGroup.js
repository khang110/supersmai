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
import FilterCategory from '../components/Modal/FilterCategory';
import GiveRows from '../components/rows/giveRows';
import ButtonCancel from '../components/button/buttonCancel';
function GiveGroups(props) {
  const { navigation, dispatch } = props;
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [listAfterFilter, setlistAfterFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [typeAuthor, settypeAuthor] = useState(props.route.params.typeAuthor);
  const [modalVisible, setModalVisible]= useState(false);
  const addr = props.dataFilter.addressFilter;
  let categoryFilter = props.dataFilter.categoryFilter;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "RESET_FILTER_ADDRESS" });
            dispatch({ type: "RESET_FILTER_CATEGORY" });
            navigation.goBack();
          }}
          style={{ marginLeft: "10%" }}
        >
          <Entypo name="chevron-thin-left" size={25} color="#FFF" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <ButtonCancel
          onPress={() => {
            dispatch({ type: "RESET_FILTER_ADDRESS" });
            dispatch({ type: "RESET_FILTER_CATEGORY" });
            navigation.navigate("Home");
          }}
        />
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
  const filterCategory = (arrayProduct, listTemp) => {
    if (categoryFilter.length != 0) {
      const list = [];
      for (let i = 0; i < listTemp.length; i++) {
        for (let j = 0; j < arrayProduct.length; j++) {
          if (
            listTemp[i].NameProduct[0].Category == arrayProduct[j].Category &&
            listTemp[i].NameProduct[0].NameProduct ==
              arrayProduct[j].NameProduct
          ) {
            list.push(listTemp[i]);
          }
        }
      }

      setData(list);
    }
  };
  const filterTwoOption = () => {
    if (addr.length != 0 && categoryFilter.length != 0) {
      const list = [];
      const listTemp = [...listAfterFilter];
      for (let i = 0; i < listTemp.length; i++) {
        for (let j = 0; j < categoryFilter.length; j++) {
          if (
            listTemp[i].NameProduct[0].Category == categoryFilter[j].Category &&
            listTemp[i].NameProduct[0].NameProduct ==
              categoryFilter[j].NameProduct
          ) {
            list.push(listTemp[i]);
          }
        }
      }
      const listAddr = list.filter((pr) => {
        if (pr.address.indexOf(addr) != -1) {
          return true;
        } else return false;
      });
      setData(listAddr);
    }
  };
  useEffect(() => {
    if (categoryFilter.length == 0 && addr.length == 0) {
      setData(listAfterFilter);
    }
    if (addr.length != 0 && categoryFilter.length == 0) {
      filterAddressFunc(addr, listAfterFilter);
    }
    if (addr.length != 0 && categoryFilter.length != 0) {
      filterTwoOption();
    }
    if (addr.length == 0 && categoryFilter.length != 0) {
      filterCategory(categoryFilter, listAfterFilter);
    }
  }, [categoryFilter, addr]);
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
        setlistAfterFilter(resjson.data);
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
          onPress={() => setModalVisible(true)}
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
      <FilterCategory modalVisible={modalVisible} closeModal={() => setModalVisible(false)}/>
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
