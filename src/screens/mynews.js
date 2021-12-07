import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  SafeAreaView, TouchableWithoutFeedback, RefreshControl
} from "react-native";
import MyNewsRow from "../components/rows/mynewsrow";
import { SpeedDial } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";

const token =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MTFjMDY3MGE1MjU4MzAwMjIzM2I1MzUiLCJpYXQiOjE2MzU3NDAwNjB9.sATc8Ly5P7YexK1lLilNNdhehMf44feEclFYDOmiEX4";
function Mynews(props) {
  const { navigation } = props;
  const [refresh, setrefresh] = useState(true);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tất cả", value: "1" },
    { label: "Tặng cộng đồng", value: "2" },
    { label: "Cần hỗ trợ", value: "3" },
  ]);
  useEffect(() => {
    getMyPost();
  }, []);
  const getMyPost = async () => {
    await axios({
      method: "get",
      url: "https://api.smai.com.vn/post/getPostByAccountId",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setData(res.data);
        setDataAll(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      }).finally(() => setrefresh(false));
  };
  const onRefresh = () => {
    setData([]);
    getMyPost();
  }
  const filter = (itemvalue) => {
    let tempData = dataAll;
      if (itemvalue == 1) {
        setData(tempData);
      }
      if (itemvalue == 2) {
        const listTemp1 = tempData.filter((pr) => {
          if (pr.TypeAuthor == "tangcongdong") {
            return true;
          } else return false;
        });
        setData(listTemp1);
      }
      if (itemvalue == 3) {
        const listTemp1 = tempData.filter((pr) => {
          if (pr.TypeAuthor != "tangcongdong") {
            return true;
          } else return false;
        });
        setData(listTemp1);
      }
    
  };
  const pressRow = (dataPost) => {
    navigation.navigate("DetailPost", { data: dataPost });
  };
  const renderItem = ({ item }) => {
    return <MyNewsRow data={item} onPress={() => pressRow(item)} />;
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };
  return (
    <TouchableWithoutFeedback onPress={() => setOpenFilter(false)}>
      <View style={styles.containerStyle}>
        <View style={{ paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%' }}>
          <DropDownPicker
            placeholder="Tất cả"
            open={openFilter}
            value={value}
            items={items}
            setOpen={setOpenFilter}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(value) => {
              filter(value);
            }}
            containerStyle={{ width: '60%', }}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={[color.main_color]}
            />
          }
        />
        <SpeedDial
          isOpen={open}
          icon={{ name: "edit", color: "#fff" }}
          openIcon={{ name: "close", color: "#fff" }}
          onOpen={() => { setOpen(!open); setOpenFilter(false) }}
          onClose={() => setOpen(!open)}
          color={color.main_color}
        >
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Cần hỗ trợ"
            onPress={() => navigation.navigate("CategoryNeedHelp")}
            color={color.main_color}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Tặng cộng đồng"
            onPress={() => navigation.navigate("Category")}
            color={color.main_color}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Tặng hoàn cảnh khó khăn"
            onPress={() => console.log("Add Something")}
            color={color.main_color}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Tặng Quỹ/Nhóm từ thiện"
            onPress={() => console.log("Delete Something")}
            color={color.main_color}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Đóng góp công ích "
            onPress={() => console.log("Delete Something")}
            color={color.main_color}
          />
        </SpeedDial>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.gray_4
  },
  safeContainerStyle: {
    margin: 20,
    backgroundColor: "#BDBDBD",
  },
});
export default Mynews;
