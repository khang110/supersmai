import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  Alert, TextInput,
  SafeAreaView, TouchableWithoutFeedback, RefreshControl
} from "react-native";
import MyNewsRow from "../components/rows/mynewsrow";
import { SpeedDial } from "react-native-elements";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { connect } from "react-redux";
import login from '../../assets/nologin.png';
import noNews from '../../assets/login.png';
import config from "../config/config";
import fontsize from "../config/fontsize";
function Mynews(props) {
  const { navigation, dispatch } = props;
  const [query, setQuery] = useState("");
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
    if (props.auth.isLogin) {
      getMyPost()
    } else {
      setrefresh(false)
    }
   ;
    // console.log(props.auth.token)
  }, [props.auth.isLogin]);
  const getMyPost = async () => {
    const token = "bearer " + props.auth.token;
    await axios({
      method: "get",
      url: "https://app-super-smai.herokuapp.com/post/getPostByAccountId",
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
  const showPost = async (id, status) => {
    console.log(id)
    let body = "";
    body = { statusdiplay: !status };
    let url = "https://app-super-smai.herokuapp.com/post/update-post?idpost=" + id;
    axios({
      method: "put",
      url: url,
      data: body,
      headers: {
        Authorization: "bearer" + props.auth.token,
      },
    })
      .then((res) => {
        if (res.status == 201) {
          // alert("Xoá bài thành công.");
          onRefresh();
          status
            ? Alert.alert("Thông báo", "Đã ẩn tin", [{ text: "OK" }])
            : Alert.alert("Thông báo", "Đã hiện tin", [{ text: "OK" }]);
        }
      })
  };
  const onRefresh = () => {
    setData([]);
    getMyPost();
  }
  const handleSearch = (text) => {
    setQuery(text);
    if (text == "") setData(dataAll);
    else {
      const data = dataAll.filter((pr) => {
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
  const handleGive = (id) => {
    navigation.navigate("ListGiveTCD", {
      postId: id,
    }); //chuyển trang
  }
  const pressRow = (dataPost) => {
    navigation.navigate("DetailPost", { data: dataPost });
  };
  const renderItem = ({ item }) => {
    return <MyNewsRow data={item} onPress={() => pressRow(item)} hideNews={() => showPost(item._id, item.isDisplay)} pressGive={() => handleGive(item._id)}/>;
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };
  const renderNotLogin = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={login} style={{width: config.screen_width*0.8, height: config.screen_width*0.8}}/>
        <Text style={{fontSize: fontsize.fontsize_5}}>Chưa đăng nhập</Text>
      </View>
    )
  }
  return (
    <>
    <TouchableWithoutFeedback onPress={() => setOpenFilter(false)}>
      <View style={styles.containerStyle}>
        <View style={{ paddingTop: "2%", paddingLeft: '4%', paddingRight: '4%', paddingBottom: '2%', alignItems: 'center', flexDirection: "row", justifyContent: 'space-between' }}>
        <View style={styles.wrapSearch}>
            <EvilIcons name="search" size={30} color="#BDBDBD" />
            <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder="Tìm kiếm"
            style={styles.searchText}
            />
        </View>
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
            containerStyle={{ width: '40%'}}
          />
      </View>
        {props.auth.isLogin ? (<>
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
            onPress={() => {
              dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
              navigation.navigate("Category")}}
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
        </SpeedDial></>
        ) : (<>{renderNotLogin()}</>)}
      </View>
    </TouchableWithoutFeedback></>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#EEE",
  },
  safeContainerStyle: {
    margin: 20,
    backgroundColor: "#DDD",
  },
  wrapSearch: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "55%",
    maxWidth: "55%",
    paddingLeft: '2%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    height: 48
  },
  searchText: {
    backgroundColor: "#fff",
    fontSize: config.fontsize_5,
    maxWidth: "80%",
    
    width: "80%",
  },
});

export default connect(function (state) {
  return { auth: state.auth, profile: state.profile };
})(Mynews);