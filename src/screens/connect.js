import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  SectionList,
  Keyboard, RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import fontSize from "../config/fontsize";
import { Searchbar } from "react-native-paper";
import Chip from "../components/Chips/chip";
import ConnectRows from "../components/rows/connectRows";
import { connect } from "react-redux";
const list = [
  {
    title: "Tất cả",
    id: "0",
    checked: true,
  },
  {
    title: "Chưa tặng",
    id: "4",
    checked: false,
  },
  {
    title: "Chưa nhận",
    id: "3",
    checked: false,
  },
  {
    title: "Đã tặng",
    id: "2",
    checked: false,
  },
  {
    title: "Đã nhận",
    id: "1",
    checked: false,
  },
  {
    title: "Hủy tặng",
    id: "6",
    checked: false,
  },
  {
    title: "Hủy nhận",
    id: "5",
    checked: false,
  },
];

function Connect(props) {
  const [query, setQuery] = useState("");
  const flatlistRef = useRef(null);
  const [listitem, setListItem] = useState(list);
  const [itemSelected, setItemSelected] = useState("0");
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [refresh, setrefresh] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerSearchBar: {
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    });
  }, [navigation]);
  useEffect(() => {
    getConnectPostDS();
  }, []);
  const onRefresh = () => {
    setData([]);
    getConnectPostDS();
  }

  const getConnectPostDS = async () => {
    const array = [...listitem];
    array.map((value, index) => {
      if (index == 0) {
        value.checked = true;
      } else {
        value.checked = false;
      }
    });
    setListItem(array);
   
    await axios({
      method: "get",
      url: "https://app-super-smai.herokuapp.com/transaction/transaction-connected",
      headers: {
        Authorization: "bearer " + props.auth.token,
      },
    })
      .then((res) => {
        setDataAll(res.data.data.data);
        setData(res.data.data.data);
        // console.log(res.data.data.data)
      })
      .catch((error) => {
        console.log("Error: ", error);
      }).finally(() => setrefresh(false))
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (text == "") setData(dataAll);
    else {
      let a1 = [];
      for (let i = 0; i < dataAll.length; i++) {
        let temp = dataAll[i].data;
        let arr = temp.filter((item) => {
          if (
            item.SenderUser[0].FullName.toLowerCase().indexOf(
              text.toLowerCase()
            ) != -1 ||
            item.PostData.NameAuthor.toLowerCase().indexOf(
              text.toLowerCase()
            ) != -1
          )
            return true;
          else return false;
        });
        if (arr.length != 0) {
          let obj = {
            data: arr,
            title: dataAll[i].title,
          };
          a1.push(obj);
        }
      }
      setData(a1);
    }
  };
  useEffect(() => {
    if (itemSelected >= 3) {
      flatlistRef.current.scrollToIndex({
        index: itemSelected,
        animated: false,
        viewPosition: 0,
      });
    }
  }, [itemSelected]);
  const handlePressChip = (item, index) => {
    if (item.checked != true) {
      item.checked = !item.checked;
      const array = [...listitem];
      array.map((value, index) => {
        if (value != item) {
          value.checked = false;
        }
      });
      setListItem(array);
      setItemSelected(index);
      filter(item.id);
    }
  };
  const filter = (itemvalue) => {
    if (itemvalue == "0") {
      setData(dataAll);
    }
    if (itemvalue == "1") {
      let a1 = renderFilterData("Đã nhận");
      setData(a1);
    }
    if (itemvalue == "2") {
      let a1 = renderFilterData("Đã tặng");
      setData(a1);
    }
    if (itemvalue == "3") {
      let a1 = renderFilterData("Chưa nhận");
      setData(a1);
    }
    if (itemvalue == "4") {
      let a1 = renderFilterData("Chưa tặng");
      setData(a1);
    }
    if (itemvalue == "5") {
      let a1 = renderFilterData("Hủy nhận");
      setData(a1);
    }
    if (itemvalue == "6") {
      let a1 = renderFilterData("Hủy tặng");
      setData(a1);
    }
  };
  const renderFilterData = (typeTran) => {
    let tempData = [...dataAll];
    let a1 = [];
    for (let i = 0; i < tempData.length; i++) {
      let temp = tempData[i].data;
      let arr = temp.filter((item) => {
        if (item.typetransaction == typeTran) {
          return true;
        } else {
          return false;
        }
      });
      if (arr.length != 0) {
        let obj = {
          data: arr,
          title: tempData[i].title,
        };
        a1.push(obj);
      }
    }
    return a1;
  };
  const pressRow = (dataPost) => {
    navigation.navigate("DetailConnect", { data: dataPost });
  }
  const renderItemChip = ({ item, index }) => {
    return (
      <Chip
        title={item.title}
        active={item.checked}
        onPress={() => handlePressChip(item, index)}
      />
    );
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };
  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.wrapTitleSection}>
        <Text style={styles.titleSection}>{section.title}</Text>
      </View>
    );
  };
  
  const renderItemSection = ({ item }) => {
    return <ConnectRows data={item} onPress={() => pressRow(item)}/>;
  };
  const renderListHeader = () => {
    return (
      <View style={{ margin: "2%" }}>
        <FlatList
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          ref={flatlistRef}
          data={listitem}
          horizontal={true}
          getItemLayout={(data, index) => ({
            length: 90,
            offset: 90 * index,
            index,
          })}
          renderItem={renderItemChip}
        />
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={(text) => handleSearch(text)}
          value={query}
          style={styles.searchBar}
        />

        <SectionList
          sections={data}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItemSection}
          ListHeaderComponent={renderListHeader}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={[color.main_color]}
            />
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { marginTop: "2%", marginLeft: "2%", marginRight: "2%" },
  wrapTitleSection: {
    backgroundColor: "#DDD",
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "2%",
    paddingRight: "2%",
    marginBottom: '2%',
    marginTop: '2%'
  },
  titleSection: {
    fontSize: fontSize.fontsize_3,
    color: "#000",
    fontWeight: "bold",
  },
});
export default connect(function (state) {
  return { auth: state.auth };
})(Connect);

