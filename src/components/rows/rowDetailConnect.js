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
import calRealTime from "../../Helper/calRealTime";
import formatTime from "../../Helper/formatTime";
import donate from "../../../assets/donate.png";
const uriImage =
  "https://cdn-icons.flaticon.com/png/512/4194/premium/4194687.png?token=exp=1636281332~hmac=1390cb356a0fb98c5472c6407cfa2d6a";
const News = (props) => {
  const { data, onPress } = props;
  useEffect(() => {
    // console.log(data)
  }, []);

  const renderImage = () => {
    if (data.urlImage.length != 0) {
      return (
        <Image style={styles.imageStyle} source={{ uri: data.urlImage[0] }} />
      );
    } else {
      return <Image style={styles.imageStyle} source={donate } />;
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => onPress()} style={styles.container}>
        <View style={styles.wrapImage}>{renderImage()}</View>
        <View style={styles.wrapTitle}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <View style={styles.wrapCate}>
            <Text style={styles.cate}>{data.NameProduct[0].NameProduct}</Text>
            <Text style={styles.price}>Miễn phí</Text>
          </View>
          <View style={styles.wrapAddr}>
            <Text style={styles.time}>
              🕑 {formatTime.formatTime(data.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginLeft: "4%",
    marginRight: "4%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  title: { fontSize: fontSize.fontsize_3, fontWeight: "bold" },
  wrapCate: { flexDirection: "row", justifyContent: "space-between" },
  cate: { fontSize: fontSize.fontsize_5, color: color.gray_3 },
  price: { color: color.green, fontSize: fontSize.fontsize_5 },
  wrapAddr: { flexDirection: "row", justifyContent: "space-between" },
  time: { fontSize: fontSize.fontsize_5, color: color.gray_3 },
});

export default News;
