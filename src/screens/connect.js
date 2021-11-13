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
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import { Searchbar } from "react-native-paper";
import Chip from "../components/Chips/chip";
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
const token =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MTFjMDY3MGE1MjU4MzAwMjIzM2I1MzUiLCJpYXQiOjE2MzU3NDAwNjB9.sATc8Ly5P7YexK1lLilNNdhehMf44feEclFYDOmiEX4";
function Connect() {
  const [query, setQuery] = useState("");
  const flatlistRef = useRef(null);
  const [listitem, setListItem] = useState(list);
  const [itemSelected, setItemSelected] = useState("0");
  const handleSearch = (text) => {
    setQuery(text);
    // if (text == "") setData(datafilter);
    // else {
    //   const data = datafilter.filter((pr) => {
    //     if (
    //       pr.NameAuthor.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
    //       pr.title.toLowerCase().indexOf(text.toLowerCase()) != -1
    //     )
    //       return true;
    //     else return false;
    //   });
    //   setData(data);
    // }
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

  const renderItemChip = ({ item, index }) => {
    return (
      <Chip
        title={item.title}
        active={item.checked}
        onPress={() => handlePressChip(item, index)}
      />
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
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { marginTop: "2%", marginLeft: "2%", marginRight: "2%" },
});
export default Connect;
