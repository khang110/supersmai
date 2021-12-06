import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
const uriImage =
  "https://images.pexels.com/photos/9727100/pexels-photo-9727100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const heightStatusBar = StatusBar.currentHeight;
import config from "../config/config";
import SearchButton from "../components/search/buttonSearch";
import Gift from "../components/groupButton/groupGive";
import GroupCategory from "../components/groupButton/groupCategory";
import NewsRow from "../components/rows/newsRow";
import axios from "axios";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";

function Home(props) {
  const [data, setData] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const { navigation, dispatch } = props;
  useEffect(() => {
    getData();
    checkTokenLocal();
  }, []);

  // check Token local
  const checkTokenLocal = async () => {
     let result = await SecureStore.getItemAsync("token");
     let avatar = await SecureStore.getItemAsync("avatar");
     let PhoneNumber = await SecureStore.getItemAsync("PhoneNumber");
     let FullName = await SecureStore.getItemAsync("FullName");
     if (result) {
       dispatch({
         type: "SIGN_IN",
         token: result,
         PhoneNumber: PhoneNumber,
         FullName: FullName,
       });
       dispatch({ type: "GET_AVATAR", avatar: avatar });
     } else {
       return await null;
     }
  };

  const getData = async () => {
    await axios({
      method: "get",
      url: "https://api.smai.com.vn/post/getNewPost",
    })
      .then((resjson) => {
        setData(resjson.data);
        // console.log(resjson.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setrefresh(false));
  };
  const pressRow = (dataPost) => {
    navigation.navigate("DetailPost", { data: dataPost });
  };
  const renderItem = ({ item }) => {
    return <NewsRow data={item} onPress={() => pressRow(item)} />;
  };
  const ListHeader = () => {
    return (
      <>
        <View style={styles.backgroundTop}>
          <Text style={styles.textSayHi}>Hi, Nguyễn Duy Phú Lợn</Text>
          <SearchButton />
        </View>
        <Gift navigation={navigation} />
        <Text style={styles.textDisCate}>Khám phá tin đăng tặng</Text>
        <View style={styles.discoverCategory}>
          <GroupCategory navigation={navigation} />
        </View>
        <Text style={styles.textDisCate}>Tin đăng mới</Text>
      </>
    );
  };
  const ItemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={ListHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: heightStatusBar,
  },
  backgroundTop: {
    backgroundColor: config.main_color,
    height: config.screen_width * 0.3,
    justifyContent: "space-between",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: config.margin_2,
  },
  textSayHi: {
    color: config.white,
    fontWeight: "bold",
    fontSize: config.fontsize_3,
    marginLeft: config.margin_2,
    marginTop: config.margin_3,
  },
  discoverCategory: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingBottom: config.margin_1,
    paddingTop: config.margin_1,
    marginLeft: config.margin_2,
    marginRight: config.margin_2,
  },
  textDisCate: {
    marginLeft: config.margin_3,
    marginBottom: config.margin_1,
    marginTop: config.margin_1,
    fontWeight: "bold",
    color: "#03274D",
    fontSize: config.fontsize_4,
  },
  hotNews: {
    backgroundColor: "#FFF",
    marginLeft: "4%",
    marginRight: "4%",
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingTop: "2%",
    borderRadius: 30,
    marginTop: "4%",
  },
});
export default connect(function (state) {
  return {
    auth: state.auth,
    profile: state.profile,
  };
})(Home);
