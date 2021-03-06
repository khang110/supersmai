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
import { MaterialCommunityIcons, Entypo, AntDesign, EvilIcons } from "@expo/vector-icons";
import FilterAddress from "../components/Modal/FIlterAddress";
import FilterCategory from '../components/Modal/FilterCategory';
import GiveRowTCD from '../components/rows/giveRowTCD';
import ButtonCancel from '../components/button/buttonCancel';
import AnimatedLoader from "react-native-animated-loader";
import DialogConfirm from '../components/Dialog/DialogInput';
import Spinner from 'react-native-loading-spinner-overlay';
function GiveGroups(props) {
  const { navigation, dispatch } = props;
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [listAfterFilter, setlistAfterFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [modalVisible, setModalVisible]= useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [isloading, setIsloading] = useState(false);
  let postId = props.route.params.postId;
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
  }, [isloading]);

  const getData = () => {
    axios({
        method: "get",
        url: `https://app-super-smai.herokuapp.com/transaction/transaction-post?postId=${postId}`,
        headers: {
          Authorization: "bearer " + props.auth.token,
        },
      })
      .then((resjson) => {
       
        setData(resjson.data.data.data);
        setDataFilter(resjson.data.data.data);
        setlistAfterFilter(resjson.data.data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const pressConfirm = (id) => {
    setDialogVisible(true)
    setIdPost(id);
  }

  const handleDelete = async (text) => {
    setDialogVisible(false)
    setIsloading(true);
    let body =  { status: "waiting", notereceiver: text};
    await axios({
      method: "put",
      url: `https://app-super-smai.herokuapp.com/transaction/update-status?transactionId=${idPost}`,
      data: body,
      headers: {
        Authorization: "bearer " + props.auth.token,
      },
    })
      .then((res) => {
        console.log("???? xong")
        setIsloading(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
      
      })
  }

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

  const renderItem = ({ item }) => {
    return <GiveRowTCD  data={item} onPress={() => pressConfirm(item._id)}/>;
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };
  return (
    <View style={styles.container}>
     
      <View style={{ padding: "2%", flexDirection: "row" }}>
        <View style={styles.wrapSearch}>
            <EvilIcons name="search" size={30} color="#BDBDBD" />
            <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder="T??m ki???m"
            style={styles.searchText}
            />
        </View>
        <TouchableOpacity
          style={styles.wrapFilterAddr}
          onPress={() => setShowModalAddress(true)}
        >
          <Text style={{ color: "#616161", fontSize: fontSize.fontsize_5 }}>
            T???nh/th??nh ph???
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
      <View>
      <Spinner visible={isloading}  textContent={"??ang x??? l??..."} textStyle={styles.spinnerTextStyle}/>
      <DialogConfirm title="X??c nh???n"
      visible={dialogVisible} handleDelete={handleDelete} handleCancel={() => setDialogVisible(false)}/>
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  wrapSearch: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "55%",
    maxWidth: "55%",
    paddingLeft: "1%",
    marginLeft: "5%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    height: 40
  },
  searchText: {
    backgroundColor: "#fff",
    fontSize: config.fontsize_5,
    marginLeft: "3%",
    maxWidth: "80%",
    width: "80%",
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
    borderRadius: 20,
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
    auth: state.auth
  };
})(GiveGroups);
