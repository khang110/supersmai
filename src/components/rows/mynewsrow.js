import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import config from "../../config/config";
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import calRealTime from '../../Helper/calRealTime';
import {Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  Ionicons,Entypo
} from "@expo/vector-icons";
const uriImage =
  "https://cdn-icons.flaticon.com/png/512/4194/premium/4194687.png?token=exp=1636281332~hmac=1390cb356a0fb98c5472c6407cfa2d6a";
const link =
  "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.15752-9/244559282_3070295989961269_1787605226591581197_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=IDK-yXa7RIIAX-mn0gC&_nc_ht=scontent.fsgn4-1.fna&oh=38230c56ea479dc8db3a96bcd28b7812&oe=61AAA40B";
const News = (props) => {
  const { data, onPress } = props;
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const renderImage = () => {
    if (data.urlImage.length != 0) {
      return (
        <Image style={styles.imageStyle} source={{ uri: data.urlImage[0] }} />
      );
    } else {
      return <Image style={styles.imageStyle} source={{ uri: uriImage }} />;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{ marginLeft: "4%", marginRight: "4%" }}
      >
        <View style={styles.container}>
          <View style={styles.wrapImage}>{renderImage()}</View>
          <View style={styles.wrapTitle}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title} numberOfLines={1}>{data.title} </Text>
            <View>
            <Menu
                style={{ backgroundColor: "#FFF" }}
                visible={visible}
                anchor={<Entypo name="dots-three-vertical" size={20} color="#BDBDBD" onPress={showMenu}/>}
                onRequestClose={hideMenu}>
                <MenuItem onPress={hideMenu} >Ẩn tin</MenuItem>
                <MenuDivider />
                <MenuItem onPress={hideMenu} >Xóa tin</MenuItem>
              </Menu>
            </View>
            </View>
            <View style={styles.wrapCate}>
              <Text style={styles.cate}>Phương tiện</Text>
              <Text style={styles.price}>Miễn phí</Text>
            </View>
            <View style={styles.wrapAddr}>
              <Text style={styles.time}>🕑 {calRealTime.CalRealTime(data.createdAt)}</Text>
              <Text style={styles.time}>Thủ Đức, Hồ Chí Minh</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapStatus}>
          <Text style={styles.time}>Tặng cộng đồng</Text>
          <Text style={styles.time}>Đang hiển thị</Text>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-mail-outline"
              size={config.screen_width * 0.05}
              color="#00a2e8"
            />
            <Text style={styles.textMessage}>{"  "}Lời nhắn</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wrapImage: { width: "25%" },
  imageStyle: {
    width: config.screen_width * 0.22,
    height: config.screen_width * 0.22,
    borderRadius: 20,
  },
  wrapTitle: {
    width: "75%",
    justifyContent: "space-between",
    padding: "2%",
    borderBottomWidth: 0.5,
    borderBottomColor: color.gray,
  },
  title: { fontSize: fontSize.fontsize_3, fontWeight: "bold" },
  wrapCate: { flexDirection: "row", justifyContent: "space-between" },
  cate: { fontSize: fontSize.fontsize_5, color: color.gray_3 },
  price: { color: color.green, fontSize: fontSize.fontsize_5 },
  wrapAddr: { flexDirection: "row", justifyContent: "space-between" },
  time: { fontSize: fontSize.fontsize_5, color: color.gray_3 },
  wrapStatus: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: "2%",
    justifyContent: "space-between",
  },
  textMessage: {
    fontSize: fontSize.fontsize_4,
    color: "#00a2e8",
  },
});

export default News;
