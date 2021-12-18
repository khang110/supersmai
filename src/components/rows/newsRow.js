import React, { useEffect } from "react";
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
import formatAddress from '../../Helper/formatAddress';
import donate from "../../../assets/donate.png";
const uriImage =
  "https://cdn-icons.flaticon.com/png/512/4194/premium/4194687.png?token=exp=1636281332~hmac=1390cb356a0fb98c5472c6407cfa2d6a";
const link="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.15752-9/244559282_3070295989961269_1787605226591581197_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=IDK-yXa7RIIAX-mn0gC&_nc_ht=scontent.fsgn4-1.fna&oh=38230c56ea479dc8db3a96bcd28b7812&oe=61AAA40B";
const News = (props) => {
  const {data, onPress} = props;
  useEffect(() => {
    // console.log(data)
  },[])

  const renderImage = () => {
    if (data.urlImage.length != 0) {
      return ( <Image style={styles.imageStyle} source={{ uri:data.urlImage[0] }} />);
    } else {
      return ( <Image style={styles.imageStyle} source={donate } />);
    }
  }
 
  return (
    <View>
      <TouchableOpacity  onPress={() => onPress()} style={styles.container}>
        <View style={styles.wrapImage}>
         {renderImage()}
        </View>
        <View style={styles.wrapTitle}>
          <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
          <View style={styles.wrapCate}>
            <Text style={styles.cate}>{data.NameProduct[0].NameProduct}</Text>
            <Text style={styles.price}>Miễn phí</Text>
          </View>
          <View style={styles.wrapAddr}>
            <Text style={styles.time}>🕑 {calRealTime.CalRealTime(data.createdAt)}</Text>
            <Text style={styles.time}>{formatAddress.formatAddress(data.address)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    marginLeft: "4%",
    marginRight: "4%",
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
  },
  title: { fontSize: fontSize.fontsize_3, fontWeight: "bold", },
  wrapCate: { flexDirection: "row", justifyContent: "space-between" },
  cate: {fontSize: fontSize.fontsize_5, color: color.gray_3},
  price: {color: color.green, fontSize: fontSize.fontsize_5},
  wrapAddr: { flexDirection: "row", justifyContent: "space-between" },
  time: { fontSize: fontSize.fontsize_5, color: color.gray_3 }
});

export default News;
